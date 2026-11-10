/* Shared publication filtering, also exercised by the Node checks. */
(function(root){
 const normalize=value=>String(value||'').normalize('NFKC').replace(/₂/g,'2').toLowerCase();
 function filter(items,state={}){const terms=normalize(state.q).trim().split(/\s+/).filter(Boolean);return items.filter(p=>(state.view!=='high'||p.featured)&&(!state.cover||p.cover)&&(!state.theme||p.categories.includes(state.theme))&&(!state.person||p.personIds.includes(state.person))&&(!state.year||String(p.year)===String(state.year))&&(!state.journal||p.journal===state.journal)&&terms.every(term=>normalize([p.title.zh,p.title.en,p.authors,p.journal,p.citation,p.year,...(p.peopleNames||[])].join(' ')).includes(term))).sort((a,b)=>(Number(b.year)||0)-(Number(a.year)||0)||a._order-b._order);}
 const api={filter};if(typeof module!=='undefined')module.exports=api;else root.PublicationCatalog=api;
})(typeof window==='undefined'?globalThis:window);
