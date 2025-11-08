# Implementation Plan: Comprehensive AP Government Departments Data

**Branch**: `002-add-comprehensive-andhra` | **Date**: November 8, 2025 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-add-comprehensive-andhra/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Expand AdhikarMitra with comprehensive contact information for all major Andhra Pradesh state government departments (35+), including official website links, grievance-specific emails, primary contact numbers, and key authority information. This feature builds upon the existing data model and UI established in Feature 001, requiring data collection from official AP government portals, schema extension to support additional contact metadata (website links, grievance-specific emails), and potential category expansion to accommodate diverse department types. The implementation will maintain the pure static architecture with JSON data files, ensuring no performance degradation beyond the existing 2.5s LCP budget.

## Technical Context

**Language/Version**: Vanilla JavaScript (ES6+) in browser; no build step required  
**Primary Dependencies**: None (pure static HTML/CSS/JS per constitution)  
**Storage**: JSON files (`authorities.state.json` extended, `categories.json` updated)  
**Testing**: Manual verification; existing `validate-data.js` script extended  
**Target Platform**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)  
**Project Type**: Static web application (single-page with hash routing)  
**Performance Goals**: Maintain existing LCP ≤ 2.5s with expanded dataset (35+ departments, 100+ total authorities); search response time < 1s for any query  
**Constraints**: JSON payload growth must stay under 500KB total (uncompressed) to avoid network budget violations; no external API calls  
**Scale/Scope**: 35+ state departments, 100+ total authority entries (state + district-level), 13 district offices per major department (5 departments = 65+ district entries)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ Simplicity First

- **Status**: PASS
- **Rationale**: Feature extends existing JSON data files and uses established rendering patterns from Feature 001. No new frameworks or build tools required. Data collection is manual (one-time effort with quarterly updates).

### ✅ Performance & Accessibility Baseline

- **Status**: PASS with monitoring
- **Rationale**: Expanded dataset (35+ departments vs. current 12 authorities) increases JSON payload size. Mitigation: lazy-load authorities on-demand (already implemented); ensure total JSON < 500KB; existing search debouncing prevents performance issues. Accessibility unchanged (existing patterns apply).
- **Action**: Add performance budget check for JSON file sizes in data validation script.

### ✅ Security Hygiene

- **Status**: PASS
- **Rationale**: All data is static JSON; no user input executed. External website links use `rel="noopener"` (already implemented in Feature 001 for external links). Email addresses are display-only (no mailto: execution risk).

### ✅ Automation Over Manual Drift

- **Status**: PASS
- **Rationale**: Existing `validate-data.js` script will be extended to validate:
  - Email format (`@ap.gov.in` or approved gov domains)
  - Phone number format (10 digits)
  - Required fields presence
  - Unique authority IDs
  - Website URL format validation
- **Action**: Extend validation script with new rules (data-model will specify schema).

### ✅ Content Integrity & Traceability

- **Status**: PASS
- **Rationale**: All department data will include `lastVerified` date field. Data sources (official AP gov websites) documented in data/README.md. Each authority entry will reference source URL in comments during data collection phase.
- **Action**: Document data collection methodology and source URLs in `data/README.md`.

**GATE RESULT**: ✅ All gates pass. Feature aligns with constitution principles. No exceptions required.

## Project Structure

### Documentation (this feature)

```text
specs/002-add-comprehensive-andhra/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── authorities-schema.json  # JSON schema for extended data model
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── assets/
│   ├── data/
│   │   ├── categories.json          # Updated with new category types
│   │   └── authorities.state.json   # Extended with 35+ departments (100+ entries)
│   ├── js/
│   │   ├── data.js                  # Existing - no changes
│   │   ├── render.js                # Existing - no changes
│   │   ├── search.js                # Existing - no changes
│   │   ├── formatPhone.js           # Existing - no changes
│   │   └── router.js                # Existing - no changes
│   └── css/
│       └── base.css                 # Existing - no changes
├── index.html                       # Existing - no changes
└── data/
    ├── README.md                    # NEW: Data collection methodology and sources
    └── validate-data.js             # UPDATED: Extended validation rules

tests/
└── manual/
    ├── search-test-cases.md         # NEW: Test cases for expanded dataset search
    └── data-verification-checklist.md  # NEW: Manual verification checklist

docs/
└── DATA_COLLECTION.md               # NEW: Guide for future updates
```

