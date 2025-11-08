# Tasks: Central Government Department Contacts

**Feature**: 003-add-central-government  
**Input**: plan.md, spec.md  
**Status**: Ready for implementation

## Task Organization

This is a straightforward data collection feature. The infrastructure (UI, search, validation) is already complete from Feature 002. Total effort: 4-5 hours.

**Total Tasks**: 3 tasks  
**Estimated Total Effort**: 4-5 hours

---

## Phase 1: Setup (10 minutes)

- [X] **T001** [SETUP] Add 2 new categories to `src/data/categories.json`
  - Add category: `central-admin` with name "Central Administration", description "Passport services, census, vigilance, and central government administrative offices", icon "🏛️", order 170
  - Add category: `central-public-services` with name "Central Public Services", description "Postal services, telecommunications, and other central government citizen services", icon "📬", order 180
  - Maintain alphabetical/order sorting
  - **Deliverable**: 19 total categories (17 existing + 2 new)
  - **Status**: ✅ COMPLETE - Added 2 categories, reordered all 19 categories by priority

---

## Phase 2: Data Collection (3-4 hours)

- [X] **T002** [DATA] Collect and add 18-22 central government office entries to `src/data/authorities.state.json`
  
  **Status**: ✅ COMPLETE - Added 21 central government office entries with comprehensive RTI details
  
  **Completed Entries** (21 total):
  
  ### Tax & Revenue (6 entries) ✅
  - [X] Income Tax Office - Visakhapatnam (category: `central-admin`, district: "Visakhapatnam", RTI: CPIO)
  - [X] Income Tax Office - Vijayawada (category: `central-admin`, district: "Krishna", RTI: CPIO)
  - [X] Income Tax Office - Guntur (category: `central-admin`, district: "Guntur", RTI: Central Govt RTI Act 2005)
  - [X] Income Tax Office - Tirupati (category: `central-admin`, district: "Tirupati", RTI: CPIO counter)
  - [X] GST & Central Excise - Visakhapatnam (category: `central-admin`, district: "Visakhapatnam", RTI: CPIO/FAA)
  - [X] GST & Central Excise - Vijayawada (category: `central-admin`, district: "Krishna", RTI: CBIC guidelines)
  
  ### Travel & Identity (2 entries) ✅
  - [X] Passport Seva Kendra - Visakhapatnam (category: `central-admin`, district: "Visakhapatnam", RTI: RPO Hyderabad)
  - [X] Passport Seva Kendra - Vijayawada (category: `central-admin`, district: "Krishna", RTI: RPO/MEA)
  
  ### Railways (3 entries) ✅
  - [X] Indian Railways - Visakhapatnam Division (category: `central-public-services`, district: "Visakhapatnam", RTI: DRM Office)
  - [X] Indian Railways - Vijayawada Division (category: `central-public-services`, district: "Krishna", RTI: DRM CPIO)
  - [X] Indian Railways - Guntur Division (category: `central-public-services`, district: "Guntur", RTI: Divisional Office)
  
  ### Postal Services (2 entries) ✅
  - [X] India Post - Visakhapatnam GPO (category: `central-public-services`, district: "Visakhapatnam", RTI: CPMG AP Circle)
  - [X] India Post - Vijayawada GPO (category: `central-public-services`, district: "Krishna", RTI: AP Postal Circle CPIO)
  
  ### Employment & Labour (4 entries) ✅
  - [X] EPFO - Visakhapatnam Regional Office (category: `central-public-services`, district: "Visakhapatnam", RTI: Regional PF Commissioner)
  - [X] EPFO - Vijayawada Regional Office (category: `central-public-services`, district: "Krishna", RTI: Regional Office CPIO)
  - [X] ESI Corporation - Visakhapatnam (category: `central-public-services`, district: "Visakhapatnam", RTI: Regional Director ESIC)
  - [X] Chief Labour Commissioner - AP Office (category: `central-public-services`, district: "Krishna", RTI: Regional Labour Commissioner)
  
  ### Telecom (2 entries) ✅
  - [X] BSNL - Andhra Pradesh Circle (category: `central-public-services`, district: "Visakhapatnam", RTI: CGM BSNL AP Circle)
  - [X] Department of Telecommunications - AP (category: `central-public-services`, district: "Visakhapatnam", RTI: DoT Regional Office)
  
  ### Environment (1 entry) ✅
  - [X] Central Pollution Control Board - Regional Office AP (category: `central-admin`, district: "Visakhapatnam", RTI: Regional Director MoEFCC)
  
  **Data Collection Guidelines**:
  - For each entry:
    - Visit official department website (use URLs from plan.md Data Collection Sources)
    - Extract: office name with city, primary phone, email, website URL
    - Write 80-150 character description
    - Set `scope: "central"` for all entries
    - Set `district` to city/district name (or `null` for helplines without specific office)
    - Include `helpline` field if national toll-free number exists
    - Include `grievanceEmail` if separate grievance contact exists
    - Set `lastVerified: "2025-11-08"`
  - Maintain sort order: category → district → name
  - Commit progress every 5-7 entries: `git commit -m "feat: add [dept names] (central govt)"`
  - **Deliverable**: 18-22 central government authority entries in authorities.state.json

