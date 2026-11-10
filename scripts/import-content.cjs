const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {readXlsx}=require('./read-xlsx.cjs');
const ROOT=path.resolve(__dirname,'..'),DEFAULT_FILE=path.join(ROOT,'content','网站内容管理.xlsx');
const schemas={
 论文分区:['编号','状态','名称中文','名称英文','排序'],
 论文库:['编号','状态','年份','标题中文','标题英文','作者','期刊或出版社','完整引文','分区编号','关联人员编号','精选','封面图片','DOI或链接','摘要中文','摘要英文','排序'],
 新闻:['编号','状态','日期','类别中文','类别英文','标题中文','标题英文','摘要中文','摘要英文','封面图片','来源中文','来源英文','正文中文','正文英文','原文截图','排序'],
 人员:['编号','状态','分区','姓名中文','姓名英文','职称或培养层次中文','职称或培养层次英文','照片','简介中文','简介英文','任职中文','任职英文','入学年份','毕业年份','办公地点中文','办公地点英文','研究领域中文','研究领域英文','教育工作经历中文','教育工作经历英文','招生方向中文','招生方向英文','排序'],
 学术条目:['人员编号','状态','类型','内容中文','内容英文','排序'],
 科研成果:['编号','状态','标题中文','标题英文','正文中文','正文英文','展示图片','亮点中文','亮点英文','排序'],
 展示指标:['编号','数值','说明中文','说明英文','排序'],
 科研奖项:['编号','状态','奖项中文','奖项英文','排序'],
 团队概况:['编号','状态','正文中文','正文英文','排序']
};
function importWorkbook(file=DEFAULT_FILE,out=path.join(ROOT,'dist')){
 if(!fs.existsSync(file))throw Error('找不到内容管理表：'+file);const sheets=readXlsx(file);const context=vm.createContext({});vm.runInContext(fs.readFileSync(path.join(ROOT,'dist/content.js'),'utf8')+'\n'+fs.readFileSync(path.join(ROOT,'dist/updates.js'),'utf8')+'\nglobalThis.base={profiles};',context);const base=new Map(context.base.profiles.map(p=>[p.id,JSON.parse(JSON.stringify(p))]));
 const rows={};for(const [name,columns] of Object.entries(schemas)){const sheet=sheets.get(name);if(!sheet)throw Error('缺少工作表：'+name);const header=sheet[2]||[];columns.forEach((h,i)=>{if(header[i]!==h)throw Error(`${name} 第3行表头第${i+1}列应为“${h}”，请保留表头。`);});rows[name]=sheet.slice(3).map((cells,index)=>{const row={_row:index+4,_sheet:name};for(let i=0;i<columns.length;i++){const v=cells?.[i]??'';if(v&&typeof v==='object'&&v.formula)throw Error(`${name} 第${index+4}行请填写文字或数值，不使用公式。`);row[columns[i]]=typeof v==='string'?v.trim():v;}return row;}).filter(r=>columns.some(h=>r[h]!==''));}
 const fail=(r,msg)=>{throw Error(`${r._sheet} 第${r._row}行：${msg}`);};
 const text=(r,k,required=false)=>{const v=String(r[k]??'').trim();if(required&&!v)fail(r,`请填写“${k}”。`);return v;};
 const id=(r,k='编号')=>{const v=text(r,k,true);if(!/^[a-z][a-z0-9-]{0,63}$/.test(v))fail(r,`${k}请用小写英文字母开头，仅含字母、数字和短横线，最多64位。`);return v;};
 const enabled=r=>{const status=text(r,'状态',true);if(!['发布','草稿','隐藏'].includes(status))fail(r,'状态只能是发布、草稿或隐藏。');return status==='发布';};
 const pair=(r,zh,en,required=false)=>{const value=text(r,zh,required);return {zh:value,en:text(r,en)||value};};
 const order=r=>{const raw=r['排序'];if(raw==='')return r._row*10;const n=Number(raw);if(!Number.isFinite(n))fail(r,'排序请填写数字。');return n;};
 const sorted=a=>a.sort((a,b)=>a._order-b._order);
 const picture=(r,k,fallback='')=>{let v=text(r,k)||fallback;if(!v)return '';if(!v.startsWith('assets/'))v='assets/'+v;if(v.includes('..')||v.includes('\\')||/[<>"'?#:]/.test(v)||!/^assets\/.+\.(png|jpe?g|webp|gif|svg)$/i.test(v))fail(r,`${k}请填 assets 下的图片文件名或 assets/文件名。`);if(!fs.existsSync(path.join(ROOT,'dist',v)))fail(r,`图片不存在：${v}。请把图片放入 dist/assets。`);return v;};
 const unique=(name,key='编号')=>{const used=new Set();for(const r of rows[name]){const v=id(r,key);if(used.has(v))fail(r,`编号重复：${v}`);used.add(v);}};for(const name of ['新闻','人员','科研成果','展示指标','科研奖项','团队概况'])unique(name);
 const date=r=>{const raw=r['日期'];let s;if(typeof raw==='number')s=new Date(Date.UTC(1899,11,30)+Math.round(raw*86400000)).toISOString().slice(0,10);else s=String(raw).replace(/[/.]/g,'-');if(/^\d{4}-\d{2}-\d{2}T/.test(s))s=s.slice(0,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(s)||Number.isNaN(new Date(s+'T00:00:00Z').getTime())||new Date(s+'T00:00:00Z').toISOString().slice(0,10)!==s)fail(r,'日期请填有效日期，显示格式为 YYYY-MM-DD。');return s;};
 const year=(r,k)=>{if(r[k]==='')return '';const n=Number(r[k]);if(!Number.isInteger(n)||n<1900||n>2100)fail(r,`${k}请填1900至2100之间的四位年份。`);return n;};
 const lines=(r,zh,en)=>{const a=text(r,zh).split(/\r?\n/).map(s=>s.trim()).filter(Boolean),b=text(r,en).split(/\r?\n/).map(s=>s.trim()).filter(Boolean);if(b.length&&a.length!==b.length)fail(r,`${zh}与${en}的行数应一致；也可将英文留空。`);return a.map((s,i)=>({zh:s,en:b[i]||s}));};
 const news=sorted(rows['新闻'].filter(enabled).map(r=>{const paragraphs=lines(r,'正文中文','正文英文');if(!paragraphs.length)fail(r,'新闻正文不能为空。');return {id:id(r),date:date(r),kind:pair(r,'类别中文','类别英文'),title:pair(r,'标题中文','标题英文',true),summary:pair(r,'摘要中文','摘要英文'),image:picture(r,'封面图片','assets/team.jpg'),source:pair(r,'来源中文','来源英文'),paragraphs,screenshot:picture(r,'原文截图'),_order:order(r)};}));
 const people=sorted(rows['人员'].filter(enabled).map(r=>{const group=text(r,'分区',true);if(!['导师','学生','实验室工作人员','毕业生'].includes(group))fail(r,'分区应为导师、学生、实验室工作人员或毕业生。');const p={...(base.get(id(r))||{}),id:id(r),demo:id(r).startsWith('demo-'),group,name:pair(r,'姓名中文','姓名英文',true),role:pair(r,'职称或培养层次中文','职称或培养层次英文'),photo:picture(r,'照片','assets/person-placeholder.svg'),intro:pair(r,'简介中文','简介英文'),affiliation:text(r,'任职中文')?pair(r,'任职中文','任职英文'):undefined,office:pair(r,'办公地点中文','办公地点英文'),fields:lines(r,'研究领域中文','研究领域英文'),experience:lines(r,'教育工作经历中文','教育工作经历英文'),students:pair(r,'招生方向中文','招生方向英文'),entryYear:year(r,'入学年份'),graduationYear:year(r,'毕业年份'),papers:[],patents:[],projects:[],awards:[],_order:order(r)};if(p.entryYear&&p.graduationYear&&p.graduationYear<p.entryYear)fail(r,'毕业年份不能早于入学年份。');return p;}));
 if(!people.some(p=>p.id==='zhu'&&p.group==='导师'))throw Error('人员表须保留编号为 zhu 且状态为发布的导师，用于首页院士介绍。');
 const allPeopleIds=new Set(rows['人员'].map(r=>text(r,'编号'))),lookup=new Map(people.map(p=>[p.id,p])),types={论文:'papers',专利:'patents',项目:'projects',奖项:'awards'};for(const r of sorted(rows['学术条目'].map(r=>({...r,_order:order(r)})))){if(!allPeopleIds.has(text(r,'人员编号')))fail(r,'人员编号在人员表中不存在。');if(!enabled(r))continue;const key=types[text(r,'类型')];if(!key)fail(r,'类型应为论文、专利、项目或奖项。');lookup.get(text(r,'人员编号'))?.[key].push(pair(r,'内容中文','内容英文',true));}
 const results=sorted(rows['科研成果'].filter(enabled).map(r=>({id:id(r),title:pair(r,'标题中文','标题英文',true),body:pair(r,'正文中文','正文英文',true),image:picture(r,'展示图片'),metric:pair(r,'亮点中文','亮点英文'),_order:order(r)})));
 const metrics=sorted(rows['展示指标'].map(r=>({id:id(r),value:text(r,'数值',true),label:pair(r,'说明中文','说明英文',true),_order:order(r)})));for(const required of ['enterprises','projects','papers','patents','standards','books','national-awards'])if(!metrics.some(m=>m.id===required))throw Error('展示指标缺少固定编号：'+required);
 const awards=sorted(rows['科研奖项'].filter(enabled).map(r=>({...pair(r,'奖项中文','奖项英文',true),_order:order(r)})));
 const overview=sorted(rows['团队概况'].filter(enabled).map(r=>({...pair(r,'正文中文','正文英文',true),_order:order(r)})));
 unique('论文分区');unique('论文库');
 const publicationCategories=sorted(rows['论文分区'].filter(enabled).map(r=>({id:id(r),title:pair(r,'名称中文','名称英文',true),_order:order(r)})));
 const categoryIds=new Set(publicationCategories.map(c=>c.id));
 const tokens=v=>v.split(/[,，;；\n]/).map(s=>s.trim()).filter(Boolean);
 const publications=sorted(rows['论文库'].filter(enabled).map(r=>{const categories=tokens(text(r,'分区编号')),personIds=tokens(text(r,'关联人员编号'));for(const k of categories)if(!categoryIds.has(k))fail(r,'论文分区不存在或未发布：'+k);for(const k of personIds)if(!allPeopleIds.has(k))fail(r,'关联人员编号不存在：'+k);const featured=text(r,'精选');if(featured&&!['是','否'].includes(featured))fail(r,'精选请填写是或否。');let url=text(r,'DOI或链接');if(url&&!/^https?:\/\//i.test(url)){if(!/^10\.\d{4,9}\/.+/i.test(url))fail(r,'请填写 DOI 或完整 https 链接。');url='https://doi.org/'+url;}if(url){try{const u=new URL(url);if(!['http:','https:'].includes(u.protocol)||u.username||u.password)throw Error();}catch{fail(r,'论文链接无效。');}}return {id:id(r),year:year(r,'年份'),title:pair(r,'标题中文','标题英文',true),authors:text(r,'作者'),journal:text(r,'期刊或出版社'),citation:text(r,'完整引文',true),categories,personIds:personIds.filter(k=>lookup.has(k)),featured:featured==='是',cover:picture(r,'封面图片'),url,abstract:pair(r,'摘要中文','摘要英文'),_order:order(r)};}));
 for(const paper of publications)paper.scholarUrl='https://scholar.google.com/scholar?q='+encodeURIComponent('"'+paper.title.en+'"');
 for(const paper of publications)paper.peopleNames=paper.personIds.flatMap(id=>{const p=lookup.get(id);return [p.name.zh,p.name.en];});
 // One publication source feeds both the explorer and each faculty CV.
 for(const person of people)person.papers=publications.filter(p=>p.personIds.includes(person.id)).map(p=>({zh:p.citation,en:p.citation,url:p.url||p.scholarUrl}));
 const payload={faculty:people.filter(p=>p.group==='导师'),students:people.filter(p=>p.group==='学生'),staff:people.filter(p=>p.group==='实验室工作人员'),alumni:people.filter(p=>p.group==='毕业生'),news,results,metrics,awards,overview,publicationCategories,publications};
 fs.mkdirSync(out,{recursive:true});const serialized=JSON.stringify(payload,null,2).replace(/</g,'\\u003c');fs.writeFileSync(path.join(out,'cms-data.json'),serialized+'\n');fs.writeFileSync(path.join(out,'cms-data.js'),'// Generated from content/网站内容管理.xlsx. Edit the workbook, not this file.\nwindow.SITE_CMS = '+serialized+';\n');console.log(JSON.stringify({contentWorkbook:path.basename(file),news:news.length,people:people.length,results:results.length}));return payload;
}
if(require.main===module){try{const args=process.argv.slice(2);importWorkbook(args[0]?path.resolve(args[0]):undefined,args[1]?path.resolve(args[1]):undefined);}catch(error){console.error('内容管理表校验失败：'+error.message);process.exitCode=1;}}
module.exports={importWorkbook,schemas};
