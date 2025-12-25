# Vercel Deploy Rehberi

## 🚀 Vercel'e Deploy Etme

### Yöntem 1: Vercel CLI ile (Hızlı)

1. **Vercel'e giriş yapın:**
```powershell
vercel login
```

2. **Projeyi deploy edin:**
```powershell
vercel
```

3. **Production'a deploy:**
```powershell
vercel --prod
```

### Yöntem 2: GitHub Entegrasyonu (Önerilen)

1. **GitHub'da projeniz hazır** ✅ (zaten push edildi)

2. **Vercel.com'a gidin:**
   - https://vercel.com adresine gidin
   - "Add New Project" tıklayın
   - GitHub hesabınızı bağlayın
   - `kgomlek/sarj` repository'sini seçin
   - "Import" tıklayın

3. **Environment Variables ekleyin:**
   Vercel proje ayarlarında şu değişkenleri ekleyin:
   - `NEXT_PUBLIC_MAPBOX_TOKEN` = `pk.eyJ1IjoiZXJ0dWdydWwwNDQiLCJhIjoiY21qa2M5aDRuMjlqaDNkczY2YWVrYXJ6ZiJ9.RFSfiuE1qhBOfKcWWyCkrw`
   - `NEXT_PUBLIC_OCM_API_KEY` = `a5beb3ca-2f8c-4959-ad27-307baffd3c82`

4. **Deploy!**
   - "Deploy" butonuna tıklayın
   - Vercel otomatik olarak build edip deploy edecek

## 📱 PWA Offline Çalışma

Uygulamanız zaten PWA olarak yapılandırılmış:
- ✅ Service Worker aktif
- ✅ Offline cache yapılandırılmış
- ✅ Manifest.json hazır
- ✅ Sunucu kapalı olsa bile çalışır (cache'lenmiş sayfalar)

## 🔧 Vercel Ayarları

- **Framework:** Next.js (otomatik algılanır)
- **Build Command:** `npm run build` (otomatik)
- **Output Directory:** `.next` (otomatik)
- **Install Command:** `npm install` (otomatik)

## 🌐 Domain

Deploy sonrası Vercel size bir URL verecek:
- Örnek: `https://sarj-xxxxx.vercel.app`
- Özel domain ekleyebilirsiniz (Vercel Pro gerekir)

## ⚙️ Environment Variables (ÖNEMLİ!)

Vercel dashboard'da mutlaka ekleyin:
1. Project Settings → Environment Variables
2. Her iki değişkeni ekleyin (Production, Preview, Development için)
3. Deploy'u yeniden başlatın

## 🔄 Otomatik Deploy

GitHub entegrasyonu ile:
- Her `git push` sonrası otomatik deploy
- Pull Request'ler için preview URL'leri
- Production deploy için `main` branch'e push

## 📝 Notlar

- PWA özellikleri production build'de aktif olur
- Development modunda PWA devre dışıdır (normal)
- Offline çalışma için kullanıcı uygulamayı bir kez açmalı (cache için)

