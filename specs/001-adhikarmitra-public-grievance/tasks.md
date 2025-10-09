# Task Breakdown: Feature 001 – AdhikarMitra Public Grievance & Rights Guidance Directory

Status: Draft  
Scope: Covers FR-001 … FR-015 (Stories P1–P3) + enabling non-functional gates (performance, a11y, data quality).  
Principle: Each task is independently mergeable; smallest unit that produces a reviewable outcome.  
Notation: [P] = Can be executed in parallel once dependencies satisfied.

---

## Legend / Conventions

- ID format: `T###` sequential.
- Dependencies list ONLY immediate (nearest) predecessors.
- Story: P1 = User Story 1 (Find contact), P2 = User Story 2 (Escalation path), P3 = User Story 3 (Scope filter).
- Deliverables include concrete artifacts (files / checks) & measurable Done signals.
- FR Mapping ensures every Functional Requirement has at least one implementing task (see Coverage Summary at bottom).

---

## Phase 0 – Governance & Hygiene (Pre-Implementation)

| ID | Title | Description | Deps | Story | FRs | Done / Deliverable |
|----|-------|-------------|------|-------|-----|--------------------|
| T000 | Confirm Constitution Compliance Checklist | Create a short checklist inside `plan.md` appendix referencing performance budgets & simplicity constraints (no libs). | — | All | — | [X] Appendix added in plan.md (Appendix A). |
| T001 | Add CHANGELOG.md | Initialize `CHANGELOG.md` with Unreleased section & link to constitution. | T000 | All | — | [X] CHANGELOG.md created with sections. |

---

## Phase 1 – Project Scaffolding & Build (Foundation)

| ID | Title | Description | Deps | Story | FRs | Done / Deliverable |
|----|-------|-------------|------|-------|-----|--------------------|
| T010 | Directory Skeleton | Create `src/index.html`, `src/assets/css/`, `src/assets/js/`, `src/data/`, `src/components/` placeholders. | T001 | P1 | — | [X] Directories & placeholder files created (index.html, base.css, placeholder.js). |
| T011 [P] | Base HTML Layout | Minimal semantic HTML5 structure (header, main, footer, landmark roles). Include meta viewport & placeholder title. | T010 | P1 | FR-005 | [X] Landmarks + nav + sections scaffolded in `index.html`. |
| T012 [P] | Base CSS & Design Tokens | Create `base.css` (variables for color, spacing, typography). Ensure accessible contrast baseline. | T010 | P1 | NFR-002 | [X] Tokens + focus styles + reduced motion, nav styling. |
| T013 | Lightweight Dev Script (Optional) | Add simple file watcher or documentation on using Live Server (no build pipeline). | T010 | All | — | [X] README includes quick run instructions. |

---

## Phase 2 – Data Layer Foundations

| ID | Title | Description | Deps | Story | FRs | Done / Deliverable |
|----|-------|-------------|------|-------|-----|--------------------|
| T020 | Category Seed JSON | Create `src/data/categories.json` with initial categories (utilities, health, education, legal, civic, human-rights). | T010 | P1 | FR-002 | [X] categories.json added with 6 categories. |
| T021 | Authority Data Schema Doc | Add `src/data/README.md` summarizing fields (align with data-model). | T020 | All | FR-003..FR-015 (indirect) | [X] README added referencing data-model. |
| T022 | Initial Authorities (State Only) | Create `src/data/authorities.state.json` with 10–20 sample Andhra Pradesh authorities (each has lastVerified). | T020 | P1 | FR-001, FR-003, FR-013 | [X] authorities.state.json seeded (12 records). |
| T023 [P] | Data Validation Script (Static) | Simple JS (`validate-data.js`) runnable in browser console or node to assert uniqueness, required fields. | T022 | All | FR-008, FR-013 | [X] validate-data.js created (run runDataValidation()). |
| T024 | Phone Formatting Utility | Implement `formatPhone.js` to standardize output per rules. | T022 | P1 | FR-006 | [X] formatPhone.js with formatContact / formatAll. |

---

## Phase 3 – Core UI & Search (User Story 1 – Discover & List)

| ID | Title | Description | Deps | Story | FRs | Done / Deliverable |
|----|-------|-------------|------|-------|-----|--------------------|
| T030 | Render Category List | JS to read `categories.json` and render list/grid on home. | T020 | P1 | FR-002 | [X] Categories rendered via Renderer.renderCategories. |
| T031 | Load Authorities (State Dataset) | Fetch & cache state JSON on first interaction; store in in-memory array. | T022 | P1 | FR-001, FR-011 (foundation) | [X] DataStore.loadAuthoritiesState caches dataset. |
| T032 | Search Input Component | Add search bar with debounce & accessible label. | T031 | P1 | FR-001, FR-005 | [X] Input + label, debounce implemented. |
| T033 | Search Filtering Logic | Implement filtering by name, category, keywords (case-insensitive). | T032 | P1 | FR-001 | [X] Filtering in applyFilters() in search.js. |
| T034 [P] | No-Result UX State | Implement friendly message + link to browse categories. | T033 | P1 | FR-007 | [X] #no-results alert toggled when zero results. |
| T035 | Authority List Item Component | Minimal card/list row: name, category badge, scope badge (state), primary phone. | T031 | P1 | FR-001, FR-010 | [X] buildAuthorityCard outputs badges + phone. |
| T036 | Performance Budget Check (List) | Manual Lighthouse run focusing on initial list load; record metrics in `PERF_NOTES.md`. | T035 | P1 | FR-011 | [X] PERF_NOTES.md created with measurement template. |

