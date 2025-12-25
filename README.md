# Şarj - EV Rota Planlama Uygulaması

Mobil öncelikli Progressive Web App (PWA) ile elektrikli araç rotası planlama uygulaması.

## 🚀 Özellikler

- 📍 **Otomatik Konum Tespiti** - Kullanıcı konumu otomatik olarak bulunur
- 🗺️ **Harita Entegrasyonu** - Mapbox ile interaktif harita görünümü
- 🔋 **Şarj İstasyonları** - Yakındaki şarj istasyonlarını otomatik bulma
- 🛣️ **Rota Hesaplama** - İki nokta arası en iyi rotayı hesaplama
- 📱 **Mobil Optimize** - Mobile-first tasarım ve PWA desteği
- 🎨 **Modern UI** - Tailwind CSS ve shadcn/ui ile güzel arayüz

## 🏗️ Mimari

Bu proje **Domain-Driven Design (DDD)** mimarisi kullanmaktadır:

```
src/
├── domain/          # İş mantığı ve domain tipleri
├── application/     # Use case'ler ve state management
├── infrastructure/  # API client'ları ve harici servisler
└── presentation/    # UI katmanı (React/Next.js)
```

## 🛠️ Teknoloji Stack

- **Framework:** Next.js 16 (App Router)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS
- **UI Kütüphanesi:** shadcn/ui
- **State Management:** Zustand
- **Harita:** Mapbox GL & react-map-gl
- **PWA:** @ducanh2912/next-pwa
- **API'ler:**
  - Open Charge Map API (Şarj istasyonları)
  - Mapbox Directions API (Rota hesaplama)

## 📦 Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Ortam değişkenlerini yapılandırın:
`.env.local` dosyası oluşturun:
```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_OCM_API_KEY=your_open_charge_map_key
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcıda açın:
```
http://localhost:3000
```

## 🚀 Kullanım

1. Uygulama açıldığında konumunuz otomatik olarak tespit edilir
2. Yakındaki şarj istasyonları haritada yeşil noktalar olarak görünür
3. Haritaya tıklayarak hedef nokta seçebilirsiniz
4. Rota otomatik olarak hesaplanır ve mavi çizgi ile gösterilir
5. Şarj istasyonlarına tıklayarak detaylarını görebilirsiniz

## 📝 Scripts

```bash
# Geliştirme
npm run dev

# Production build
npm run build

# Production sunucusu
npm start

# Linting
npm run lint
```

## 🌐 API Anahtarları

### Mapbox Token
1. [Mapbox hesabı](https://account.mapbox.com/) oluşturun
2. Access Token alın
3. `.env.local` dosyasına ekleyin

### Open Charge Map API Key
1. [Open Charge Map](https://openchargemap.org/site/develop/api) sitesine kaydolun
2. API key alın
3. `.env.local` dosyasına ekleyin

## 📁 Proje Yapısı

```
jarz/
├── src/
│   ├── app/                    # Next.js App Router sayfaları
│   ├── domain/                 # Domain katmanı
│   │   └── types/             # TypeScript tipleri
│   ├── application/            # Application katmanı
│   │   └── store/             # Zustand store
│   ├── infrastructure/         # Infrastructure katmanı
│   │   └── api/               # API client'ları
│   └── presentation/          # Presentation katmanı
│       └── components/       # React bileşenleri
├── public/                     # Statik dosyalar
├── .env.local                  # Ortam değişkenleri (gitignore)
└── package.json
```

## 🔧 Geliştirme

### Alias'lar

TypeScript path alias'ları:
- `@domain/*` → `src/domain/*`
- `@application/*` → `src/application/*`
- `@infrastructure/*` → `src/infrastructure/*`
- `@presentation/*` → `src/presentation/*`
- `@/*` → `src/*`

### PWA Yapılandırması

PWA özellikleri production build'de aktif olur. Development modunda devre dışıdır.

## 📄 Lisans

Bu proje özel bir projedir.

## 👥 Katkıda Bulunanlar

- [kgomlek](https://github.com/kgomlek)

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/)
- [Mapbox](https://www.mapbox.com/)
- [Open Charge Map](https://openchargemap.org/)
- [shadcn/ui](https://ui.shadcn.com/)
