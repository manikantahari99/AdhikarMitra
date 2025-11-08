# Quickstart Guide: Data Population

**Feature**: 002-add-comprehensive-andhra  
**Target**: Populate comprehensive AP government department data  
**Estimated Time**: 35-45 hours (one-time collection)

## Overview

This guide provides step-by-step instructions for collecting, validating, and populating contact information for 35+ Andhra Pradesh state government departments and 130 district-level offices. The process is designed for manual data collection with quality verification at each step.

## Prerequisites

### Tools Required

1. **Web Browser** (Chrome, Firefox, or Edge)
2. **Text Editor** (VS Code recommended for JSON editing)
3. **Node.js** (v14+ for validation script)
4. **Git** (for version control)

### Knowledge Required

- Basic JSON syntax
- Understanding of AP government structure
- Familiarity with official AP government websites

### Before You Start

- [ ] Review `data-model.md` for schema reference
- [ ] Ensure `authorities-schema.json` contract is available
- [ ] Set up validation script (`src/data/validate-data.js`)
- [ ] Create backup of existing `authorities.state.json`

## Phase 1: State-Level Departments (35 entries)

**Estimated Time**: 20-25 hours (30-40 min per department)

### Step 1.1: Identify Departments

**Source**: AP State Portal (`https://www.ap.gov.in`)

**Actions**:

1. Navigate to "Departments" or "Government" section
2. Create a list of all major departments (target: 35+)
3. Document department names and official website URLs

**Suggested Department List** (35 examples):

1. General Administration Department
2. Home Department (Police)
3. Revenue Department
4. Finance Department
5. Planning Department
6. Municipal Administration & Urban Development
7. Panchayat Raj & Rural Development
8. Education Department
9. Higher Education
10. Technical Education
11. Health, Medical & Family Welfare
12. Women Development & Child Welfare
13. Social Welfare
14. Backward Classes Welfare
15. Scheduled Castes Development
16. Scheduled Tribes Development
17. Minorities Welfare
18. Agriculture & Cooperation
19. Animal Husbandry, Dairy Development & Fisheries
20. Water Resources
21. Energy Department
22. Roads & Buildings
23. Housing
24. Transport, Roads & Buildings
25. Industries & Commerce
26. IT & Electronics
27. MSME
28. Tourism, Culture & Youth Services
29. Forest, Environment, Science & Technology
30. Labour, Employment, Training & Factories
31. Civil Supplies & Consumer Affairs
32. Commercial Taxes
33. Stamps & Registration
34. Legal Affairs & Legislative
35. Information & Public Relations

### Step 1.2: Collect Department Data

**For each department**, complete the following data collection template:

```json
{
  "id": "[generate-kebab-case-from-name]",
  "name": "[Official Department Name]",
  "category": "[select-from-14-categories]",
  "description": "[100-300 char description]",
  "contact": {
    "phone": "[from Contact Us page]",
    "email": "[from Contact Us page]",
    "grievanceEmail": "[from Grievance section, if separate]",
    "helpline": "[toll-free number, if available]"
  },
  "website": "[official department website]",
  "departmentWebsite": null,
  "district": null,
  "parentDepartment": null,
  "lastVerified": "[today's date YYYY-MM-DD]",
  "escalationPath": []
}
```

**Data Collection Workflow** (per department):

1. **Visit Official Website**
   - Navigate to department's official website (from AP portal)
   - Verify HTTPS protocol
   - Bookmark page for reference

2. **Extract Contact Information**
   - Find "Contact Us" or "About Us" page
   - Copy primary phone number (verify format: 10-digit or STD code)
   - Copy primary email address (verify @*.gov.in domain)
   - Check for separate grievance email (often labeled "Grievance Email")
   - Look for toll-free helpline (usually 1800-xxx-xxxx format)

3. **Write Description**
   - Review department's "About" or "Objectives" section
   - Write concise 100-300 character summary
   - Focus on services provided and citizen interaction points

4. **Assign Category**
   - Map department to one of 14 categories (see `categories.json`)
   - Examples:
     - Police → `law-enforcement`
     - Transport → `transport`
     - Education → `education-skill-dev`
     - Agriculture → `agriculture-rural-dev`

