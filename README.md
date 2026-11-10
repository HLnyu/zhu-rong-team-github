# 朱荣院士团队中英双语网站

适合上传 GitHub 并通过 GitHub Pages 或 Cloudflare 发布的完整静态网站，包含源码、29个页面及全部图片。不需要数据库或安装第三方依赖。

## 最新展示与英文更新

沈汉林由工作人员移入导师分区，新增完整履历、10篇官网代表论文、2项项目、4项专利和2项奖项。现有导师8人，工作人员3人；其电子邮箱和官网入口均已添加，未公开电话不显示。

导师目录照片改为紧凑尺寸，悬停或键盘聚焦时放大，底部出现简介及论文按钮；照片上不覆盖“查看完整履历”文字。点击照片进入本站完整学术履历，简介与论文按钮展开关联论文。触屏设备直接显示底部内容。首页朱荣院士大照片仍保留。

首页六大科研方向采用团队介绍PDF的原始照片作背景，设置依次浮现及悬停缩放。减少动态效果偏好下关闭过渡和入场动画；未支持观察器时直接显示全部卡片。页面链接已大幅减少箭头符号。

69名学生英文姓名已补齐为无声调拼音，采用名字在前、姓氏在后的格式，并保留已有英文名；58条已提供的单位译为英文，原表空缺的11条仍留空。用户指定的译名为 `The National Center for Materials Service Safety (NCMS)`、`Institute of Carbon Neutrality`、`State Key Laboratory of Advanced Metallurgy`；冶金学院使用 `School of Metallurgical and Ecological Engineering`。对中文机构简称及原始录入变体保留中文原文，英文统一到上述译名。姓名若有惯用或多音字拼写，可在Excel中直接调整。

本次以用户已编辑的交付Excel为基础合并，保留新闻、人员及论文修改。刘海亮的Google Scholar地址从误填的“主页名称”列移到“个人主页链接”，地址、原有英文姓名和邮箱均保留。已在本地浏览器验证科研背景、导师照片跳转及学生英文页面。

背景图片从《团队简介（新生见面会）2026年9月》PDF第9页直接提取原始内嵌图片，不改写PDF、不使用生成图片：`research-converter-photo.jpg`（Image156）、`research-eaf-photo.jpg`（Image155）、`research-process-photo.jpg`（Image170）、`research-carbon-photo.jpg`（Image158）、`research-resources-photo.jpg`（Image153）、`research-jets-photo.jpg`（Image152）。

## 论文检索与人员展示

### 2026年11月教师与学生资料更新

已按用户提供的学校官网资料重新整理朱荣、董凯、魏光升、冯超、刘福海、赵飞六位老师的个人页面。电话、邮箱、办公地点置于页首，正文分为个人简介、研究领域、教育与工作经历、论文、专利、项目及奖励。每个页面及人员卡片保留官方个人主页入口；朱荣的三个指定页面均可访问。刘润藻的履历、主页和联系方式按要求留空；董凯、魏光升未查到公开电话，前台不显示电话栏目。各人公开电话仅用于其本人，不能将网站页脚的实验室总机当作个人电话。

人员表新增 **个人主页链接、主页名称中文、主页名称英文、电子邮箱、联系电话**。多主页链接及名称在单元格内用 Alt+Enter 一行对应一行。联系方式留空时不显示。

学生名单来自用户的《学生资料.xlsx》，共69人：博士生27人、硕士生42人。按培养层次分组、入学年份由新到旧排列；学生照片均留空，页面使用无头像名录。原始表中“入学年份”列实际填写学号，按字母后的四个数字提取年份，例如 D2026123123 → 2026、M2023343434 → 2023。68人可提取年份，温一凡未填学号，年份留空。只保存提取后的年份，完整学号不纳入交付文件和公开数据。两位“杨阳”因单位和培养层次不同按两条记录保留。学生单位原文照录，缺失单位不补猜。

学生演示行已移除；毕业生尚未提供真实名单，原两张演示卡片保留并明确标记。论文库现有42项代表性论文和著作。新增条目按学校官网著录，未从 DOI 中推测未公开的发表年份；原文入口未知时保留 Google Scholar 标题检索。官方网站的历史介绍存在任职或数量差异时，以近期实验室及研究院信息为主，既有团队统计不据旧页面覆盖。

论文标题优先打开“DOI或链接”列中的原文；未填写时自动打开 Google Scholar 的标题检索。每条记录都有明确的 Google Scholar 入口；导师履历和成员论文面板同步使用相同外链。Google Scholar 链接是检索入口，不代表已核验到唯一论文记录。

毕业生保留两张演示卡片，编号以 `demo-` 开头，页面明确标注“演示照片 · 非真实成员”。照片来自 Unsplash 的公开样例，不对应团队真实人员。学生分区已经全部替换为真实名单，当前不显示照片。

首页 Logo 与链接来自绿色低碳钢铁冶金全国重点实验室官网 `https://sklam.ustb.edu.cn/`。白色透明 Logo 保留官网原图，使用深色背景展示。

新增图片来源：

- `assets/lab-official-logo.png`：`https://sklam.ustb.edu.cn/images/1560eb3f9a834667b186c9f481e5e460.png`
- `assets/demo-student-01.jpg`：`https://images.unsplash.com/photo-1506794778202-cad84cf45f1d`
- `assets/demo-student-02.jpg`：`https://images.unsplash.com/photo-1534528741775-53994a69daeb`
- `assets/demo-alumni-01.jpg`：`https://images.unsplash.com/photo-1500648767791-00dcc994a43e`
- `assets/demo-alumni-02.jpg`：`https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91`

`publications.html` 是独立论文库，参考 Sacanna Lab 的精选/完整列表、主题筛选、关键词检索和人员关联方式，另有年份、期刊、成员筛选。支持多个筛选条件组合，链接中的筛选条件可以复制分享。目前整理52项代表性论文与著作，不等同团队210余篇完整目录。封面和DOI有真实资料后再添加。

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
- build-pages.cjs：生成29个HTML页面外壳和公共导航、页脚。
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
