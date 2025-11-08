# Feature Specification: Comprehensive All-India Government Services Portal

**Feature Branch**: `003-add-central-government`  
**Created**: November 8, 2025  
**Updated**: November 8, 2025 (Expanded to All-India scope)  
**Status**: Draft  
**Input**: User request: "All the central government department details also shall be there in the website. Emergency services (Police 100, Fire, etc.), independent bodies (RBI, CBI, ED, Lokpal, ECI), and comprehensive grievance information for every department. One-stop solution for all Indian citizens."

## Vision

Transform AdhikarMitra into a **comprehensive one-stop portal for ALL Indian citizens** providing:
- ✅ State Government Departments (Andhra Pradesh initially, expandable to other states)
- ✅ Central Government Departments (Regional offices + National headquarters)
- 🚨 **Emergency Services** (Police 100, Fire 101, Ambulance 102/108, Women Helpline 181, Child Helpline 1098, Disaster Management, etc.)
- 🏛️ **Independent Constitutional Bodies** (RBI, CBI, ED, Lokpal, ECI, CAG, NHRC, CVC, CIC, UPSC, etc.)
- 📧 **Comprehensive Grievance Mechanisms** (CPGRAMS, RTI, department-specific portals)
- 🇮🇳 **National Services** (Passport, Visa, Aadhaar, PAN, Voter ID, etc.)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Access Central Government Department Contacts (Priority: P1)

A citizen of Andhra Pradesh needs to contact a central government department office located in the state (e.g., Income Tax office in Vijayawada, Regional Passport Office in Visakhapatnam, or Railway Division office in Guntur). They visit AdhikarMitra and can find contact information for major central government departments operating in AP.

**Why this priority**: Citizens frequently need to interact with central government services (taxes, passports, railways, postal services, EPFO) that operate within their state. Providing these contacts alongside state government departments makes AdhikarMitra a comprehensive grievance and contact directory.

**Independent Test**: Can be fully tested by using the existing State/Central filter tabs, selecting "Central Government", and verifying that central department offices appear with complete contact information. Delivers immediate value by being a one-stop portal for all government contacts.

**Acceptance Scenarios**:

1. **Given** a user selects the "🏢 Central Government" filter tab, **When** the results display, **Then** all central government department entries appear (Income Tax, Railways, Post Office, Passport Office, etc.)
2. **Given** a user searches for "Income Tax", **When** the search executes, **Then** all Income Tax offices in AP appear with addresses, phone numbers, and email contacts
3. **Given** a user views a central department detail page, **When** they check the scope badge, **Then** it clearly shows "🇮🇳 Central" to distinguish from state departments

---

### User Story 2 - Access Central Government Grievance Portals (Priority: P2)

A citizen wants to file a grievance with a central government department through the appropriate portal (CPGRAMS, departmental grievance mechanisms). They need links to official grievance submission portals and grievance email addresses.

**Why this priority**: Central government departments have dedicated grievance mechanisms like CPGRAMS (Centralized Public Grievance Redress and Monitoring System). Providing direct links and contacts helps citizens navigate the correct channels.

**Independent Test**: Can be tested by viewing any central department detail page and verifying grievance contact information and portal links are displayed.

**Acceptance Scenarios**:

1. **Given** a user views the Income Tax Department page, **When** they look for grievance options, **Then** they see a link to the Income Tax Grievance portal and CPGRAMS
2. **Given** a department has a dedicated helpline (e.g., Railway helpline 139), **When** the user views the page, **Then** the helpline number is prominently displayed
3. **Given** a user wants to submit an online grievance, **When** they click "File Grievance Online", **Then** it opens the official CPGRAMS portal or department-specific portal in a new tab

---

### User Story 3 - Search Across State and Central Departments (Priority: P3)

A citizen is unsure whether their query falls under state or central jurisdiction (e.g., "GST" involves both state and central tax departments). They want to search across all departments and filter by government level.

**Why this priority**: Many services overlap between state and central jurisdictions. Unified search with clear differentiation helps users find the right authority regardless of administrative boundaries.

**Independent Test**: Can be tested by searching for overlapping terms like "tax", "education", "employment" and verifying both state and central results appear with clear scope badges.

**Acceptance Scenarios**:

1. **Given** a user searches for "tax", **When** results display, **Then** both state departments (Commercial Taxes) and central departments (Income Tax, GST) appear with scope badges
2. **Given** a user wants only central department results, **When** they apply the "Central Government" filter, **Then** only central entries are shown
3. **Given** a user switches between "State" and "Central" filters, **When** the filter changes, **Then** results update instantly without page reload

---

### Edge Cases

- What happens when a central department has multiple regional offices in AP (e.g., Income Tax has offices in Visakhapatnam, Vijayawada, Guntur, Tirupati)?
  → Each regional office is a separate authority entry with its district/city specified
