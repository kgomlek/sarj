# Git Kurulumu ve Başlatma - Manuel Talimatlar

## ⚠️ ÖNEMLİ: PowerShell'i Yeniden Başlatın

Git kurulumu tamamlandı, ancak PowerShell'in **yeniden başlatılması** gerekiyor ki Git PATH'e eklensin.

## Adım Adım Talimatlar

### 1. PowerShell'i Kapatın ve Yeniden Açın
- Mevcut PowerShell penceresini kapatın
- Yeni bir PowerShell penceresi açın (Yönetici olarak açmanız gerekmez)

### 2. Proje Klasörüne Gidin
```powershell
cd D:\Uygulama\jarz
```

### 3. Git Komutlarını Çalıştırın

**Komut 1: Git deposunu başlat**
```powershell
git init
```

**Komut 2: Dosyaları ekle**
```powershell
git add .
```

**Komut 3: İlk commit**
```powershell
git commit -m "Ilk commit: EV Rota Planlama uygulamasi"
```

**Komut 4: Ana branch**
```powershell
git branch -M main
```

**Komut 5: GitHub remote ekle**
```powershell
git remote add origin https://github.com/kgomlek/sarj.git
```

**Komut 6: GitHub'a push et**
```powershell
git push -u origin main
```

## GitHub Kimlik Doğrulaması

İlk push'ta GitHub kullanıcı adı ve şifre istenebilir. Şifre yerine **Personal Access Token** kullanmanız gerekir:

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" → "repo" izinlerini seçin
3. Token'ı kopyalayın ve şifre yerine kullanın

## Hızlı Kopyala-Yapıştır

PowerShell'i yeniden başlattıktan sonra tüm komutları tek seferde çalıştırmak için:

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

Eğer `git` komutu bulunamazsa:
1. PowerShell'i tamamen kapatın ve yeniden açın
2. Bilgisayarı yeniden başlatmayı deneyin
3. Git'in manuel olarak kurulduğundan emin olun: https://git-scm.com/download/win

