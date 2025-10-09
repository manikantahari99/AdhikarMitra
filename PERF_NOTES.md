# Performance Notes (T036)

Date: 2025-10-09
Scope: Initial list & search scaffolding (pre-optimization phase).

## Budgets (from Constitution / FR-011)

- HTML initial page ≤ 35KB (uncompressed)
- Critical JS ≤ 75KB compressed
- LCP ≤ 2.5s (mobile emulation)

## Current Snapshot (Manual Observation)

- HTML (index.html) size: TBD (measure via browser DevTools > Network)
- CSS (base.css) size: TBD
- JS combined (formatPhone + data + render + search): TBD
- First content (header + search UI) renders instantly (<100ms on local)

## Planned Measurements

1. Open DevTools, disable cache, throttle to Slow 3G.
2. Reload `/src/index.html` and record:
   - Time to first contentful paint (FCP)
   - Time to largest contentful paint (LCP)
3. Record sizes for HTML, CSS, JS.
4. Update table below.

| Metric | Target | Observed | Status |
|--------|--------|----------|--------|
| HTML size | ≤35KB | (fill) | ? |
| CSS size | — (keep minimal) | (fill) | ? |
| JS critical size | ≤75KB | (fill) | ? |
| LCP | ≤2.5s | (fill) | ? |

## Notes

- Further optimization (T070–T072) will inline critical CSS and trim JS.
- Data split already ensures only state dataset loaded initially.
