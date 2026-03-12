# 🚀 PANDUAN DEPLOYMENT WEB SMANSABA

Panduan lengkap untuk deploy aplikasi Web SMAN 1 Bangsri ke internet agar bisa diakses orang lain.

## 📦 Arsitektur Deployment

```
Frontend (React) → Vercel (Gratis)
Backend (Laravel) → Railway (Gratis tier tersedia)
Database (MySQL) → Railway MySQL (Included)
```

---

## 🎯 LANGKAH 1: Deploy Backend ke Railway

### 1.1 Persiapan Akun Railway

1. Buka https://railway.app/
2. Klik **"Login"** atau **"Start a New Project"**
3. Login dengan **GitHub account** Anda
4. Verifikasi email jika diminta

### 1.2 Deploy Backend

1. **Di Railway Dashboard:**
   - Klik **"New Project"**
   - Pilih **"Deploy from GitHub repo"**
   - Authorize Railway untuk akses GitHub Anda
   - Pilih repository **web-smansaba**
   - Pilih folder **backend** (atau deploy root project)

2. **Setup Database MySQL:**
   - Di project Railway, klik **"+ New"**
   - Pilih **"Database"** → **"Add MySQL"**
   - Railway akan membuat MySQL instance otomatis
   - Salin kredensial database yang diberikan

3. **Setting Environment Variables:**
   
   Di Railway project → **Variables** tab, tambahkan:
   
   ```env
   APP_NAME="SMAN 1 Bangsri"
   APP_ENV=production
   APP_KEY=base64:YOUR_APP_KEY_HERE
   APP_DEBUG=false
   APP_URL=https://your-backend-url.up.railway.app
   
   DB_CONNECTION=mysql
   DB_HOST=${{MYSQLHOST}}
   DB_PORT=${{MYSQLPORT}}
   DB_DATABASE=${{MYSQLDATABASE}}
   DB_USERNAME=${{MYSQLUSER}}
   DB_PASSWORD=${{MYSQLPASSWORD}}
   
   SESSION_DRIVER=database
   CACHE_DRIVER=database
   QUEUE_CONNECTION=database
   
   CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
   
   MAIL_MAILER=smtp
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-app-password
   MAIL_ENCRYPTION=tls
   MAIL_FROM_ADDRESS=your-email@gmail.com
   MAIL_FROM_NAME="${APP_NAME}"
   ```

4. **Generate APP_KEY:**
   
   Jalankan di local terminal:
   ```bash
   cd backend
   php artisan key:generate --show
   ```
   
   Copy output `base64:...` dan paste ke `APP_KEY` di Railway Variables.

5. **Deploy & Migrate Database:**
   
   Setelah deployment berhasil, buka **Railway terminal** atau gunakan Railway CLI:
   
   ```bash
   # Install Railway CLI (opsional, bisa via dashboard)
   npm i -g @railway/cli
   railway link
   railway run php artisan migrate --force
   railway run php artisan db:seed --force
   railway run php artisan storage:link
   ```
   
   **ATAU** via Railway Dashboard:
   - Klik project → **Settings** → **Deploy**
   - Tambahkan di **Build Command**: (kosongkan)
   - **Deploy Command**: 
     ```bash
     php artisan migrate --force && php artisan storage:link
     ```

6. **Dapatkan URL Backend:**
   
   - Railway akan generate URL otomatis seperti: `https://web-smansaba-production.up.railway.app`
   - Atau setup custom domain di **Settings** → **Domains**
   - **SIMPAN URL INI** untuk konfigurasi frontend!

---

## 🌐 LANGKAH 2: Deploy Frontend ke Vercel

### 2.1 Persiapan Akun Vercel

1. Buka https://vercel.com/
2. Klik **"Sign Up"** atau **"Login"**
3. Login dengan **GitHub account** yang sama
4. Authorize Vercel access ke GitHub

### 2.2 Deploy Frontend

1. **Di Vercel Dashboard:**
   - Klik **"Add New..."** → **"Project"**
   - Import repository **web-smansaba**
   - Pilih **"Import"**

2. **Configure Project:**
   
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend` (klik Edit dan pilih folder frontend)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `dist` (default)
   - **Install Command:** `npm install` (default)

3. **Environment Variables:**
   
   Di section **Environment Variables**, tambahkan:
   
   ```
   Key: VITE_API_URL
   Value: https://your-backend-url.up.railway.app/api
   ```
   
   ⚠️ **IMPORTANT:** Ganti `your-backend-url.up.railway.app` dengan URL Railway backend Anda dari Langkah 1.6!

4. **Deploy:**
   
   - Klik **"Deploy"**
   - Tunggu proses build & deploy selesai (~2-5 menit)
   - Vercel akan memberikan URL seperti: `https://web-smansaba.vercel.app`

