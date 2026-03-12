# Deploy Backend Laravel ke Railway

## Kenapa Railway?
- ✅ Gratis $5 credit/bulan (cukup untuk small project)
- ✅ Support Laravel native
- ✅ Free PostgreSQL database
- ✅ Auto-deploy dari GitHub
- ✅ HTTPS otomatis

## Persiapan

### 1. Pastikan File Konfigurasi Ada
File sudah siap di folder `backend/`:
- ✅ `railway.json` - Konfigurasi Railway
- ✅ `nixpacks.toml` - Build configuration
- ✅ `Procfile` - Start command

### 2. Commit Backend ke GitHub (jika belum)
```bash
git add backend/
git commit -m "Prepare backend for Railway deployment"
git push origin main
```

## Deploy ke Railway (Recommended)

### Step 1: Buat Akun Railway

1. Buka: https://railway.app
2. Klik **"Login"** atau **"Start a New Project"**
3. Login dengan **GitHub** (recommended)
4. Authorize Railway untuk akses repository

### Step 2: Create New Project

1. Klik **"New Project"**
2. Pilih **"Deploy from GitHub repo"**
3. Pilih repository: **`Vaalz/sman1bangsri`**
4. Railway akan detect Laravel otomatis

### Step 3: Set Root Directory

**PENTING**: Karena backend ada di subfolder:

1. Klik tab **"Settings"** di project
2. Scroll ke **"Root Directory"**
3. Klik **"/"** → Change to: **`backend`**
4. Save changes

### Step 4: Add Database (PostgreSQL)

1. Klik **"+ New"** → **"Database"** → **"Add PostgreSQL"**
2. Railway otomatis create database dan set environment variables:
   - `DATABASE_URL`
   - `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`

### Step 5: Set Environment Variables

Klik tab **"Variables"** dan tambahkan:

```env
# App Config
APP_NAME="SMA Negeri 1 Bangsri"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app.up.railway.app

# Generate new key: php artisan key:generate
APP_KEY=base64:YOUR_APP_KEY_HERE

# Database - Akan otomatis terisi dari PostgreSQL service
# DB_CONNECTION=pgsql
# DB_HOST=${{Postgres.PGHOST}}
# DB_PORT=${{Postgres.PGPORT}}
# DB_DATABASE=${{Postgres.PGDATABASE}}
# DB_USERNAME=${{Postgres.PGUSER}}
# DB_PASSWORD=${{Postgres.PGPASSWORD}}

# CORS - Allow frontend Vercel
FRONTEND_URL=https://your-frontend.vercel.app

# Session & Cache
SESSION_DRIVER=file
CACHE_DRIVER=file

# Mail Configuration (opsional)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME="${APP_NAME}"
```

**Generate APP_KEY:**
```bash
# Di terminal lokal
cd backend
php artisan key:generate --show
# Copy hasilnya ke Railway
```

### Step 6: Link Database Variables

Di Railway Variables, tambahkan (jika belum otomatis):

```
DB_CONNECTION=pgsql
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_DATABASE=${{Postgres.PGDATABASE}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
```

Railway akan auto-replace `${{Postgres.xxx}}` dengan nilai dari PostgreSQL service.

### Step 7: Deploy & Migrate

1. Railway akan otomatis start deployment
2. Tunggu build selesai (~3-5 menit)
3. Setelah success, akan dapat URL: `https://your-app.up.railway.app`

### Step 8: Run Migration (Via Railway Console)

Ada 2 cara:

**Cara 1: Via Railway Dashboard**
1. Buka project di Railway
2. Klik service backend Anda
3. Klik tab "Deployments"
4. Pilih deployment yang aktif
5. Klik "View Logs"
6. Di bagian bawah ada "Run Command"
7. Jalankan:
```bash
php artisan migrate --force
php artisan db:seed --force
```

**Cara 2: Via Local Terminal (dengan Railway CLI)**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Run migration
railway run php artisan migrate --force
railway run php artisan db:seed --force
```

### Step 9: Test Backend

Test endpoint: `https://your-app.up.railway.app/api`

Contoh test di browser atau Postman:
- GET `https://your-app.up.railway.app/api/berita`
- GET `https://your-app.up.railway.app/api/ekstrakurikuler`

## Setelah Deploy

### 1. Update CORS di Backend

Edit `config/cors.php` untuk allow domain Vercel:

```php
'allowed_origins' => [
    'https://your-frontend.vercel.app',
    'http://localhost:5173', // untuk development
],
```

Commit dan push:
```bash
git add backend/config/cors.php
git commit -m "Update CORS for production"
git push origin main
```

Railway akan auto-redeploy.

### 2. Update Frontend Environment Variable di Vercel

1. Buka Vercel Dashboard
2. Pilih project frontend
3. Settings → Environment Variables
4. Edit `VITE_API_URL`:
   ```
   https://your-backend.up.railway.app/api
   ```
5. Redeploy frontend

### 3. Test Full Integration

Buka website frontend di Vercel dan test:
- Load data berita
- Load data ekstrakurikuler  
- Test semua API calls

## Troubleshooting

### Build Failed

**Error: Composer dependencies**
```bash
# Pastikan composer.json valid
# Check di Railway logs
```

**Error: PHP version**
```bash
# Pastikan nixpacks.toml ada dan benar
# Default: PHP 8.2
```

### Migration Failed

**Error: Connection refused**
```bash
# Pastikan database variables sudah terhubung:
DB_CONNECTION=pgsql
DB_HOST=${{Postgres.PGHOST}}
# dll
```

### CORS Error di Frontend

```bash
# Update backend/config/cors.php
'allowed_origins' => ['https://your-frontend.vercel.app']

# Atau gunakan wildcard (less secure):
'allowed_origins' => ['*']
```

### 500 Error

**Check Railway logs:**
1. Buka service di Railway
2. Tab "Deployments" → "View Logs"
3. Cari error message

**Common fixes:**
- APP_KEY tidak diset
- APP_DEBUG=true untuk lihat detailed error
- Database migration belum jalan

## Railway CLI Commands

Install Railway CLI untuk management lebih mudah:

```bash
# Install
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# View logs
railway logs

# Run artisan commands
railway run php artisan migrate
railway run php artisan cache:clear
railway run php artisan config:clear

# Open dashboard
railway open
```

## Custom Domain (Opsional)

1. Buka Settings di Railway
2. Klik "Domains"
3. "Generate Domain" untuk Railway domain
4. Atau "Custom Domain" untuk domain sendiri

## Monitoring

Railway Dashboard menampilkan:
- CPU & Memory usage
- Request logs
- Deployment status
- Database metrics

## Pricing

**Free Tier:**
- $5 credit/month
- Cukup untuk ~500 hours runtime
- Perfect untuk small projects

**Pro Plan ($20/month):**
- Unlimited usage
- Priority support
- More resources

## Alternative: Heroku

Jika ingin pakai Heroku (sudah ada `Procfile`):

1. Buat akun di https://heroku.com
2. Install Heroku CLI
3. Deploy:
```bash
cd backend
heroku create your-app-name
heroku addons:create heroku-postgresql:mini
git push heroku main
heroku run php artisan migrate --force
```

Tapi Railway lebih mudah dan user-friendly untuk Laravel.

## Kesimpulan

Railway adalah pilihan terbaik untuk deploy Laravel backend karena:
- Setup mudah (< 10 menit)
- Free tier yang cukup
- Auto-deploy dari GitHub
- PostgreSQL included
- Support Laravel native

Setelah backend deploy, jangan lupa update `VITE_API_URL` di Vercel frontend!
