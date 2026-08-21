 # Fix DeepSeek-Harness "duplicate loader entry id: dsh-market" error
 # Usage: Run PowerShell as Administrator on the machine with DSH installed:
 #   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Bypass
 #   .\fix-duplicate-loader.ps1
 
 $ErrorActionPreference = "SilentlyContinue"
 
 $pluginsPath = "$env:LOCALAPPDATA\DeepSeek Harness\plugins"
 $cachePath  = "$env:LOCALAPPDATA\DeepSeek Harness\plugins-cache"
 $configPath = "$env:LOCALAPPDATA\DeepSeek Harness\config.json"
 
 Write-Host "=== DSH Duplicate Plugin Fix Tool ===" -ForegroundColor Cyan
 
 # Step 1: Kill DSH processes
 Write-Host "`n[1/4] Closing DeepSeek-Harness..." -ForegroundColor Yellow
 Get-Process | Where-Object { $_.ProcessName -like '*DeepSeek*' -or $_.ProcessName -like '*dsh*' } | Stop-Process -Force -ErrorAction SilentlyContinue
 Start-Sleep -Seconds 2
 Write-Host "      Done" -ForegroundColor Green
 
 # Step 2: Check for duplicate plugin folders
 Write-Host "`n[2/4] Checking plugin directory..." -ForegroundColor Yellow
 if (Test-Path $pluginsPath) {
     $marketFolders = Get-ChildItem $pluginsPath -Directory | Where-Object { $_.Name -like '*market*' }
     Write-Host "      Found $($marketFolders.Count) market-related folder(s):"
     $marketFolders | ForEach-Object { Write-Host "        - $($_.Name)" }
 
     if ($marketFolders.Count -gt 1) {
         Write-Host "      Duplicate detected! Keeping first, removing others..." -ForegroundColor Red
         $marketFolders | Select-Object -Skip 1 | ForEach-Object {
             Write-Host "      Deleting: $($_.FullName)" -ForegroundColor Red
             Remove-Item $_.FullName -Recurse -Force
         }
     } else {
         Write-Host "      No duplicate folders" -ForegroundColor Green
     }
 } else {
     Write-Host "      Plugin directory not found: $pluginsPath" -ForegroundColor Gray
 }
 
 # Step 3: Clear cache
 Write-Host "`n[3/4] Clearing plugin cache..." -ForegroundColor Yellow
 if (Test-Path $cachePath) {
     Remove-Item $cachePath -Recurse -Force
     Write-Host "      Deleted plugins-cache" -ForegroundColor Green
 } else {
     Write-Host "      Cache directory not found, skipping" -ForegroundColor Gray
 }
 
 # Step 4: Check config for duplicate entries
 Write-Host "`n[4/4] Checking config file..." -ForegroundColor Yellow
 if (Test-Path $configPath) {
     $content = Get-Content $configPath -Raw
     $matches = [regex]::Matches($content, '"dsh-market"')
     if ($matches.Count -gt 1) {
         Write-Host "      dsh-market appears $($matches.Count) times in config - DUPLICATE!" -ForegroundColor Red
         Write-Host "      Please manually edit $configPath to remove duplicate entries" -ForegroundColor Yellow
     } elseif ($matches.Count -eq 1) {
         Write-Host "      dsh-market appears 1 time in config - OK" -ForegroundColor Green
     } else {
         Write-Host "      dsh-market not found in config" -ForegroundColor Gray
     }
 } else {
     Write-Host "      Config file not found: $configPath" -ForegroundColor Gray
 }
 
 Write-Host "`n=== Fix Complete ===" -ForegroundColor Cyan
 Write-Host "Please restart DeepSeek-Harness client" -ForegroundColor White
