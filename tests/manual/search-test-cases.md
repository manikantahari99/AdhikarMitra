# Search Functionality Test Cases

**Feature**: 002-add-comprehensive-andhra  
**Component**: Search module (src/assets/js/search.js)  
**Test Type**: Manual browser testing  
**Last Updated**: 2024-11-08

## Purpose

Validate search functionality enhancements for Feature 002, including email, phone, district field searches.

---

## Test Environment Setup

1. Start local web server: `python -m http.server 8000` or similar
2. Open browser: Navigate to `http://localhost:8000`
3. Open DevTools Console to monitor errors
4. Load authorities.state.json in Network tab to verify data loaded

---

## Test Case Template

| ID | Test Case | Input | Expected Result | Actual Result | Status | Notes |
|----|-----------|-------|-----------------|---------------|--------|-------|
| TC-S001 | ... | ... | ... | ... | ✅/❌/⏸️ | ... |

**Status Legend**:
- ✅ PASS: Test passed completely
- ❌ FAIL: Test failed, issue found
- ⏸️ SKIP: Test skipped (dependency not met)

---

## Pre-Feature 002 Baseline Tests (T007 - Before)

### Basic Search (Name)

| ID | Test Case | Input | Expected Result | Actual Result | Status | Notes |
|----|-----------|-------|-----------------|---------------|--------|-------|
| TC-S001 | Search by authority name | "electricity" | Show APSPDCL entry | | | Baseline |
| TC-S002 | Case-insensitive search | "ELECTRICITY" | Same as TC-S001 | | | Baseline |
| TC-S003 | Partial name match | "pdcl" | Show APSPDCL entry | | | Baseline |
| TC-S004 | Empty search | "" | Show all authorities | | | Baseline |
| TC-S005 | No results | "xyzabc123" | Show "No authorities found" | | | Baseline |

### Category Filter

| ID | Test Case | Input | Expected Result | Actual Result | Status | Notes |
|----|-----------|-------|-----------------|---------------|--------|-------|
| TC-C001 | Filter by utilities | Select "Utilities" | Show only utilities category | | | Baseline |
| TC-C002 | Filter by health | Select "Health" | Show only health category | | | Baseline |
| TC-C003 | All categories | Select "All" | Show all authorities | | | Baseline |

---

## Feature 002 Enhancement Tests (T007 - After)

### Email Search (FR-008)

| ID | Test Case | Input | Expected Result | Actual Result | Status | Notes |
|----|-----------|-------|-----------------|---------------|--------|-------|
| TC-E001 | Search by full email | "contact@revenue.ap.gov.in" | Show Revenue Dept entry | | | Assuming example data |
| TC-E002 | Search by email domain | "police.ap.gov.in" | Show all police entries | | | |
| TC-E003 | Search by email username | "grievance@" | Show entries with grievanceEmail field | | | |
| TC-E004 | Case-insensitive email | "CONTACT@REVENUE" | Same as TC-E001 | | | |

### Phone Search (FR-009)

| ID | Test Case | Input | Expected Result | Actual Result | Status | Notes |
|----|-----------|-------|-----------------|---------------|--------|-------|
| TC-P001 | Search by 10-digit phone | "1234567890" | Show entry with that phone | | | Assuming example data |
| TC-P002 | Search by formatted phone | "0123-4567890" | Show entry with that phone | | | |
| TC-P003 | Search by partial phone | "1234" | Show entries with phones containing "1234" | | | |
| TC-P004 | Search by toll-free | "1800" | Show all toll-free entries | | | |
| TC-P005 | Phone with spaces/dashes | "123-456-7890" | Normalize and match | | | Strip non-digits |

### District Search (US4, T015)

| ID | Test Case | Input | Expected Result | Actual Result | Status | Notes |
|----|-----------|-------|-----------------|---------------|--------|-------|
| TC-D001 | Search by district name | "Visakhapatnam" | Show all Visakhapatnam district entries | | | Skip until T015 |
| TC-D002 | Search by district partial | "Vijay" | Show Vijayawada entries | | | Skip until T015 |
| TC-D003 | Case-insensitive district | "GUNTUR" | Show Guntur entries | | | Skip until T015 |
| TC-D004 | State-level vs district | "state" | Show only state-level authorities | | | Skip until T015 |

