# Research: AdhikarMitra Public Grievance & Rights Guidance Directory

Date: 2025-10-09  
Branch: 001-adhikarmitra-public-grievance

## Decisions & Rationale

### 1. Delivery Model (Static Site vs Dynamic Backend)

- **Decision**: Pure static site (HTML/CSS/JS + static JSON data files).
- **Rationale**: Constitution mandates simplicity; all required data is read-only and can be pre-built. No user-generated content or authentication in scope.
- **Alternatives Considered**:
  - Server-rendered app: Overhead without dynamic personalization.
  - Headless CMS: Adds operational complexity and dependency count > baseline.
  - Client-side SPA framework: Unnecessary for mostly navigational + search UI at initial scale.

### 2. Data Storage Format

- **Decision**: Version-controlled JSON files under `src/data/` (e.g., `authorities.json`, possibly modularized by category later).
- **Rationale**: Easy diff review, supports provenance, minimal tooling, deterministic builds.
- **Alternatives**: CSV (harder to represent nested escalation steps), YAML (indentation risk), external DB (unneeded complexity).

### 3. Search Implementation

- **Decision**: Client-side in-memory filtering over loaded JSON (simple text normalization + category and scope filters).
- **Rationale**: Expected dataset (< 500 authorities) small enough for fast in-memory operations; avoids third-party search dependency. Meets ≤2s results criterion.
- **Alternatives**: Lunr/FlexSearch libraries (increase bundle size), server-side API (requires backend), external search service (cost/complexity).

### 4. Performance Strategy

- **Decision**: Pre-compress and serve small modular JSON (split by scope) + defer non-critical scripts. Inline critical CSS (≤5KB) then load rest.
- **Rationale**: Aligns with performance budgets and Lighthouse goals.
- **Alternatives**: Full bundler pipeline (premature), SSR (not needed for static data SEO since static prerender already available).

### 5. Accessibility Approach

- **Decision**: Semantic HTML landmarks, tab order validation, aria-labels only where semantics insufficient.
- **Rationale**: Achieve WCAG AA baseline and success criteria SC-006.
- **Alternatives**: Heavy UI frameworks (risk of excess markup + dependency count).

### 6. External Link Handling

- **Decision**: Each authority record holds zero or more `portalUrls` (array) with a `type` (e.g., "official", "escalation", "complaint-form"). User click opens in same tab unless designated external (target=_blank + rel safeguards) but avoid inline JS.
- **Rationale**: Meets user requirement to navigate to correct external grievance portal from site.
- **Alternatives**: Central redirect service (adds backend and potential single point of failure).

### 7. Escalation Path Representation

- **Decision**: Ordered array embedded in each authority with `level`, `role`, `contact` (phone/email/URL), optional `notes`.
- **Rationale**: Simple to render; preserves order; diff-friendly.
- **Alternatives**: Separate file referencing authority IDs (adds indirection without current benefit).

### 8. Phone Number Normalization

- **Decision**: Store digits raw (E.164 when possible). Render format: `+91-XXXXXXXXXX` or `STD-CODE NUMBER` when landline.
- **Rationale**: Keeps data canonical yet user-readable formatting on presentation layer.
- **Alternatives**: Store formatted only (harder for future programmatic use), attempt validation library (extra dependency).

### 9. Data Verification Metadata

- **Decision**: Fields: `lastVerified` (ISO date), optional `verifiedSource` (URL or citation string).
- **Rationale**: Supports trust and audits (SC-005).
- **Alternatives**: Single timestamp only (less traceability).

### 10. Testing Scope

- **Decision**: Minimal unit tests for search/filter logic + accessibility smoke (static HTML analysis) + Lighthouse CI script.
- **Rationale**: Satisfies constitution automation & coverage (only custom JS measured).
- **Alternatives**: Full end-to-end framework (overkill early stage).

## Resolved Unknowns

No outstanding NEEDS CLARIFICATION items; assumptions validated as reasonable for MVP.

## Potential Future Considerations

- Internationalization layer (deferred explicitly).
- User feedback/report inaccurate number flow.
- Automated scraping/verification pipeline.

## Summary Table

| Topic | Decision | Primary Benefit | Trade-off |
|-------|----------|-----------------|-----------|
| Delivery | Static site | Simplicity, low cost | Manual deploy for updates |
| Data Format | JSON | Diffable, simple | Manual normalization burden |
| Search | Client in-memory | Zero infra, fast small scale | Won't scale beyond thousands easily |
| Performance | Split JSON + critical CSS | Faster initial paint | Slight complexity splitting data |
| A11y | Semantic-first | Lower maintenance | Requires discipline in markup |
| External Links | In-record portalUrls | Direct navigation | Potential duplication of URLs |
| Escalation | Embedded ordered array | Simplicity | Larger authority objects |
| Phone Format | Raw + render formatting | Flexibility | Formatting logic required |
| Verification | lastVerified + source | Trust & audits | Slightly more data entry |
| Testing | Targeted unit + audits | Meets gates | Less broad user journey automation early |