5. **Update CORS di Backend:**
   
   Kembali ke Railway Variables, update:
   ```env
   CORS_ALLOWED_ORIGINS=https://web-smansaba.vercel.app,https://your-custom-domain.com
   ```
   
   Redeploy backend jika perlu.

---

## ✅ LANGKAH 3: Testing & Verifikasi

### 3.1 Test Backend

1. Buka browser, akses: `https://your-backend.up.railway.app/api/public/berita`
2. Harus return JSON data (bukan error 404/500)
3. Test endpoint lain untuk memastikan semua berjalan

### 3.2 Test Frontend

1. Buka: `https://web-smansaba.vercel.app`
2. Periksa:
   - ✅ Landing page muncul
   - ✅ Data berita, galeri, guru, dll ter-load dari API
   - ✅ Navigasi berfungsi
   - ✅ No CORS errors di browser console (F12)

3. Test Admin Panel:
   - Login di `/admin/login`
   - Test CRUD operations
   - Test upload file/gambar

---

## 🔧 LANGKAH 4: Setup Custom Domain (Opsional)

### Untuk Frontend (Vercel)

1. Di Vercel project → **Settings** → **Domains**
2. Klik **"Add"**
3. Masukkan domain Anda (misal: `smansaba.sch.id`)
4. Ikuti instruksi untuk update DNS records di registrar domain Anda
5. Tambahkan CNAME record:
   ```
   Type: CNAME
   Name: www (atau @)
   Value: cname.vercel-dns.com
   ```

### Untuk Backend (Railway)

1. Di Railway project → **Settings** → **Networking**
2. Klik **"Generate Domain"** atau **"Custom Domain"**
3. Masukkan subdomain (misal: `api.smansaba.sch.id`)
4. Update DNS dengan CNAME yang diberikan Railway

---

## 🔄 Update & Redeploy

### Auto-Deploy (Recommended)

Vercel dan Railway sudah setup **auto-deploy** dari GitHub:

1. Push code ke GitHub:
   ```bash
   git add .
   git commit -m "Update fitur baru"
   git push origin main
   ```

2. Vercel & Railway akan otomatis detect push dan deploy ulang!

### Manual Redeploy

- **Vercel:** Dashboard → Project → **Deployments** → **Redeploy**
- **Railway:** Dashboard → Project → **Deploy** → **Redeploy**

---

## 🐛 Troubleshooting

### ❌ Error: "CORS policy: No 'Access-Control-Allow-Origin'"

**Solusi:**
1. Pastikan `CORS_ALLOWED_ORIGINS` di Railway sudah benar
2. Update `backend/config/cors.php`:
   ```php
   'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:5173')),
   ```
3. Redeploy backend

### ❌ Error: "Base table or view not found"

**Solusi:**
1. Database belum di-migrate
2. Jalankan di Railway terminal: `php artisan migrate --force`

### ❌ Error: "No application encryption key"

**Solusi:**
1. Generate key: `php artisan key:generate --show`
2. Copy output ke `APP_KEY` di Railway Variables
3. Redeploy

### ❌ Error: "Storage link not found" (gambar tidak muncul)

**Solusi:**
1. Jalankan di Railway terminal: `php artisan storage:link`
2. Atau tambahkan di deploy command

### ❌ Frontend tidak bisa connect ke Backend

**Solusi:**
1. Cek VITE_API_URL di Vercel environment variables
2. Pastikan URL backend Railway benar (harus include `/api`)
3. Cek CORS settings di backend
4. Clear browser cache & hard refresh (Ctrl + Shift + R)

---

## 📊 Monitoring & Logs

### Railway Logs

- Dashboard → Project → **Observability** → **Logs**
- Real-time logs untuk debug error backend

### Vercel Logs

- Dashboard → Project → **Deployments** → Click deployment → **Logs**
- Build logs & runtime logs

---

## 💰 Biaya & Limits

### Vercel Free Tier

- ✅ 100 GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Custom domains
- ✅ HTTPS otomatis

### Railway Free Tier

- ✅ $5 credit/month (cukup untuk small project)
- ✅ 500 hours runtime
- ✅ Setelah habis bisa upgrade atau gunakan alternatif

### Alternatif Backend Hosting (jika Railway habis)

1. **InfinityFree** - Gratis selamanya, PHP + MySQL
2. **000webhost** - Gratis dengan limits
3. **Hostinger** - Mulai Rp 10.000/bulan
4. **Niagahoster** - Shared hosting murah untuk Laravel

---

## 🎉 Selesai!

Website Anda sekarang LIVE dan bisa diakses siapa saja di internet!

**Share URL:**
- Frontend: `https://web-smansaba.vercel.app`
- Backend API: `https://your-backend.up.railway.app/api`

---

## 📞 Support

Jika ada masalah saat deployment:
1. Cek logs di Railway/Vercel
2. Lihat section Troubleshooting di atas
3. Google error message spesifik
4. Join Railway/Vercel Discord community

**Happy Deploying! 🚀**
