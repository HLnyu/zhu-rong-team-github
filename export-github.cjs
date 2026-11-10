const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');

const source = __dirname;
const destination = path.resolve(source, '..', 'zhu-rong-team-github');
const archive = path.resolve(destination, '..', 'zhu-rong-team-github.zip');
const makeZip = process.argv.includes('--zip');
const sameDirectory = path.resolve(source).toLowerCase() === destination.toLowerCase();
const ignoredLegacy = new Set(['script.js']);
function hash(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}
// Protect independent changes in the delivery folder, including a user's Git checkout.
const oldManifestPath = path.join(destination, 'sync-manifest.json');
if (!sameDirectory && fs.existsSync(oldManifestPath)) {
  const previous = JSON.parse(fs.readFileSync(oldManifestPath, 'utf8'));
  const workbook = 'content/网站内容管理.xlsx';
  const recorded = previous.files[workbook];
  if (recorded && fs.existsSync(path.join(destination, workbook)) && fs.existsSync(path.join(source, workbook)) && hash(path.join(destination, workbook)) !== recorded && hash(path.join(source, workbook)) === recorded) {
    fs.copyFileSync(path.join(destination, workbook), path.join(source, workbook));
    console.log('Merged the edited content workbook from the GitHub delivery folder.');
  }
  const conflicts = Object.entries(previous.files).filter(([relative, recorded]) => {
    const exported = path.join(destination, relative);
    const original = path.join(source, relative);
    return fs.existsSync(exported) && hash(exported) !== recorded &&
      (!fs.existsSync(original) || hash(exported) !== hash(original));
  }).map(([relative]) => relative);
  if (conflicts.length) throw new Error('Delivery folder contains independent edits; merge them before export: ' + conflicts.join(', '));
}
execFileSync(process.execPath, ['build-pages.cjs'], { cwd: source, stdio: 'inherit' });
fs.mkdirSync(destination, { recursive: true });
const files = [];
function collect(relative) {
  const from = path.join(source, relative);
  const stat = fs.lstatSync(from);
  if (stat.isSymbolicLink()) throw new Error('Symlinks are not allowed in delivery: ' + relative);
  if (stat.isDirectory()) {
    for (const name of fs.readdirSync(from)) {
      if (relative === 'dist' && ignoredLegacy.has(name)) continue;
      if (name.startsWith('~$')) continue;
      collect(path.posix.join(relative, name));
    }
  } else if (stat.isFile()) files.push(relative);
}
for (const entry of ['dist', 'content', 'scripts', '.github', '.gitignore', 'README.md', 'package.json', 'build-pages.cjs', 'server.cjs', 'export-github.cjs', 'AGENTS.md', 'wrangler.json']) collect(entry);
for (const relative of files) {
  const target = path.join(destination, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  if (!sameDirectory) fs.copyFileSync(path.join(source, relative), target);
}
const manifest = { generated_at: new Date().toISOString(), files: Object.fromEntries(files.sort().map(relative => [relative, hash(path.join(destination, relative))])) };
fs.writeFileSync(oldManifestPath, JSON.stringify(manifest, null, 2) + '\n');
// Package only the allowlisted delivery files, never the user's .git or local secrets.
const powershell = `
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$packageRoot = $env:ZHU_PACKAGE_ROOT
$packageArchive = $env:ZHU_PACKAGE_ARCHIVE
$packageTemp = $packageArchive + '.tmp-' + [guid]::NewGuid().ToString('N')
$packageManifest = Get-Content -LiteralPath (Join-Path $packageRoot 'sync-manifest.json') -Raw | ConvertFrom-Json
$packageFiles = @($packageManifest.files.PSObject.Properties.Name) + @('sync-manifest.json')
$packageStream = [System.IO.File]::Open($packageTemp, [System.IO.FileMode]::CreateNew)
$packageZip = [System.IO.Compression.ZipArchive]::new($packageStream, [System.IO.Compression.ZipArchiveMode]::Create)
try {
  foreach ($packageFile in $packageFiles) {
    $packageEntry = 'zhu-rong-team-github/' + $packageFile.Replace('\\', '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($packageZip, (Join-Path $packageRoot $packageFile), $packageEntry, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
  }
} finally { $packageZip.Dispose(); $packageStream.Dispose() }
if (Test-Path -LiteralPath $packageArchive) { Remove-Item -LiteralPath $packageArchive }
Move-Item -LiteralPath $packageTemp -Destination $packageArchive
`;
if (makeZip) execFileSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', powershell], {
  env: { ...process.env, ZHU_PACKAGE_ROOT: destination, ZHU_PACKAGE_ARCHIVE: archive }, stdio: 'inherit'
});
for (const [relative, expected] of Object.entries(manifest.files)) {
  if (hash(path.join(destination, relative)) !== expected) throw new Error('Export verification failed: ' + relative);
}
console.log(JSON.stringify({ folder: destination, zip: makeZip ? archive : null, files: files.length + 1, hashes: 'verified' }));
