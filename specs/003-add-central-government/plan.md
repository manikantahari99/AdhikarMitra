# Technical Plan: Central Government Department Contacts

**Feature**: 003-add-central-government  
**Input**: spec.md  
**Status**: Ready for implementation

## Overview

This feature adds contact information for 18-22 major central government departments and offices operating in Andhra Pradesh. The infrastructure (UI, search, validation) is already in place from Feature 002, so this is primarily a data collection effort.

## Architecture

### Data Model (No Changes Required)

Reuses existing `authorities.state.json` schema:

```json
{
  "id": "income-tax-vijayawada",
  "name": "Income Tax Office - Vijayawada",
  "scope": "central",
  "category": "revenue-taxation",
  "description": "Administers direct tax collection, assessments, and taxpayer services for Vijayawada region. Handles PAN, TAN, and refund processing.",
  "contact": {
    "phone": "0866-2578900",
    "email": "vijayawada.itoffice@incometax.gov.in"
  },
  "website": "https://www.incometax.gov.in/",
  "grievanceEmail": "grievance.vijayawada@incometax.gov.in",
  "helpline": "1800-180-1961",
  "district": "Krishna",
  "lastVerified": "2025-11-08"
}
```

**Key Fields**:
- `scope`: "central" (triggers 🇮🇳 Central badge in UI)
- `district`: City/district where office is located in AP
- `website`: Points to national government portal
- `helpline`: Toll-free national helpline (if available)

### Categories

**Reuse Existing**:
- `revenue-taxation` - Income Tax, GST, Central Excise
- `transport` - Railways
- `utilities` - BSNL, Telecom
- `public-services` - EPFO, ESI, Labour Commissioner
- `environment-forest` - CPCB

**New Categories** (add to categories.json):
- `central-admin` - Passport Office, Census, Central Vigilance Commission
- `central-public-services` - India Post, Postal Services

## UI Components (Already Implemented)

✅ **Filter Tabs**: "🏢 Central Government" tab already functional  
✅ **Scope Badges**: "🇮🇳 Central" badge displays automatically based on scope field  
✅ **Search**: Already searches across scope field  
✅ **Clickable Websites**: All website links open in new tabs  
✅ **Detail Pages**: Display all fields including district, helpline, grievance email

**No UI changes required!**

## Implementation Strategy

### Phase 1: Setup (10 minutes)

1. Add 2 new categories to `categories.json`:
   - `central-admin`
   - `central-public-services`

### Phase 2: Data Collection (3-4 hours)

2. Collect and add 18-22 central government office entries to `authorities.state.json`:
   - **Tax & Revenue** (6 entries): Income Tax offices (4 cities), GST offices (2 commissionerates)
   - **Travel & Identity** (2 entries): Passport offices (Visakhapatnam, Tirupati)
   - **Railways** (3 entries): Railway divisions + helpline
   - **Postal Services** (2 entries): India Post circle office + Speed Post
   - **Employment & Labour** (4 entries): EPFO (2 offices), ESI, Labour Commissioner
   - **Telecom** (2 entries): BSNL, DoT
   - **Other Services** (1-2 entries): CPCB, Census

**Data Collection Sources**:
- Income Tax: <https://www.incometax.gov.in/iec/foportal/> (Office Locator)
- Passport: <https://www.passportindia.gov.in/>
- Railways: <https://scr.indianrailways.gov.in/>
- EPFO: <https://www.epfindia.gov.in/>
- India Post: <https://www.indiapost.gov.in/>

### Phase 3: Validation & Testing (30 minutes)

3. Run `.\scripts\validate-data.ps1`
4. Fix any errors (email formats, phone formats)
5. Test UI:
   - Click "🏢 Central Government" filter → verify 18-22 entries appear
   - Search for "income tax" → verify results
   - Click authority cards → verify websites open correctly

## File Changes

### Files to Modify

1. **src/data/categories.json** - Add 2 new categories
2. **src/data/authorities.state.json** - Add 18-22 central govt entries
3. **specs/003-add-central-government/tasks.md** - Track progress

### Files NOT Changed

- **src/assets/js/search.js** - Already supports scope filtering ✅
- **src/assets/js/render.js** - Already renders scope badges ✅
- **src/assets/css/base.css** - Already styles central badges ✅
- **src/index.html** - Filter tabs already exist ✅
- **scripts/validate-data.ps1** - Already validates scope field ✅

## Success Criteria

- ✅ 18-22 central government entries added with complete contact information
- ✅ All entries pass validation (0 errors)
- ✅ "Central Government" filter shows only central entries
- ✅ Search works across state + central datasets
- ✅ All website links functional
- ✅ Page load remains <3 seconds with ~68 total entries (46 state + 22 central)

## Timeline

- **Phase 1**: 10 minutes (add categories)
- **Phase 2**: 3-4 hours (data collection for 18-22 offices)
- **Phase 3**: 30 minutes (validation & testing)

**Total**: 4-5 hours end-to-end

## Risk Mitigation

- **Data Availability**: Some central offices may not publish email contacts publicly → Use general department emails + include helpline numbers
- **Regional Coverage**: Start with major cities (Visakhapatnam, Vijayawada, Guntur, Tirupati) → Can expand to smaller towns later
- **Performance**: 68 total entries well within performance budget → Existing architecture handles 100+ entries easily

---

**Plan Complete**  
**Ready for**: Implementation (tasks.md)  
**Next Step**: Create detailed task breakdown in tasks.md
