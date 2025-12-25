# Vercel Deploy Talimatları

## 🎯 GitHub Entegrasyonu ile Deploy (ÖNERİLEN)

Bu yöntem en kolay ve otomatik deploy sağlar.

### Adımlar:

1. **Vercel.com'a gidin:**
   - https://vercel.com adresine gidin
   - "Sign Up" veya "Log In" yapın (GitHub hesabınızla giriş yapabilirsiniz)

2. **Yeni Proje Ekle:**
   - Dashboard'da "Add New Project" butonuna tıklayın
   - GitHub hesabınızı bağlayın (ilk kez ise)
   - Repository listesinden `kgomlek/sarj` projesini bulun
   - "Import" butonuna tıklayın

3. **Proje Ayarları:**
   - Framework: Next.js (otomatik algılanır)
   - Root Directory: `./` (varsayılan)
   - Build Command: `npm run build` (varsayılan)
   - Output Directory: `.next` (varsayılan)

4. **Environment Variables Ekle (ÇOK ÖNEMLİ!):**
   - "Environment Variables" bölümüne gidin
   - Şu iki değişkeni ekleyin:
   
   **Değişken 1:**
   - Name: `NEXT_PUBLIC_MAPBOX_TOKEN`
   - Value: `pk.eyJ1IjoiZXJ0dWdydWwwNDQiLCJhIjoiY21qa2M5aDRuMjlqaDNkczY2YWVrYXJ6ZiJ9.RFSfiuE1qhBOfKcWWyCkrw`
   - Environment: Production, Preview, Development (hepsini seçin)
   
   **Değişken 2:**
   - Name: `NEXT_PUBLIC_OCM_API_KEY`
   - Value: `a5beb3ca-2f8c-4959-ad27-307baffd3c82`
   - Environment: Production, Preview, Development (hepsini seçin)

5. **Deploy!**
   - "Deploy" butonuna tıklayın
   - Vercel otomatik olarak build edip deploy edecek
   - Birkaç dakika içinde uygulamanız canlıda olacak!

## 🚀 CLI ile Deploy (Alternatif)

Eğer CLI kullanmak isterseniz:

```powershell
# 1. Vercel'e giriş yap
vercel login

# 2. Projeyi deploy et
vercel

# 3. Production'a deploy
vercel --prod
```

## 📱 PWA Offline Özellikleri

✅ Uygulamanız zaten PWA olarak yapılandırılmış:
- Service Worker aktif (production'da)
- Offline cache yapılandırılmış
- Manifest.json hazır
- **Sunucu kapalı olsa bile çalışır** (cache'lenmiş sayfalar)

## 🔄 Otomatik Deploy

GitHub entegrasyonu ile:
- Her `git push` sonrası otomatik deploy
- Pull Request'ler için preview URL'leri oluşturulur
- Production deploy için `main` branch'e push yapın

## 🌐 Domain

Deploy sonrası Vercel size bir URL verecek:
- Örnek: `https://sarj-xxxxx.vercel.app`
- Özel domain ekleyebilirsiniz (ücretsiz)

## ⚠️ ÖNEMLİ NOTLAR

1. **Environment Variables mutlaka ekleyin!** API'ler çalışmaz.
2. İlk deploy 2-3 dakika sürebilir
3. PWA özellikleri sadece production build'de aktif olur
4. HTTPS gereklidir (Vercel otomatik sağlar)

## 🎉 Sonuç

Deploy tamamlandıktan sonra:
- Uygulamanız canlıda olacak
- Offline çalışabilecek (PWA sayesinde)
- Her GitHub push'unda otomatik güncellenecek

