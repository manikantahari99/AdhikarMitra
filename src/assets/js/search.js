// search.js - search input, filtering logic, and category selection (T032, T033, T034)
/* global DataStore, Renderer */
(function(){
  let allAuthorities = [];
  let activeCategory = null;
  let activeScope = 'all'; // 'all', 'state', or 'central'
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

  function initScopeFilters(){
    const scopeButtons = document.querySelectorAll('.scope-filter-btn');
    scopeButtons.forEach(btn => {
      btn.addEventListener('click', ()=>{
        // Remove active class from all buttons
        scopeButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        // Update active scope
        activeScope = btn.getAttribute('data-scope');
        applyFilters();
      });
    });
  }

  function applyFilters(){
    const term = ($(searchInputId)?.value || '').trim().toLowerCase();
    let filtered = allAuthorities;
    
    // Filter by scope (State/Central)
    if(activeScope !== 'all'){
      filtered = filtered.filter(a => a.scope === activeScope);
    }
    
    // Filter by category
    if(activeCategory){
      filtered = filtered.filter(a=>a.category === activeCategory);
    }
    
    // Filter by search term
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
    initScopeFilters(); // Initialize scope filter buttons
    document.addEventListener('category:selected', e=>{
      activeCategory = e.detail.id;
      applyFilters();
    });
    // Initialize router (T040)
    if(window.Router){
      Router.init(allAuthorities);
    }
  }

  document.addEventListener('DOMContentLoaded', bootstrap);
})();
