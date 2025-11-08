# Data Model: Comprehensive AP Government Data

**Feature**: 002-add-comprehensive-andhra  
**Date**: December 2024  
**Status**: Complete

## Overview

This document defines the data structures for storing comprehensive contact information for Andhra Pradesh state government departments. The model extends the existing `authorities.state.json` schema from Feature 001 with additional fields to support department websites, grievance-specific contacts, and district-level office hierarchies.

## Core Entities

### 1. Authority Entity

**Description**: Represents a government department, office, or authority with contact information.

**Schema**:

```json
{
  "id": "string (required, unique, kebab-case)",
  "name": "string (required, human-readable)",
  "category": "string (required, must match category.id in categories.json)",
  "description": "string (required, 100-300 chars)",
  "contact": {
    "phone": "string (required, format: 10-digit or with STD code)",
    "email": "string (required, format: *@ap.gov.in or *@*.gov.in)",
    "grievanceEmail": "string (optional, format: same as email)",
    "helpline": "string (optional, format: toll-free 1800-xxx-xxxx or 10-digit)"
  },
  "website": "string (required, format: https://*, must be official gov domain)",
  "departmentWebsite": "string (optional, parent department site if different)",
  "district": "string (optional, null for state-level, must match AP district name)",
  "parentDepartment": "string (optional, authority ID for parent state-level dept)",
  "lastVerified": "string (required, format: YYYY-MM-DD)",
  "escalationPath": ["string (optional, array of authority IDs)"]
}
```

**Field Definitions**:

| Field | Type | Required | Constraints | Example |
|-------|------|----------|-------------|---------|
| `id` | string | Yes | Unique, lowercase, kebab-case, 3-50 chars | `"rto-guntur"` |
| `name` | string | Yes | Human-readable, 5-100 chars | `"Regional Transport Office, Guntur"` |
| `category` | string | Yes | Must exist in `categories.json` | `"Transport"` |
| `description` | string | Yes | 100-300 chars, plain text | `"Vehicle registration and licensing services for Guntur district"` |
| `contact.phone` | string | Yes | 10-digit or with STD code (04xx-xxxxxxx), no spaces/hyphens | `"0863-2222222"` or `"8632222222"` |
| `contact.email` | string | Yes | Valid email, must end with `.gov.in` | `"rto.guntur@aptransport.gov.in"` |
| `contact.grievanceEmail` | string | No | Valid email, different from primary | `"grievance.rto.guntur@ap.gov.in"` |
| `contact.helpline` | string | No | Toll-free (1800-xxx-xxxx) or 10-digit | `"1800-425-2000"` |
| `website` | string | Yes | Valid HTTPS URL, official gov domain | `"https://aptransport.gov.in/rto/guntur"` |
| `departmentWebsite` | string | No | Valid HTTPS URL, parent dept site | `"https://aptransport.gov.in"` |
| `district` | string | No | Null for state-level, exact AP district name | `"Guntur"` or `null` |
| `parentDepartment` | string | No | Must be valid authority ID | `"transport-dept"` |
| `lastVerified` | string | Yes | ISO 8601 date (YYYY-MM-DD) | `"2024-12-01"` |
| `escalationPath` | array | No | Array of authority IDs (must exist) | `["transport-dept", "state-transport-commissioner"]` |

**Validation Rules**:

1. **ID Uniqueness**: No two authorities can share the same `id`
2. **Category Existence**: `category` must match an `id` in `categories.json`
3. **Email Domain**: All emails must end with `.gov.in` (AP government standard)
4. **Phone Format**: Must be 10 digits (no spaces/hyphens) or STD code format (04xx-xxxxxxx)
5. **Website Protocol**: All website URLs must use `https://` (HTTP not allowed)
6. **District Name**: If `district` is not null, must match official AP district name (26 districts)
7. **Parent Department**: If `parentDepartment` is set, must be a valid authority ID
8. **Date Format**: `lastVerified` must be valid ISO 8601 date (YYYY-MM-DD)
9. **Description Length**: 100-300 characters (enforced for readability)
10. **Grievance Email Uniqueness**: If `grievanceEmail` exists, must differ from `contact.email`

**Example Authority (State-Level)**:

```json
{
  "id": "ap-police-hq",
  "name": "Andhra Pradesh Police Headquarters",
  "category": "Law Enforcement",
  "description": "State police headquarters responsible for law enforcement, crime prevention, and public safety across Andhra Pradesh. Coordinates with district police units.",
  "contact": {
    "phone": "0866-2978440",
    "email": "dgp@appolice.gov.in",
    "grievanceEmail": "grievance.police@ap.gov.in",
    "helpline": "100"
  },
  "website": "https://appolice.gov.in",
  "departmentWebsite": null,
  "district": null,
  "parentDepartment": null,
  "lastVerified": "2024-12-01",
  "escalationPath": []
}
```