5. **Generate ID**
   - Convert department name to kebab-case
   - Examples:
     - "Transport Department" → `transport-dept`
     - "AP Police Headquarters" → `ap-police-hq`
     - "Women & Child Welfare" → `women-child-welfare-dept`

6. **Document Source**
   - Add entry to `src/data/README.md` with source URL
   - Format: `[Department ID]: [Website URL] (verified [date])`

### Step 1.3: Verify Data Quality

**Before adding to JSON file**, verify each entry:

- [ ] Phone number is callable (make test call if possible)
- [ ] Email is deliverable (send test email if possible)
- [ ] Website link returns HTTP 200 (check in browser)
- [ ] Description is 100-300 characters
- [ ] Email ends with `.gov.in`
- [ ] ID is unique (check against existing entries)
- [ ] Category exists in `categories.json`

### Step 1.4: Add to JSON File

1. Open `src/assets/data/authorities.state.json`
2. Add new entry to `authorities` array
3. **Maintain Sort Order**: Sort by `category` → `district` → `name`
4. Save file
5. Run validation: `node src/data/validate-data.js`
6. Fix any errors reported

### Step 1.5: Commit Progress

After every 5-10 departments, commit your changes:

```powershell
git add src/assets/data/authorities.state.json src/data/README.md
git commit -m "feat: add [Department Names] (state-level)"
```

## Phase 2: Update Categories (if needed)

**Estimated Time**: 1-2 hours

### Step 2.1: Review Category Assignment

After collecting state-level departments, review category assignments:

- [ ] All departments assigned to appropriate categories
- [ ] No category has >20 departments (consider splitting if overloaded)
- [ ] New categories needed? (add to `categories.json`)

### Step 2.2: Add New Categories

If new categories are required:

1. Open `src/assets/data/categories.json`
2. Add new category objects
3. Ensure alphabetical sorting by `name`
4. Select appropriate emoji/icon

**Example**:

```json
{
  "id": "new-category",
  "name": "New Category Name",
  "description": "50-200 character description of category and its departments",
  "icon": "🆕"
}
```

5. Run validation: `node src/data/validate-data.js`
6. Commit: `git commit -m "feat: add [Category Name] category"`

## Phase 3: District-Level Offices (130 entries)

**Estimated Time**: 15-20 hours (templated approach)

### Step 3.1: Select Departments for District Offices

**Recommended 5 Departments** (high citizen interaction):

1. Revenue (Collectorate)
2. Police (Superintendent of Police)
3. Transport (Regional Transport Office)
4. Health (District Medical & Health Officer)
5. Education (District Educational Officer)

### Step 3.2: Collect District Office Data (Template Approach)

**For each of 26 districts**, replicate the pattern:

**Revenue Department Example**:

```json
{
  "id": "collectorate-guntur",
  "name": "Collectorate Office, Guntur",
  "category": "revenue-taxation",
  "description": "District revenue administration for Guntur, handling land records, certificates, and general district administration.",
  "contact": {
    "phone": "[district collectorate phone]",
    "email": "[collector.guntur@ap.gov.in pattern]"
  },
  "website": "https://guntur.ap.gov.in",
  "departmentWebsite": "https://revenue.ap.gov.in",
  "district": "Guntur",
  "parentDepartment": "revenue-dept",
  "lastVerified": "[today's date]",
  "escalationPath": ["revenue-dept"]
}
```

### Step 3.3: District Data Collection Workflow

**Efficient Approach** (per department, all districts):

1. **Find District Directory**
   - Most departments have district-wise contact pages
   - Example: `https://aptransport.gov.in/rto/district-wise`

2. **Extract All District Contacts at Once**
   - Copy all district phone numbers into spreadsheet
   - Copy all district emails
   - Document source URL once (applies to all districts)

3. **Generate JSON Entries Systematically**
   - Use text editor "Find & Replace" for bulk generation
   - Template: Copy first district entry, replace district name 26 times
   - Update phone/email for each district

4. **Verify Sample Districts**
   - Call 5-10 sample district offices (not all 26)
   - Focus on tier-1 districts (Guntur, Visakhapatnam, Vijayawada)