### Multi-Field Combined Search

| ID | Test Case | Input | Expected Result | Actual Result | Status | Notes |
|----|-----------|-------|-----------------|---------------|--------|-------|
| TC-M001 | Search name + category | Query: "police", Category: "Law Enforcement" | Show only police in law-enforcement category | | | |
| TC-M002 | Search email + category | Query: "@health.ap.gov.in", Category: "Health" | Show health dept emails | | | |
| TC-M003 | Search district + category | Query: "Guntur", Category: "Revenue" | Show Guntur revenue office | | | Skip until T015 |

---

## Edge Cases & Validation

| ID | Test Case | Input | Expected Result | Actual Result | Status | Notes |
|----|-----------|-------|-----------------|---------------|--------|-------|
| TC-X001 | Special characters in search | "!@#$%" | Show no results gracefully | | | No crash |
| TC-X002 | Very long search query | 500+ character string | Truncate or handle gracefully | | | Performance check |
| TC-X003 | Numeric-only search | "123456" | Match phones, IDs if applicable | | | |
| TC-X004 | Search with leading/trailing spaces | " police " | Trim and match "police" | | | |
| TC-X005 | Multiple consecutive spaces | "andhra  pradesh" | Normalize to single space | | | |

---

## Performance Tests

| ID | Test Case | Input | Expected Result | Actual Result | Status | Notes |
|----|-----------|-------|-----------------|---------------|--------|-------|
| TC-PERF001 | Search with 35 state entries | Any query | Results appear < 100ms | | | After T005 |
| TC-PERF002 | Search with 165 total entries | Any query | Results appear < 200ms | | | After T013 |
| TC-PERF003 | Rapid consecutive searches | Type quickly | No lag or freezing | | | Debounce check |

---

## Accessibility Tests

| ID | Test Case | Input | Expected Result | Actual Result | Status | Notes |
|----|-----------|-------|-----------------|---------------|--------|-------|
| TC-A001 | Keyboard navigation | Tab through search inputs | Focus visible, logical order | | | |
| TC-A002 | Screen reader labels | Read form labels | Descriptive labels announced | | | |
| TC-A003 | Search via Enter key | Type + press Enter | Same as clicking search button | | | |

---

## Regression Tests (Ensure no breaking changes)

| ID | Test Case | Input | Expected Result | Actual Result | Status | Notes |
|----|-----------|-------|-----------------|---------------|--------|-------|
| TC-R001 | Existing 12 entries still searchable | Search existing entry names | All 12 found | | | Backward compat |
| TC-R002 | Legacy contact format search | Search phone from legacy entry | Found via primaryContacts array | | | |
| TC-R003 | PortalUrls still accessible | Click "View Details" | Modal shows portalUrls if exists | | | |

---

## Test Execution Log

**Test Session**: [Date] - [Tester Name]  
**Build/Branch**: 002-add-comprehensive-andhra  
**Browser**: [Chrome/Firefox/Safari] [Version]  
**Dataset**: [12 entries / 35 state / 165 total]

### Summary

- Total Tests: TBD
- Passed: TBD
- Failed: TBD
- Skipped: TBD

### Issues Found

1. [Issue ID]: [Description]
   - Severity: [High/Medium/Low]
   - Steps to Reproduce: [...]
   - Expected: [...]
   - Actual: [...]

---

## Notes for Testers

- **T007 (MVP)**: Focus on TC-S*, TC-E*, TC-P* test cases (name, email, phone search)
- **T015 (US4)**: Add TC-D* test cases (district search)
- **T016 (Polish)**: Run full regression suite including performance and accessibility
- Update "Actual Result" column during testing
- Document any unexpected behavior in "Notes" column
- Take screenshots for failed tests and attach to issue tracker
