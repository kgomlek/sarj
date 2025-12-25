@echo off
echo Git deposu baslatiliyor...
git init

echo Dosyalar ekleniyor...
git add .

echo Ilk commit yapiliyor...
git commit -m "Ilk commit: EV Rota Planlama uygulamasi"

echo Ana branch olusturuluyor...
git branch -M main

echo GitHub remote ekleniyor...
git remote add origin https://github.com/kgomlek/sarj.git

echo GitHub'a push ediliyor...
git push -u origin main

echo Tamamlandi!
pause

