# Data Directory

Authoritative JSON datasets consumed by the static site.

## Files

- `categories.json` – Category definitions (id, name, description, order)
- `authorities.state.json` – Andhra Pradesh authority records (initial slice)
- `authorities.national.json` – (Planned in later task T060)

## Authority Record Schema (Subset)

Refer to full spec in `specs/001-adhikarmitra-public-grievance/data-model.md`.

| Field | Type | Notes |
|-------|------|-------|
| id | string | Unique slug, lowercase kebab-case |
| name | string | Display name |
| scope | enum | `state` or `national` |
| category | string | Must match a category id |
| primaryContacts | array(PhoneContact) | At least 1 |
| lastVerified | date (ISO 8601) | Not in future |

## PhoneContact

`{"raw": "18004254545", "type": "tollfree"}` optionally with `stdCode` for landlines.

## Validation

Run `validate-data.js` (T023) in a browser devtools console (after embedding) or with Node (basic fallback) to verify integrity.

## Change Workflow

1. Add or modify records in JSON.
2. Ensure `lastVerified` is updated when verifying data.
3. Run validation script.
4. Commit with message referencing task or issue id.

## Extensibility

Adding new optional fields is backward compatible (per FR-009). Avoid renaming existing keys without migration.
