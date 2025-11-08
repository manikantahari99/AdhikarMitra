# State-Level Data Collection Guide (T005)

**Feature**: 002-add-comprehensive-andhra  
**Objective**: Collect and verify contact information for ~35 core Andhra Pradesh state-level government departments.  
**Estimated Time**: 20-25 hours

---

## 1. Workflow

1.  **Pick a Department**: Choose an unchecked department from the **Department Checklist** below.
2.  **Find Official Website**: Use the **Primary Data Sources** to find the department's official website.
3.  **Extract Information**: On the website, locate the "Contact Us" or equivalent page and find:
    -   Official Name
    -   Primary Phone Number (landline or mobile)
    -   Primary Email Address (must end in `.gov.in`)
    -   Official Website URL
4.  **Find Grievance Contacts**: Look for a "Grievances" or "Vigilance" section to find:
    -   Dedicated Grievance Email (if different from primary)
    -   Helpline / Toll-Free Number
5.  **Create Entry**:
    -   **ID**: Create a unique, lowercase, kebab-case ID (e.g., `finance-dept`, `higher-education-dept`).
    -   **Description**: Write a concise 100-300 character description of the department's function.
    -   **Category**: Assign the most relevant category ID from `src/data/categories.json`.
    -   **lastVerified**: Set to the current date in `YYYY-MM-DD` format.
6.  **Fill Template**: Copy the **JSON Entry Template** below and fill in the extracted details.
7.  **Add to JSON**: Open `src/data/authorities.state.json`, add a comma after the last entry, and paste your new JSON object.
8.  **Update Checklist**: Mark the department as complete in the checklist below.
9.  **Repeat**: Continue until all departments are collected.

---

## 2. Primary Data Sources

-   **AP State Portal**: `https://www.ap.gov.in` (for a list of departments)
-   **AP Secretariat**: `https://apsecretariat.ap.gov.in`
-   **AP Grievance Portal**: `https://grievance.ap.gov.in`
-   **Google Search**: Use queries like `"Andhra Pradesh [Department Name] official website"`

---

## 3. JSON Entry Template (New Schema)

Copy and paste this template into `src/data/authorities.state.json` for each new department.

```json
{
  "id": "unique-kebab-case-id",
  "name": "Full Department Name",
  "category": "category-id-from-categories-json",
  "description": "A concise description of the department's responsibilities, between 100 and 300 characters long.",
  "contact": {
    "phone": "0866-xxxxxxx",
    "email": "contact@department.gov.in"
  },
  "website": "https://department.ap.gov.in",
  "grievanceEmail": "grievance@department.gov.in",
  "helpline": "1800-xxx-xxxx",
  "lastVerified": "2025-11-08"
}
```

**Note**: `grievanceEmail` and `helpline` are optional but highly encouraged. If not found, you can omit them.

---

## 4. Department Checklist

*Use this checklist to track progress. Mark with an `[x]` when complete.*

### Governance & Administration
- [ ] General Administration Department (GAD)
- [ ] Law Department
- [ ] Home Department (Police, Prisons, Fire)
- [ ] Finance Department
- [ ] Planning Department
- [ ] Information Technology, Electronics & Communications (ITE&C)
- [ ] Public Enterprises Department

### Revenue & Land
- [ ] Revenue Department (Stamps & Registration, Survey & Land Records)
- [ ] Commercial Taxes Department
- [ ] Excise Department

### Agriculture & Rural
- [ ] Agriculture & Cooperation Department
- [ ] Animal Husbandry, Dairy Development & Fisheries
- [ ] Rural Development Department (Panchayat Raj)
- [ ] Water Resources Department (Irrigation)
- [ ] Civil Supplies Department

### Human Development
- [ ] School Education Department
- [ ] Higher Education Department
- [ ] Health, Medical & Family Welfare Department
- [ ] Women, Children, Disabled & Senior Citizens Department
- [ ] Social Welfare Department
- [ ] Tribal Welfare Department
- [ ] Skill Development & Training Department

### Infrastructure & Economy
- [ ] Transport, Roads & Buildings Department
- [ ] Industries & Commerce Department
- [ ] Energy Department
- [ ] Housing Department
- [ ] Municipal Administration & Urban Development (MA&UD)
- [ ] Environment, Forest, Science & Technology Department
- [ ] Tourism, Culture & Youth Advancement Department

### Other
- [ ] Labour, Factories, Boilers & Insurance Medical Services
- [ ] Real Time Governance Society (RTGS)
- [ ] AP State Disaster Management Authority (APSDMA)

---

## 5. After Collection

Once all departments are collected:

1.  **Format**: Ensure the `authorities.state.json` file is still valid JSON (no trailing commas).
2.  **Validate**: Run the validation script as per `tests/manual/data-verification-checklist.md`.
3.  **Commit**: Commit the updated JSON file: `git commit -m "feat(data): T005 - add 35 state-level department entries"`
4.  **Proceed**: Move to task T006 for data verification.
