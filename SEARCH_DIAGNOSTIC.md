# Search Functionality Diagnostic

## Current Status
The search code is implemented correctly and SHOULD be working. This document helps diagnose issues.

## How to Test Search

### Test 1: Basic Search (No Category Selected)
1. Open http://localhost:8120/src/index.html
2. Without clicking any category, type "health" in the search box
3. **Expected**: Should show all health-related departments
4. **If not working**: Check browser console for errors (F12)

### Test 2: Category Selection
1. Refresh the page
2. Click on any category button (e.g., "Education & Skill Development")
3. **Expected**: Should show all authorities in that category
4. **If not working**: Check if category buttons have event listeners

### Test 3: Search Within Category
1. Click a category
2. Type in search box to filter within that category
3. **Expected**: Should filter the category results
4. **If not working**: Check console for filter errors

### Test 4: Scope Filtering
1. Click "State Government" tab
2. Select a category or search
3. **Expected**: Should only show state authorities
4. Repeat with "Central Government"

## Common Issues & Solutions

### Issue 1: Data Not Loading
**Symptoms**: No categories appear, search returns nothing
**Solution**: 
- Check browser console for 404 errors on JSON files
- Verify files exist: `src/data/categories.json` and `src/data/authorities.state.json`
- Check if server is running on port 8120

### Issue 2: Browser Cache
**Symptoms**: Changes not appearing, old behavior persists
**Solution**:
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Open DevTools (F12) → Network tab → Check "Disable cache"
- Clear browser cache completely

### Issue 3: JavaScript Errors
**Symptoms**: Search input doesn't respond, no filtering
**Solution**:
- Open browser console (F12)
- Look for red error messages
- Check if all JS files loaded successfully

## Debug Mode

To enable detailed logging:
1. Open `src/assets/js/search.js`
2. Add console.log statements in:
   - `initSearch()` - to verify event listener setup
   - `applyFilters()` - to see filter execution
   - `bootstrap()` - to verify data loading

Example:
```javascript
function applyFilters(){
  const term = ($(searchInputId)?.value || '').trim().toLowerCase();
  console.log('Search term:', term);
  console.log('Total authorities:', allAuthorities.length);
  // ... rest of function
}
```

## Expected Behavior

### Initial Page Load:
- Message: "👆 Select a category above or use search to find departments"
- No authorities listed
- All category buttons visible
- Search box ready

### When Typing in Search:
- Debounced (200ms delay)
- Searches across: name, category, description, email, phone, grievanceEmail, helpline
- Case-insensitive
- Shows matching results immediately

### When Clicking Category:
- Filters to show only authorities in that category
- Category button gets "active" class
- Search box still works to filter within category

## Technical Details

### Search Implementation:
- File: `src/assets/js/search.js`
- Function: `applyFilters()`
- Debounce: 200ms
- Search fields: name, category, description, contact.email, contact.phone, grievanceEmail, helpline

### Data Sources:
- Categories: `src/data/categories.json` (21 categories)
- Authorities: `src/data/authorities.state.json` (1706 lines, ~100+ authorities)

### Dependencies:
- DataStore (data.js) - loads JSON files
- Renderer (render.js) - displays results
- Router (router.js) - handles navigation

## Manual Verification

Open browser console and run:
```javascript
// Check if data loaded
console.log('Categories:', window.DataStore ? 'Available' : 'Missing');

// Check if search initialized
console.log('Search input:', document.getElementById('search-input'));

// Test search manually
document.getElementById('search-input').value = 'health';
document.getElementById('search-input').dispatchEvent(new Event('input'));
```

## Next Steps if Still Not Working

1. Check browser console for any errors
2. Verify all JS files load (Network tab in DevTools)
3. Test with different browsers
4. Check if any browser extensions are interfering
5. Try incognito/private browsing mode
