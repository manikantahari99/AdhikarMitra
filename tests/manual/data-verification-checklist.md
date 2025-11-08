# Data Verification Checklist

**Feature**: 002-add-comprehensive-andhra  
**Component**: authorities.state.json, categories.json  
**Test Type**: Manual data quality review  
**Last Updated**: 2024-11-08

## Purpose

Ensure data quality, accuracy, and completeness for all authority entries before deployment.

---

## Pre-Verification Setup

- [ ] Run `node src/assets/js/validate-data.js` (automated validation)
- [ ] Review validation output for errors/warnings
- [ ] Fix all errors before proceeding with manual checks
- [ ] Document validation warnings that cannot be auto-fixed

**Validation Output Summary**:
```
File: authorities.state.json
Size: [XX] KB (Budget: 500 KB max)
State Authorities: [XX] / 35 target
District Authorities: [XX] / 130 target
Total: [XX] / 165 target

Errors: [XX]
Warnings: [XX]
```

---

## Phase 1: State-Level Data Verification (T006)

**Timing**: After T005 (state data collection), before T007 (MVP release)  
**Target**: 35 state-level departments  
**Estimated Time**: 2-3 hours

### A. Schema Compliance (Automated + Manual)

| Check | Method | Pass/Fail | Notes |
|-------|--------|-----------|-------|
| All IDs unique | Automated | | validate-data.js |
| All IDs follow kebab-case format | Automated | | validate-data.js |
| All entries have required fields (id, name, category, contact, website, lastVerified) | Automated | | |
| No future-dated lastVerified | Automated | | |
| All category references valid | Automated | | |
| All emails end with .gov.in | Automated | | |
| All websites use HTTPS | Automated | | |
| Phone numbers match format (10-digit or 04xx-xxxxxxx) | Automated | | |
| Descriptions 100-300 chars | Automated | | |
| File size ≤ 500 KB | Automated | | |

### B. Sample Contact Verification (Manual)

**Instructions**: Select 10 random entries and verify contact information accuracy.

| Entry ID | Name | Phone Verified | Email Verified | Website Verified | Notes |
|----------|------|----------------|----------------|------------------|-------|
| 1. | | ✅/❌/⏸️ | ✅/❌/⏸️ | ✅/❌/⏸️ | |
| 2. | | ✅/❌/⏸️ | ✅/❌/⏸️ | ✅/❌/⏸️ | |
| 3. | | ✅/❌/⏸️ | ✅/❌/⏸️ | ✅/❌/⏸️ | |
| 4. | | ✅/❌/⏸️ | ✅/❌/⏸️ | ✅/❌/⏸️ | |
| 5. | | ✅/❌/⏸️ | ✅/❌/⏸️ | ✅/❌/⏸️ | |
| 6. | | ✅/❌/⏸️ | ✅/❌/⏸️ | ✅/❌/⏸️ | |
| 7. | | ✅/❌/⏸️ | ✅/❌/⏸️ | ✅/❌/⏸️ | |
| 8. | | ✅/❌/⏸️ | ✅/❌/⏸️ | ✅/❌/⏸️ | |
| 9. | | ✅/❌/⏸️ | ✅/❌/⏸️ | ✅/❌/⏸️ | |
| 10. | | ✅/❌/⏸️ | ✅/❌/⏸️ | ✅/❌/⏸️ | |

**Verification Methods**:
- **Phone**: Call and verify it rings / answered by department
- **Email**: Send test email and check deliverability (no bounce)
- **Website**: Open URL and verify it's the correct department (HTTP 200 response)

### C. Category Distribution Check

| Category | Count | Expected | Status | Notes |
|----------|-------|----------|--------|-------|
| agriculture-rural-dev | | ~2-4 | | AP Agriculture Dept, etc. |
| civic | | ~2-3 | | Municipal, Urban Dev |
| education-skill-dev | | ~2-3 | | Education, Skill Dev |
| energy-infrastructure | | ~2-3 | | Power, Energy |
| environment-forest | | ~1-2 | | Forest, Environment |
| finance-administration | | ~2-3 | | Finance, Commercial Tax |
| health | | ~2-3 | | Health, Medical |
| industry-commerce | | ~2-3 | | Industries, Commerce |
| law-enforcement | | ~3-5 | | Police, Prisons, Fire |
| legal | | ~1-2 | | Law, Legal Affairs |
| public-services | | ~3-5 | | General Admin, Public Services |
| revenue-taxation | | ~2-3 | | Revenue, Registration |
| social-welfare | | ~2-3 | | Women & Child, Social Welfare |
| transport | | ~2-3 | | Transport, RTA |
| utilities | | ~2-3 | | APSPDCL, Water |

**Total Expected**: ~35 departments

### D. Grievance Email Coverage (US2, FR-009)

**Target**: 80%+ of entries have grievanceEmail field

| Metric | Count | Percentage | Status |
|--------|-------|------------|--------|
| Total State Entries | | | |
| With Grievance Email | | | Target: ≥80% |
| Without Grievance Email | | | |

**Missing Grievance Emails**: [List entry IDs that need grievanceEmail added]

### E. Official Website Coverage (US3, FR-010)

**Target**: 100% of entries have website field

| Metric | Count | Percentage | Status |
|--------|-------|------------|--------|
| Total State Entries | | | |
| With Website | | | Target: 100% |
| Without Website | | | |

**Missing Websites**: [List entry IDs that need website added]

---

## Phase 2: District-Level Data Verification (T014)

**Timing**: After T009-T013 (district data collection), before T015 (district search)  
**Target**: 130 district offices (5 departments × 26 districts)  
**Estimated Time**: 2-3 hours

### A. Schema Compliance (Automated + Manual)

