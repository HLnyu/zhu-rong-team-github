const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),data=JSON.parse(fs.readFileSync(path.join(root,'dist/cms-data.json'))),catalog=require('../dist/catalog.js'),p=data.publications;
assert.equal(data.publicationCategories.length,6);assert.equal(p.length,18);
assert.deepEqual(catalog.filter(p,{q:'CO2'}).map(p=>p.id),catalog.filter(p,{q:'CO₂'}).map(p=>p.id));assert(catalog.filter(p,{q:'CO2'}).length>0);
assert(catalog.filter(p,{q:'Steel Research International 2014'}).every(p=>p.year===2014&&p.journal==='Steel Research International'));
assert(catalog.filter(p,{view:'high'}).every(p=>p.featured));assert.equal(catalog.filter(p,{cover:true}).length,0);assert.equal(catalog.filter(p,{q:'no-such-publication-xyz'}).length,0);
for(const c of data.publicationCategories)assert(catalog.filter(p,{theme:c.id}).every(p=>p.categories.includes(c.id)));
for(const who of data.faculty)assert(catalog.filter(p,{person:who.id}).every(p=>p.personIds.includes(who.id)));
assert(catalog.filter(p,{theme:'carbon',person:'zhu',year:2014}).length>0);
const sorted=catalog.filter(p);assert(sorted.every((x,i)=>!i||Number(sorted[i-1].year)>=Number(x.year)));
function render(page,language='zh',search=''){
 const nodes=new Map();const node=id=>{if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',hidden:false,setAttribute(){},scrollIntoView(){}});return nodes.get(id);};
 const document={body:{dataset:{page,id:page==='profile'?'zhu':'converter'}},documentElement:{},getElementById:node,querySelectorAll:()=>[]};
 const context=vm.createContext({console,URL,URLSearchParams,PublicationCatalog:catalog,document,localStorage:{getItem:()=>language},location:{search,href:'https://example.test/'+page+'.html'+search},history:{replaceState(){}}});context.window=context;
 for(const file of ['content.js','updates.js','cms-data.js','explorer.js'])vm.runInContext(fs.readFileSync(path.join(root,'dist',file),'utf8'),context,{filename:file});
 const site=fs.readFileSync(path.join(root,'dist/site.js'),'utf8');vm.runInContext(site.slice(0,site.indexOf("const menu=document.getElementById('menu')")),context,{filename:'site.js'});
 vm.runInContext('render()',context);return {context,nodes,main:node('main').innerHTML};
}
for(const language of ['zh','en'])for(const page of ['home','about','research','research-detail','publications','people','students','staff','alumni','profile','results','awards','platforms','contact']){const r=render(page,language);assert(r.main.length>100);assert(!r.main.includes('undefined'));}
const r=render('publications','en','?theme=carbon&person=zhu&year=2014');assert(r.nodes.get('paper-list').innerHTML.includes('paper-001'));assert(!r.nodes.get('paper-list').innerHTML.includes('paper-014'));assert(r.nodes.get('paper-count').textContent.includes('Found 1'));
r.nodes.get('paper-search').oninput({target:{value:'nonexistent'}});assert(r.nodes.get('paper-list').innerHTML.includes('No matching papers'));
r.nodes.get('paper-reset').onclick();assert(r.nodes.get('paper-count').textContent.includes('Found 18'));
r.nodes.get('paper-cover').onchange({target:{checked:true}});assert(r.nodes.get('paper-count').textContent.includes('Found 0'));
const people=render('people');assert(people.main.includes('group-leader'));assert.equal((people.main.match(/data-member-open=/g)||[]).length,6);assert(people.main.includes('profile-dong.html'));assert(people.main.includes('publications.html?person=zhu'));
assert.equal((render('staff').main.match(/data-member-open=/g)||[]).length,4);assert.equal((render('students').main.match(/data-member-open=/g)||[]).length,data.students.length);assert(render('students').main.includes('演示照片'));assert(render('alumni').main.includes('演示照片'));assert(render('home').main.includes('https://sklam.ustb.edu.cn/'));assert(render('home').main.includes('lab-official-logo.png'));assert(render('profile').main.includes('scholar.google.com'));
const escaped=vm.runInContext(`publicationRow({id:'safe',title:{zh:'<script>alert(1)</script>',en:'safe'},authors:'<img src=x>',journal:'J',citation:'<b>text</b>',categories:[],year:2026,abstract:{zh:''}})`,people.context);assert(!escaped.includes('<script>'));assert(escaped.includes('&lt;script&gt;'));
for(const file of fs.readdirSync(path.join(root,'dist')).filter(x=>x.endsWith('.html'))){const html=fs.readFileSync(path.join(root,'dist',file),'utf8');for(const match of html.matchAll(/(?:src|href)="([^"#?]+)(?:[?#][^"]*)?"/g)){if(/^(?:https?:|mailto:)/.test(match[1]))continue;assert(fs.existsSync(path.join(root,'dist',match[1])),file+' references missing '+match[1]);}}
for(const paper of p){assert(paper.scholarUrl.startsWith('https://scholar.google.com/scholar?q='));assert.equal(new URL(paper.scholarUrl).searchParams.get('q'),'"'+paper.title.en+'"');}
const external=vm.runInContext(`publicationRow({...cms.publications[0],url:'https://example.org/paper'})`,people.context);assert(external.includes('https://example.org/paper'));assert(external.includes('Google Scholar'));assert(external.includes('target="_blank"'));
console.log('Passed search, combined filters, sorting, reset, bilingual rendering, member links, escaping and page dependencies. Visual browser QA pending.');
