# Website handoff and synchronization

User requirement: future changes to this website must also update the separate GitHub delivery folder. Upload actual project files to GitHub; a ZIP alone cannot publish this website.

On this computer:
- Working website source: `D:/Steelmaking/zhu-rong-team-site`.
- GitHub delivery folder: `D:/Steelmaking/zhu-rong-team-github`.
- Optional delivery ZIP (only when requested): `D:/Steelmaking/zhu-rong-team-github.zip`.

Before editing, inspect the working tree and compare the delivery folder with its `sync-manifest.json`. If the user has independently edited the delivery folder, preserve and merge those changes before exporting; do not blindly overwrite them.

## Excel content management

The content source is now `content/网站内容管理.xlsx`. News, people, academic entries, research achievements, display metrics, team awards and overview copy must be maintained there. Do not overwrite this workbook by rerunning the initial authoring builder. `dist/cms-data.js` and `dist/cms-data.json` are generated files, not editable sources. `build-pages.cjs` imports and validates the workbook before generating published news and faculty detail pages. English fields may be blank and fall back to Chinese. Draft/hidden rows are excluded from the deployed static output.

`论文库` is the single source for the publication explorer, people paper panels and faculty CV paper lists. `论文分区` manages topic buttons. Multiple category IDs and related person IDs are separated by semicolons. The latter must exist in the people sheet. Academic entries manage patents, projects and awards; old academic paper rows are superseded by the structured publication sheet. Never invent DOI links or covers. The initial explorer has 18 representative papers/books, not the complete 210+ publication record. Initial topic classifications are based on titles and remain editable. Filtering is in `dist/catalog.js`; publication and people presentation is in `dist/explorer.js`. Run `node scripts/check-catalog.cjs` after changes. On 2026-11-10 computer use stopped because the tool could not confidently determine the Windows browser URL; visual browser QA remains pending.

Paper links use the original DOI/URL when supplied, with an automatic exact-title Google Scholar search fallback. Both options are shown in the explorer, and CV citations link to the same destination. Do not describe a Scholar search URL as a verified article record. The homepage now links to `https://sklam.ustb.edu.cn/` using its original white transparent logo on a dark background. The people workbook contains two student and two alumni demo rows (`demo-` IDs); importer marks these as `demo`, the UI must label them explicitly as non-members, and their portraits must never be presented as real students. Replace demo rows with new formal IDs when verified people are supplied. Asset sources are listed in README.

If the delivery workbook was edited by the user while the working workbook still matches the previous manifest, `export-github.cjs` merges that workbook back to the working source before building. If both copies changed differently, merge the workbook changes before exporting. Never replace a user-edited workbook with the original seed file. Cloudflare builds from the GitHub workbook after a Commit and Push; local Excel saves alone do not publish. There is no login-based web admin or server database in this version.

After website changes:
1. Edit the working source and run the appropriate checks and browser QA.
2. Run `node export-github.cjs` from the working website source. It builds the pages and synchronizes the delivery files. Add `--zip` only when a ZIP is requested.
3. Verify the exported `sync-manifest.json` SHA-256 hashes. Deliver the updated folder path alongside any preview URL.

The source repository's `.openai/hosting.json` identifies its existing private Sites deployment. Preserve it for Sites updates. The GitHub export must exclude `.git`, `.openai`, credentials, raw source PDFs, and unrelated workspace files. Preserve any `.git` directory created by the user in the GitHub delivery folder. Do not push to GitHub unless the user explicitly asks.

The site is static, with relative links compatible with GitHub project Pages. `build-pages.cjs` generates the page shells. Content is in `dist/content.js` and `dist/updates.js`; rendering is in `dist/site.js`; styling is in `dist/style.css` and `dist/multipage.css`.
