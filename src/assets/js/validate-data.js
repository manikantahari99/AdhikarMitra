// Data validation script (T023)
// Run in browser console after including via a <script> tag OR adapt for Node.
(function(root){
  async function loadJson(path){
    if(typeof fetch !== 'undefined'){
      const r = await fetch(path);
      if(!r.ok) throw new Error('Failed to load ' + path + ' ' + r.status);
      return r.json();
    } else {
      // Node fallback (basic)
      const fs = require('fs');
      return JSON.parse(fs.readFileSync(path, 'utf8'));
    }
  }
  function assert(cond, msg, issues){ if(!cond) issues.push(msg); }
  function isoToday(){ return new Date().toISOString().split('T')[0]; }
  async function validate(){
    const issues = [];
    const categories = await loadJson('src/data/categories.json');
    const authorities = await loadJson('src/data/authorities.state.json');
    const categorySet = new Set(categories.map(c=>c.id));
    const idSet = new Set();
    authorities.forEach(a=>{
      assert(a.id, 'Missing id', issues);
      assert(!idSet.has(a.id), 'Duplicate id: '+a.id, issues); idSet.add(a.id);
      assert(categorySet.has(a.category), 'Unknown category: '+a.category, issues);
      assert(Array.isArray(a.primaryContacts) && a.primaryContacts.length>0, 'No primaryContacts for '+a.id, issues);
      if(a.lastVerified){
        const today = new Date();
        const d = new Date(a.lastVerified);
        assert(!isNaN(d.getTime()), 'Invalid lastVerified date for '+a.id, issues);
        assert(d.getTime() <= today.getTime(), 'Future lastVerified date for '+a.id, issues);
      } else {
        issues.push('Missing lastVerified for '+a.id);
      }
    });
    if(issues.length){
      console.group('Validation FAILED');
      issues.forEach(i=>console.error(i));
      console.groupEnd();
    } else {
      console.log('All validations passed');
    }
  }
  root.runDataValidation = validate;
  if(typeof module !== 'undefined' && module.exports){ module.exports = { validate }; }
})(this);
