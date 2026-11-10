# 朱荣院士团队中英双语网站

适合上传 GitHub 并通过 GitHub Pages 或 Cloudflare 发布的完整静态网站，包含源码、28个页面及全部图片。不需要数据库或安装第三方依赖。

## 论文检索与人员展示

`publications.html` 是独立论文库，参考 Sacanna Lab 的精选/完整列表、主题筛选、关键词检索和人员关联方式，另有年份、期刊、成员筛选。支持多个筛选条件组合，链接中的筛选条件可以复制分享。初始整理18项代表性论文与著作，不等同团队210余篇完整目录。封面和DOI有真实资料后再添加。

在内容管理表的 **论文库** 中新增或修改论文；**论文分区** 管理预设六大研究方向。分区编号及关联人员编号可用英文分号连接多个编号，如 `carbon;converter`、`zhu;dong`。精选填“是”。论文库同时更新人员卡片展开内容和导师履历中的论文列表，无需重复录入。**学术条目** 继续管理专利、科研项目及个人奖项。

人员页单独突出朱荣院士，其他成员采用大照片网格；点击成员展开简介和相关论文，可进入该成员的论文筛选列表。四个人员分区及独立学术履历页保留。新增学生、毕业生仍在人员表中填写。

代码和筛选逻辑已检查；本次浏览器界面检查因工具无法确认Windows浏览器地址而中止，桌面和手机的目视验收尚待完成。

## 用Excel维护网站内容

日常修改的唯一入口是 **content/网站内容管理.xlsx**。不要编辑生成的 `dist/cms-data.js` 或 `dist/cms-data.json`。

| 工作表 | 可以修改什么 |
| --- | --- |
| 新闻 | 标题、日期、类别、摘要、正文、封面、来源、发布/草稿、排序 |
| 人员 | 导师、学生、工作人员、毕业生的姓名、照片、简介、职称、年份、研究领域及经历 |
| 论文库 / 论文分区 | 全站论文、著作与研究主题；同时更新人员关联论文和导师履历 |
| 学术条目 | 各位老师的专利、科研项目、个人荣誉，按人员编号关联 |
| 科研成果 | 成果标题、正文、展示图片和亮点 |
| 展示指标 | 首页和成果页的数量与说明 |
| 科研奖项 | 团队奖项列表 |
| 团队概况 | 团队介绍中英文正文 |

**修改、保存并关闭Excel → GitHub Desktop Commit → Push origin → Cloudflare自动构建发布。** 仅在电脑保存Excel，不会改变线上网页。表格作为内容源，当前没有登录式网页后台或独立服务器数据库。

新增记录时，在相应表格末尾添加一行。第3行表头和工作表名保持不变。编号使用小写英文、数字及短横线，尽量不要修改已有编号；首页人物固定使用编号 `zhu`。

状态填“发布”才会上线；“草稿”“隐藏”不会生成到网页。英文留空时暂用中文，不自动翻译。新闻每个段落、履历每条记录在单元格内用 Alt+Enter 分行，中英文逐行对应。

图片应放进 `dist/assets/`，单元格填图片文件名或 `assets/文件名.jpg`，并把图片文件一起提交。往Excel单元格中插入图片不会替代网站图片文件。

构建时自动读取表格并生成新闻与导师详情页。编号重复、无效日期、缺失图片等会停止构建并报告工作表和行号。构建失败时需修正表格再推送，不能把失败当作已上线。

本地预览前运行 `npm run build`，然后 `npm start`；本地再次修改表格后，重新运行构建并刷新浏览器。构建脚本只使用Node.js自带模块，不需要额外安装Excel读取依赖。

同步交付目录时，如果你只修改了交付目录中的Excel，脚本会先合并回工作目录再构建。如果两处Excel分别修改过，会停止并提示合并，避免覆盖内容。

## 上传 GitHub 并发布

1. 创建 GitHub 仓库，默认分支使用 main。
2. 将本文件夹里面的全部文件和目录上传到仓库根目录，包括 .github、dist、build-pages.cjs 和 package.json。不要只上传 ZIP，也不要额外套一层项目文件夹。
3. 打开仓库 Settings → Pages → Build and deployment → Source，选择 GitHub Actions。
4. 提交文件到 main，内置 .github/workflows/pages.yml 会生成页面并发布 dist。
5. 在 Actions → Deploy website to GitHub Pages 查看部署结果，或点击 Run workflow 手动部署。实际网址以工作流结果及 Pages 设置为准。

首次启用 GitHub Actions 后，如果先前的提交没有触发发布，手动运行一次工作流即可。网页上传时注意保留 .github/workflows/pages.yml；使用 GitHub Desktop 或 Git 提交整个目录更容易保留完整结构。上传文件后仍需完成第3步的 Pages 设置。

参考：[GitHub Pages 官方工作流说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

## 本地预览

### Cloudflare Workers 从 GitHub 发布

如果使用 Cloudflare 的 Workers Git 仓库部署界面，仓库根目录已包含 `wrangler.json`，静态资源目录设为 `./dist`。界面填写：

| 设置 | 值 |
| --- | --- |
| 项目根目录 | 仓库根目录 `/` |
| 构建命令 | `npm run build` |
| 部署命令 | `npx wrangler deploy` |
| 预览命令 | `npx wrangler preview` |
| 启用预览构建 | 可保持开启 |

Cloudflare Worker 项目名称应与 `wrangler.json` 的 `name` 一致，当前为 `zhulab`；如使用其他名称，同时修改该字段。`dist` 是静态输出目录，不是项目根目录。

先把新增的 `wrangler.json` 和其他改动提交、推送到连接的 GitHub 仓库，再在 Cloudflare 开始部署。此配置不需要 Worker JavaScript 入口文件。

参考：[Cloudflare 构建配置](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)、[静态资源配置](https://developers.cloudflare.com/workers/static-assets/binding/)。GitHub Pages 和 Cloudflare Workers 是两种可选的发布方式。

### 在本机运行

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
- build-pages.cjs：生成28个HTML页面外壳和公共导航、页脚。
- server.cjs：本地预览服务。
- export-github.cjs：同步GitHub交付文件夹。
- sync-manifest.json：交付文件及SHA-256校验清单。
- AGENTS.md：后续修改与同步约定。
- package.json：构建、预览与交付命令。

站内链接使用相对路径，可用于 GitHub Pages 仓库子路径。

## 后续修改与同步

- 改新闻、成员、论文、成果等日常内容：编辑 content/网站内容管理.xlsx。
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
