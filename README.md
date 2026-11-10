# 朱荣院士团队中英双语网站

适合上传 GitHub 并通过 GitHub Pages 发布的完整静态网站，包含源码、27个页面及全部图片。不需要数据库或安装第三方依赖。

## 上传 GitHub 并发布

1. 创建 GitHub 仓库，默认分支使用 main。
2. 将本文件夹里面的全部文件和目录上传到仓库根目录，包括 .github、dist、build-pages.cjs 和 package.json。不要只上传 ZIP，也不要额外套一层项目文件夹。
3. 打开仓库 Settings → Pages → Build and deployment → Source，选择 GitHub Actions。
4. 提交文件到 main，内置 .github/workflows/pages.yml 会生成页面并发布 dist。
5. 在 Actions → Deploy website to GitHub Pages 查看部署结果，或点击 Run workflow 手动部署。实际网址以工作流结果及 Pages 设置为准。

首次启用 GitHub Actions 后，如果先前的提交没有触发发布，手动运行一次工作流即可。网页上传时注意保留 .github/workflows/pages.yml；使用 GitHub Desktop 或 Git 提交整个目录更容易保留完整结构。上传文件后仍需完成第3步的 Pages 设置。

参考：[GitHub Pages 官方工作流说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

## 本地预览

安装 Node.js 后，在本文件夹运行：

```powershell
npm run build
npm start
```

浏览器打开 http://127.0.0.1:4173。不需要 npm install；dist 中已经包含生成好的页面。

## 目录结构

- .github/workflows/pages.yml：GitHub Pages 自动发布。
- dist/：全部网页及本地图片，可部署的网站文件。
- dist/assets/：人物照片、新闻图、科研与平台图片。
- dist/content.js：团队概况、成果奖项、原四位导师资料。
- dist/updates.js：研究子方向、新闻、新增人员、实验平台资料。
- dist/site.js：各页面内容及中英文切换。
- dist/style.css、dist/multipage.css：样式及手机适配。
- build-pages.cjs：生成27个HTML页面外壳和公共导航、页脚。
- server.cjs：本地预览服务。
- export-github.cjs：同步GitHub交付文件夹。
- sync-manifest.json：交付文件及SHA-256校验清单。
- AGENTS.md：后续修改与同步约定。
- package.json：构建、预览与交付命令。

站内链接使用相对路径，可用于 GitHub Pages 仓库子路径。

## 后续修改与同步

- 改文字、成员、论文、新闻：编辑 dist/content.js、dist/updates.js。
- 改页面内容：编辑 dist/site.js；公共导航和页面清单在 build-pages.cjs。
- 改样式：编辑 dist/style.css、dist/multipage.css。
- 改图片：更新 dist/assets/。
- 修改页面生成规则后运行 npm run build。
- 把更新提交到 GitHub main 分支后，工作流会重新发布。

当前工作目录为 D:/Steelmaking/zhu-rong-team-site，独立交付目录固定为 D:/Steelmaking/zhu-rong-team-github。以后由助手修改网站时，也会更新此交付目录；同步命令为 node export-github.cjs。如果你已直接修改交付目录，先合并这些修改再同步，避免覆盖。

文件夹同步不等同于自动提交到 GitHub。GitHub 提交需另行操作。默认交付完整文件夹；只有需要压缩备份时才运行 npm run package:zip，上传 GitHub 时仍使用实际项目文件。

## 内容与来源

当前包括首页、团队概况、科研方向、新闻、人员、科研成果、科研奖项、实验平台和联系页面；六大研究方向含十三个子方向，七位导师有独立资料页。人员按导师、学生、实验室工作人员、毕业生划分；四位工作人员分类已由用户确认，学生及毕业生名单尚待补充。

资料来自用户提供的团队文字、两份团队介绍PDF和新闻截图，以及学校官网。人物照片取自用户提供的资料，英文为工作译文。论文与专利按提供资料整理，未逐项核验文献元数据。

- [团队官网](https://icn.ustb.edu.cn/szdw/yjtd/4f77d36f9c6440b8b602898c24e1fba8.htm)
- [朱荣老师介绍](https://icn.ustb.edu.cn/szdw/zc/f7fb2b9fcf8f4d94aa8d58ab0221feea.htm)
- [刘福海老师介绍](https://ncms.ustb.edu.cn/rcpy/dsdw/yjgc/28036557b0cc40658c8ac67da4584826.htm)
- [赵飞老师介绍](https://ncms.ustb.edu.cn/rcpy/dsdw/yjgc/3094f41086b6464ea5241b31a8dd77c9.htm)
- 格式参考 [Berkeley Lab](https://www.lbl.gov/)，未复用其标志。

保留的前版工业示意照片来源为SMS group，当前首页已改用朱荣院士肖像。GitHub交付目录不含原Sites托管配置、Git历史、登录凭据、原始PDF或其他工作区文件。