### Step 3.4: District Names (26 Districts - 2024)

**Copy-paste list for reference**:

1. Alluri Sitharama Raju
2. Anakapalli
3. Ananthapuramu
4. Annamayya
5. Bapatla
6. Chittoor
7. Dr. B.R. Ambedkar Konaseema
8. East Godavari
9. Eluru
10. Guntur
11. Kakinada
12. Krishna
13. Kurnool
14. Nandyal
15. NTR
16. Palnadu
17. Parvathipuram Manyam
18. Prakasam
19. Sri Potti Sriramulu Nellore
20. Sri Sathya Sai
21. Srikakulam
22. Tirupati
23. Visakhapatnam
24. Vizianagaram
25. West Godavari
26. YSR Kadapa

### Step 3.5: Validation Per Department

After completing all 26 districts for one department:

1. Run validation: `node src/data/validate-data.js`
2. Check for duplicate IDs
3. Verify all `parentDepartment` references valid
4. Verify all district names match official list
5. Commit: `git commit -m "feat: add [Department] district offices (26 districts)"`

## Phase 4: Data Validation

**Estimated Time**: 2-3 hours

### Step 4.1: Automated Validation

Run validation script to catch errors:

```powershell
node src/data/validate-data.js
```

**Expected Output**:

```text
✅ authorities.state.json: 165 entries validated
✅ categories.json: 14 categories validated
✅ File size: 287 KB (within 500 KB limit)
✅ All email domains valid (.gov.in)
✅ All phone numbers valid format
✅ All website URLs use HTTPS
✅ All district names valid
✅ All parent department references valid
✅ All category references valid
✅ All IDs unique
✅ All dates valid

🎉 Validation passed!
```

**If Errors Found**:

- Review error messages
- Fix invalid entries
- Re-run validation until all checks pass

### Step 4.2: Manual Verification Checklist

**Spot-check 10-15 entries** (mix of state and district):

- [ ] Phone numbers callable
- [ ] Emails deliverable
- [ ] Websites load correctly (HTTP 200)
- [ ] Descriptions accurate and clear
- [ ] Categories appropriate
- [ ] District names spelled correctly

**Document Verification**:

Create `tests/manual/data-verification-checklist.md`:

```markdown
# Data Verification Log

## Sample Verified Entries (Date: [YYYY-MM-DD])

| Entry ID | Phone Tested | Email Tested | Website Tested | Notes |
|----------|--------------|--------------|----------------|-------|
| ap-police-hq | ✅ Reachable | ✅ Delivered | ✅ Loads | - |
| rto-guntur | ✅ Reachable | ⚠️ Bounced | ✅ Loads | Email updated |
| ... | ... | ... | ... | ... |
```

### Step 4.3: Search Functionality Testing

Test search with new data:

1. Start local server: `.\serve.ps1`
2. Open browser: `http://localhost:8120`
3. Test searches:
   - [ ] Search by department name (e.g., "transport")
   - [ ] Search by district (e.g., "guntur")
   - [ ] Search by category (e.g., "law enforcement")
   - [ ] Search by email (e.g., "grievance")
   - [ ] Search by phone (e.g., "0863")
4. Verify results display correctly
5. Verify detail pages render correctly

**Document Test Cases**:

Create `tests/manual/search-test-cases.md`:

```markdown
# Search Test Cases

| Test Query | Expected Results | Actual | Status |
|------------|------------------|--------|--------|
| "transport" | 26 RTOs + Transport Dept | [count] | ✅/❌ |
| "guntur" | All Guntur district offices | [count] | ✅/❌ |
| ... | ... | ... | ... |
```

## Phase 5: Performance Validation

**Estimated Time**: 1 hour

### Step 5.1: File Size Check

```powershell
Get-Item src\assets\data\authorities.state.json | Select-Object Name, Length
```

**Expected**: < 500 KB (uncompressed)

### Step 5.2: Lighthouse Audit

1. Start server: `.\serve.ps1`
2. Open Chrome DevTools → Lighthouse
3. Run audit (Desktop, Fast 3G throttling)
4. Verify metrics:
   - [ ] Performance: ≥ 90
   - [ ] Accessibility: ≥ 90
   - [ ] LCP: ≤ 2.5s

