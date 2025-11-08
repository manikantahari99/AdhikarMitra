# Data Directory

Authoritative JSON datasets consumed by the static site.

## Files

- `categories.json` – Category definitions (id, name, description, order, icon)
- `authorities.state.json` – Andhra Pradesh authority records (state and district level)
- `authorities.national.json` – (Planned in later task T060)

## Authority Record Schema (Feature 002 Extended)

Refer to full spec in `specs/002-add-comprehensive-andhra/data-model.md`.

### Core Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | string | Yes | Unique slug, lowercase kebab-case, 3-50 chars |
| name | string | Yes | Display name, 5-100 chars |
| scope | enum | Legacy | `state` or `national` (legacy, optional) |
| category | string | Yes | Must match a category id in categories.json |
| description | string | Yes | 100-300 chars for Feature 002 entries |
| lastVerified | date (ISO 8601) | Yes | Format: YYYY-MM-DD, not in future |

### Contact Fields (Feature 002)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| contact.phone | string | Yes | 10 digits or 04xx-xxxxxxx format |
| contact.email | string | Yes | Must end with .gov.in |
| contact.grievanceEmail | string | No | Dedicated grievance email (must differ from primary) |
| contact.helpline | string | No | Toll-free (1800-xxx-xxxx) or 10-digit |

### Website Fields (Feature 002)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| website | string | Yes | Official authority website (HTTPS required) |
| departmentWebsite | string | No | Parent department website (HTTPS required) |

### Hierarchy Fields (Feature 002)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| district | string/null | No | AP district name (null for state-level), must match 26 official districts |
| parentDepartment | string/null | No | Authority ID of parent department (for district offices) |
| escalationPath | array | No | Array of authority IDs (ordered) |

### Legacy Fields (Feature 001)

| Field | Type | Notes |
|-------|------|-------|
| primaryContacts | array(PhoneContact) | Legacy format from Feature 001, still supported |
| portalUrls | array | Legacy format, still supported |

## PhoneContact (Legacy Format)

`{"raw": "18004254545", "type": "tollfree"}` optionally with `stdCode` for landlines.

## Validation

Run `validate-data.js` (T002 - Feature 002 extended) in a browser devtools console (after embedding) or with Node (basic fallback) to verify integrity.

### Feature 002 Validation Rules

- File size: authorities.state.json must be ≤ 500 KB
- Email format: All emails must end with `.gov.in`
- Phone format: Must match `^\d{10}$` or `^\d{4}-\d{7}$`
- Website URLs: Must use `https://` protocol
- District names: Must match one of 26 official AP districts
- Parent department: Must reference existing authority ID
- Grievance email: Must differ from primary email (if present)
- Date format: ISO 8601 (YYYY-MM-DD), not future-dated
- ID uniqueness: No duplicate authority IDs
- Category reference: Must exist in categories.json

---

## Data Sources & Verification Log

**Feature**: 002-add-comprehensive-andhra  
**Purpose**: Document data sources and verification dates for all authority entries  
**Maintenance**: Update quarterly (next review: March 2026)

### Data Collection Methodology

All contact information for Andhra Pradesh government departments is collected from official government portals and verified through multiple methods:

1. **Primary Sources**:
   - AP State Portal: `https://www.ap.gov.in`
   - AP Secretariat: `https://apsecretariat.ap.gov.in`
   - Individual department official websites
   - AP Grievance Portal: `https://grievance.ap.gov.in`

2. **Verification Methods**:
   - Phone numbers: Sample test calls to verify reachability
   - Email addresses: Deliverability checks
   - Website links: HTTP 200 response verification
   - Cross-reference with multiple official sources where available

3. **Update Schedule**:
   - Quarterly review cycle (every 3 months)
   - Update `lastVerified` field in JSON during each review
   - Monitor for department reorganizations

### Authority Entry Sources

**Format**: `[authority-id]: [source-url] (verified: YYYY-MM-DD) [notes]`

#### State-Level Departments

> **Note**: This section will be populated during T005 (state-level data collection)

Example entries:

```text
transport-dept: https://aptransport.gov.in/contact-us (verified: 2024-12-01)
revenue-dept: https://revenue.ap.gov.in/about/contact (verified: 2024-12-01)
police-hq: https://appolice.gov.in/headquarters (verified: 2024-12-01) [Grievance email from grievance.ap.gov.in]
```

#### District-Level Offices

> **Note**: This section will be populated during T009-T013 (district-level data collection)

**Revenue Department (District Collectors)**: Source TBD  
**Police Department (SPs)**: Source TBD  
**Transport Department (RTOs)**: Source TBD  
**Health Department (DMHOs)**: Source TBD  
**Education Department (DEOs)**: Source TBD

### Known Data Gaps

> **To be documented**: Any departments where complete information is unavailable

### Verification Issues

> **To be documented**: Any failed verification attempts and resolutions

---

## Maintenance Instructions

### Quarterly Review Process

1. **Data Verification** (10-15 sample entries):
   - Call 5-10 phone numbers across different departments
   - Send test emails to 5-10 email addresses
   - Check 10-15 website links for accessibility

2. **Update Records**:
   - Update `lastVerified` field in authorities.state.json
   - Update source URLs if department websites have moved
   - Document any changes in this README.md

3. **Monitor for Changes**:
   - Check AP government portal for department reorganizations
   - Watch for new districts (AP has undergone reorganization recently)

4. **Commit Changes**:

   ```bash
   git add src/data/
   git commit -m "chore: quarterly data verification update [YYYY-MM]"
   ```

### Reporting Incorrect Data

If users report incorrect contact information:

1. Verify the claim by checking official department website
2. Update the entry in authorities.state.json
3. Document the change in "Verification Issues" section above
4. Update lastVerified date
5. Commit: `fix: correct [field] for [authority-id] (reported by user)`

---

## Statistics

> **Status**: Updated automatically after each data collection phase

- **Last Updated**: 2024-11-08 (T003 setup)
- **Total Authorities**: 12 (existing) → Target: 165
- **State-Level Departments**: TBD (target: 35+)
- **District-Level Offices**: TBD (target: 130)
- **Coverage Goals**:
  - With Phone: 95%+
  - With Email: 95%+
  - With Grievance Email: 80%+
  - With Website: 100%

## Change Workflow

1. Add or modify records in JSON.
2. Ensure `lastVerified` is updated when verifying data.
3. Run validation script.
4. Commit with message referencing task or issue id.

## Extensibility

Adding new optional fields is backward compatible (per FR-009). Avoid renaming existing keys without migration.
