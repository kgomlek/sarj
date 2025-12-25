import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  /* config options here */
  // Configuration Turbopack vide pour éviter le conflit avec next-pwa (qui utilise webpack)
  turbopack: {},
  
  // Export statique pour déploiement sans serveur
  output: 'export',
  
  // Images non optimisées (requis pour l'export statique)
  images: {
    unoptimized: true,
  },
};

const pwaConfig = withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

export default pwaConfig(nextConfig);
