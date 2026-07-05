# Call OpenAI chat completions (works when Node.js DNS fails on Windows)
param([string]$PayloadPath)

$ErrorActionPreference = "Stop"

Get-Content (Join-Path $PSScriptRoot "..\.env") | ForEach-Object {
  if ($_ -match '^\s*OPENAI_API_KEY=(.+)$') {
    $env:OPENAI_API_KEY = $matches[1].Trim().Trim('"')
  }
}

if (-not $env:OPENAI_API_KEY) { Write-Error "OPENAI_API_KEY missing" }

$payload = Get-Content $PayloadPath -Raw -Encoding UTF8
$bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($payload)

$response = Invoke-RestMethod -Uri "https://api.openai.com/v1/chat/completions" `
  -Method POST `
  -Headers @{ Authorization = "Bearer $env:OPENAI_API_KEY"; "Content-Type" = "application/json; charset=utf-8" } `
  -Body $bodyBytes `
  -TimeoutSec 90

Write-Output $response.choices[0].message.content