**If Performance Fails**:

- Check JSON file size (must be < 500 KB)
- Ensure server serves with gzip compression
- Verify no console errors
- Check network waterfall for slow requests

## Phase 6: Final Steps

### Step 6.1: Update Documentation

1. **src/data/README.md**:
   - List all data sources with URLs
   - Document verification dates
   - Add maintenance instructions (quarterly review)

2. **docs/DATA_COLLECTION.md**:
   - Copy this quickstart guide
   - Add AP-specific notes (department reorganization risks)
   - Document escalation contacts for data issues

### Step 6.2: Final Commit

```powershell
git add .
git commit -m "feat: complete Feature 002 - 165 AP government authorities"
```

### Step 6.3: Create Maintenance Schedule

**Quarterly Review Cycle**:

- [ ] Schedule calendar reminder (every 3 months)
- [ ] Create review checklist (verify 10% sample, update `lastVerified` dates)
- [ ] Document process in `docs/DATA_COLLECTION.md`

## Troubleshooting

### Common Issues

**Issue**: Phone number format rejected by validation

- **Solution**: Use format `0XXX-XXXXXXX` (with hyphen) or `XXXXXXXXXX` (10 digits, no hyphen)

**Issue**: Email not ending with `.gov.in`

- **Solution**: Contact department to confirm official email, update to `.gov.in` domain if available

**Issue**: Website URL not loading (HTTP 404)

- **Solution**: Search for updated website via Google or AP portal, update URL

**Issue**: Duplicate ID error

- **Solution**: Make IDs more specific (e.g., `transport-dept-state` vs. `transport-dept`)

**Issue**: Category doesn't exist

- **Solution**: Add new category to `categories.json` first, then assign to authority

**Issue**: Parent department reference invalid

- **Solution**: Ensure state-level parent department added before district-level children

## Tips for Efficiency

1. **Batch Similar Departments**: Collect all Revenue district offices together, then all Police, etc.
2. **Use Spreadsheet First**: Extract all data to Excel/Google Sheets, then convert to JSON
3. **Text Editor Macros**: Use Find & Replace to generate 26 district entries from template
4. **Verify in Batches**: Run validation after every 10-20 entries, not at the end
5. **Commit Frequently**: Small commits easier to debug than one large commit
6. **Parallel Verification**: One person collects data, another verifies phone/email

## Time Estimates by Phase

| Phase | Task | Estimated Time |
|-------|------|----------------|
| 1 | State-level departments (35) | 20-25 hours |
| 2 | Category updates | 1-2 hours |
| 3 | District offices (130) | 15-20 hours |
| 4 | Validation & verification | 2-3 hours |
| 5 | Performance testing | 1 hour |
| 6 | Documentation & commit | 1 hour |
| **Total** | | **40-52 hours** |

**Recommended Schedule** (spread over 2 weeks):

- **Week 1**: State-level departments (3-4 hours/day × 5 days)
- **Week 2**: District offices + validation (3-4 hours/day × 5 days)

## Success Criteria

Before considering data population complete:

- [ ] 35+ state-level departments added
- [ ] 130 district-level offices added (5 departments × 26 districts)
- [ ] All entries pass automated validation
- [ ] 10+ entries manually verified (phone/email/website)
- [ ] Search functionality tested with sample queries
- [ ] Lighthouse audit passes (Performance ≥ 90, LCP ≤ 2.5s)
- [ ] File size < 500 KB (uncompressed)
- [ ] Documentation updated (README, DATA_COLLECTION)
- [ ] Changes committed to Git with descriptive messages

## Next Steps After Completion

1. **Code Review**: Request review from team member
2. **User Testing**: Test with real users searching for department contacts
3. **Monitoring**: Track search queries to identify missing departments
4. **Feedback Loop**: Create issue template for reporting incorrect contact info
5. **Quarterly Maintenance**: Set up recurring review process

---

**Questions?** Refer to:

- `data-model.md` for schema details
- `contracts/authorities-schema.json` for JSON schema validation
- `research.md` for architectural decisions
- `spec.md` for feature requirements
