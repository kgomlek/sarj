# Git Komutları - Hızlı Başlangıç

Git kurulumu tamamlandı! Şimdi PowerShell'i **yeniden başlatın** ve aşağıdaki komutları çalıştırın:

## PowerShell'i Yeniden Başlatın

Git kurulumundan sonra PowerShell'i kapatıp yeniden açmanız gerekiyor.

## Komutlar

PowerShell'i yeniden başlattıktan sonra proje klasörüne gidin ve şu komutları çalıştırın:

```powershell
# Proje klasörüne git
cd D:\Uygulama\jarz

# Git deposunu başlat
git init

# Tüm dosyaları ekle
git add .

# İlk commit'i yap
git commit -m "İlk commit: EV Rota Planlama uygulaması"

# Ana branch'i oluştur
git branch -M main

# GitHub remote'unu ekle
git remote add origin https://github.com/kgomlek/sarj.git

# GitHub'a push et
git push -u origin main
```

## Alternatif: Batch Script Kullanımı

PowerShell'i yeniden başlattıktan sonra `git-init.bat` dosyasını çift tıklayarak çalıştırabilirsiniz.

## İlk Kez Push İçin

Eğer GitHub kimlik doğrulaması istenirse:
1. GitHub kullanıcı adınızı girin
2. Personal Access Token kullanın (şifre yerine)
3. Token oluşturmak için: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

## Sonraki Değişiklikler İçin

```powershell
git add .
git commit -m "Değişiklik açıklaması"
git push
```

