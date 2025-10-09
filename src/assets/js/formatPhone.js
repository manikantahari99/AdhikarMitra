// Phone formatting utility (T024)
// Formats phone contacts according to simple rules defined in data-model.
// Exported as UMD-ish: attaches to window.FormatPhone if in browser.
(function(root){
  function normalizeDigits(raw){
    return (raw||"").replace(/[^0-9+]/g, "");
  }
  function isLikelyMobile(d){ return /^\d{10}$/.test(d); }
  function format(raw, type, stdCode){
    if(!raw) return "";
    const digits = normalizeDigits(raw);
    if(type === 'landline' && stdCode){
      const std = normalizeDigits(stdCode);
      return `(${std}) ${digits.replace(new RegExp('^'+std), '')}`;
    }
    if(isLikelyMobile(digits)){
      return '+91-' + digits.substring(0,5) + '-' + digits.substring(5);
    }
    return digits; // fallback raw digits (tollfree/short codes etc.)
  }
  function formatContact(contact){
    if(!contact) return '';
    return format(contact.raw, contact.type, contact.stdCode);
  }
  function formatAll(contacts){
    return (contacts||[]).map(formatContact);
  }
  const api = { formatContact, formatAll };
  if(typeof module !== 'undefined' && module.exports){ module.exports = api; } else { root.FormatPhone = api; }
})(this);
