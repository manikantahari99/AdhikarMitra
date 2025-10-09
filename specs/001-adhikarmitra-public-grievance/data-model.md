# Data Model: AdhikarMitra Public Grievance & Rights Guidance Directory

Date: 2025-10-09  
Branch: 001-adhikarmitra-public-grievance

## Overview

Static JSON representation of authorities, categories, and embedded escalation steps. Optimized for:

- Human review (git diffs)
- Fast client-side search (< 500 records)
- Extensibility (add fields without breaking existing pages)

## Entities

### Authority

Represents a grievance-handling institution.

| Field | Type | Required | Validation / Notes |
|-------|------|----------|--------------------|
| id | string (slug) | Yes | Unique; lowercase kebab-case; stable once published |
| name | string | Yes | Display name; ≤ 120 chars |
| scope | enum | Yes | One of: `state`, `national` |
| category | string | Yes | Must match a Category `id` |
| description | string | No | Short (≤ 240 chars) plain text |
| primaryContacts | array(PhoneContact) | Yes | ≥ 1 entry |
| secondaryContacts | array(PhoneContact) | No | 0..n |
| emails | array(Email) | No | Valid email syntax RFC 5322 subset |
| portalUrls | array(PortalUrl) | No | Distinct by `type` |
| escalation | array(EscalationStep) | No | Ordered by `level` ascending |
| lastVerified | date (ISO 8601) | Yes | Past or present date |
| verifiedSource | string/url | No | Source citation or URL |
| tags | array(string) | No | Free-form for future grouping |

### Category

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | string (slug) | Yes | Unique; lowercase; used for filtering |
| name | string | Yes | Human readable; ≤ 60 chars |
| description | string | No | ≤ 160 chars |
| order | integer | No | Display sort; default 100 |

### EscalationStep

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| level | integer | Yes | Starts at 1; strictly increasing |
| role | string | Yes | ≤ 80 chars |
| contact | string | Yes | Phone/email/URL pattern (at least one) |
| notes | string | No | ≤ 160 chars |

### PhoneContact

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| raw | string | Yes | Digits only (strip spaces, hyphens) |
| type | enum | No | `primary`, `tollfree`, `landline` |
| stdCode | string | No | For landlines; digits only |

### PortalUrl

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| type | enum | Yes | `official`, `complaint-form`, `escalation`, `guidelines`, `other` |
| url | string | Yes | Absolute https URL |
| label | string | No | Override display text |

### Email

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| address | string | Yes | Basic pattern `^[^@\s]+@[^@\s]+\.[^@\s]+$` |
| role | string | No | e.g., `nodal`, `support` |

## Relationships

- Authority *belongs to* Category (by `category` field)
- Authority *has many* EscalationSteps (embedded)
- Authority *has many* PhoneContacts (embedded arrays)
- Authority *has many* PortalUrls (embedded)

## Derived / Presentation Rules

- Display phone number: If `type=landline` and `stdCode` present → format `(<stdCode>) raw`. Else mobile → `+91-XXXXXXXXXX` grouping as needed.
- Escalation steps sorted by `level` at render time (data ingestion should already order).
- Missing optional sections (emails, escalation) display explicit notice.

## Integrity Constraints

- `id` uniqueness enforced repository-wide.
- No duplicate `portalUrls.type` per authority.
- Escalation levels must be contiguous starting at 1 (no gaps: 1,2,3...).
- `lastVerified` cannot be > current date.

## Example Snippet (Illustrative)

```json
{
  "id": "apspdcl",
  "name": "APSPDCL Electricity Consumer Grievance Cell",
  "scope": "state",
  "category": "utilities",
  "primaryContacts": [ { "raw": "1912", "type": "tollfree" } ],
  "portalUrls": [ { "type": "official", "url": "https://www.apspdcl.in/" } ],
  "escalation": [
    { "level": 1, "role": "Division Office", "contact": "1912" },
    { "level": 2, "role": "Circle Office", "contact": "+91862XXXXXXX" },
    { "level": 3, "role": "State Electricity Regulatory Commission", "contact": "https://aperc.gov.in/complaints" }
  ],
  "lastVerified": "2025-09-30"
}
```

## Change Strategy

- New optional fields appended (additive, backward compatible).
- Renaming fields requires deprecation notice in CHANGELOG + migration script (manual) before removal.

## Validation Approach

- Lightweight schema JSON (custom) or TypeScript interface generated for tooling (optional future).
- Pre-commit script (future) could lint JSON (ordering, required fields) — not required for MVP.

