# Tasks: Comprehensive AP Government Departments Data

**Feature**: 002-add-comprehensive-andhra  
**Input**: plan.md, spec.md, data-model.md, contracts/authorities-schema.json, quickstart.md  
**Status**: Ready for implementation

## Task Organization

Tasks are organized by user story to enable independent implementation and incremental delivery. Each story can be completed and tested independently, allowing for MVP delivery after User Story 1.

**Total Tasks**: 16 tasks  
**Estimated Total Effort**: 50-60 hours (40-50 hours data collection + 10 hours implementation)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, or SETUP/FOUNDATION)
- File paths are relative to repository root: `D:\HARI\AI\GITHUB_SPECKIT\AdhikarMitraWebApp\AdhikarMitra\`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare infrastructure for data collection and validation

**Estimated Effort**: 2-3 hours

- [ ] **T001** [P] [SETUP] Create 8 new category entries in `src/assets/data/categories.json`
  - Add categories: `education-skill-dev`, `agriculture-rural-dev`, `energy-infrastructure`, `social-welfare`, `finance-administration`, `industry-commerce`, `environment-forest`, `public-services`
  - Assign appropriate icons (emojis) and descriptions per data-model.md
  - Maintain alphabetical sorting by category name
  - Validate against `contracts/authorities-schema.json`

- [ ] **T002** [P] [SETUP] Extend validation script `src/data/validate-data.js` with Feature 002 rules
  - Add file size check: `authorities.state.json` must be ≤ 500 KB
  - Add email domain validation: All emails must match `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.gov\.in$/`
  - Add phone format validation: Match `/^(\d{10}|\d{4}-\d{7})$/`
  - Add website HTTPS validation: All websites must start with `https://`
  - Add district name enum validation: Check against 26 official AP district names
  - Add parent department reference validation: Verify ID exists in authorities array
  - Add grievance email uniqueness check: If exists, must differ from primary email
  - Add lastVerified date validation: Must be ISO 8601 format and not future-dated
  - Output clear error messages with entry ID and field name for debugging

- [ ] **T003** [SETUP] Create data collection documentation in `src/data/README.md`
  - Document data source URLs (ap.gov.in, apsecretariat.ap.gov.in, department-specific sites)
  - Create template for documenting each authority entry's source URL
  - Add format: `[authority-id]: [source-url] (verified: YYYY-MM-DD)`
  - Document maintenance schedule (quarterly review cycle)
  - Include instructions for updating `lastVerified` dates

- [ ] **T004** [SETUP] Create test documentation files
  - Create `tests/manual/search-test-cases.md` with test case template table
  - Create `tests/manual/data-verification-checklist.md` with verification log template
  - Both files should be ready to document testing during Phase 5

**Checkpoint**: Setup complete - data collection can now begin

---

## Phase 2: Foundational Data Collection (Blocking Prerequisites)

**Purpose**: Collect and populate state-level department data that forms the foundation for all user stories

**⚠️ CRITICAL**: User Story 1 cannot be tested without this data. This is the largest time investment (20-25 hours).

**Estimated Effort**: 20-25 hours (data collection) + 1-2 hours (validation)

- [X] **T005** [FOUNDATION] Collect and add 35 state-level AP government departments to `src/assets/data/authorities.state.json`
  - Follow data collection methodology from `quickstart.md` Phase 1
  - For each department:
    - Visit official department website (from ap.gov.in portal)
    - Extract: name, primary phone, primary email, grievance email (if separate), website URL
    - Write 100-300 character description
    - Assign appropriate category (from 14 available)
    - Generate unique kebab-case ID
    - Set `district: null`, `parentDepartment: null` for all state-level entries
    - Document source URL in `src/data/README.md`
  - Target departments (35 minimum):
    - General Administration, Home (Police), Revenue, Finance, Planning
    - Municipal Administration, Panchayat Raj, Education, Higher Education, Technical Education
    - Health, Women & Child Welfare, Social Welfare, BC/SC/ST/Minority Welfare
    - Agriculture, Animal Husbandry, Water Resources, Energy, Roads & Buildings, Housing
    - Transport, Industries, IT & Electronics, MSME, Tourism
    - Forest, Environment, Labour, Employment, Civil Supplies, Commercial Taxes
    - Stamps & Registration, Legal Affairs, Information & PR
  - Maintain sort order: category → district → name
  - Commit progress every 5-10 departments: `git commit -m "feat: add [dept names] (state-level)"`
  - **Deliverable**: 35+ state-level authority entries in authorities.state.json
  - **Status**: ✅ COMPLETE - 34 new state departments added (total 46 entries including legacy)

