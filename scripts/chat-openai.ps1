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

# Ensure UTF-8 on stdout (avoids Here???s instead of Here's on Windows)
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$content = $response.choices[0].message.content
$utf8 = New-Object System.Text.UTF8Encoding $false
[Console]::OpenStandardOutput().Write($utf8.GetBytes($content), 0, $utf8.GetByteCount($content))
