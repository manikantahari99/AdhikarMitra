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

- [ ] **T001** [SETUP] Add 2 new categories to `src/data/categories.json`
  - Add category: `central-admin` with name "Central Administration", description "Passport services, census, vigilance, and central government administrative offices", icon "🏛️", order 170
  - Add category: `central-public-services` with name "Central Public Services", description "Postal services, telecommunications, and other central government citizen services", icon "📬", order 180
  - Maintain alphabetical/order sorting
  - **Deliverable**: 19 total categories (17 existing + 2 new)

---

## Phase 2: Data Collection (3-4 hours)

- [ ] **T002** [DATA] Collect and add 18-22 central government office entries to `src/data/authorities.state.json`
  
  **Data Collection Checklist**:
  
  ### Tax & Revenue (6 entries)
  - [ ] Income Tax Office - Visakhapatnam (category: `revenue-taxation`, district: "Visakhapatnam")
  - [ ] Income Tax Office - Vijayawada (category: `revenue-taxation`, district: "Krishna")
  - [ ] Income Tax Office - Guntur (category: `revenue-taxation`, district: "Guntur")
  - [ ] Income Tax Office - Tirupati (category: `revenue-taxation`, district: "Tirupati")
  - [ ] Central GST & Central Excise - Visakhapatnam Commissionerate (category: `revenue-taxation`, district: "Visakhapatnam")
  - [ ] Central GST & Central Excise - Vijayawada Commissionerate (category: `revenue-taxation`, district: "Krishna")
  
  ### Travel & Identity (2 entries)
  - [ ] Regional Passport Office - Visakhapatnam (category: `central-admin`, district: "Visakhapatnam")
  - [ ] Regional Passport Office - Tirupati (category: `central-admin`, district: "Tirupati")
  
  ### Railways (3 entries)
  - [ ] South Central Railway - Vijayawada Division (category: `transport`, district: "Krishna")
  - [ ] South Central Railway - Guntur Division (category: `transport`, district: "Guntur")
  - [ ] Indian Railways Helpline (category: `transport`, district: null for helpline)
  
  ### Postal Services (2 entries)
  - [ ] India Post - Andhra Pradesh Circle Office (category: `central-public-services`, district: "Krishna")
  - [ ] Speed Post & Courier Services (category: `central-public-services`, district: null for helpline)
  
  ### Employment & Labour (4 entries)
  - [ ] EPFO - Visakhapatnam Regional Office (category: `public-services`, district: "Visakhapatnam")
  - [ ] EPFO - Vijayawada Regional Office (category: `public-services`, district: "Krishna")
  - [ ] ESI Corporation - AP Regional Office (category: `public-services`, district: "Krishna")
  - [ ] Central Labour Commissioner - AP Office (category: `public-services`, district: "Krishna")
  
  ### Telecom (2 entries)
  - [ ] BSNL - Andhra Pradesh Circle Customer Care (category: `utilities`, district: null)
  - [ ] Department of Telecommunications - AP Office (category: `utilities`, district: "Krishna")
  
  ### Other Central Services (1-2 entries)
  - [ ] Central Pollution Control Board - AP Regional Office (category: `environment-forest`, district: "Krishna")
  - [ ] (Optional) Census of India - AP Directorate (category: `central-admin`, district: "Krishna")
  
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

- [ ] **T003** [VALIDATION] Validate data and test UI functionality
  - Run: `.\scripts\validate-data.ps1`
  - Fix all reported errors (invalid emails, phone formats, duplicate IDs)
  - Verify file size is within budget (should be ~25-30 KB with 68 total entries)
  - **UI Testing Checklist**:
    - [ ] Click "🏢 Central Government" filter → verify 18-22 entries appear
    - [ ] Click "🏛️ State Government" filter → verify 46 state entries appear
    - [ ] Click "🇮🇳 All Authorities" → verify all 64-68 entries appear
    - [ ] Search for "income tax" → verify Income Tax offices appear
    - [ ] Search for "railway" → verify railway offices appear
    - [ ] Click any central authority card → verify website opens in new tab
    - [ ] View detail page → verify "🇮🇳 Central" scope badge displays
    - [ ] View detail page → verify district field shows city name
    - [ ] View detail page → verify helpline numbers display (if exists)
    - [ ] Check page load time with browser DevTools → verify <3 seconds
  - **Acceptance**: All validation passes, all UI tests pass, performance within budget
  - Commit: `git commit -m "feat: complete Feature 003 - central government departments (68 total authorities)"`
  - **Milestone**: Feature 003 complete

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