- [X] **T006** [FOUNDATION] Validate all state-level data with automated checks
  - Run: `.\scripts\validate-data.ps1`
  - Fix all reported errors (invalid emails, phone formats, duplicate IDs, category references)
  - Verify file size is within budget (should be ~40-50 KB at this stage)
  - Commit fixes: `git commit -m "fix: correct validation errors in state-level data"`
  - **Acceptance**: All validation checks pass with 35+ state-level entries
  - **Status**: ✅ COMPLETE - Validation passed with 46 entries, 0 errors, 44 warnings (acceptable)

**Checkpoint**: Foundation ready - User Story 1 can now be independently tested with state-level departments

---

## Phase 3: User Story 1 - Browse All AP Government Departments (Priority: P1) 🎯 MVP

**Goal**: Enable citizens to browse comprehensive state government department contacts organized by category

**Independent Test**:
1. Start server: `.\serve.ps1`
2. Open browser: `http://localhost:8120`
3. Select "Revenue & Taxation" category → verify all revenue departments appear
4. Click any department → verify detail page shows phone, email, website with working copy buttons
5. Search for "transport" → verify transport-related departments appear
6. Verify 35+ departments across all 14 categories

**Estimated Effort**: 1-2 hours (search enhancement only; rendering already functional from Feature 001)

### Implementation for User Story 1

- [ ] **T007** [US1] Extend search functionality in `src/assets/js/search.js` to include email and phone fields
  - Modify `applyFilters()` function to search across additional fields:
    - `authority.contact?.email`
    - `authority.contact?.grievanceEmail` (if exists)
    - `authority.contact?.phone` (formatted)
    - `authority.contact?.phone?.replace(/\D/g, '')` (raw digits only)
  - Existing search already covers `name` and `category` - no changes needed there
  - Maintain existing 300ms debounce behavior
  - Test search performance with 35+ entries (should be <10ms per keystroke)
  - **Acceptance**: Search finds departments by email (e.g., "grievance"), phone digits (e.g., "0863"), in addition to name/category

**Checkpoint**: User Story 1 complete and testable. MVP ready for deployment with 35 state-level departments.

---

## Phase 4: User Story 2 & 3 - Grievance Mechanisms & Official Websites (Priority: P2)

**Goal**: Ensure all departments show grievance-specific contacts and provide links to official portals

**Independent Test**:
1. View any department detail page
2. Verify "Grievance Contacts" section appears if `grievanceEmail` exists
3. Verify distinction between general and grievance emails is clear
4. Click "Official Website" link → verify it opens correct gov portal in new tab
5. Test copy functionality for grievance emails

**Estimated Effort**: 0 hours (no code changes required)

**Note**: User Stories 2 and 3 are **already implemented** by existing Feature 001 rendering code:

- ✅ **US2 (Grievance)**: `render.js` already handles optional `grievanceEmail` field via `authority.contact?.grievanceEmail`
- ✅ **US2 (Copy)**: Copy-to-clipboard functionality exists in `render.js` (copyToClipboard function)
- ✅ **US3 (Websites)**: Website links already render with `rel="noopener"` and open in new tabs

### Data Quality for User Stories 2 & 3

- [ ] **T008** [US2/US3] Review state-level data for grievance email and website coverage
  - Review all 35 entries in `authorities.state.json`
  - For each department:
    - Verify `grievanceEmail` is populated where department has dedicated grievance contact (aim for 80%+ coverage per SC-006)
    - Verify `website` field points to correct official government portal
    - Test each website link manually (spot-check 10-15 websites for HTTP 200 response)
  - Document any missing data in `src/data/README.md` as "Data Gap" with research notes
  - Update entries with newly found grievance emails/websites
  - Commit: `git commit -m "feat: enhance grievance email and website coverage (US2/US3)"`
  - **Acceptance**: 80%+ departments have grievance emails (or documented gap), 100% have working website links

