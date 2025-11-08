// router.js - Hash-based routing (T040)
/* global Renderer */
const Router = (function(){
  let authorityData = [];

  function parseHash(){
    const hash = window.location.hash.slice(1);
    if(!hash) return { view: 'list' };
    const parts = hash.split('/');
    if(parts[0] === 'authority' && parts[1]){
      return { view: 'detail', id: parts[1] };
    }
    return { view: 'list' };
  }

  function navigate(){
    const route = parseHash();
    if(route.view === 'detail'){
      const auth = authorityData.find(a=>a.id === route.id);
      if(auth){
        Renderer.renderDetailPage(auth);
        scrollToTop();
      } else {
        showNotFound();
      }
    } else {
      Renderer.showListView();
    }
  }

  function scrollToTop(){
    window.scrollTo({ top:0, behavior:'smooth' });
  }

  function showNotFound(){
    // fallback to list
    window.location.hash = '';
  }

  function goToDetail(id){
    window.location.hash = `#authority/${id}`;
  }

  function goToList(){
    window.location.hash = '';
  }

  function init(data){
    authorityData = data;
    window.addEventListener('hashchange', navigate);
    navigate(); // initial route
  }

  return { init, goToDetail, goToList, navigate };
})();
