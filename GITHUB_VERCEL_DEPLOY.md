# GitHub → Vercel Otomatik Deploy Rehberi

## ✅ GitHub Push Tamamlandı
Kodunuz GitHub'a başarıyla push edildi: `https://github.com/kgomlek/sarj`

## 🚀 Vercel'de GitHub Entegrasyonu Kurulumu

### Adım 1: Vercel'e Giriş
1. https://vercel.com adresine gidin
2. "Sign Up" veya "Log In" yapın
3. **GitHub hesabınızla giriş yapın** (önerilir)

### Adım 2: Yeni Proje Ekle
1. Dashboard'da **"Add New Project"** butonuna tıklayın
2. GitHub hesabınızı bağlayın (ilk kez ise izin verin)
3. Repository listesinden **`kgomlek/sarj`** projesini bulun
4. **"Import"** butonuna tıklayın

### Adım 3: Proje Ayarları
Vercel otomatik olarak Next.js'i algılayacak:
- ✅ Framework: **Next.js** (otomatik)
- ✅ Root Directory: `./` (varsayılan)
- ✅ Build Command: `npm run build` (varsayılan)
- ✅ Output Directory: `.next` (varsayılan)
- ✅ Install Command: `npm install` (varsayılan)

**Hiçbir şeyi değiştirmenize gerek yok!** Varsayılan ayarlar yeterli.

### Adım 4: Environment Variables Ekle (ÇOK ÖNEMLİ!)

**"Environment Variables"** bölümüne gidin ve şu iki değişkeni ekleyin:

#### Değişken 1:
- **Name:** `NEXT_PUBLIC_MAPBOX_TOKEN`
- **Value:** `pk.eyJ1IjoiZXJ0dWdydWwwNDQiLCJhIjoiY21qa2M5aDRuMjlqaDNkczY2YWVrYXJ6ZiJ9.RFSfiuE1qhBOfKcWWyCkrw`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development (hepsini seçin)

#### Değişken 2:
- **Name:** `NEXT_PUBLIC_OCM_API_KEY`
- **Value:** `a5beb3ca-2f8c-4959-ad27-307baffd3c82`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development (hepsini seçin)

### Adım 5: Deploy!
1. **"Deploy"** butonuna tıklayın
2. Vercel otomatik olarak:
   - Kodunuzu GitHub'dan çekecek
   - `npm install` çalıştıracak
   - `npm run build` çalıştıracak
   - Deploy edecek
3. 2-3 dakika içinde uygulamanız canlıda olacak!

## 🔄 Otomatik Deploy Sistemi

Entegrasyon kurulduktan sonra:

### Her Push'ta Otomatik Deploy:
```bash
git add .
git commit -m "Yeni özellik eklendi"
git push origin main
```
→ Vercel otomatik olarak yeni deploy başlatır!

### Pull Request'ler için Preview:
- Her Pull Request için otomatik preview URL oluşturulur
- Production'a merge edilmeden önce test edebilirsiniz

### Production Deploy:
- `main` branch'e push → Production deploy
- Diğer branch'ler → Preview deploy

## 📱 PWA Offline Özellikleri

✅ Uygulamanız zaten PWA olarak yapılandırılmış:
- Service Worker aktif (production'da)
- Offline cache yapılandırılmış
- Manifest.json hazır
- **Sunucu kapalı olsa bile çalışır** (cache'lenmiş sayfalar)

## 🌐 Domain ve URL

Deploy sonrası Vercel size bir URL verecek:
- **Production:** `https://sarj-xxxxx.vercel.app`
- **Preview:** Her PR için farklı URL
- **Özel Domain:** Vercel Pro ile ekleyebilirsiniz (ücretsiz plan da destekler)

## ⚠️ ÖNEMLİ NOTLAR

1. **Environment Variables mutlaka ekleyin!** API'ler çalışmaz.
2. İlk deploy 2-3 dakika sürebilir
3. PWA özellikleri sadece production build'de aktif olur
4. HTTPS gereklidir (Vercel otomatik sağlar)
5. Her push'ta otomatik deploy olur (ayarları değiştirebilirsiniz)

## 🎉 Sonuç

Artık:
- ✅ Her `git push` sonrası otomatik deploy
- ✅ Pull Request'ler için preview URL'leri
- ✅ Production ve preview ortamları ayrı
- ✅ Offline çalışabilen PWA
- ✅ HTTPS ve CDN desteği

## 📝 Gelecekte Deploy İçin

Sadece şu komutları çalıştırın:
```bash
git add .
git commit -m "Değişiklik açıklaması"
git push origin main
```

Vercel gerisini halledecek! 🚀