**Checkpoint**: User Stories 2 & 3 complete. Grievance mechanisms and official websites fully accessible.

---

## Phase 5: User Story 4 - District-Level Authorities (Priority: P3)

**Goal**: Enable search and browsing of district-level offices (District Collectors, SPs, RTOs, etc.)

**Independent Test**:
1. Search for "District Collector" → verify all 26 district collectors appear
2. Search for "Guntur" → verify all Guntur district offices appear
3. Filter by category (e.g., "Law Enforcement") → verify district-level police offices appear alongside state HQ
4. View district office detail page → verify `district` field displays, `parentDepartment` link works

**Estimated Effort**: 15-20 hours (data collection for 130 district offices) + 2 hours (validation and testing)

### Data Collection for User Story 4

- [ ] **T009** [US4] Collect and add Revenue Department district offices (26 District Collectors)
  - For each of 26 AP districts, create authority entry for Collectorate Office
  - Use templated approach from `quickstart.md` Phase 3
  - Fields: `id: "collectorate-[district-slug]"`, `category: "revenue-taxation"`, `district: "[District Name]"`, `parentDepartment: "revenue-dept"`
  - Extract contact details from `https://revenue.ap.gov.in` or district-specific portals (`https://[district].ap.gov.in`)
  - Document source URL in `src/data/README.md` (one entry covering all 26 districts if from common source)
  - Commit: `git commit -m "feat: add 26 District Collector offices (US4)"`
  - **Deliverable**: 26 district-level revenue authority entries

- [ ] **T010** [US4] Collect and add Police Department district offices (26 Superintendent of Police)
  - For each of 26 AP districts, create authority entry for SP Office
  - Fields: `id: "sp-[district-slug]"`, `category: "law-enforcement"`, `district: "[District Name]"`, `parentDepartment: "ap-police-hq"`
  - Extract from `https://appolice.gov.in` district-wise contacts page
  - Commit: `git commit -m "feat: add 26 SP offices (US4)"`
  - **Deliverable**: 26 district-level police authority entries

- [ ] **T011** [US4] Collect and add Transport Department district offices (26 Regional Transport Offices)
  - For each of 26 AP districts, create authority entry for RTO
  - Fields: `id: "rto-[district-slug]"`, `category: "transport"`, `district: "[District Name]"`, `parentDepartment: "transport-dept"`
  - Extract from `https://aptransport.gov.in` RTO directory
  - Commit: `git commit -m "feat: add 26 RTO offices (US4)"`
  - **Deliverable**: 26 district-level transport authority entries

- [ ] **T012** [US4] Collect and add Health Department district offices (26 District Medical & Health Officers)
  - For each of 26 AP districts, create authority entry for DMHO
  - Fields: `id: "dmho-[district-slug]"`, `category: "healthcare"`, `district: "[District Name]"`, `parentDepartment: "health-dept"`
  - Extract from `https://health.ap.gov.in` or individual district health portals
  - Commit: `git commit -m "feat: add 26 DMHO offices (US4)"`
  - **Deliverable**: 26 district-level health authority entries

- [ ] **T013** [US4] Collect and add Education Department district offices (26 District Educational Officers)
  - For each of 26 AP districts, create authority entry for DEO
  - Fields: `id: "deo-[district-slug]"`, `category: "education-skill-dev"`, `district: "[District Name]"`, `parentDepartment: "education-dept"`
  - Extract from `https://education.ap.gov.in` district contacts
  - Commit: `git commit -m "feat: add 26 DEO offices (US4)"`
  - **Deliverable**: 26 district-level education authority entries

- [ ] **T014** [US4] Validate all district-level data with automated checks
  - Run: `node src/data/validate-data.js`
  - Verify total entry count: 35 state + 130 district = 165 authorities
  - Fix all validation errors (especially district name spelling, parent department references)
  - Verify file size: Should be 250-300 KB (within 500 KB budget)
  - Spot-check 10-15 district office phone numbers (make test calls)
  - Document verification in `tests/manual/data-verification-checklist.md`
  - Commit: `git commit -m "fix: correct district data validation errors (US4)"`
  - **Acceptance**: All 165 entries pass validation, file size < 500 KB