Same checks as Phase 1, plus:

| Check | Method | Pass/Fail | Notes |
|-------|--------|-----------|-------|
| All district entries have `district` field | Automated | | validate-data.js |
| All `district` values match 26 AP districts enum | Automated | | |
| All district entries have `parentDepartment` field | Automated | | FR-012 |
| All `parentDepartment` IDs reference existing state entries | Automated | | |

### B. District Coverage Matrix

**Target**: 5 departments × 26 districts = 130 entries

| District | Revenue (Collector) | Police (SP) | Transport (RTO) | Health (DMHO) | Education (DEO) | Total |
|----------|---------------------|-------------|-----------------|---------------|-----------------|-------|
| Anantapur | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Chittoor | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| East Godavari | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Guntur | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Krishna | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Kurnool | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Nellore | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Prakasam | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Srikakulam | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Visakhapatnam | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Vizianagaram | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| West Godavari | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| YSR Kadapa | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| NTR | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Parvathipuram Manyam | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Alluri Sitarama Raju | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Kakinada | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Dr. B.R. Ambedkar Konaseema | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Eluru | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Palnadu | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Bapatla | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Annamaya | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Tirupati | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Sri Potti Sriramulu Nellore | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Sri Satya Sai | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| Nandyal | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | /5 |
| **Total** | **/26** | **/26** | **/26** | **/26** | **/26** | **/130** |

**Coverage Status**: [XX]/130 entries (Target: 100%)

### C. Sample District Contact Verification (Manual)

**Instructions**: Select 5 districts randomly and verify 1 entry per department (25 total checks).

| District | Department | Entry ID | Phone | Email | Website | Notes |
|----------|------------|----------|-------|-------|---------|-------|
| [Random 1] | Revenue | | ✅/❌ | ✅/❌ | ✅/❌ | |
| [Random 1] | Police | | ✅/❌ | ✅/❌ | ✅/❌ | |
| [Random 1] | Transport | | ✅/❌ | ✅/❌ | ✅/❌ | |
| [Random 1] | Health | | ✅/❌ | ✅/❌ | ✅/❌ | |
| [Random 1] | Education | | ✅/❌ | ✅/❌ | ✅/❌ | |
| [Random 2] | Revenue | | ✅/❌ | ✅/❌ | ✅/❌ | |
| ... | ... | ... | ... | ... | ... | |

---

## Phase 3: Final Pre-Deployment Verification (T016)

**Timing**: After all data collection, before production deployment  
**Target**: Full 165 entries  
**Estimated Time**: 1 hour

### A. Final Automated Validation

- [ ] Run `node src/assets/js/validate-data.js` (no errors)
- [ ] Confirm file size ≤ 500 KB
- [ ] Confirm 165 total entries (35 state + 130 district)

### B. Statistics Verification

| Metric | Count | Target | Status |
|--------|-------|--------|--------|
| Total Entries | | 165 | |
| State-Level | | 35 | |
| District-Level | | 130 | |
| With Phone | | ≥95% (157+) | |
| With Email | | ≥95% (157+) | |
| With Grievance Email | | ≥80% (132+) | |
| With Website | | 100% (165) | |
| With Parent Dept (district entries) | | 100% (130) | |

### C. Performance Validation

- [ ] Load authorities.state.json in browser (<500ms)
- [ ] Search performance with 165 entries (<200ms)
- [ ] File download size (gzipped) recorded: [XX] KB

### D. Cross-Reference Checks

- [ ] All category IDs in authorities.state.json exist in categories.json
- [ ] All parentDepartment IDs in district entries exist as state-level entries
- [ ] No orphaned entries (district entry without parent, or invalid parent)

---

## Verification Sign-Off

**Data Collector**: [Name]  
**Date Collected**: [YYYY-MM-DD]

**Reviewer**: [Name]  
**Date Reviewed**: [YYYY-MM-DD]

**Validation Status**:
- [ ] All automated validation passed (0 errors)
- [ ] Manual sample verification passed (≥90% accuracy)
- [ ] Coverage targets met (35 state + 130 district)
- [ ] Performance targets met (file size, load time)

**Issues Found**: [Count]  
**Issues Resolved**: [Count]  
**Open Issues**: [Count] (attach issue IDs)

**Approved for Deployment**: ✅ / ❌

**Notes**:
[Any additional comments or observations during verification]

---

## Appendix: Common Data Quality Issues

### Issue: Email Bounce / Invalid

**Symptom**: Test email bounces back  
**Action**: 
1. Verify email on official department website
2. Call department to confirm correct email
3. Update authorities.state.json
4. Document in src/data/README.md (Verification Issues section)

### Issue: Phone Number Unreachable

**Symptom**: Phone call doesn't connect or wrong department  
**Action**:
1. Verify phone on official website
2. Check for STD code errors (04xx vs 4-digit)
3. Update authorities.state.json
4. Document issue

### Issue: Website 404 / Not Found

**Symptom**: Website URL returns 404 or non-HTTPS redirect  
**Action**:
1. Search for updated department website
2. Check AP State Portal for new links
3. Update website field
4. Document old URL → new URL mapping

### Issue: Missing Grievance Email

**Symptom**: No grievanceEmail field but department has grievance mechanism  
**Action**:
1. Check grievance.ap.gov.in for department-specific email
2. Check department website for "Grievances" or "Contact" page
3. Add grievanceEmail field if found
4. Document in "Known Data Gaps" if unavailable

### Issue: District Name Typo

**Symptom**: District name doesn't match 26 official AP districts enum  
**Action**:
1. Verify against official AP government district list
2. Correct spelling (e.g., "Vizianagaram" not "Vijayanagaram")
3. Run validate-data.js to confirm fix
