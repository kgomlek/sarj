# Git Kurulum ve GitHub'a Push Rehberi

## 1. Git Kurulumu

Git yüklü değil. Önce Git'i yükleyin:

### Windows için:
1. [Git for Windows](https://git-scm.com/download/win) indirin ve kurun
2. Kurulum sırasında varsayılan ayarları kullanın
3. PowerShell'i yeniden başlatın

### Alternatif (Chocolatey ile):
```powershell
choco install git
```

## 2. Git Yapılandırması

Git kurulduktan sonra, kullanıcı bilgilerinizi yapılandırın:

```bash
git config --global user.name "Adınız"
git config --global user.email "email@example.com"
```

## 3. Depoyu GitHub'a Push Etme

Git kurulduktan sonra aşağıdaki komutları sırayla çalıştırın:

```bash
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

## 4. Sonraki Değişiklikler İçin

Kod değişikliklerinden sonra:

```bash
git add .
git commit -m "Değişiklik açıklaması"
git push
```

## ⚠️ Önemli Notlar

- `.env.local` dosyası `.gitignore` içinde olduğu için commit edilmeyecek (güvenlik için)
- API anahtarlarınızı GitHub'a yüklemeyin
- `node_modules` klasörü otomatik olarak ignore edilir

## 🔐 Güvenlik

`.env.local` dosyasındaki API anahtarlarınızı asla GitHub'a yüklemeyin. Bu dosya `.gitignore` içinde olduğu için otomatik olarak ignore edilir.

