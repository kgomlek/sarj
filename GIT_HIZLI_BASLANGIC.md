# Git Hızlı Başlangıç Rehberi

## ⚠️ Durum
Git kurulumu devam ediyor veya tamamlanmamış. İki seçeneğiniz var:

## Seçenek 1: PowerShell'i Yeniden Başlatın (Önerilen)

1. **Mevcut PowerShell penceresini kapatın**
2. **Yeni bir PowerShell penceresi açın** (Yönetici olarak açmanız gerekmez)
3. Proje klasörüne gidin:
   ```powershell
   cd D:\Uygulama\jarz
   ```
4. Git komutlarını çalıştırın:
   ```powershell
   git init
   git add .
   git commit -m "Ilk commit: EV Rota Planlama uygulamasi"
   git branch -M main
   git remote add origin https://github.com/kgomlek/sarj.git
   git push -u origin main
   ```

## Seçenek 2: Git'i Manuel Kurun

1. **Git'i indirin:** https://git-scm.com/download/win
2. **Kurulumu çalıştırın** (varsayılan ayarları kullanın)
3. **PowerShell'i yeniden başlatın**
4. Yukarıdaki komutları çalıştırın

## Seçenek 3: PowerShell Script Kullanın

PowerShell'i yeniden başlattıktan sonra:

```powershell
cd D:\Uygulama\jarz
powershell -ExecutionPolicy Bypass -File .\git-setup.ps1
```

## GitHub Kimlik Doğrulaması

İlk push'ta GitHub kullanıcı adı ve token istenecek:

1. **Kullanıcı adı:** GitHub kullanıcı adınızı girin
2. **Şifre:** Personal Access Token kullanın (şifre değil!)

### Token Oluşturma:
1. GitHub.com → Sağ üst köşe → **Settings**
2. Sol menüden **Developer settings**
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token (classic)**
5. **repo** izinlerini seçin
6. Token'ı kopyalayın ve şifre yerine kullanın

## Hızlı Komutlar (Kopyala-Yapıştır)

PowerShell'i yeniden başlattıktan sonra:

```powershell
cd D:\Uygulama\jarz
git init
git add .
git commit -m "Ilk commit: EV Rota Planlama uygulamasi"
git branch -M main
git remote add origin https://github.com/kgomlek/sarj.git
git push -u origin main
```

## Sorun Giderme

### "git is not recognized" hatası:
- PowerShell'i **tamamen kapatıp yeniden açın**
- Bilgisayarı yeniden başlatmayı deneyin
- Git'in kurulu olduğundan emin olun

### "remote origin already exists" hatası:
```powershell
git remote remove origin
git remote add origin https://github.com/kgomlek/sarj.git
```

### "failed to push" hatası:
- GitHub kimlik doğrulamasını kontrol edin
- Personal Access Token kullandığınızdan emin olun
- İnternet bağlantınızı kontrol edin