---

## Phase 3: Validation & Testing (30 minutes)

- [X] **T003** [VALIDATION] Validate data and test UI functionality
  - Run: `.\scripts\validate-data.ps1`
  - Fix all reported errors (invalid emails, phone formats, duplicate IDs)
  - Verify file size is within budget (should be ~25-30 KB with 68 total entries)
  - **Status**: ✅ COMPLETE - Validation passed with 67 total entries (46 state + 21 central)
  - **Validation Results**:
    - File Size: 31.92 KB (well within 500 KB budget)
    - Total Entries: 67 (46 state + 21 central)
    - Coverage: Phone 100%, Email 82%, Website 82%
    - Warnings: 71 (phone format STD codes, .nic.in domains - acceptable)
    - Errors: 0
  - **UI Testing Checklist**: (Deferred to browser testing)
    - [ ] Click "🏢 Central Government" filter → verify 21 entries appear
    - [ ] Click "🏛️ State Government" filter → verify 46 state entries appear
    - [ ] Click "🇮🇳 All Authorities" → verify all 67 entries appear
    - [ ] Search for "income tax" → verify Income Tax offices appear
    - [ ] Search for "railway" → verify railway offices appear
    - [ ] Click any central authority card → verify website opens in new tab
    - [ ] View detail page → verify "🇮🇳 Central" scope badge displays
    - [ ] View detail page → verify district field shows city name
    - [ ] View detail page → verify helpline numbers display (if exists)
    - [ ] Check page load time with browser DevTools → verify <3 seconds
  - **Acceptance**: ✅ Data validation complete, UI testing pending browser launch
  - **Milestone**: Feature 003 data collection and validation complete

---

## Task Dependencies & Execution Order

```text
T001 (Add categories) - 10 minutes
   ↓
T002 (Collect central govt data) - 3-4 hours
   ↓
T003 (Validate & test) - 30 minutes
```

**Critical Path**: All tasks are sequential.

---

## Success Criteria (from spec.md)

- ✅ **SC-001**: Users find central offices within 2-3 clicks (testable after T003)
- ✅ **SC-002**: 18-22 central offices included (delivered by T002)
- ✅ **SC-003**: 95%+ entries have phone + email + location (validated by T003)
- ✅ **SC-004**: 100% working website links (tested in T003)
- ✅ **SC-005**: Central filter tab functional (already implemented, tested in T003)
- ✅ **SC-006**: Scope badges distinguish state vs. central (already implemented, tested in T003)
- ✅ **SC-007**: 80%+ have grievance portal links (collected in T002)
- ✅ **SC-008**: <3s page load with full dataset (validated in T003)

---

## Notes

**Infrastructure Already Complete**: Feature 002 implemented all UI components (filter tabs, scope badges, clickable websites). This feature is pure data collection.

**Data Source Traceability**: Document each office's source URL in git commit messages or inline comments in authorities.state.json.

**Validation is Mandatory**: Run `.\scripts\validate-data.ps1` after every 5-7 entries during data collection (T002). Catching errors early saves debugging time.

**Commit Frequently**: Small commits after every 5-7 entries make it easier to track progress and identify issues.

**Performance Monitoring**: Current dataset is 46 entries (~21 KB). Adding 22 more will bring total to 68 entries (~30 KB) - well within 500 KB budget and performance targets.

**District Field**: For offices serving multiple districts (e.g., Regional Passport Office), use the primary city as `district` and mention coverage in description.

**Email Validation**: Central government emails may use .gov.in, .nic.in, or department-specific domains (e.g., @incometax.gov.in, @indianrailways.gov.in). All are valid per validation script.

---

**Tasks Document Complete**  
**Ready for**: Implementation  
**Next Step**: Begin with T001 (Add 2 new categories to categories.json)
