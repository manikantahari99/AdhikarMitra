# Feature Specification: Comprehensive AP Government Departments Data

**Feature Branch**: `002-add-comprehensive-andhra`  
**Created**: November 8, 2025  
**Status**: Draft  
**Input**: User description: "Include all the Andhrapradesh state government departments and their respective links and grievance emails as well. All the respective authorities mail id's and phone numbers also shall be placed in my website."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse All AP Government Departments (Priority: P1)

A citizen of Andhra Pradesh wants to find contact information for any state government department to file a grievance or inquiry. They visit the AdhikarMitra website and can browse through a comprehensive list of all state departments organized by category (e.g., Revenue, Health, Education, Police, Transport).

**Why this priority**: This is the foundational capability - users must be able to discover and access all government department information. Without this, the website serves no purpose.

**Independent Test**: Can be fully tested by navigating to the website, selecting a category (e.g., "Revenue"), and verifying that all relevant departments appear with complete contact information (phone, email, website link). Delivers immediate value by providing centralized access to government contacts.

**Acceptance Scenarios**:

1. **Given** a user visits the homepage, **When** they select the "Revenue" category, **Then** they see all revenue-related departments (e.g., Revenue Department, Registration & Stamps, Commercial Taxes) with their primary contact numbers, grievance emails, and official website links
2. **Given** a user searches for "education", **When** the search results display, **Then** all education-related departments appear with complete contact details
3. **Given** a department has multiple contact numbers, **When** the user views the department detail page, **Then** all contact numbers are displayed with labels (e.g., "Main Office", "Grievance Cell", "Helpline")

---

### User Story 2 - Access Department Grievance Mechanisms (Priority: P2)

A citizen needs to file a formal grievance with a specific department. They want to find the official grievance email address and any specialized grievance redressal contact numbers for that department.

**Why this priority**: Once users can find departments, the next critical need is accessing grievance-specific channels. This directly supports the website's core mission of facilitating citizen grievances.

**Independent Test**: Can be tested by viewing any department detail page and verifying that grievance-specific contact information (grievance email, dedicated grievance phone numbers) is clearly distinguished from general contact information.

**Acceptance Scenarios**:

1. **Given** a user views the Police Department detail page, **When** they look for grievance options, **Then** they see a dedicated "Grievance Contacts" section with the grievance email (e.g., `grievance.police@ap.gov.in`) and grievance helpline number
2. **Given** a department has no dedicated grievance email, **When** the user views the detail page, **Then** the general contact email is shown with a note: "For grievances, use the general contact email"
3. **Given** a user wants to copy a grievance email, **When** they click the copy button, **Then** the email address is copied to their clipboard

---

### User Story 3 - Navigate to Official Department Websites (Priority: P2)

A citizen needs to access official forms, schemes, or detailed information from a government department's official website. They want a direct link to the authentic government portal.

**Why this priority**: Providing verified official website links ensures users can access authoritative information and online services. This complements the contact directory with digital service access.

**Independent Test**: Can be tested by clicking any department's website link and verifying it opens the correct official government portal in a new tab. Delivers value by serving as a trusted gateway to government online services.

**Acceptance Scenarios**:

1. **Given** a user views the Transport Department detail page, **When** they click the "Official Website" link, **Then** the link opens `https://aptransport.gov.in` (or actual URL) in a new browser tab
2. **Given** a department website URL is unavailable, **When** the user views the detail page, **Then** a message states "Official website information not available" instead of showing a broken link
3. **Given** multiple official portals exist for a department (e.g., main site + citizen services portal), **When** the user views the page, **Then** all relevant links are listed with descriptive labels

---

### User Story 4 - Search Across All Government Entities (Priority: P3)

A citizen knows they need to contact a specific authority (e.g., "District Collector, Visakhapatnam" or "Commissioner of Police, Vijayawada") but doesn't know which department category to browse.

**Why this priority**: Enhances discoverability for users who know exactly what they're looking for. Complements category browsing with direct search capability.

**Independent Test**: Can be tested by entering "District Collector" or "Transport Commissioner" in the search bar and verifying that all matching authorities appear across different departments.

**Acceptance Scenarios**:

1. **Given** a user searches for "Collector", **When** the results load, **Then** all District Collectors from various districts appear with their respective contact details
2. **Given** a user searches for an authority's email (e.g., `cm.helpline@ap.gov.in`), **When** the search executes, **Then** the corresponding authority/department is found and displayed
3. **Given** a user searches for a partial name (e.g., "transport com"), **When** results appear, **Then** "Transport Commissioner" and related authorities are shown

