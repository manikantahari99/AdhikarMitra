// render.js - DOM rendering helpers (T030, T035)
/* global DataStore, FormatPhone */
const Renderer = (function(){
  function el(tag, cls, text){ const e=document.createElement(tag); if(cls) e.className=cls; if(text) e.textContent=text; return e; }

  function renderCategories(list){
    const container = document.getElementById('categories');
    const existing = container.querySelector('.category-list');
    if(existing) existing.remove();
    const ul = el('ul','category-list');
    ul.setAttribute('role','list');
    list.sort((a,b)=>(a.order||999)-(b.order||999)).forEach(cat=>{
      const li = el('li','category-item');
      const btn = el('button','category-btn',cat.name);
      btn.type='button';
      btn.setAttribute('data-category',cat.id);
      btn.addEventListener('click',()=>{
        document.dispatchEvent(new CustomEvent('category:selected',{ detail:{ id: cat.id } }));
      });
      li.appendChild(btn);
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  function buildAuthorityCard(a){
    const li = el('li','authority-item');
    const title = el('h3','authority-name',a.name);
    li.appendChild(title);
    const meta = el('div','authority-meta');
    const cat = el('span','badge category',a.category);
    const scope = el('span','badge scope',a.scope);
    meta.appendChild(cat); meta.appendChild(scope);
    if(a.primaryContacts && a.primaryContacts.length){
      const first = a.primaryContacts[0];
      const formatted = (window.FormatPhone?FormatPhone.formatContact(first):first.raw);
      const phone = el('span','primary-phone',formatted);
      meta.appendChild(phone);
    }
    li.appendChild(meta);
    li.addEventListener('click',()=>{
      // future routing (T040)
      console.log('Authority selected', a.id);
    });
    return li;
  }

  function renderAuthorityList(authorities){
    const section = document.getElementById('results');
    if(!section) return;
    let list = section.querySelector('ul.authority-list');
    if(list) list.innerHTML=''; else { list = el('ul','authority-list'); list.setAttribute('role','list'); section.appendChild(list); }
    authorities.forEach(a=> list.appendChild(buildAuthorityCard(a)) );
    const countEl = document.getElementById('results-count');
    if(countEl) countEl.textContent = authorities.length.toString();
    toggleNoResults(authorities.length === 0);
  }

  function toggleNoResults(show){
    const nr = document.getElementById('no-results');
    if(!nr) return;
    nr.hidden = !show;
  }

  return { renderCategories, renderAuthorityList, toggleNoResults };
})();