---

## Phase 4 – Authority Detail & Formatting (Complete Story 1)

| ID | Title | Description | Deps | Story | FRs | Done / Deliverable |
|----|-------|-------------|------|-------|-----|--------------------|
| T040 | Routing (Hash-based) | Implement `#authority/<id>` navigation from list item click. | T035 | P1 | FR-003, FR-008 | URL updates; back navigation works. |
| T041 | Detail Page Template | Render all mandatory fields + placeholders for optional (emails, escalation). | T040 | P1 | FR-003, FR-013 | For sample authority shows expected fields. |
| T042 [P] | Apply Phone Formatting Utility | Integrate `formatPhone.js` into list + detail display. | T024,T041 | P1 | FR-006 | Visual formatting consistent. |
| T043 [P] | Copy Number Interaction | Add copy icon/button (execCommand or clipboard API fallback). | T041 | P1 | FR-015 | Clicking copies number (verified via paste). |
| T044 | Last Verified Display | Human-readable (e.g., “Verified: 30 Sep 2025”). | T041 | P1 | FR-013 | Date formatting matches locale pattern decision. |
| T045 | Accessibility Pass – Story 1 | Keyboard traversal, focus order, ARIA labels on interactive controls. | T043 | P1 | NFR-002, SC-006 | Axe audit no critical issues. |

---

## Phase 5 – Escalation Path (User Story 2 – P2)

| ID | Title | Description | Deps | Story | FRs | Done / Deliverable |
|----|-------|-------------|------|-------|-----|--------------------|
| T050 | Add Escalation Data Fields | Extend some sample authorities with `escalation` arrays (levels). | T041 | P2 | FR-012 | Data file updated; validation script passes. |
| T051 | Escalation Renderer | Numbered list with role + contact; sort defensive. | T050 | P2 | FR-012 | Rendered correctly on detail page(s). |
| T052 [P] | No Escalation Notice | If escalation array missing/empty show explicit notice. | T051 | P2 | FR-012 | Placeholder visible for authority without data. |
| T053 | Escalation Section Toggle | Collapsible section for readability (progressive disclosure). | T051 | P2 | (Usability) | Toggle accessible; state announced to screen readers. |

---

## Phase 6 – Scope Filter (User Story 3 – P3)

| ID | Title | Description | Deps | Story | FRs | Done / Deliverable |
|----|-------|-------------|------|-------|-----|--------------------|
| T060 | Add National Dataset | Create `src/data/authorities.national.json` with sample entries (≥10). | T022 | P3 | FR-004, FR-010 | File committed; validation OK. |
| T061 | Scope Toggle UI | Add toggle (radio buttons or segmented control) State / National with accessible labels. | T060 | P3 | FR-004 | Toggle visible; state default. |
| T062 | Scope Filter Logic | Filter aggregated list by scope while preserving current category/search term. | T061,T033 | P3 | FR-004, FR-010 | Switching retains search; results update. |
| T063 [P] | Distinct Badges Styling | Visual differentiation (color/label) for scope & category. | T035,T061 | P3 | FR-010 | Badges pass contrast & are non-conflicting. |

---

## Phase 7 – Performance & Accessibility Hardening

| ID | Title | Description | Deps | Story | FRs | Done / Deliverable |
|----|-------|-------------|------|-------|-----|--------------------|
| T070 | Inline Critical CSS | Extract above-the-fold CSS ≤5KB into `<style>` in `index.html`; defer rest. | T012,T036 | All | FR-011 | Size measured & documented in PERF_NOTES.md. |
| T071 | JSON Payload Optimization | Split or prune unused fields for list view (build light index array in memory). | T031 | All | FR-011 | Memory snapshot shows lean structure. |
| T072 | Lighthouse Regression Script (Manual Doc) | Document steps + thresholds; commit to `PERF_NOTES.md`. | T036 | All | FR-011 | Notes include current scores & budgets. |
| T073 | Accessibility Regression Checklist | Create `A11Y_CHECKLIST.md` enumerating tested patterns (forms, focus). | T045 | All | NFR-002 | Checklist present; run recorded. |
| T074 [P] | Keyboard-Only Smoke Test Script | Markdown instructions to manually verify navigation path to detail page & copy number. | T045 | All | SC-006 | Script added; executed once (notes). |

---

## Phase 8 – Verification, Docs, Release Prep

