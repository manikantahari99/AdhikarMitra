# Search Debug Instructions

## I've added comprehensive logging to help diagnose the search issue.

### How to Debug:

1. **Open the application**: `http://localhost:8120/src/index.html`

2. **Open Browser Console**: Press `F12` or Right-click → Inspect → Console tab

3. **Watch for log messages** - You should see:
   ```
   [DataStore] Fetching categories.json...
   [DataStore] Categories loaded: 21
   [DataStore] Fetching authorities.state.json...
   [DataStore] Authorities loaded: [number]
   [Search] Bootstrap starting...
   [Search] Categories loaded: { count: 21 }
   [Search] Authorities loaded: { count: [number] }
   [Search] Bootstrap complete!
   ```

4. **Type in the search box** - Watch for:
   ```
   [Search] Input event triggered, value: [your text]
   [Search] applyFilters called: { term: "...", activeCategory: null, ... }
   [Search] After search term filter: { term: "...", before: X, after: Y }
   [Renderer] renderAuthorityList called: { count: Y, showPrompt: false }
   [Renderer] Rendered Y authority cards
   ```

### What to Look For:

#### ✅ **If search is working:**
- You'll see input events logged when typing
- applyFilters will show filtered results
- Renderer will show cards being rendered

#### ❌ **If search is NOT working - possible errors:**

**Error 1: Data not loading**
```
[DataStore] Failed to load categories: HTTP 404
```
→ JSON files can't be found. Check file paths.

**Error 2: Search input not found**
```
[Search] Search input element not found!
```
→ HTML structure issue. Check if id="search-input" exists.

**Error 3: No input events**
```
[Search] Search input listener attached successfully
(but nothing when typing)
```
→ Event listener not working. Browser issue or element replaced.

**Error 4: Results not rendering**
```
[Renderer] Results section not found!
```
→ HTML missing id="results" section.

**Error 5: JavaScript errors**
```
Uncaught TypeError: ...
```
→ Code error. Send me the full error message.

### Quick Tests:

**Test 1: Manual trigger**
Open console and run:
```javascript
document.getElementById('search-input').value = 'health';
document.getElementById('search-input').dispatchEvent(new Event('input'));
```

**Test 2: Check data**
```javascript
console.log('Has DataStore:', typeof DataStore);
console.log('Has Renderer:', typeof Renderer);
```

**Test 3: Direct search test**
Open: `http://localhost:8120/debug.html`
This isolated test will show if the search logic works independently.

### Send Me:

If it still doesn't work, send me:
1. **All console messages** (copy entire console log)
2. **Any red error messages**
3. **What you see** when you type in search box (nothing? prompt stays? etc.)

### Quick Fix Options:

**Option A: Hard Refresh**
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

**Option B: Clear Cache**
- F12 → Network tab → Check "Disable cache" → Refresh

**Option C: Different Browser**
- Try Chrome, Firefox, or Edge to rule out browser issues
