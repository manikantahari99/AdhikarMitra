// search.js - search input, filtering logic, and category selection (T032, T033, T034)
/* global DataStore, Renderer */
(function(){
  let allAuthorities = [];
  let activeCategory = null;
  const searchInputId = 'search-input';
  let debounceTimer = null;

  function $(id){ return document.getElementById(id); }

  function initSearch(){
    const input = $(searchInputId);
    if(!input) return;
    input.addEventListener('input', ()=>{
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(applyFilters, 200);
    });
  }

  function applyFilters(){
    const term = ($(searchInputId)?.value || '').trim().toLowerCase();
    let filtered = allAuthorities;
    if(activeCategory){
      filtered = filtered.filter(a=>a.category === activeCategory);
    }
    if(term){
      filtered = filtered.filter(a=>{
        return a.name.toLowerCase().includes(term) || a.category.toLowerCase().includes(term);
      });
    }
    Renderer.renderAuthorityList(filtered);
  }

  async function bootstrap(){
    const cats = await DataStore.loadCategories();
    Renderer.renderCategories(cats);
    allAuthorities = await DataStore.loadAuthoritiesState();
    applyFilters();
    initSearch();
    document.addEventListener('category:selected', e=>{
      activeCategory = e.detail.id;
      applyFilters();
    });
  }

  document.addEventListener('DOMContentLoaded', bootstrap);
})();