**Example Authority (District-Level)**:

```json
{
  "id": "sp-guntur",
  "name": "Superintendent of Police, Guntur",
  "category": "Law Enforcement",
  "description": "District police administration for Guntur, handling law and order, crime investigation, and traffic management within the district.",
  "contact": {
    "phone": "0863-2340100",
    "email": "sp.guntur@appolice.gov.in",
    "grievanceEmail": "grievance.guntur@appolice.gov.in",
    "helpline": "100"
  },
  "website": "https://appolice.gov.in/guntur",
  "departmentWebsite": "https://appolice.gov.in",
  "district": "Guntur",
  "parentDepartment": "ap-police-hq",
  "lastVerified": "2024-12-01",
  "escalationPath": ["ap-police-hq"]
}
```

---

### 2. Category Entity

**Description**: Represents a service category to group related authorities.

**Schema**:

```json
{
  "id": "string (required, unique, kebab-case)",
  "name": "string (required, human-readable)",
  "description": "string (required, 50-200 chars)",
  "icon": "string (required, icon identifier)"
}
```

**Field Definitions**:

| Field | Type | Required | Constraints | Example |
|-------|------|----------|-------------|---------|
| `id` | string | Yes | Unique, lowercase, kebab-case, 3-30 chars | `"education-skill-dev"` |
| `name` | string | Yes | Human-readable, 5-50 chars | `"Education & Skill Development"` |
| `description` | string | Yes | 50-200 chars, plain text | `"Educational institutions, skill training, and academic administration"` |
| `icon` | string | Yes | Icon class or emoji | `"📚"` or `"education-icon"` |

**Validation Rules**:

1. **ID Uniqueness**: No two categories can share the same `id`
2. **Name Length**: 5-50 characters
3. **Description Length**: 50-200 characters
4. **Icon**: Non-empty string (emoji or class name)

**Existing Categories (Feature 001)**:

```json
[
  {
    "id": "law-enforcement",
    "name": "Law Enforcement",
    "description": "Police, security, and law enforcement agencies",
    "icon": "👮"
  },
  {
    "id": "revenue-taxation",
    "name": "Revenue & Taxation",
    "description": "Revenue collection, taxation, and stamp duties",
    "icon": "💰"
  },
  {
    "id": "municipal-services",
    "name": "Municipal Services",
    "description": "City administration, water supply, sanitation",
    "icon": "🏢"
  },
  {
    "id": "transport",
    "name": "Transport",
    "description": "Road transport, vehicle registration, and licensing",
    "icon": "🚗"
  },
  {
    "id": "healthcare",
    "name": "Healthcare",
    "description": "Public health services, hospitals, and medical care",
    "icon": "🏥"
  },
  {
    "id": "consumer-protection",
    "name": "Consumer Protection",
    "description": "Consumer rights, fair trade, and dispute resolution",
    "icon": "🛡️"
  }
]
```

**New Categories (Feature 002)**:

```json
[
  {
    "id": "education-skill-dev",
    "name": "Education & Skill Development",
    "description": "School education, higher education, technical training, and skill development programs",
    "icon": "📚"
  },
  {
    "id": "agriculture-rural-dev",
    "name": "Agriculture & Rural Development",
    "description": "Farming, animal husbandry, fisheries, rural development, and panchayat administration",
    "icon": "🌾"
  },
  {
    "id": "energy-infrastructure",
    "name": "Energy & Infrastructure",
    "description": "Power supply, roads, buildings, housing, water resources, and irrigation projects",
    "icon": "⚡"
  },
  {
    "id": "social-welfare",
    "name": "Social Welfare",
    "description": "Women and child welfare, social security, BC/SC/ST/Minority development programs",
    "icon": "🤝"
  },
  {
    "id": "finance-administration",
    "name": "Finance & Administration",
    "description": "State finance, revenue, commercial taxes, stamps, registration, and general administration",
    "icon": "🏛️"
  },
  {
    "id": "industry-commerce",
    "name": "Industry & Commerce",
    "description": "Industrial development, IT, MSME, tourism, handlooms, and textiles",
    "icon": "🏭"
  },
  {
    "id": "environment-forest",
    "name": "Environment & Forest",
    "description": "Environmental protection, forest conservation, pollution control, and climate action",
    "icon": "🌳"
  },
  {
    "id": "public-services",
    "name": "Public Services",
    "description": "Civil supplies, labour, employment, information, public relations, and legal affairs",
    "icon": "📋"
  }
]
```

