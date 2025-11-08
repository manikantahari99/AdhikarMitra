// search.js - search input, filtering logic, and category selection (T032, T033, T034)
/* global DataStore, Renderer */
(function(){
  let allAuthorities = [];
  let allCategories = [];
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
        // Reset active category when switching scope
        activeCategory = null;
        // Update categories display based on new scope
        updateCategoriesForScope();
        // Clear results until user selects a category or searches
        applyFilters();
      });
    });
  }

  function updateCategoriesForScope(){
    // Filter categories based on scope
    let filteredCategories = allCategories;
    
    if(activeScope === 'state'){
      // For state: show only state-related categories
      // Exclude: emergency-services, independent-bodies, central-admin, central-public-services
      const centralOnlyCategories = ['emergency-services', 'independent-bodies', 'central-admin', 'central-public-services'];
      filteredCategories = allCategories.filter(cat => !centralOnlyCategories.includes(cat.id));
    } else if(activeScope === 'central'){
      // For central: show only central-related categories
      // Include: emergency-services, independent-bodies, central-admin, central-public-services
      const centralCategories = ['emergency-services', 'independent-bodies', 'central-admin', 'central-public-services'];
      filteredCategories = allCategories.filter(cat => centralCategories.includes(cat.id));
    }
    // For 'all' scope, show all categories
    
    Renderer.renderCategories(filteredCategories);
  }

  function applyFilters(){
    const input = $(searchInputId);
    const term = (input?.value || '').trim().toLowerCase();
    let filtered = allAuthorities;
    
    // If no category selected and no search term, show empty state message
    if(!activeCategory && !term){
      Renderer.renderAuthorityList([], true); // true = show selection prompt
      return;
    }
    
    // Filter by scope (State/Central)
    if(activeScope !== 'all'){
      filtered = filtered.filter(a => a.scope === activeScope);
    }
    
    // Filter by category (only if a category is selected)
    if(activeCategory){
      filtered = filtered.filter(a=>a.category === activeCategory);
    }
    
    // Filter by search term
    if(term){
      filtered = filtered.filter(a=>{
        const searchableText = [
          a.name,
          a.category,
          a.description || '',
          a.contact?.email || '',
          a.contact?.phone || '',
          a.grievanceEmail || '',
          a.helpline || ''
        ].join(' ').toLowerCase();
        return searchableText.includes(term);
      });
    }
    
    Renderer.renderAuthorityList(filtered);
  }

  async function bootstrap(){
    allCategories = await DataStore.loadCategories();
    updateCategoriesForScope(); // Initial render with 'all' scope
    allAuthorities = await DataStore.loadAuthoritiesState();
    applyFilters(); // Will show empty state initially
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
