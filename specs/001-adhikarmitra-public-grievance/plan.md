# Implementation Plan: AdhikarMitra Public Grievance & Rights Guidance Directory

**Branch**: `001-adhikarmitra-public-grievance` | **Date**: 2025-10-09 | **Spec**: ./spec.md
**Input**: Feature specification from `/specs/001-adhikarmitra-public-grievance/spec.md`

## Summary

Deliver a static, English-only directory of Andhra Pradesh then India-wide grievance & rights authorities with search, category browsing, scope (state/national) filter, authority detail pages (contacts + escalation path), and external portal navigation. MVP avoids backend complexity: data stored as versioned JSON, client-side in-memory search; expands later by adding national dataset incrementally.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Plain HTML5, CSS, minimal vanilla ES6 JavaScript  
**Primary Dependencies**: None initially (avoid frameworks per constitution); optional dev-only tooling (later: Lighthouse CI, simple ESLint)  
**Storage**: Static JSON files committed in repo (`src/data/*.json`)  
**Testing**: Lightweight JS unit tests (search/filter & formatting); Lighthouse performance & accessibility audits  
**Target Platform**: Modern desktop & mobile browsers (progressive enhancement not required for JS-off beyond core content)  
**Project Type**: Static web application (single project)  
**Performance Goals**: Initial results render ≤ 2s median (SC-002); LCP ≤ 2.5s (constitution)  
**Constraints**: Total critical JS ≤ 75KB compressed; HTML ≤ 35KB uncompressed initial page; dependency count < 10  
**Scale/Scope**: < 500 authorities initial; designed to scale to low thousands with same approach  

All unknowns resolved; no NEEDS CLARIFICATION markers.

## Constitution Check

*GATE: Must pass before Phase 0 research.*

| Principle / Gate | Compliance | Notes |
|------------------|-----------|-------|
| Simplicity First | Yes | Static site, no framework chosen initially |
| Performance & Accessibility Baseline | Yes | Budgets defined & SC-002 / SC-006 align |
| Security Hygiene | Yes | No inline handlers planned; hash pinning if/when external scripts added |
| Automation Over Manual Drift | Partial (Planned) | CI pipeline to include: link check, Lighthouse, basic unit tests (to be configured) |
| Content Integrity & Traceability | Yes | Data changes via JSON in repo with commit messages referencing issue IDs |

Gate Status: PASS (automation tasks need implementation but plan documented).

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

ios/ or android/
### Source Code (repository root)

```text
src/
  data/                  # JSON datasets (authorities.state.json, authorities.national.json)
  js/                    # search.js, format.js, accessibility checks
  css/                   # base.css (+ future utility classes as needed)
  index.html             # homepage (search + top categories)
  category.html          # category listing template/page
  authority.html         # authority detail template/page
tests/
  unit/                  # search.test.js, format.test.js
  accessibility/         # basic axe-core or HTML checks (optional future)
ci/                      # lighthouse-config/ (planned)
```

**Structure Decision**: Single static web project; separation only by functional asset type (data, js, css). No backend directories introduced to preserve simplicity.

## Complexity Tracking

No violations requiring justification at this stage.

---

## Appendix A: Constitution Compliance Checklist (T000)

| Principle / Constraint | Evidence in Plan | Status |
|------------------------|------------------|--------|
| Static Simplicity (No frameworks initially) | Tech Context: "Plain HTML5, CSS, minimal vanilla ES6" | ✓ |
| Performance Budgets (HTML ≤35KB, JS ≤75KB) | Tech Context + Performance Goals section | ✓ |
| Accessibility (WCAG 2.1 AA baseline) | Success Criteria SC-006 + NFR-002 | ✓ |
| Low Dependency Count (<10) | No runtime deps listed; only optional dev tools later | ✓ |
| Data Transparency & Traceability | JSON datasets in `src/data/` under version control | ✓ |
| Extensibility Without Breaking | FR-009 + data model additive change strategy | ✓ |
| Automation (Planned) | Notes: Lighthouse, basic unit tests, link check (to be added) | △ (Planned) |

Legend: ✓ = Satisfied now, △ = Planned / upcoming task, ✗ = Not satisfied.

This checklist will be re-reviewed before tagging v0.1.0 (Task T082).