- What happens when a citizen searches for services that exist at both levels (e.g., "employment exchange")?
  → Both state and central entries appear; scope badges help distinguish jurisdiction
- How does the system handle central PSUs vs. central ministries?
  → PSUs (public sector undertakings) like Railways, BSNL are included if they provide direct citizen services; ministries are included if they have AP-based offices
- What happens when a central department website or contact changes?
  → "Last Verified" date helps users assess currency; quarterly verification process applies to both state and central entries
- How are offices that serve multiple districts handled (e.g., Regional Passport Office covering 5 districts)?
  → The office is tagged with its primary district/city; description mentions coverage area

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST include contact information for major central government departments operating in Andhra Pradesh including but not limited to: Income Tax Department, GST Department, Regional Passport Offices, Railway Division Offices, India Post offices, EPFO (Employee Provident Fund Organisation), ESI Corporation, Central Excise & Customs, Labour Commissioner (Central), Regional Transport Authority (if applicable), Telecom offices (BSNL, DoT), Census offices, Central PSUs with citizen-facing services
- **FR-002**: System MUST display office address (city/district) for each central department entry to help users locate the nearest office
- **FR-003**: System MUST display primary contact phone numbers and email addresses for each central office
- **FR-004**: System MUST provide links to central government grievance portals (CPGRAMS, departmental grievance systems)
- **FR-005**: System MUST distinguish central government entries from state government entries using the `scope: "central"` field and visual badges
- **FR-006**: System MUST support filtering by government level (State/Central) using existing filter tabs
- **FR-007**: System MUST include regional office information where central departments have multiple offices in AP (e.g., Income Tax offices in major cities)
- **FR-008**: System MUST provide helpline numbers for central services (e.g., Railway Helpline 139, Income Tax Helpline 1800-180-1961)
- **FR-009**: System MUST link to official central government websites (e.g., incometaxindia.gov.in, indiapost.gov.in, passportindia.gov.in)
- **FR-010**: System MUST display last verified date for each central department entry to indicate information currency
- **FR-011**: System MUST organize central departments using the existing category system (add new categories if needed, e.g., "Central Administration", "Central Public Services")
- **FR-012**: System MUST validate that central government email addresses follow official formats (e.g., @incometaxindia.gov.in, @epfindia.gov.in, @nic.in for government emails)
- **FR-013**: System MUST handle searches that return both state and central results, displaying them together with clear differentiation
- **FR-014**: System MUST support clickable website links that open central government portals in new tabs
- **FR-015**: System MUST maintain the same data quality standards (phone, email, website verification) for central entries as for state entries

### Key Entities

- **Central Government Authority**: Represents a central government department or office operating in AP. Attributes include: unique identifier, official name, scope: "central", category, description, contact (phone, email), office location (city/district in AP), website URL, grievance portal URL, helpline numbers, lastVerified date, coverage area (if office serves multiple districts)

### Key Differences from State Departments

- **Scope Field**: All central entries have `"scope": "central"` (already implemented in UI)
- **Location**: Central offices must specify city/district in AP (e.g., "Income Tax Office - Vijayawada")
- **Grievance Mechanism**: May include CPGRAMS portal link in addition to department-specific grievance channels
- **Jurisdiction**: Some central offices serve multiple districts (e.g., Regional Passport Office covers 5-6 districts)
- **Websites**: Point to national government portals (.gov.in domains) rather than AP state portals

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can find any major central government department office in AP within 2-3 clicks from the homepage
- **SC-002**: System includes contact data for at least 15-20 major central government offices/departments operating in AP
- **SC-003**: 95%+ central department entries include verified phone number, email address, and office location
- **SC-004**: 100% of central department entries include working links to official national government websites
- **SC-005**: Users can filter and view only central government departments using the existing "🏢 Central Government" filter tab
- **SC-006**: Search results clearly distinguish state vs. central entries using scope badges (🏛️ State vs. 🇮🇳 Central)
- **SC-007**: Grievance portal links (CPGRAMS or department-specific) are available for 80%+ central departments
- **SC-008**: Page load performance remains <3s even with combined state + central dataset (projected 60-70 total entries)

## Assumptions *(mandatory)*

