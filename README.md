# AdhikarMitra (Draft)

Public grievance & rights authority directory (Andhra Pradesh first, then India). Static, English-only site.

## Current Status

Early scaffolding phase. See `CHANGELOG.md` and `specs/001-adhikarmitra-public-grievance/tasks.md` for progress.

## Quick Run (Local Static Preview)

Use any static file server or VS Code Live Server extension. For PowerShell you can run:

```powershell
# Simple Python fallback if installed
python -m http.server 8080
```

Then open <http://localhost:8080/src/index.html>

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
