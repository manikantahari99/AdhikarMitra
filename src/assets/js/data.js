// data.js - loading & caching for categories and authorities (T030, T031)
const DataStore = (function(){
  let categories = null;
  let authorities = null;
  async function loadCategories(){
    if(categories) return categories;
    const res = await fetch('data/categories.json');
    categories = await res.json();
    return categories;
  }
  async function loadAuthoritiesState(){
    if(authorities) return authorities;
    const res = await fetch('data/authorities.state.json');
    authorities = await res.json();
    return authorities;
  }
  return { loadCategories, loadAuthoritiesState };
})();