| ID | Title | Description | Deps | Story | FRs | Done / Deliverable |
|----|-------|-------------|------|-------|-----|--------------------|
| T080 | README Update (Usage & Contribution) | Add sections: Data update process, performance budgets, accessibility notes. | T073 | All | — | README updated & reviewed. |
| T081 | Data Verification Log Template | Add `data-verification-log.md` template for quarterly checks. | T023 | All | FR-013 (support) | Template present; includes fields (authority, date, verifier, notes). |
| T082 | Version Tag v0.1.0 (P1 Complete) | Tag after Story 1 tasks (T030–T045) successful. | T045 | P1 | FR-001..FR-015 (subset) | Git tag created; CHANGELOG updated. |
| T083 | Version Tag v0.2.0 (P2 Complete) | Tag after escalation path features. | T052 | P2 | FR-012 | Tag + CHANGELOG. |
| T084 | Version Tag v0.3.0 (P3 Complete) | Tag after scope filter delivered. | T063 | P3 | FR-004 | Tag + CHANGELOG. |

---

## Phase 9 – Deferred / Backlog (Not In Current Release Scope)

| Candidate | Notes |
|-----------|-------|
| Feedback on number accuracy | Requires submission UI + moderation workflow. |
| Authority bookmarking | Needs local storage strategy & privacy review. |
| Share via SMS/email buttons | Evaluate copy vs built-in share APIs. |
| Automated Lighthouse CI | Could integrate GitHub Action later. |
| JSON schema generation | Optional for larger dataset growth. |

---

## Cross-Cutting Test Tasks

| ID | Title | Description | Deps | Story | FRs | Done / Deliverable |
|----|-------|-------------|------|-------|-----|--------------------|
| T900 | Unit Tests: Filtering & Formatting | Minimal JS test harness (plain assert) for search filter & phone formatting. | T033,T024 | P1 | FR-001, FR-006 | Test file outputs PASS summary. |
| T901 | Manual Scenario Script – Story 1 | Document step-by-step reproduction of acceptance scenarios SC for Story 1. | T045 | P1 | FR-001..FR-007, FR-013, FR-015 | Script in `TEST_SCRIPTS.md`. |
| T902 | Manual Scenario Script – Story 2 | Steps for escalation path viewing & placeholder. | T052 | P2 | FR-012 | Added to `TEST_SCRIPTS.md`. |
| T903 | Manual Scenario Script – Story 3 | Steps for toggling scope with retained filters. | T062 | P3 | FR-004, FR-010 | Added to `TEST_SCRIPTS.md`. |

---

## Functional Requirement Coverage Summary

| FR | Implementing Tasks |
|----|-------------------|
| FR-001 (Search) | T031, T032, T033, T900 |
| FR-002 (Browse Categories) | T020, T030 |
| FR-003 (Authority Detail Fields) | T040, T041 |
| FR-004 (Scope Toggle) | T060, T061, T062 |
| FR-005 (English Only) | T011 (UI baseline), T032 (labeling) |
| FR-006 (Phone Formatting) | T024, T042, T900 |
| FR-007 (No Result State) | T034 |
| FR-008 (Unique Identifier) | T023, T040 |
| FR-009 (Extensibility / Non-breaking) | T021 (doc), design principle (implicit) |
| FR-010 (Differentiation Badges) | T035, T063 |
| FR-011 (Performance) | T031 (data load), T036, T070, T071, T072 |
| FR-012 (Escalation Path) | T050, T051, T052, T053 |
| FR-013 (Last Verified) | T022, T044, T081 |
| FR-014 (Public Access) | T011 (no auth), verification in README (implicit) |
| FR-015 (Copy Number) | T043 |

All FRs mapped at least once; FR-009 & FR-014 documented via architectural constraints and absence of auth complexity.

---

## Suggested Execution Order (High-Level)

1. Phases 0–2 (T000 → T024) establish data + structure.
2. Deliver Story 1 slice end-to-end (T030 → T045) = MVP v0.1.0.
3. Add escalation (Phase 5) = v0.2.0.
4. Add scope filtering (Phase 6) = v0.3.0.
5. Hardening & docs (Phases 7–8) proceed continuously with parallel [P] tasks where practical.

---

## Risk Mitigation Embedded in Tasks

- Performance early measurement (T036) prevents late surprises.
- Accessibility verification (T045, T073, T074) staged before expansion.
- Data integrity script (T023) ensures scaling dataset reliability.
- Version tags (T082–T084) allow rollback points per user story.

---

## Acceptance Sampling Strategy

- For each story completion tag, re-run: search happy path, no-result path, at least one escalation path, scope toggle after addition.
- Record Lighthouse & Axe scores in PERF_NOTES / A11Y_CHECKLIST.

---

## Open Questions (If Any Arise Later)

Currently none. If new fields (e.g., digital complaint form) are added, extend data model & update T021, add new FR mapping.

---
Generated in alignment with specification & constitution. Ready for review.
