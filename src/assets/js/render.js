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
        // Remove active class from all category buttons
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        document.dispatchEvent(new CustomEvent('category:selected',{ detail:{ id: cat.id } }));
      });
      li.appendChild(btn);
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  function buildAuthorityCard(a){
    const li = el('li','authority-item');
    li.setAttribute('role','button');
    li.setAttribute('tabindex','0');
    
    const title = el('h3','authority-name',a.name);
    li.appendChild(title);
    
    const meta = el('div','authority-meta');
    
    // Prominent scope badge (State/Central)
    if(a.scope){
      const scopeBadge = el('span',`badge scope ${a.scope}`, a.scope === 'state' ? '🏛️ State' : '🇮🇳 Central');
      meta.appendChild(scopeBadge);
    }
    
    const cat = el('span','badge category',a.category);
    meta.appendChild(cat);
    
    // Phone display
    if(a.contact && a.contact.phone){
      const phone = el('span','primary-phone',a.contact.phone);
      meta.appendChild(phone);
    } else if(a.primaryContacts && a.primaryContacts.length){
      const first = a.primaryContacts[0];
      const formatted = (window.FormatPhone?FormatPhone.formatContact(first):first.raw);
      const phone = el('span','primary-phone',formatted);
      meta.appendChild(phone);
    }
    
    li.appendChild(meta);
    
    // Action buttons container
    const actions = el('div','authority-actions');
    
    // Primary action: Open website (for new schema with website field)
    if(a.website){
      const websiteBtn = el('a','btn-website','🌐 Visit Website');
      websiteBtn.href = a.website;
      websiteBtn.target = '_blank';
      websiteBtn.rel = 'noopener noreferrer';
      websiteBtn.setAttribute('aria-label', `Visit ${a.name} website`);
      websiteBtn.addEventListener('click', (e)=>{
        e.stopPropagation(); // Prevent card click
      });
      actions.appendChild(websiteBtn);
    }
    
    // Secondary action: View details
    const detailBtn = el('button','btn-details','📋 View Details');
    detailBtn.type = 'button';
    detailBtn.setAttribute('aria-label', `View details for ${a.name}`);
    detailBtn.addEventListener('click', (e)=>{
      e.stopPropagation(); // Prevent card click
      if(window.Router) Router.goToDetail(a.id);
    });
    actions.appendChild(detailBtn);
    
    li.appendChild(actions);
    
    // Card click behavior: Open website if available, otherwise go to detail
    function handleCardClick(){
      if(a.website){
        window.open(a.website, '_blank', 'noopener,noreferrer');
      } else if(window.Router) {
        Router.goToDetail(a.id);
      }
    }
    
    li.addEventListener('click', handleCardClick);
    li.addEventListener('keydown', e=>{
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        handleCardClick();
      }
    });
    
    return li;
  }

  function renderAuthorityList(authorities, showPrompt = false){
    const section = document.getElementById('results');
    if(!section) return;
    
    let list = section.querySelector('ul.authority-list');
    if(list) {
      list.innerHTML='';
    } else { 
      list = el('ul','authority-list'); 
      list.setAttribute('role','list'); 
      section.appendChild(list);
    }
    
    // If showPrompt is true and no authorities, show selection prompt
    if(showPrompt && authorities.length === 0){
      const promptDiv = el('div', 'selection-prompt');
      promptDiv.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;"><strong>👆 Select a category above or use search to find departments</strong></p>';
      list.appendChild(promptDiv);
      const countEl = document.getElementById('results-count');
      if(countEl) countEl.textContent = '0';
      toggleNoResults(false); // Don't show "no results" message
      return;
    }
    
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

  function showListView(){
    const detail = document.getElementById('detail-container');
    const list = document.getElementById('results');
    const search = document.getElementById('search');
    const cats = document.getElementById('categories');
    if(detail) detail.hidden = true;
    if(list) list.hidden = false;
    if(search) search.hidden = false;
    if(cats) cats.hidden = false;
  }

  function renderDetailPage(auth){
    const app = document.getElementById('app');
    // hide list views
    const list = document.getElementById('results');
    const search = document.getElementById('search');
    const cats = document.getElementById('categories');
    if(list) list.hidden = true;
    if(search) search.hidden = true;
    if(cats) cats.hidden = true;
    
    let detailContainer = document.getElementById('detail-container');
    if(!detailContainer){
      detailContainer = el('section','detail-container');
      detailContainer.id = 'detail-container';
      app.appendChild(detailContainer);
    }
    detailContainer.hidden = false;
    detailContainer.innerHTML = '';
    
    // Back button
    const backBtn = el('button','btn-back','← Back to List');
    backBtn.type='button';
    backBtn.addEventListener('click',()=>{ if(window.Router) Router.goToList(); });
    detailContainer.appendChild(backBtn);
    
    // Authority header
    const header = el('header','detail-header');
    const name = el('h2','detail-name',auth.name);
    header.appendChild(name);
    const metaRow = el('div','detail-meta');
    metaRow.appendChild(el('span','badge category',auth.category));
    metaRow.appendChild(el('span','badge scope',auth.scope));
    header.appendChild(metaRow);
    detailContainer.appendChild(header);
    
    // Description
    if(auth.description){
      const desc = el('p','detail-description',auth.description);
      detailContainer.appendChild(desc);
    }
    
    // Primary contacts
    if(auth.primaryContacts && auth.primaryContacts.length){
      const contactSection = el('section','detail-section');
      contactSection.appendChild(el('h3','section-heading','Primary Contacts'));
      const contactList = el('ul','contact-list');
      contactList.setAttribute('role','list');
      auth.primaryContacts.forEach(c=>{
        const li = el('li','contact-item');
        const formatted = window.FormatPhone ? FormatPhone.formatContact(c) : c.raw;
        const phoneText = el('span','contact-phone',formatted);
        li.appendChild(phoneText);
        if(c.label){
          const label = el('span','contact-label',`(${c.label})`);
          li.appendChild(label);
        }
        // Copy button (T043)
        const copyBtn = el('button','btn-copy','Copy');
        copyBtn.type='button';
        copyBtn.setAttribute('aria-label',`Copy ${formatted}`);
        copyBtn.addEventListener('click',()=>{
          copyToClipboard(c.raw, copyBtn);
        });
        li.appendChild(copyBtn);
        contactList.appendChild(li);
      });
      contactSection.appendChild(contactList);
      detailContainer.appendChild(contactSection);
    }
    
    // Last verified (T044)
    if(auth.lastVerified){
      const verifiedSection = el('section','detail-section verified-section');
      const dateStr = formatLastVerified(auth.lastVerified);
      verifiedSection.appendChild(el('p','verified-text',`Verified: ${dateStr}`));
      detailContainer.appendChild(verifiedSection);
    }
    
    // Escalation path (future T050–T053)
    if(auth.escalation && auth.escalation.length){
      const escSection = el('section','detail-section escalation-section');
      escSection.appendChild(el('h3','section-heading','Escalation Path'));
      const escList = el('ol','escalation-list');
      auth.escalation.forEach(step=>{
        const li = el('li','escalation-item',`${step.role}: ${step.contact}`);
        escList.appendChild(li);
      });
      escSection.appendChild(escList);
      detailContainer.appendChild(escSection);
    }
  }

  function formatLastVerified(isoDate){
    try {
      const d = new Date(isoDate);
      const opts = { day: 'numeric', month: 'short', year: 'numeric' };
      return d.toLocaleDateString('en-IN', opts);
    } catch(e){
      return isoDate;
    }
  }

  function copyToClipboard(text, btn){
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(()=>{
        showCopyFeedback(btn);
      }).catch(e=>{
        console.warn('Clipboard write failed', e);
        fallbackCopy(text, btn);
      });
    } else {
      fallbackCopy(text, btn);
    }
  }

  function fallbackCopy(text, btn){
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position='fixed';
    ta.style.opacity='0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showCopyFeedback(btn);
    } catch(e){
      console.warn('Fallback copy failed', e);
    }
    document.body.removeChild(ta);
  }

  function showCopyFeedback(btn){
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(()=>{
      btn.textContent = orig;
      btn.classList.remove('copied');
    }, 1200);
  }

  return { renderCategories, renderAuthorityList, toggleNoResults, renderDetailPage, showListView };
})();
