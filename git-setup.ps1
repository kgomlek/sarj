# Git Kurulumu ve Depo Başlatma Scripti

Write-Host "Git araniyor..." -ForegroundColor Yellow

# Git'in olası konumlarını kontrol et
$gitPaths = @(
    "C:\Program Files\Git\cmd\git.exe",
    "C:\Program Files (x86)\Git\cmd\git.exe",
    "$env:LOCALAPPDATA\Microsoft\WindowsApps\git.exe",
    "$env:ProgramFiles\Git\cmd\git.exe"
)

$gitExe = $null
foreach ($path in $gitPaths) {
    if (Test-Path $path) {
        $gitExe = $path
        Write-Host "Git bulundu: $path" -ForegroundColor Green
        break
    }
}

if (-not $gitExe) {
    Write-Host "Git bulunamadi!" -ForegroundColor Red
    Write-Host "Lutfen PowerShell'i yeniden baslatin veya Git'i manuel olarak kurun." -ForegroundColor Yellow
    Write-Host "Indirme linki: https://git-scm.com/download/win" -ForegroundColor Cyan
    exit 1
}

# Git komutlarını çalıştır
$gitDir = Split-Path $gitExe -Parent
$env:Path = "$gitDir;$env:Path"

Write-Host "`nGit deposu baslatiliyor..." -ForegroundColor Cyan
& $gitExe init

Write-Host "Dosyalar ekleniyor..." -ForegroundColor Cyan
& $gitExe add .

Write-Host "Ilk commit yapiliyor..." -ForegroundColor Cyan
& $gitExe commit -m "Ilk commit: EV Rota Planlama uygulamasi"

Write-Host "Ana branch olusturuluyor..." -ForegroundColor Cyan
& $gitExe branch -M main

Write-Host "GitHub remote ekleniyor..." -ForegroundColor Cyan
& $gitExe remote add origin https://github.com/kgomlek/sarj.git

Write-Host "`nGitHub'a push ediliyor..." -ForegroundColor Cyan
Write-Host "Not: GitHub kimlik dogrulamasi gerekebilir." -ForegroundColor Yellow
& $gitExe push -u origin main

Write-Host "`nTamamlandi!" -ForegroundColor Green

