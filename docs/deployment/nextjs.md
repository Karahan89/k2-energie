# Next.js App Deployment

Anleitung für das Deployment der Next.js Web-App.

## 🚀 Deployment-Übersicht

Die Next.js App kann auf verschiedenen Plattformen deployed werden:
- **Vercel** (empfohlen)
- **Netlify**
- **AWS Amplify**
- **Eigener Server**

## 🔧 Vercel Deployment

### Automatisches Deployment
1. **GitHub Repository** mit Vercel verbinden
2. **Root Directory** auf `apps/web` setzen
3. **Environment Variables** konfigurieren
4. **Automatische Deployments** aktivieren

### Vercel-Konfiguration
```json
// vercel.json
{
  "buildCommand": "cd ../.. && pnpm run build --filter=web",
  "outputDirectory": "apps/web/.next",
  "installCommand": "cd ../.. && pnpm install",
  "framework": "nextjs"
}
```

### Environment Variables
```bash
# Vercel Environment Variables
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-10
NEXT_PUBLIC_SANITY_STUDIO_URL=https://k2-energie.sanity.studio
```

### Vercel CLI
```bash
# Vercel CLI installieren
npm install -g vercel

# Login
vercel login

# Projekt initialisieren
cd apps/web
vercel

# Deployen
vercel --prod
```

## 🌐 Netlify Deployment

### Netlify-Konfiguration
```toml
# netlify.toml
[build]
  base = "apps/web"
  publish = "apps/web/.next"
  command = "cd ../.. && pnpm run build --filter=web"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Build-Settings
- **Build Command**: `cd ../.. && pnpm run build --filter=web`
- **Publish Directory**: `apps/web/.next`
- **Node Version**: `20`

## ☁️ AWS Amplify Deployment

### Amplify-Konfiguration
```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd ../..
        - pnpm install
    build:
      commands:
        - pnpm run build --filter=web
  artifacts:
    baseDirectory: apps/web/.next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - ../../node_modules/**/*
```

### Environment Variables
```bash
# AWS Amplify Environment Variables
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-10
NEXT_PUBLIC_SANITY_STUDIO_URL=https://k2-energie.sanity.studio
```

## 🖥️ Eigenes Server Deployment

### Docker Setup
```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the app
RUN pnpm run build --filter=web

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
      - NEXT_PUBLIC_SANITY_DATASET=production
    restart: unless-stopped
```

### Nginx Konfiguration
```nginx
# nginx.conf
server {
    listen 80;
    server_name k2-energie.de www.k2-energie.de;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔧 Build-Konfiguration

### Next.js Konfiguration
```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["cdn.sanity.io"],
  },
  experimental: {
    serverComponentsExternalPackages: ["@sanity/client"],
  },
  env: {
    SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
};

export default nextConfig;
```

### Package.json Scripts
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "dev": "next dev",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

## 🔐 Environment Variables

### Development
```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-10
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333
```

### Production
```bash
# Production Environment Variables
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-10
NEXT_PUBLIC_SANITY_STUDIO_URL=https://k2-energie.sanity.studio
```

## 📊 Performance-Optimierung

### Build-Optimierung
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  // Bundle Analyzer
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  
  // Image Optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  // Compression
  compress: true,
  
  // Experimental Features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@sanity/client'],
  },
};
```

### Caching-Strategie
```typescript
// app/api/og/route.ts
export async function GET(request: Request) {
  return new Response(/* ... */, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy-web.yml
name: Deploy Web App

on:
  push:
    branches: [main]
    paths: ['apps/web/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build app
        run: pnpm run build --filter=web
        env:
          NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
          NEXT_PUBLIC_SANITY_DATASET: ${{ secrets.SANITY_DATASET }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: apps/web
```

## 🚨 Troubleshooting

### Häufige Probleme

#### Build schlägt fehl
```bash
# Dependencies prüfen
pnpm install

# Cache leeren
rm -rf .next
rm -rf node_modules
pnpm install

# Build erneut
pnpm run build --filter=web
```

#### Environment Variables fehlen
```bash
# Lokale .env.local prüfen
cat .env.local

# Vercel Environment Variables prüfen
vercel env ls
```

#### Sanity Connection Issues
```bash
# Sanity Client testen
cd apps/web
node -e "
const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-02-10',
  useCdn: false,
});
client.fetch('*[_type == \"homePage\"][0]').then(console.log);
"
```

### Debug-Modus
```bash
# Debug Build
DEBUG=* pnpm run build --filter=web

# Verbose Logging
VERBOSE=1 pnpm run build --filter=web
```

## 📈 Monitoring

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS
- **Bundle Size**: JavaScript und CSS Größe
- **Load Time**: Server und Client Rendering

### Error Tracking
```typescript
// lib/error-tracking.ts
export function trackError(error: Error, context?: any) {
  // Error Tracking Service Integration
  console.error('Error:', error, context);
}
```

### Analytics
```typescript
// lib/analytics.ts
export function trackPageView(url: string) {
  // Analytics Service Integration
  console.log('Page view:', url);
}
```

## 🔒 Sicherheit

### Security Headers
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

### Content Security Policy
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;",
          },
        ],
      },
    ];
  },
};
```

## 🎯 Best Practices

### Deployment-Checkliste
- [ ] Environment Variables konfiguriert
- [ ] Build erfolgreich lokal getestet
- [ ] Sanity Connection funktioniert
- [ ] Performance optimiert
- [ ] Security Headers gesetzt
- [ ] Monitoring aktiviert

### Rollback-Strategie
1. **Previous Version** identifizieren
2. **Database Backup** erstellen
3. **Rollback** durchführen
4. **Monitoring** aktivieren
5. **Root Cause** analysieren

### Maintenance
- **Regelmäßige Updates**: Dependencies aktualisieren
- **Security Patches**: Sicherheitsupdates einspielen
- **Performance Monitoring**: Metriken überwachen
- **Backup Strategy**: Regelmäßige Backups
