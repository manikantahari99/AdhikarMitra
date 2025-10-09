param(
    [int]$Port = 8120
)

$ErrorActionPreference = 'Stop'

Write-Host "Starting static server on port $Port ..." -ForegroundColor Cyan

# Resolve script directory (repo root)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $scriptDir

# Check python availability
try {
    $pyVersion = (& python --version) 2>$null
    Write-Host "Python detected: $pyVersion" -ForegroundColor DarkGray
} catch {
    Write-Error "Python not found in PATH. Install Python or adjust serve.ps1 to use another static server."; exit 1
}

# Start server as a background job so the shell stays interactive
$job = Start-Job -ScriptBlock {
    param($dir,$port)
    Set-Location $dir
    python -m http.server $port
} -ArgumentList $scriptDir,$Port

# Simple wait & health check
Start-Sleep -Seconds 2
try {
    $resp = Invoke-WebRequest -UseBasicParsing -Uri "http://localhost:$Port/src/index.html" -TimeoutSec 5
    if($resp.StatusCode -eq 200){
        Write-Host "Server responding (HTTP 200). Opening browser..." -ForegroundColor Green
        Start-Process "http://localhost:$Port/src/index.html"
    } else {
        Write-Warning "Unexpected status code: $($resp.StatusCode)"
    }
} catch {
    Write-Warning "Health check failed: $_"
}

Write-Host "Job Id: $($job.Id). Use 'Receive-Job -Id $($job.Id)' to view logs, 'Stop-Job -Id $($job.Id)' to stop." -ForegroundColor Yellow

Pop-Location