---

### Edge Cases

- What happens when a department has no grievance email but has a general contact email?
  → Display general email with a note clarifying it can be used for grievances
- What happens when a department's phone number is disconnected or changes?
  → Include "Last Verified" date for each contact; users can report outdated information (future feature)
- How does the system handle departments with district-level offices (e.g., 13 District Collectors)?
  → Each district office is a separate authority entry with its own contact details, all tagged under the parent department
- What happens when a department website URL is invalid or redirects to an error page?
  → Website links should be verified periodically; display warning if link hasn't been verified recently
- How does the system handle bilingual department names (English + Telugu)?
  → Current scope is English only; Telugu names can be added as optional metadata in future phase

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST include contact information for all major Andhra Pradesh state government departments including but not limited to: Chief Minister's Office, Revenue, Police, Health, Education, Transport, Panchayat Raj, Rural Development, Urban Development, Energy, Water Resources, Agriculture, Animal Husbandry, Fisheries, Forests, Environment, Industries, Labour, Social Welfare, Women & Child Welfare, Minority Welfare, BC Welfare, SC/ST Welfare, Housing, Municipal Administration, Registration & Stamps, Commercial Taxes, Excise, Civil Supplies, Tourism, Culture, Sports, Youth Services, Information & Public Relations
- **FR-002**: System MUST display primary contact phone numbers for each department (main office switchboard or primary helpline)
- **FR-003**: System MUST display official grievance email addresses for each department where available
- **FR-004**: System MUST display general contact email addresses for departments that do not have dedicated grievance emails
- **FR-005**: System MUST provide direct links to official department websites (e.g., <https://[department].ap.gov.in>)
- **FR-006**: System MUST include contact information for key authorities within each department (e.g., Secretary, Commissioner, Director, Superintending Engineer) where publicly available
- **FR-007**: System MUST organize departments by logical categories to facilitate browsing (e.g., Revenue & Administration, Public Safety, Social Welfare, Infrastructure, Economic Development)
- **FR-008**: System MUST support searching across department names, authority names, email addresses, and phone numbers
- **FR-009**: System MUST display multiple contact numbers for a single department when available (e.g., main office, helpline, toll-free, grievance cell) with descriptive labels
- **FR-010**: System MUST indicate when a contact detail was last verified to help users assess information currency
- **FR-011**: System MUST open external website links in a new browser tab to avoid losing the user's place in AdhikarMitra
- **FR-012**: System MUST handle district-level offices by treating each district as a separate authority entry (e.g., "District Collector - Visakhapatnam", "District Collector - Guntur") all linked to the parent Revenue Department
- **FR-013**: System MUST distinguish between state-level departments and district-level authorities in search results and browsing
- **FR-014**: System MUST validate that all included email addresses follow standard government email format (e.g., `*@ap.gov.in` or `*@appolice.gov.in`)
- **FR-015**: System MUST provide a consistent data format for all departments to ensure uniform presentation (department name, description, category, contacts array, websites array, grievance email, lastVerified date)

### Key Entities

- **Department**: Represents a state government department or major administrative unit. Attributes include: unique identifier, official name (English), short description, category/domain, scope (state-level), primary contacts (phone numbers with labels), email addresses (general and grievance-specific), official website URLs, lastVerified date, optional parent department reference (for sub-departments)
- **Authority**: Represents a specific government official or office within a department. Attributes include: unique identifier, title/role, department reference, office location (district/city if applicable), contact phone numbers, email address, scope (state/district), lastVerified date
- **Contact**: Represents a phone number with context. Attributes include: raw phone number (10 digits), label/description (e.g., "Main Office", "Toll-Free Helpline", "Grievance Cell"), type (landline/mobile/toll-free), contactable hours (if relevant)
- **Website Link**: Represents an official web portal. Attributes include: URL, label/description (e.g., "Official Website", "Citizen Services Portal", "Online Application Portal"), lastVerified date

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can find contact information for any major AP state government department within 3 clicks from the homepage
- **SC-002**: System includes contact data for at least 35 major state government departments covering all primary citizen service domains (revenue, health, education, police, transport, welfare)
- **SC-003**: 95% of department entries include at least one verified phone number and one verified email address
- **SC-004**: 100% of departments with official websites include working links to those sites
- **SC-005**: Users searching for common department names (e.g., "police", "revenue", "education") receive relevant results in under 1 second
- **SC-006**: District-level offices for at least 5 major departments (e.g., Revenue, Police, Education, Health, Transport) are included with district-specific contact information for all 13 districts of Andhra Pradesh
- **SC-007**: Grievance-specific contact information (grievance email or dedicated grievance phone number) is available for at least 80% of included departments
- **SC-008**: Users can successfully copy any displayed email address or phone number to their clipboard with one click

## Assumptions *(mandatory)*

1. **Data Source**: Government contact information will be collected from official AP government portals (<https://ap.gov.in> and individual department websites). All contact details are publicly available information.
2. **Data Accuracy**: Contact information is accurate at the time of data collection. The "lastVerified" date will help users assess currency. A periodic verification process (manual or automated) will be needed to maintain data quality.
3. **Scope Limitation**: This feature focuses on state-level departments and major district-level offices. Village/mandal level offices are out of scope for this phase.
4. **Language**: All department names, descriptions, and UI elements will be in English only. Telugu language support is deferred to a future phase.
5. **Email Format**: All government email addresses follow standard formats ending in `@ap.gov.in` or department-specific government domains (e.g., `@appolice.gov.in`).
6. **Website Accessibility**: Official department websites are maintained by respective departments. AdhikarMitra is not responsible for the availability or functionality of external websites, only for providing accurate links.
7. **Update Frequency**: Contact information will be verified and updated quarterly at minimum. Users may report outdated information through a future feedback mechanism.
8. **No Authentication**: All department contact information is publicly accessible without requiring user login or authentication.

## Non-Functional Requirements *(optional)*

- **NFR-001**: The expanded dataset (35+ departments with multiple contacts each) must not degrade page load performance beyond the existing 2.5 second LCP budget on mobile networks
- **NFR-002**: Email addresses and phone numbers must be displayed in an easily copyable format compatible with all modern browsers
- **NFR-003**: External website links must include appropriate rel="noopener" security attributes when opening in new tabs
- **NFR-004**: The data structure must be extensible to support future additions (e.g., Telugu translations, operating hours, physical addresses) without requiring schema redesign

## Dependencies *(optional)*

- **Existing Infrastructure**: This feature builds upon the existing AdhikarMitra data model (authorities.state.json), search functionality, and detail page rendering established in Feature 001
- **Data Collection**: Requires manual data collection from official AP government websites. This is a one-time effort with ongoing maintenance.
- **Search Enhancement**: The existing search functionality (Phase 3, T033) may need optimization to handle the larger dataset efficiently
- **Category Expansion**: The existing category list (categories.json) may need additional categories to properly classify all government departments (e.g., "Public Safety" for Police, "Infrastructure" for Transport/Roads)

## Risks *(optional)*

- **Data Maintenance Burden**: Keeping contact information current for 35+ departments and numerous authorities requires ongoing effort. Mitigation: Implement "lastVerified" date prominently to set user expectations; plan for community reporting of outdated info.
- **Incomplete Public Information**: Some departments may not publish grievance emails or key authority contacts publicly. Mitigation: Use general contact channels with clear labeling; mark incomplete data as such rather than fabricating information.
- **Website Link Rot**: Department websites may change URLs or go offline. Mitigation: Include lastVerified date for website links; implement periodic link checking.
- **Performance Impact**: Adding 100+ authority entries could slow down initial page load and search. Mitigation: Leverage existing lazy-loading architecture; optimize JSON structure; consider pagination if search results exceed 50 items.

## Out of Scope *(optional)*

- **Central Government Departments**: This feature focuses exclusively on Andhra Pradesh state government. Central government departments (ministries, PSUs) are out of scope.
- **Local Body Offices**: Municipal corporations, municipalities, and panchayats (village-level) are out of scope for this feature. Focus is on state-level and district-level offices only.
- **Physical Addresses**: Office addresses are not included in this phase. Focus is on digital contact methods (phone, email, website).
- **Operating Hours**: Office timings and working hours are not included.
- **Organizational Charts**: Hierarchical relationships within departments (reporting structure, organizational diagrams) are out of scope.
- **Interactive Features**: Online form submission, live chat with officials, or appointment booking are not part of this feature.
- **Historical Data**: Previous contact information or change history is not maintained.
- **Verification Workflow**: Automated link checking or contact number verification systems are out of scope. Verification will be manual.