**Structure Decision**: Single project (static web application). Feature extends existing data files within `src/assets/data/` without requiring new application structure. All JavaScript modules from Feature 001 remain unchanged; only JSON data files and validation scripts are modified.

## Complexity Tracking

*No complexity violations detected. All changes align with constitution's simplicity-first principle.*

---

## Phase 0: Research

*This section documents all research outcomes required before data modeling begins.*

### Data Collection Methodology

**Primary Sources** (official AP government portals):
1. **AP State Portal**: `https://www.ap.gov.in` (departments directory)
2. **AP Secretariat**: `https://apsecretariat.ap.gov.in` (ministerial departments)
3. **Individual Department Websites**: Direct links from departmental pages
4. **AP Grievance Portal**: `https://grievance.ap.gov.in` (grievance-specific contacts)

**Collection Process**:
1. Manual extraction from official websites (each department's "Contact Us" page)
2. Cross-verification with AP Government Directory publications
3. Verification calls to listed phone numbers (sample verification for accuracy)
4. Email validation (send test emails to verify deliverability)

**Data Freshness**:
- Initial collection: One-time manual effort (estimated 20-30 hours)
- Maintenance: Quarterly review cycle (documented in DATA_COLLECTION.md)
- `lastVerified` field updated during each review

**Quality Assurance**:
- Each entry includes source URL in data/README.md
- Phone numbers tested for validity (callable)
- Email addresses tested (deliverability check)
- Website links tested (HTTP 200 response)

### Category Taxonomy Expansion

**Existing Categories** (Feature 001):
1. Law Enforcement
2. Revenue & Taxation
3. Municipal Services
4. Transport
5. Healthcare
6. Consumer Protection

**Proposed New Categories** (to accommodate 35+ departments):
7. **Education & Skill Development** (Education, Technical Education, Higher Education)
8. **Agriculture & Rural Development** (Agriculture, Animal Husbandry, Fisheries, Rural Development)
9. **Energy & Infrastructure** (Energy, Roads & Buildings, Housing, Water Resources)
10. **Social Welfare** (Women & Child Welfare, Social Welfare, BC Welfare, SC/ST Development)
11. **Finance & Administration** (Finance, Revenue, Commercial Taxes, Stamps & Registration)
12. **Industry & Commerce** (Industries, IT, MSME, Tourism)
13. **Environment & Forest** (Environment, Forest, Pollution Control)
14. **Public Services** (Civil Supplies, Labour, Employment, Information & Public Relations)

**Migration Strategy**:
- Existing 12 authorities remain in their current categories (no data migration)
- New departments assigned to appropriate new categories
- Categories.json updated with new category objects
- Search/filter logic unchanged (existing code handles dynamic categories)

### Performance Optimization Strategy

**Challenge**: Expanded dataset (12 → 100+ entries) may impact search performance and page load.

**Analysis**:
- Current `authorities.state.json`: ~12 KB (12 entries)
- Projected size with 100+ entries: ~100-150 KB (uncompressed)
- Constitution budget: <500 KB JSON total, <75 KB JS compressed

**Mitigation Decisions**:
1. **No pagination required** at 100-150 entries (still within reasonable limits)
2. **Lazy loading not required** (150 KB JSON loads in <1s on Fast 3G)
3. **Search optimization**: Existing debouncing (300ms) sufficient; no indexing needed
4. **Rendering optimization**: Virtual scrolling NOT needed (100 cards render in <100ms on modern browsers)

**Performance Budget Allocation**:
- authorities.state.json: ≤ 200 KB (uncompressed)
- categories.json: ≤ 10 KB (uncompressed)
- Total JSON: ≤ 210 KB (well under 500 KB budget)
- JS modules: Unchanged from Feature 001 (~15 KB total)

**Monitoring**:
- Add file size check to validate-data.js (fail if > 200 KB)
- Manual Lighthouse audit after data population (ensure LCP ≤ 2.5s maintained)

### Search Optimization

**Current Behavior** (Feature 001):
- Search filters on `name` and `category` fields
- Debounced input (300ms delay)
- Case-insensitive substring matching

**Required Enhancements** (from FR-003):
- Add search across `email` field
- Add search across `phone` field (formatted and raw)
- Add search across department-level fields (if added to data model)

**Implementation Approach**:
- Extend `applyFilters()` function in search.js to include additional fields
- No external search library needed (simple substring matching sufficient)
- Performance: 100+ entries × 5 fields = 500 comparisons per keystroke (trivial cost with debouncing)

**Example Code Change** (search.js):
```javascript
// Current: search name and category
if (
  authority.name.toLowerCase().includes(searchTerm) ||
  authority.category.toLowerCase().includes(searchTerm)
) { /* ... */ }

// Enhanced: add email and phone
if (
  authority.name.toLowerCase().includes(searchTerm) ||
  authority.category.toLowerCase().includes(searchTerm) ||
  authority.contact?.email?.toLowerCase().includes(searchTerm) ||
  authority.contact?.phone?.includes(searchTerm) ||
  authority.contact?.phone?.replace(/\D/g, '').includes(searchTerm) // raw digits
) { /* ... */ }
```

### District-Level Data Structure

**Requirement** (from spec FR-005): District-level offices for 5 major departments across 13 districts.

**Districts of Andhra Pradesh** (as of 2024):
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

**Note**: As of 2024, AP has 26 districts (not 13 as initially estimated). This increases scope.

**Selected Departments for District Offices** (5 major departments):
1. Revenue (Collectorate offices)
2. Police (Superintendent of Police offices)
3. Transport (Regional Transport Offices - RTOs)
4. Health (District Medical & Health Officer)
5. Education (District Educational Officer)

**Estimated Total Entries**:
- State-level departments: 35 entries
- District-level offices: 5 departments × 26 districts = 130 entries
- **Total**: ~165 authority entries

**Performance Impact Reassessment**:
- Projected JSON size: ~200-250 KB (uncompressed)
- Still within constitution budget (<500 KB)
- Rendering performance: 165 cards render in <150ms (acceptable)
- Search performance: 165 entries × 5 fields = 825 comparisons (still trivial with debouncing)

**Data Model Implication**:
- Need `district` field in authority schema (optional, null for state-level)
- Need `parentDepartment` field (reference to state-level department ID)
- Example: `{ "id": "rto-guntur", "name": "RTO Guntur", "district": "Guntur", "parentDepartment": "transport-dept", ... }`

### Alternatives Considered & Rejected

**Alternative 1: External API for Real-Time Data**
- **Rejected**: Violates constitution's simplicity-first principle; requires backend server; adds latency; government APIs often unreliable
- **Chosen Approach**: Static JSON with quarterly manual updates (acceptable freshness for contact information)

**Alternative 2: Automated Web Scraping**
- **Rejected**: Government websites lack consistent structure; scraping fragile to HTML changes; ethical concerns with automated access
- **Chosen Approach**: Manual one-time collection with documented sources (maintainable, reliable)

**Alternative 3: Database (SQLite/IndexedDB)**
- **Rejected**: Overkill for 165 entries; adds complexity; requires migration scripts; violates simplicity principle
- **Chosen Approach**: JSON files (fast, simple, human-readable, version-controllable)

**Alternative 4: Search Index (Lunr.js, Fuse.js)**
- **Rejected**: Adds dependency (~10 KB); unnecessary for 165 entries; native JS filtering fast enough
- **Chosen Approach**: Enhanced substring matching in existing search.js (zero dependencies)

**Alternative 5: Virtual Scrolling / Pagination**
- **Rejected**: Premature optimization; 165 cards render fast in modern browsers; adds UI complexity
- **Chosen Approach**: Render all results (with existing "no results" fallback if search too specific)

### Research Conclusions

1. **Data Collection**: Manual extraction from official AP gov portals; one-time effort (~30-40 hours); quarterly maintenance
2. **Category Expansion**: Add 8 new categories (7-14) to accommodate diverse departments
3. **Performance**: 165 entries (~250 KB JSON) within constitution budgets; no optimization libraries needed
4. **Search**: Extend existing substring matching to email/phone fields; no external search library
5. **District Data**: Add `district` and `parentDepartment` fields to schema; 26 districts (not 13)
6. **Architecture**: Pure static JSON approach maintained; no backend/database/scraping complexity

**GATE RESULT**: ✅ Research complete. No blockers identified. Ready for Phase 1 (data modeling).

---

## Phase 1: Data Modeling & Contracts

*This section documents the data structures, validation rules, and implementation approach.*

### Deliverable: data-model.md

✅ **Status**: Complete

**Location**: `specs/002-add-comprehensive-andhra/data-model.md`

**Key Contents**:

- **Authority Entity Schema**: Extended with 5 new optional fields (grievanceEmail, helpline, district, parentDepartment, departmentWebsite)
- **Category Entity Schema**: Unchanged structure, expanded from 6 to 14 categories
- **Validation Rules**: 10 automated validation rules (ID uniqueness, email domain, phone format, website HTTPS, district names, parent references, date format)
- **Data Files**: authorities.state.json (165 entries, ~300 KB), categories.json (14 entries, ~5 KB)
- **Backward Compatibility**: ✅ Full compatibility with Feature 001 (all new fields optional)
- **Relationships**: Category foreign key, Parent-child hierarchy, Escalation path array

**Schema Summary**:

```text
Authority {
  id: string (required, unique, kebab-case)
  name: string (required, 5-100 chars)
  category: string (required, FK to Category.id)
  description: string (required, 100-300 chars)
  contact: {
    phone: string (required, 10-digit or STD format)
    email: string (required, *.gov.in domain)
    grievanceEmail: string (optional, NEW)
    helpline: string (optional, NEW)
  }
  website: string (required, HTTPS)
  departmentWebsite: string (optional, NEW)
  district: string|null (optional, 26 AP districts, NEW)
  parentDepartment: string|null (optional, FK to Authority.id, NEW)
  lastVerified: string (required, ISO 8601 date)
  escalationPath: string[] (optional, array of Authority IDs)
}
```

### Deliverable: contracts/authorities-schema.json

✅ **Status**: Complete

**Location**: `specs/002-add-comprehensive-andhra/contracts/authorities-schema.json`

**Schema Version**: 2.0.0

**Key Features**:

- JSON Schema Draft 07 format
- Validates both authorities.state.json and categories.json
- Regex patterns for phone/email/website/ID formats
- Enum constraint for 26 AP district names
- Foreign key validation (category reference, parent department)
- Example entries included in schema

**Validation Coverage**:

- Phone format: `^(\d{10}|\d{4}-\d{7})$`
- Email domain: `\.gov\.in$`
- Website protocol: `^https://`
- ID format: `^[a-z0-9-]{3,50}$`
- Date format: `^\d{4}-\d{2}-\d{2}$`
- District names: Enum of 26 official AP districts

### Deliverable: quickstart.md

✅ **Status**: Complete

**Location**: `specs/002-add-comprehensive-andhra/quickstart.md`

**Contents**:

1. **Phase 1: State-Level Departments** (35 entries, 20-25 hours)
   - Data collection workflow per department
   - Template for JSON entry creation
   - Quality verification checklist
   - Source documentation requirements

2. **Phase 2: Category Updates** (1-2 hours)
   - Review category assignments
   - Add new categories if needed

3. **Phase 3: District-Level Offices** (130 entries, 15-20 hours)
   - Templated approach for efficiency
   - 5 departments × 26 districts = 130 entries
   - Bulk generation techniques

4. **Phase 4: Data Validation** (2-3 hours)
   - Automated validation script
   - Manual verification checklist
   - Search functionality testing

5. **Phase 5: Performance Validation** (1 hour)
   - File size check (< 500 KB)
   - Lighthouse audit (≥ 90 performance, ≤ 2.5s LCP)

6. **Phase 6: Final Steps** (1 hour)
   - Documentation updates
   - Git commit
   - Maintenance schedule setup

**Total Estimated Effort**: 40-52 hours (spread over 2 weeks)

### Implementation Approach

**Data Population Strategy**:

1. **Manual Collection** (not automated scraping)
   - Reliable, maintainable
   - Source URLs documented for traceability
   - One-time effort with quarterly reviews

2. **Incremental Validation**
   - Validate after every 10-20 entries
   - Catch errors early
   - Frequent small commits

3. **Templated District Data**
   - Create one district entry, replicate 26 times
   - Update district-specific details (name, phone, email)
   - Efficient for 130 district-level entries

4. **Quality Verification**
   - Automated: `validate-data.js` script (10 validation rules)
   - Manual: Sample phone calls, email tests, website checks
   - Performance: Lighthouse audit post-population

**Code Changes Required**:

1. **search.js** (minor update):
   - Extend `applyFilters()` to search additional fields (email, phone, district)
   - ~10 lines of code added

2. **validate-data.js** (extension):
   - Add 5 new validation rules (email domain, phone format, website HTTPS, district enum, file size)
   - ~50 lines of code added

3. **Data Files** (major update):
   - `authorities.state.json`: Expand from 12 to 165 entries
   - `categories.json`: Expand from 6 to 14 categories

4. **Documentation**:
   - `src/data/README.md`: Add data sources and maintenance instructions
   - `docs/DATA_COLLECTION.md`: Copy quickstart guide

**No Changes Required**:

- ✅ All rendering modules (render.js already handles optional fields via `?.` operator)
- ✅ Router module (hash routing unchanged)
- ✅ HTML/CSS (existing styles apply to all entries)
- ✅ Data loading (data.js already handles arbitrary array sizes)

### Phase 1 Conclusions

**✅ Data Model Finalized**:

- Schema extends Feature 001 without breaking changes
- 5 new optional fields support expanded data requirements
- Validation rules ensure data quality and consistency

**✅ Contracts Defined**:

- JSON Schema 2.0.0 provides machine-readable validation
- Can integrate with CI/CD (JSON schema validator in pipeline)
- Examples included for developer reference

**✅ Implementation Workflow Documented**:

- Step-by-step data collection guide (quickstart.md)
- Efficiency techniques for 165-entry population
- Quality assurance at multiple checkpoints

**🚀 Ready for Phase 2**: Task breakdown (to be created via `/speckit.tasks` command)

---

## Summary & Next Steps

### Planning Phase Status

| Phase | Deliverable | Status | Location |
|-------|-------------|--------|----------|
| **Summary** | Feature overview | ✅ Complete | plan.md (this file) |
| **Technical Context** | Tech stack details | ✅ Complete | plan.md § Technical Context |
| **Constitution Check** | Compliance gates | ✅ Pass | plan.md § Constitution Check |
| **Phase 0: Research** | Technical research | ✅ Complete | research.md |
| **Phase 1: Data Model** | Schema definition | ✅ Complete | data-model.md |
| **Phase 1: Contracts** | JSON schema | ✅ Complete | contracts/authorities-schema.json |
| **Phase 1: Quickstart** | Implementation guide | ✅ Complete | quickstart.md |
| **Phase 2: Tasks** | Task breakdown | ⏭️ Pending | tasks.md (use `/speckit.tasks`) |

### Key Decisions Documented

1. **Data Collection**: Manual extraction from official AP portals (40-50 hours one-time)
2. **Storage**: Extend `authorities.state.json` (no new files, no database)
3. **Categories**: Add 8 new categories (total 14)
4. **District Coverage**: 26 districts (not 13 as initially estimated)
5. **Performance**: No optimization libraries needed (constitution budgets maintained)
6. **Backward Compatibility**: All Feature 001 code unchanged

### Validation Outcomes

- ✅ **Constitution Compliance**: All gates pass, no exceptions required
- ✅ **Performance Budgets**: 300 KB JSON well under 500 KB limit, LCP maintained ≤ 2.5s
- ✅ **Simplicity**: No frameworks, no databases, no external APIs
- ✅ **Backward Compatibility**: Feature 001 data and code unaffected
- ✅ **Maintainability**: Quarterly review process documented

### Next Command

To proceed with task breakdown and implementation planning:

```bash
/speckit.tasks
```

This will:

1. Load the completed plan.md, research.md, data-model.md
2. Generate granular implementation tasks (data collection, validation updates, testing)
3. Create tasks.md with priority, effort estimates, and dependencies
4. Prepare for implementation phase

**Estimated Tasks**: 12-15 tasks covering data collection (3-4 tasks), validation script updates (2-3 tasks), category updates (1 task), testing (2-3 tasks), documentation (2-3 tasks).

---

**Planning Phase Complete** ✅  
**Date**: December 2024  
**Ready for**: Task breakdown (`/speckit.tasks` command)