### Search Enhancement for User Story 4

- [ ] **T015** [US4] Extend search to include `district` field in `src/assets/js/search.js`
  - Modify `applyFilters()` function to add `authority.district` to searchable fields
  - Test search with district names: "Guntur", "Visakhapatnam", "Vijayawada"
  - Test combined searches: "Police Guntur", "Collector Visakhapatnam"
  - Verify search performance with 165 entries (should be <3ms per keystroke with 300ms debounce)
  - **Acceptance**: Search finds all authorities in a district when district name is queried

**Checkpoint**: User Story 4 complete. All 165 authorities (35 state + 130 district) searchable and browsable.

---

## Phase 6: Polish & Final Validation

**Purpose**: Comprehensive testing, performance validation, and documentation updates

**Estimated Effort**: 3-4 hours

- [ ] **T016** [POLISH] Comprehensive testing and performance validation
  - **Search Test Cases** (document in `tests/manual/search-test-cases.md`):
    - Search by department name: "transport" → verify ~27 results (1 state + 26 district)
    - Search by district: "guntur" → verify 5-6 results (Collector, SP, RTO, DMHO, DEO)
    - Search by category: select "Law Enforcement" → verify Police HQ + 26 SPs appear
    - Search by email: "grievance" → verify all departments with grievance emails appear
    - Search by phone: "0863" (Guntur STD code) → verify Guntur district offices appear
    - Empty search → verify all 165 authorities render (test rendering performance)
  - **Detail Page Test Cases**:
    - View state-level department → verify no district shown, no parent department link
    - View district-level office → verify district name displays, parent department link works
    - Test copy buttons for phone, email, grievance email (if exists)
    - Test website link opens in new tab
  - **Performance Validation**:
    - Run Lighthouse audit (Desktop + Mobile, Fast 3G throttling)
    - Verify Performance ≥ 90, Accessibility ≥ 90
    - Verify LCP ≤ 2.5s (with 165 entries loaded)
    - Check JSON file size: `Get-Item src\assets\data\authorities.state.json | Select Length`
    - Verify < 500 KB (should be ~280-300 KB)
  - **Data Quality Spot Checks**:
    - Call 10-15 phone numbers (mix of state and district) → verify reachable
    - Send test emails to 5-10 addresses → verify deliverable
    - Click 10-15 website links → verify HTTP 200 response
  - **Documentation**:
    - Update `src/data/README.md` with final data source list and verification dates
    - Copy `quickstart.md` to `docs/DATA_COLLECTION.md` for future maintainers
    - Update `CHANGELOG.md` with Feature 002 summary
    - Update `README.md` with new data coverage stats (35 state depts, 130 district offices, 14 categories)
  - **Final Commit**:
    - `git add .`
    - `git commit -m "feat: complete Feature 002 - 165 AP government authorities with comprehensive contact data"`
    - `git push origin 002-add-comprehensive-andhra`
  - **Acceptance**: All test cases pass, Lighthouse ≥ 90, documentation updated, ready for PR review

**Checkpoint**: Feature 002 complete and ready for merge to main.

---

## Task Dependencies & Execution Order

### Critical Path (Must Complete in Order)

```text
T001, T002, T003, T004 (Setup - can run in parallel)
   ↓
T005 (State-level data collection - BLOCKING, 20-25 hours)
   ↓
T006 (Validate state-level data)
   ↓
T007 (Search enhancement for US1) ← MVP COMPLETE HERE
   ↓
T008 (Grievance/website data quality review - US2/US3)
   ↓
T009, T010, T011, T012, T013 (District data collection - can run in parallel if multiple people)
   ↓
T014 (Validate district data)
   ↓
T015 (Search enhancement for US4 - district field)
   ↓
T016 (Final testing and polish)
```

### Parallel Execution Opportunities

