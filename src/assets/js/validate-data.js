// Data validation script (T002 - Feature 002 extensions)
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
  
  // Feature 002 validation patterns
  const PATTERNS = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.gov\.in$/,
    phone: /^(\d{10}|\d{4}-\d{7})$/,
    httpsUrl: /^https:\/\/[a-zA-Z0-9.-]+\.[a-z]{2,}(\/.*)?$/,
    authorityId: /^[a-z0-9-]{3,50}$/,
    isoDate: /^\d{4}-\d{2}-\d{2}$/
  };
  
  // Official AP districts (26 as of 2024)
  const AP_DISTRICTS = [
    "Alluri Sitharama Raju", "Anakapalli", "Ananthapuramu", "Annamayya", "Bapatla",
    "Chittoor", "Dr. B.R. Ambedkar Konaseema", "East Godavari", "Eluru", "Guntur",
    "Kakinada", "Krishna", "Kurnool", "Nandyal", "NTR", "Palnadu",
    "Parvathipuram Manyam", "Prakasam", "Sri Potti Sriramulu Nellore", "Sri Sathya Sai",
    "Srikakulam", "Tirupati", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"
  ];
  
  async function validate(){
    const issues = [];
    const warnings = [];
    
    try {
      const categories = await loadJson('src/data/categories.json');
      const authorities = await loadJson('src/data/authorities.state.json');
      
      // File size check (Feature 002 - T002)
      const authJson = JSON.stringify(authorities);
      const authSize = new Blob([authJson]).size;
      const maxSize = 500 * 1024; // 500 KB
      assert(authSize <= maxSize, `authorities.state.json size ${(authSize/1024).toFixed(2)} KB exceeds ${(maxSize/1024)} KB limit`, issues);
      
      const categorySet = new Set(categories.map(c=>c.id));
      const idSet = new Set();
      const today = new Date();
      
      authorities.forEach(a=>{
        const prefix = `[${a.id || 'unknown'}]`;
        
        // Core validations
        assert(a.id, `${prefix} Missing id`, issues);
        assert(PATTERNS.authorityId.test(a.id), `${prefix} Invalid id format (must be kebab-case, 3-50 chars)`, issues);
        assert(!idSet.has(a.id), `${prefix} Duplicate id: ${a.id}`, issues); 
        idSet.add(a.id);
        
        assert(a.name && a.name.length >= 5 && a.name.length <= 100, `${prefix} Name must be 5-100 chars`, issues);
        assert(categorySet.has(a.category), `${prefix} Unknown category: ${a.category}`, issues);
        
        // Description validation (Feature 002)
        if (a.description) {
          assert(a.description.length >= 100 && a.description.length <= 300, 
            `${prefix} Description must be 100-300 chars (current: ${a.description.length})`, issues);
        }
        
        // Contact validations (Feature 002 - T002)
        if (a.contact) {
          // Email validation
          if (a.contact.email) {
            assert(PATTERNS.email.test(a.contact.email), 
              `${prefix} Invalid email format or non-.gov.in domain: ${a.contact.email}`, issues);
          } else {
            warnings.push(`${prefix} Missing primary email`);
          }
          
          // Phone validation
          if (a.contact.phone) {
            assert(PATTERNS.phone.test(a.contact.phone), 
              `${prefix} Invalid phone format (must be 10 digits or 04xx-xxxxxxx): ${a.contact.phone}`, issues);
          } else {
            warnings.push(`${prefix} Missing primary phone`);
          }
          
          // Grievance email validation (Feature 002)
          if (a.contact.grievanceEmail) {
            assert(PATTERNS.email.test(a.contact.grievanceEmail), 
              `${prefix} Invalid grievance email format: ${a.contact.grievanceEmail}`, issues);
            assert(a.contact.grievanceEmail !== a.contact.email, 
              `${prefix} Grievance email must differ from primary email`, issues);
          }
          
          // Helpline validation (Feature 002)
          if (a.contact.helpline) {
            assert(/^(\d{10}|1800-\d{3}-\d{4})$/.test(a.contact.helpline), 
              `${prefix} Invalid helpline format (must be 10 digits or 1800-xxx-xxxx): ${a.contact.helpline}`, issues);
          }
        } else if (a.primaryContacts) {
          // Legacy format support
          assert(Array.isArray(a.primaryContacts) && a.primaryContacts.length>0, 
            `${prefix} No primaryContacts`, issues);
        } else {
          issues.push(`${prefix} Missing contact information`);
        }
        
        // Website validation (Feature 002 - T002)
        if (a.website) {
          assert(PATTERNS.httpsUrl.test(a.website), 
            `${prefix} Website must use HTTPS: ${a.website}`, issues);
        }
        
        if (a.departmentWebsite) {
          assert(PATTERNS.httpsUrl.test(a.departmentWebsite), 
            `${prefix} Department website must use HTTPS: ${a.departmentWebsite}`, issues);
        }
        
        // District validation (Feature 002 - T002)
        if (a.district !== null && a.district !== undefined) {
          assert(AP_DISTRICTS.includes(a.district), 
            `${prefix} Invalid district name: ${a.district}. Must match official AP district list.`, issues);
        }
        
        // Parent department validation (Feature 002 - T002)
        if (a.parentDepartment) {
          assert(typeof a.parentDepartment === 'string' && a.parentDepartment.length > 0, 
            `${prefix} Invalid parentDepartment format`, issues);
          // Note: Cross-reference validation happens after all IDs are collected
        }
        
        // Date validation (Feature 002 - T002)
        if(a.lastVerified){
          assert(PATTERNS.isoDate.test(a.lastVerified), 
            `${prefix} Invalid lastVerified date format (must be YYYY-MM-DD): ${a.lastVerified}`, issues);
          const d = new Date(a.lastVerified);
          assert(!isNaN(d.getTime()), `${prefix} Invalid lastVerified date: ${a.lastVerified}`, issues);
          assert(d.getTime() <= today.getTime(), `${prefix} Future lastVerified date: ${a.lastVerified}`, issues);
        } else {
          warnings.push(`${prefix} Missing lastVerified date`);
        }
      });
      
      // Cross-reference validation for parentDepartment (Feature 002 - T002)
      authorities.forEach(a => {
        if (a.parentDepartment && !idSet.has(a.parentDepartment)) {
          issues.push(`[${a.id}] Parent department '${a.parentDepartment}' does not exist in authorities array`);
        }
      });
      
      // Summary statistics
      const stats = {
        totalAuthorities: authorities.length,
        totalCategories: categories.length,
        fileSizeKB: (authSize / 1024).toFixed(2),
        stateLevelCount: authorities.filter(a => !a.district).length,
        districtLevelCount: authorities.filter(a => a.district).length,
        withGrievanceEmail: authorities.filter(a => a.contact?.grievanceEmail).length,
        withWebsite: authorities.filter(a => a.website).length
      };
      
      console.group('📊 Validation Report');
      console.log(`Total Authorities: ${stats.totalAuthorities}`);
      console.log(`Total Categories: ${stats.totalCategories}`);
      console.log(`File Size: ${stats.fileSizeKB} KB (limit: 500 KB)`);
      console.log(`State-level: ${stats.stateLevelCount}, District-level: ${stats.districtLevelCount}`);
      console.log(`With Grievance Email: ${stats.withGrievanceEmail} (${(stats.withGrievanceEmail/stats.totalAuthorities*100).toFixed(1)}%)`);
      console.log(`With Website: ${stats.withWebsite} (${(stats.withWebsite/stats.totalAuthorities*100).toFixed(1)}%)`);
      console.groupEnd();
      
      if(warnings.length > 0) {
        console.group(`⚠️ ${warnings.length} Warnings`);
        warnings.forEach(w=>console.warn(w));
        console.groupEnd();
      }
      
      if(issues.length > 0){
        console.group(`❌ Validation FAILED (${issues.length} errors)`);
        issues.forEach(i=>console.error(i));
        console.groupEnd();
        return false;
      } else {
        console.log('✅ All validations passed!');
        return true;
      }
      
    } catch (error) {
      console.error('❌ Validation failed with error:', error);
      return false;
    }
  }
  
  root.runDataValidation = validate;
  if(typeof module !== 'undefined' && module.exports){ module.exports = { validate }; }
})(this);