1. **Data Source**: Central government contact information will be collected from official national government portals (india.gov.in, department-specific websites, CPGRAMS directory). All contact details are publicly available.
2. **AP-Specific Offices**: Only central government offices physically located in Andhra Pradesh are included (e.g., Income Tax offices in AP cities, not Delhi headquarters)
3. **Data Accuracy**: Contact information is accurate at the time of collection. The "lastVerified" date helps users assess currency.
4. **Scope**: Focus on citizen-facing central government services (taxes, passports, railways, post office, employment services). Exclude defense establishments, intelligence agencies, and non-citizen-facing ministries.
5. **Regional Coverage**: For departments with multiple offices, include major cities (Visakhapatnam, Vijayawada, Guntur, Tirupati, Kakinada) at minimum. Additional offices can be added incrementally.
6. **Email Format**: Central government emails may use .gov.in, department-specific domains, or .nic.in (National Informatics Centre). All are considered valid government email formats.
7. **Update Frequency**: Same quarterly verification cycle applies to central entries as state entries.
8. **No Authentication**: All central government contact information is publicly accessible without login.

## Non-Functional Requirements *(optional)*

- **NFR-001**: The expanded dataset (46 state + 20 central = 66 total) must not degrade page load performance beyond the existing 2.5 second LCP budget
- **NFR-002**: The State/Central filter tabs must respond instantly (<100ms) to user interaction
- **NFR-003**: Search performance must remain <3ms per keystroke even with combined state and central entries
- **NFR-004**: The data structure must remain consistent with existing authorities.state.json schema (no breaking changes)

## Dependencies *(optional)*

- **Feature 002 Infrastructure**: This feature builds upon the State/Central differentiation UI already implemented in Feature 002 (scope badges, filter tabs, clickable website links)
- **Existing Search**: The existing search functionality already supports filtering by scope field
- **Validation Script**: The existing validate-data.ps1 script already validates scope field and email formats
- **Data Collection**: Requires manual data collection from central government websites (one-time effort, 3-4 hours)

## Risks *(optional)*

- **Data Maintenance**: Central government office locations and contacts may change due to organizational restructuring. Mitigation: Quarterly verification cycle, "lastVerified" date display.
- **Jurisdiction Confusion**: Citizens may be unclear about state vs. central jurisdiction for certain services. Mitigation: Clear scope badges, search results include both levels by default.
- **Regional Office Completeness**: Central departments may have offices in smaller towns not included initially. Mitigation: Start with major cities, add incrementally based on user demand.
- **Performance Impact**: Adding 20 more entries increases dataset to ~66 entries. Mitigation: Existing pagination/lazy loading architecture handles this easily; monitor performance metrics.

## Out of Scope *(optional)*

- **Central Government Ministries (Delhi Offices)**: Only AP-based offices included; central ministry headquarters in Delhi excluded
- **Defense & Intelligence**: Military bases, defense establishments, intelligence agencies excluded (security concerns)
- **Embassies & Consulates**: Foreign affairs offices excluded (not relevant to AP citizen grievances)
- **Central PSUs without Citizen Services**: Public sector companies that don't provide direct citizen services (e.g., HAL, BHEL) excluded unless they have dedicated customer service offices in AP
- **District-Level Central Offices**: Initially focusing on division/regional level central offices. Sub-district offices (e.g., every post office branch) deferred to future phase.
- **Historical Data**: No tracking of office relocations or contact changes over time
- **Interactive Services**: Online applications, form submissions, appointment booking remain on departmental websites (not integrated into AdhikarMitra)

## Suggested Central Government Departments to Include

### Tax & Revenue (Category: `revenue-taxation`)

- Income Tax Department - Visakhapatnam Office
- Income Tax Department - Vijayawada Office
- Income Tax Department - Guntur Office
- Income Tax Department - Tirupati Office
- Central GST & Central Excise - Visakhapatnam Commissionerate
- Central GST & Central Excise - Vijayawada Commissionerate

### Travel & Identity (New Category: `central-admin`)

- Regional Passport Office - Visakhapatnam
- Regional Passport Office - Tirupati

### Railways (Category: `transport`)

- South Central Railway - Vijayawada Division
- South Central Railway - Guntur Division
- Indian Railways Helpline (139)

### Postal Services (New Category: `central-public-services`)

- India Post - Andhra Pradesh Circle Office
- Speed Post & Courier Services Helpline

### Employment & Labour (Category: `public-services`)

- EPFO (Employee Provident Fund Organisation) - Visakhapatnam Regional Office
- EPFO - Vijayawada Regional Office
- ESI Corporation (Employee State Insurance) - AP Regional Office
- Central Labour Commissioner - AP Office

### Telecom (Category: `utilities`)

- BSNL (Bharat Sanchar Nigam Limited) - AP Circle Customer Care
- Department of Telecommunications - AP Office

### Other Central Services

- Central Pollution Control Board - AP Regional Office (Category: `environment-forest`)
- Census of India - AP Directorate (Category: `central-admin`)
- Central Vigilance Commission - AP Branch (if applicable)

**Estimated Total**: 18-22 central government authority entries covering major citizen-facing services in AP.

---

**Feature Specification Complete**  
**Ready for**: Planning phase  
**Next Step**: Run `/speckit.plan` to generate technical plan and implementation tasks