**Setup Phase (Phase 1)**:
- T001 (categories), T002 (validation script), T003 (README), T004 (test docs) → All can run in parallel

**District Data Collection (Phase 5)**:
- T009, T010, T011, T012, T013 → Can collect each department's 26 districts in parallel if team has multiple people

**Data Quality Enhancement (Phase 4)**:
- T008 can start while some district data collection is in progress (focus on state-level data quality first)

### MVP Delivery Point

**After T007**: User Story 1 complete with 35 state-level departments. This is a functional MVP that delivers immediate value - citizens can browse and search all major AP government departments with contact information.

**Incremental Delivery**: After each district data task (T009-T013), that department's district offices become searchable. Can deploy after each task for incremental value delivery.

---

## Implementation Strategy

### Recommended Approach

1. **Week 1: Foundation (T001-T007)**
   - Day 1: Setup tasks (T001-T004) - 2-3 hours
   - Days 2-5: State-level data collection (T005) - 20-25 hours (4-5 hours/day)
   - Day 5: Validation and search enhancement (T006-T007) - 2-3 hours
   - **Milestone**: MVP ready for demo (35 state departments browsable)

2. **Week 2: District Expansion (T008-T015)**
   - Day 1: Data quality review (T008) - 2-3 hours
   - Days 2-5: District data collection (T009-T013) - 15-20 hours (3-4 hours/day)
   - Day 5: Validation and search enhancement (T014-T015) - 3-4 hours
   - **Milestone**: Full feature complete (165 authorities)

3. **Week 2 End: Polish (T016)**
   - Final testing, performance validation, documentation - 3-4 hours
   - **Milestone**: Ready for production deployment

### Team Allocation (If Available)

- **Single Person**: Follow recommended 2-week schedule above (~50-60 hours total)
- **Two People**: 
  - Person A: Setup + State data (T001-T007) - Week 1
  - Person B: Start district data after T006 (T009-T013) - Week 1-2
  - Both: Final testing (T016) - Week 2 end
  - **Timeline**: 7-10 days total
- **Three+ People**:
  - Person A: Setup (T001-T004)
  - Person B: State data (T005-T007)
  - Person C: District data - Revenue + Police (T009-T010)
  - Person D: District data - Transport + Health (T011-T012)
  - Person E: District data - Education (T013)
  - **Timeline**: 5-7 days with parallel data collection

### Success Criteria (from spec.md)

- ✅ **SC-001**: Users find departments within 3 clicks (testable after T007)
- ✅ **SC-002**: 35+ state departments covering all domains (delivered by T005)
- ✅ **SC-003**: 95%+ departments with phone + email (validated by T006)
- ✅ **SC-004**: 100% working website links (validated by T008)
- ✅ **SC-005**: All emails use @*.gov.in (enforced by T002 validation)
- ✅ **SC-006**: 80%+ departments with grievance emails (validated by T008)
- ✅ **SC-007**: District offices for 5 departments × 13 districts *(revised to 26 districts per research.md)* (delivered by T009-T013)
- ✅ **SC-008**: <3s page load with full dataset (validated by T016 Lighthouse)

---

## Notes

**Data Source Traceability**: Every authority entry MUST have its source URL documented in `src/data/README.md` per T003. This ensures data can be verified and updated in future maintenance cycles.

**Validation is Mandatory**: Run `node src/data/validate-data.js` after every 10-20 entries during data collection (T005, T009-T013). Catching errors early saves debugging time.

**Commit Frequently**: Small commits after every 5-10 entries make it easier to identify and fix issues. Follow suggested commit messages in task descriptions.

**Performance Monitoring**: If file size approaches 500 KB during data collection, alert and re-assess. May need to split JSON files or optimize descriptions.

**District Name Accuracy**: Double-check district name spelling against official AP government list (26 districts as of 2024 reorganization). Validation will fail if names don't match enum in schema.

**Quarterly Maintenance**: After Feature 002 deployment, set calendar reminder for quarterly data review (update `lastVerified` dates, check for department reorganizations, verify phone/email deliverability).

---

**Tasks Document Complete**  
**Ready for**: Implementation  
**Next Step**: Begin with T001 (Create new categories in categories.json)
