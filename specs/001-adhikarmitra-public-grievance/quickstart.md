# Quickstart: AdhikarMitra Directory (MVP Static Build)

## Goal

Deliver a static, search/browseable directory of grievance authorities (Andhra Pradesh first, then national) with external portal navigation.

## 1. Directory Layout

```text
src/
  data/
    authorities.state.json
    authorities.national.json
  css/
    base.css
  js/
    search.js
    format.js
  index.html
  category.html (template or static with JS-driven filtering)
  authority.html (detail template)
```

## 2. Data Ingestion

1. Curate initial AP authority list into `authorities.state.json` using data-model fields.
2. Add minimal national set into `authorities.national.json`.
3. Validate uniqueness of `id`; ensure each has `lastVerified`.

## 3. Search & Filter Logic

- Load both JSON files in parallel.
- Merge into in-memory list with `scope` property maintained.
- Provide keyword search (case-insensitive) across: name, description, category.
- Provide scope toggle (state/national) and category filter.

## 4. Rendering

- Index: top categories + search bar.
- Category page: filtered list (cards) with name, scope badge, primary number, quick link.
- Detail page: Full authority info + escalation steps or placeholder.
- External portal links: open in same tab unless explicitly marked external.

## 5. Performance Checklist

- Inline critical CSS (≤ 5KB) in `index.html` head.
- Defer non-critical JS (`defer` attribute).
- Use `preload` for JSON data if beneficial (measure first).

## 6. Accessibility Checklist

- Landmarks: header, main, nav, footer.
- All interactive elements keyboard reachable and visible focus outline.
- Descriptive link text (avoid “click here”).
- Contrast check for badges and buttons.

## 7. Testing Strategy

- Unit: `search.js` (filtering, no-result case, scope toggle).
- Formatting: phone number rendering.
- Lighthouse CI script (performance & a11y thresholds ≥ 90).
- Manual sample audit of 10 random authorities for data integrity.

## 8. Adding National Layer (Phase 2)

- Expand `authorities.national.json` with additional records.
- Ensure scope toggle persists selected category.
- Validate that performance budgets still met (bundle size evaluation).

## 9. Deployment

- Static hosting (any CDN). Invalidate cache on data file changes.
- Version tag release notes summarizing new authorities count & verification stats.

## 10. Maintenance

- Quarterly verification cycle checklist.
- Track data accuracy metric (SC-005) in a simple markdown log.

Ready to implement tasks after `/speckit.tasks` planning.