---

## Data Files

### `src/assets/data/authorities.state.json`

**Purpose**: Stores all authority entities (state-level and district-level).

**Structure**:

```json
{
  "authorities": [
    { /* authority object 1 */ },
    { /* authority object 2 */ },
    // ... 165 total entries
  ]
}
```

**Size Constraints**:

- Maximum file size: 500 KB (uncompressed)
- Expected size: 250-300 KB (165 entries × ~1.5 KB average)

**Sorting**: Authorities should be sorted by `category` (primary), then `district` (secondary, null values first), then `name` (tertiary).

**Example Sort Order**:

```json
{
  "authorities": [
    { "id": "agriculture-dept", "category": "agriculture-rural-dev", "district": null, "name": "A..." },
    { "id": "agri-guntur", "category": "agriculture-rural-dev", "district": "Guntur", "name": "A..." },
    { "id": "agri-visakha", "category": "agriculture-rural-dev", "district": "Visakhapatnam", "name": "A..." },
    { "id": "education-dept", "category": "education-skill-dev", "district": null, "name": "E..." },
    // ...
  ]
}
```

---

### `src/assets/data/categories.json`

**Purpose**: Stores all category entities.

**Structure**:

```json
{
  "categories": [
    { /* category object 1 */ },
    { /* category object 2 */ },
    // ... 14 total entries
  ]
}
```

**Size Constraints**:

- Maximum file size: 20 KB (uncompressed)
- Expected size: ~5 KB (14 categories × ~350 bytes average)

**Sorting**: Categories should be sorted alphabetically by `name`.

---

## Validation Script Extensions

### `src/data/validate-data.js`

**Purpose**: Validates JSON data files against schema and business rules.

**New Validation Rules** (to be added):

1. **File Size Check**:
   - `authorities.state.json` must be ≤ 500 KB (uncompressed)
   - `categories.json` must be ≤ 20 KB (uncompressed)

2. **Email Domain Validation**:
   - All `contact.email` and `grievanceEmail` must end with `.gov.in`
   - Regex: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.gov\.in$/`

3. **Phone Format Validation**:
   - Must be 10 digits (e.g., `"8632222222"`) OR STD code format (e.g., `"0863-2222222"`)
   - Regex: `/^(\d{10}|\d{4}-\d{7})$/`

4. **Website URL Validation**:
   - Must use `https://` protocol
   - Must be valid URL format
   - Regex: `/^https:\/\/[a-zA-Z0-9.-]+\.[a-z]{2,}(\/.*)?$/`

5. **District Name Validation**:
   - If `district` is not null, must match one of 26 official AP district names
   - Allowed values: See `AP_DISTRICTS` constant in validation script

6. **Parent Department Reference**:
   - If `parentDepartment` is not null, must reference an existing authority ID
   - Must not create circular references

7. **Grievance Email Uniqueness**:
   - If `grievanceEmail` exists, must differ from `contact.email`

8. **Category Reference Integrity**:
   - Every authority's `category` must match a `category.id` in `categories.json`

9. **Date Format Validation**:
   - `lastVerified` must be valid ISO 8601 date (YYYY-MM-DD)
   - Must not be in the future

10. **ID Uniqueness**:
    - No duplicate `id` values across all authorities
    - No duplicate `id` values across all categories

**Example Validation Output**:

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
✅ All dates valid and not future-dated

