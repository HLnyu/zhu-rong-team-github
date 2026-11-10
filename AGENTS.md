# Website handoff and synchronization

User requirement: future changes to this website must also update the separate GitHub delivery folder. Upload actual project files to GitHub; a ZIP alone cannot publish this website.

On this computer:
- Working website source: `D:/Steelmaking/zhu-rong-team-site`.
- GitHub delivery folder: `D:/Steelmaking/zhu-rong-team-github`.
- Optional delivery ZIP (only when requested): `D:/Steelmaking/zhu-rong-team-github.zip`.

Before editing, inspect the working tree and compare the delivery folder with its `sync-manifest.json`. If the user has independently edited the delivery folder, preserve and merge those changes before exporting; do not blindly overwrite them.

After website changes:
1. Edit the working source and run the appropriate checks and browser QA.
2. Run `node export-github.cjs` from the working website source. It builds the pages and synchronizes the delivery files. Add `--zip` only when a ZIP is requested.
3. Verify the exported `sync-manifest.json` SHA-256 hashes. Deliver the updated folder path alongside any preview URL.

The source repository's `.openai/hosting.json` identifies its existing private Sites deployment. Preserve it for Sites updates. The GitHub export must exclude `.git`, `.openai`, credentials, raw source PDFs, and unrelated workspace files. Preserve any `.git` directory created by the user in the GitHub delivery folder. Do not push to GitHub unless the user explicitly asks.

The site is static, with relative links compatible with GitHub project Pages. `build-pages.cjs` generates the page shells. Content is in `dist/content.js` and `dist/updates.js`; rendering is in `dist/site.js`; styling is in `dist/style.css` and `dist/multipage.css`.
