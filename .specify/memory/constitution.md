# AdhikarMitra Static Web App Constitution

Minimal, enforceable ground rules for building and evolving the AdhikarMitra static web application.

## Core Principles

### 1. Simplicity First
 
Start with plain static assets (HTML, CSS, vanilla JS) and only add build tooling or frameworks when a clear, quantified need (performance, maintainability, accessibility) is documented. Avoid premature abstraction.

### 2. Performance & Accessibility Baseline
 
Every page must (a) load core content within a single network round trip (no JS-required critical text), (b) pass automated Lighthouse performance & accessibility scores ≥ 90 in CI, and (c) use semantic HTML for assistive technologies.

### 3. Security Hygiene
 
No inline event handlers; use CSP-friendly patterns. External dependencies are pinned (hash or version). User-submitted data is never executed; all dynamic content sanitized/encoded. Secrets are never committed; configuration uses environment/build variables.

### 4. Automation Over Manual Drift
 
All quality checks (build, lint, format, link check, a11y scan, basic unit/DOM tests if applicable) run automatically in CI on every pull request; green CI is mandatory for merge.

### 5. Content Integrity & Traceability
 
Each content change (text, images, static data) is linked to an issue or task ID in the commit message. Generated or third‑party assets must include provenance in a header comment or adjacent README snippet.

## Technical Baseline

- Stack: Static site served via CDN / static hosting; no server-side code required for baseline features.
- Tooling (add only when needed):
  - Optional bundler (e.g., Vite) for performance once >3 shared modules or ES build optimizations needed.
  - CSS: Start with simple global stylesheet; introduce a utility framework (e.g., Tailwind) only after documenting repetitive pattern cost.
  - Testing: Minimal DOM/unit tests (e.g., with Jest + jsdom) for any custom JS logic; skip if no custom logic exists.
- Assets: Images optimized (lossless for logos, responsive sizes for photos). SVG preferred for icons.
- Dependency Policy: Keep third‑party packages < 10 for core bundle; remove unused monthly.
- Performance Budgets (initial):
  - Initial HTML ≤ 35KB (uncompressed), total critical path JS ≤ 75KB (compressed) for first meaningful paint.
  - LCP ≤ 2.5s on emulated Fast 3G / mid-tier device in CI audits.
- Accessibility: All interactive elements keyboard reachable; images have alt text (or empty alt for decorative).
- Internationalization readiness: No hard-coded locale assumptions (date, currency formatting delegated to Intl when needed).

## Workflow & Quality Gates

1. Issue → Branch: branch naming `feat|fix|chore/issue-<id>-short-desc`.
2. Pull Request must list: purpose, related issue, and any user-facing change notes.
3. Mandatory automated checks before merge:
   - Build / static generation succeeds.
   - Lint + formatting (consistent style) pass.
   - Link checker (no broken internal links).
   - Lighthouse (performance + accessibility ≥ 90) scripted run on representative pages.
   - (If JS logic) Unit tests: ≥ 90% statement coverage for custom logic (exclude config & vendor).
4. Human review: At least 1 reviewer not author; reviewer confirms principles adherence via checklist.
5. Release tagging: Semantic versioning MAJOR.MINOR.PATCH; PATCH for content only, MINOR for additive non-breaking features, MAJOR for structural or breaking asset/URL changes.
6. Rollback: Previous release tag must be deployable via single CI workflow re-run.

## Governance

This constitution overrides ad-hoc preferences. Deviations require a documented exception (issue labeled `constitution-exception`) including rationale, scope, and sunset/cleanup plan. Amendments: propose PR updating this file, cite motivating data (metrics, incidents, maintenance cost) and obtain approval from at least two maintainers. All PR reviews ensure compliance; unaddressed violations block merge. Complexity must be explicitly justified against measurable benefit (performance, accessibility, maintainability).

**Version**: 1.0.0 | **Ratified**: 2025-10-09 | **Last Amended**: 2025-10-09