🎉 Validation passed! Data ready for deployment.
```

---

## Data Relationships

### Authority → Category (Many-to-One)

- Each authority belongs to exactly one category
- A category can have multiple authorities
- Relationship enforced via `authority.category` (foreign key to `category.id`)

**Example**:

```text
Category: "Law Enforcement"
├── Authority: "AP Police Headquarters" (state-level)
├── Authority: "SP Guntur" (district-level)
├── Authority: "SP Visakhapatnam" (district-level)
└── ... (26 district SPs)
```

### Authority → Authority (Parent-Child via parentDepartment)

- District-level authorities reference state-level parent via `parentDepartment`
- State-level authorities have `parentDepartment: null`
- Relationship enforced via `authority.parentDepartment` (foreign key to `authority.id`)

**Example**:

```text
State-Level: "Transport Department" (id: "transport-dept")
├── District-Level: "RTO Guntur" (parentDepartment: "transport-dept")
├── District-Level: "RTO Visakhapatnam" (parentDepartment: "transport-dept")
└── ... (26 district RTOs)
```

### Authority → Authority (Escalation via escalationPath)

- Authorities can reference escalation contacts via `escalationPath` array
- Array contains authority IDs in escalation order
- Relationship enforced via `authority.escalationPath[i]` (foreign key to `authority.id`)

**Example**:

```json
{
  "id": "rto-guntur",
  "escalationPath": ["transport-dept", "state-transport-commissioner"]
  // If RTO Guntur doesn't resolve issue, escalate to:
  // 1. Transport Department (parent)
  // 2. State Transport Commissioner (top-level)
}
```

---

## Data Population Workflow

### Phase 1: State-Level Departments (35 entries)

1. Research official AP government portal for department list
2. Visit each department's official website
3. Extract: Department name, website, primary phone, primary email, grievance email (if separate)
4. Document source URL in `data/README.md`
5. Assign appropriate category ID
6. Set `district: null` and `parentDepartment: null`
7. Add entry to `authorities.state.json`

### Phase 2: District-Level Offices (130 entries)

1. For each of 5 selected departments, identify district-level office structure
2. For each of 26 districts, extract district office contact details
3. Set `district` field to exact district name
4. Set `parentDepartment` to corresponding state-level authority ID
5. Add `escalationPath` array referencing parent department
6. Add entry to `authorities.state.json`

### Phase 3: Validation

1. Run `node src/data/validate-data.js`
2. Fix any validation errors
3. Test search functionality with new entries
4. Perform manual spot-checks (call sample phone numbers, send test emails)

### Phase 4: Verification

1. Update `lastVerified` dates for all entries
2. Document verification method in `data/README.md`
3. Create test cases in `tests/manual/search-test-cases.md`
4. Run Lighthouse audit to ensure performance budgets maintained

---

## Backward Compatibility

### Existing Feature 001 Data (12 entries)

**Status**: Fully compatible, no migration required

**Reasoning**:

- All new fields are optional (existing entries don't need them)
- Existing fields unchanged (no breaking changes)
- Rendering code checks for field existence before displaying

**Example Migration** (not required, but shows compatibility):

```json
// Existing Feature 001 entry (remains valid in Feature 002)
{
  "id": "ap-police-hq",
  "name": "Andhra Pradesh Police Headquarters",
  "category": "Law Enforcement",
  "description": "State police headquarters...",
  "contact": {
    "phone": "0866-2978440",
    "email": "dgp@appolice.gov.in"
    // New fields (grievanceEmail, helpline) optional - not required
  },
  "website": "https://appolice.gov.in",
  // New fields (departmentWebsite, district, parentDepartment) optional - not required
  "lastVerified": "2024-11-01",
  "escalationPath": []
}
```

### Rendering Code Compatibility

**Existing Code** (from Feature 001 `render.js`):

```javascript
// Safe access with optional chaining (already implemented)
const email = authority.contact?.email || 'N/A';
const phone = authority.contact?.phone || 'N/A';
const website = authority.website || '#';

// New fields (Feature 002) can be safely added with same pattern
const grievanceEmail = authority.contact?.grievanceEmail || null;
const helpline = authority.contact?.helpline || null;
const district = authority.district || 'State-Level';
```

**Result**: No breaking changes to existing rendering logic.

---

## Summary

### Data Model Characteristics

- **Entities**: 2 (Authority, Category)
- **Files**: 2 (`authorities.state.json`, `categories.json`)
- **Total Entries**: 165 authorities + 14 categories = 179 total records
- **Total Size**: ~300 KB (uncompressed), ~90 KB (gzipped)
- **Relationships**: Category foreign key, Parent department reference, Escalation path array
- **Backward Compatibility**: ✅ Full compatibility with Feature 001
- **Validation**: 10 automated rules in `validate-data.js`

### Schema Extensions Summary

| Field | Purpose | Required | New in Feature 002 |
|-------|---------|----------|-------------------|
| `grievanceEmail` | Dedicated grievance contact | No | ✅ Yes |
| `helpline` | Toll-free helpline number | No | ✅ Yes |
| `district` | District name for local offices | No | ✅ Yes |
| `parentDepartment` | Parent dept reference | No | ✅ Yes |
| `departmentWebsite` | Parent dept website | No | ✅ Yes |

### Next Steps

1. ✅ Data model defined and documented
2. ⏭️ Create JSON schema contract (`contracts/authorities-schema.json`)
3. ⏭️ Update validation script with new rules
4. ⏭️ Create data collection guide (`docs/DATA_COLLECTION.md`)
5. ⏭️ Populate data (35 state + 130 district = 165 entries)
