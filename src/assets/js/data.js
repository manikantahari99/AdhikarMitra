// data.js - loading & caching for categories and authorities (T030, T031)
const DataStore = (function(){
  let categories = null;
  let authorities = null;
  
  async function loadCategories(){
    if(categories) return categories;
    const cacheBuster = '?v=' + Date.now();
    const res = await fetch('data/categories.json' + cacheBuster);
    if (!res.ok) throw new Error(`Failed to load categories: ${res.status}`);
    categories = await res.json();
    return categories;
  }
  
  async function loadAuthoritiesState(){
    if(authorities) return authorities;
    // Cache-busting to ensure fresh data
    const cacheBuster = '?v=' + Date.now();
    const res = await fetch('data/authorities.state.json' + cacheBuster);
    if (!res.ok) throw new Error(`Failed to load authorities: ${res.status}`);
    authorities = await res.json();
    return authorities;
  }
  
  return { loadCategories, loadAuthoritiesState };
})();
