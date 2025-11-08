# Adhikar Mitra Data Validation Script (PowerShell)
# Feature 002 - Validate authorities.state.json

param(
    [switch]$Verbose
)

Write-Host "`n=== Adhikar Mitra Data Validation ===" -ForegroundColor Cyan
Write-Host "Starting validation...`n"

$ErrorActionPreference = 'Stop'

# Initialize results
$results = @{
    errors = @()
    warnings = @()
    stats = @{
        total = 0
        state = 0
        district = 0
        fileSize = 0
        coverage = @{
            phone = 0
            email = 0
            grievanceEmail = 0
            website = 0
        }
    }
}

function Add-Error {
    param([string]$id, [string]$message)
    $results.errors += "[$id] $message"
}

function Add-Warning {
    param([string]$id, [string]$message)
    $results.warnings += "[$id] $message"
}

try {
    # Load JSON files
    $authoritiesPath = "src/data/authorities.state.json"
    $categoriesPath = "src/data/categories.json"
    
    Write-Host "Loading data files..." -ForegroundColor Gray
    $authorities = Get-Content $authoritiesPath -Raw | ConvertFrom-Json
    $categories = Get-Content $categoriesPath -Raw | ConvertFrom-Json
    
    # Get file size
    $fileSize = (Get-Item $authoritiesPath).Length / 1KB
    $results.stats.fileSize = [math]::Round($fileSize, 2)
    
    Write-Host "File size: $($results.stats.fileSize) KB" -ForegroundColor Gray
    
    # Validation constants
    $AP_DISTRICTS = @(
        "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool",
        "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram",
        "West Godavari", "YSR Kadapa", "NTR", "Parvathipuram Manyam",
        "Alluri Sitarama Raju", "Kakinada", "Dr. B.R. Ambedkar Konaseema",
        "Eluru", "Palnadu", "Bapatla", "Annamaya", "Tirupati",
        "Sri Potti Sriramulu Nellore", "Sri Satya Sai", "Nandyal"
    )
    $MAX_FILE_SIZE_KB = 500
    $authorityIds = @{}
    
    # File-level validation
    if ($results.stats.fileSize -gt $MAX_FILE_SIZE_KB) {
        Add-Error "FILE" "authorities.state.json size ($($results.stats.fileSize) KB) exceeds budget of $MAX_FILE_SIZE_KB KB."
    }
    
    Write-Host "Validating $($authorities.Count) entries...`n" -ForegroundColor Gray
    
    # Record-level validation
    foreach ($a in $authorities) {
        $results.stats.total++
        
        # 1. ID Validation
        if (-not $a.id -or $a.id -notmatch '^[a-z0-9-]{3,50}$') {
            Add-Error ($a.id ?? 'NO_ID') "ID is missing, invalid format, or not between 3-50 chars (kebab-case)."
        }
        if ($authorityIds.ContainsKey($a.id)) {
            Add-Error $a.id "Duplicate ID found."
        }
        $authorityIds[$a.id] = $true
        
        # 2. Name and Description
        if (-not $a.name -or $a.name.Length -lt 5 -or $a.name.Length -gt 100) {
            Add-Warning $a.id "Name is missing or not between 5-100 characters."
        }
        if ($a.contact -and (-not $a.description -or $a.description.Length -lt 100 -or $a.description.Length -gt 300)) {
            Add-Warning $a.id "Description for new entry is missing or not between 100-300 characters."
        }
        
        # 3. Category Validation
        if (-not $a.category -or -not ($categories | Where-Object { $_.id -eq $a.category })) {
            Add-Error $a.id "Category '$($a.category)' does not exist in categories.json."
        }
        
        # 4. Date Validation
        if (-not $a.lastVerified -or $a.lastVerified -notmatch '^\d{4}-\d{2}-\d{2}$') {
            Add-Error $a.id "lastVerified date is missing or not in YYYY-MM-DD format."
        } elseif ([DateTime]::Parse($a.lastVerified) -gt (Get-Date)) {
            Add-Error $a.id "lastVerified date cannot be in the future."
        }
        
        # 5. Contact Validation
        $emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.gov\.in$'
        $phoneRegex = '^(\d{10}|\d{4}-\d{7})$'
        
        if ($a.contact) {
            # New format
            $results.stats.coverage.phone++
            $results.stats.coverage.email++
            
            if (-not $a.contact.phone -or ($a.contact.phone -replace '-','') -notmatch $phoneRegex) {
                Add-Warning $a.id "Primary phone '$($a.contact.phone)' does not match required format (10 digits or STD-7 digits)."
            }
            if (-not $a.contact.email -or $a.contact.email -notmatch $emailRegex) {
                Add-Warning $a.id "Primary email '$($a.contact.email)' does not end in .gov.in."
            }
            if ($a.contact.grievanceEmail) {
                $results.stats.coverage.grievanceEmail++
                if ($a.contact.grievanceEmail -notmatch $emailRegex) {
                    Add-Warning $a.id "Grievance email '$($a.contact.grievanceEmail)' does not end in .gov.in."
                }
                if ($a.contact.grievanceEmail -eq $a.contact.email) {
                    Add-Warning $a.id "Grievance email should not be the same as the primary contact email."
                }
            }
        } elseif ($a.primaryContacts -and $a.primaryContacts.Count -gt 0) {
            # Legacy format
            $results.stats.coverage.phone++
        } else {
            Add-Error $a.id "No contact information found (neither 'contact' object nor 'primaryContacts' array)."
        }
        
        # 6. Website Validation
        if ($a.website) {
            $results.stats.coverage.website++
            if ($a.website -notmatch '^https://') {
                Add-Warning $a.id "Website '$($a.website)' does not use HTTPS."
            }
        } elseif ($a.contact) {
            Add-Error $a.id "Website is a required field for new entries."
        }
        
        # 7. District and Scope Validation
        if ($a.district) {
            $results.stats.district++
            if ($AP_DISTRICTS -notcontains $a.district) {
                Add-Error $a.id "District '$($a.district)' is not a valid AP district."
            }
        } elseif ($a.scope -eq 'state' -or $a.contact) {
            $results.stats.state++
        }
        
        # 8. Parent Department Validation
        if ($a.parentDepartment -and -not $authorityIds.ContainsKey($a.parentDepartment)) {
            Add-Warning $a.id "Parent department ID '$($a.parentDepartment)' does not exist (yet). Check order."
        }
    }
    
    # Calculate coverage percentages
    if ($results.stats.total -gt 0) {
        $results.stats.coverage.phone = [math]::Round(($results.stats.coverage.phone / $results.stats.total) * 100)
        $results.stats.coverage.email = [math]::Round(($results.stats.coverage.email / $results.stats.total) * 100)
        $results.stats.coverage.grievanceEmail = [math]::Round(($results.stats.coverage.grievanceEmail / $results.stats.total) * 100)
        $results.stats.coverage.website = [math]::Round(($results.stats.coverage.website / $results.stats.total) * 100)
    }
    
    # Display Results
    Write-Host "--- ✅ VALIDATION COMPLETE ---`n" -ForegroundColor Green
    
    Write-Host "--- 📊 Statistics ---" -ForegroundColor Cyan
    Write-Host "- File Size: $($results.stats.fileSize) KB (Budget: $MAX_FILE_SIZE_KB KB)"
    Write-Host "- Total Entries: $($results.stats.total)"
    Write-Host "  - State-Level: $($results.stats.state)"
    Write-Host "  - District-Level: $($results.stats.district)"
    Write-Host "- Coverage:"
    Write-Host "  - Phone: $($results.stats.coverage.phone)%"
    Write-Host "  - Email: $($results.stats.coverage.email)%"
    Write-Host "  - Grievance Email: $($results.stats.coverage.grievanceEmail)%"
    Write-Host "  - Website: $($results.stats.coverage.website)%"
    Write-Host ""
    
    if ($results.warnings.Count -gt 0) {
        Write-Host "--- ⚠️  Warnings ($($results.warnings.Count)) ---" -ForegroundColor Yellow
        foreach ($w in $results.warnings) {
            Write-Warning $w
        }
        Write-Host ""
    } else {
        Write-Host "--- ✅ No Warnings ---" -ForegroundColor Green
        Write-Host ""
    }
    
    if ($results.errors.Count -gt 0) {
        Write-Host "--- ❌ Errors ($($results.errors.Count)) ---" -ForegroundColor Red
        foreach ($e in $results.errors) {
            Write-Error $e -ErrorAction Continue
        }
        Write-Host "`nValidation failed with errors." -ForegroundColor Red
        exit 1
    } else {
        Write-Host "--- ✅ No Errors ---" -ForegroundColor Green
        Write-Host "`nValidation passed successfully! ✨" -ForegroundColor Green
    }
    
} catch {
    Write-Host "`n❌ A critical error occurred during validation:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host $_.ScriptStackTrace -ForegroundColor Gray
    exit 1
}
