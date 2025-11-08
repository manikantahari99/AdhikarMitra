# AdhikarMitra (Draft)

Public grievance & rights authority directory (Andhra Pradesh first, then India). Static, English-only site.

## Current Status

Phase 0–4 complete. Story 1 (Find & View Authority Detail) fully functional. See `CHANGELOG.md` and `specs/001-adhikarmitra-public-grievance/tasks.md` for details.

## Quick Run (Local Static Preview)

**Recommended**: Use the provided PowerShell script:

```powershell
.\serve.ps1
```

This will start the server on port 8120 and automatically open your browser.

**Alternative**: Any static file server works:

```powershell
python -m http.server 8080
```

Then open <http://localhost:8080/src/index.html>

## Features (Story 1 Complete)

- ✅ Browse authorities by category
- ✅ Search by name/category (debounced input)
- ✅ View detailed authority pages with routing (#authority/id)
- ✅ Copy phone numbers to clipboard
- ✅ Keyboard navigation & WCAG 2.1 AA accessibility
- ✅ Responsive design with dark mode support
- ✅ Performance optimized (vanilla JS, no frameworks)

## Performance & Accessibility Budgets

- HTML initial page ≤ 35KB (uncompressed)
- Critical JS ≤ 75KB (compressed target)
- LCP ≤ 2.5s (mobile test)
- WCAG 2.1 AA contrast + keyboard navigation

## Data

JSON under `src/data/` (state vs national). See data model in `specs/001-adhikarmitra-public-grievance/data-model.md`.

## Roadmap Tags

- v0.1.0: Search, category browse, authority detail basics
- v0.2.0: Escalation path
- v0.3.0: Scope filter (state/national)

## Contributing (Early Stage)

1. Pick a task in `tasks.md`
2. Implement change in a small PR referencing task ID (e.g., T033)
3. Update CHANGELOG Unreleased section if user-facing

## License

TBD
