# Panduan Deploy ke Vercel

## Persiapan

### 1. Pastikan Backend Sudah Deploy
Backend Laravel harus sudah di-deploy terlebih dahulu (misalnya ke Railway, Heroku, atau hosting lainnya).
Catat URL backend Anda, contoh: `https://your-backend.railway.app`

### 2. Install Vercel CLI (Opsional)
```bash
npm install -g vercel
```

## Cara Deploy

### Opsi 1: Deploy via Vercel Dashboard (REKOMENDASI - Paling Mudah)

1. **Buka Vercel Dashboard**
   - Kunjungi: https://vercel.com
   - Login atau daftar dengan GitHub/GitLab/Bitbucket

2. **Import Project**
   - Klik tombol "Add New..." → "Project"
   - Pilih "Import Git Repository"
   - Connect dengan GitHub/GitLab Anda
   - Pilih repository project ini

3. **Configure Project**
   - Framework Preset: **Vite**
   - Root Directory: **frontend** (PENTING!)
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Set Environment Variables**
   - Klik "Environment Variables"
   - Tambahkan:
     ```
     Name: VITE_API_URL
     Value: https://your-backend-url.com/api
     ```
   - Pilih untuk semua environment (Production, Preview, Development)

5. **Deploy**
   - Klik "Deploy"
   - Tunggu proses build selesai (2-5 menit)
   - Setelah selesai, Anda akan mendapat URL: `https://your-project.vercel.app`

### Opsi 2: Deploy via Vercel CLI

1. **Masuk ke folder frontend**
   ```bash
   cd frontend
   ```

2. **Login ke Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Jawab pertanyaan:
   - Set up and deploy? **Y**
   - Which scope? Pilih account Anda
   - Link to existing project? **N**
   - What's your project's name? **web-smansaba** (atau nama lain)
   - In which directory is your code located? **./** (sudah di folder frontend)
   - Want to override the settings? **Y**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Development Command: `npm run dev`

4. **Set Environment Variables**
   ```bash
   vercel env add VITE_API_URL
   ```
   Masukkan nilai: `https://your-backend-url.com/api`
   Pilih environment: Production, Preview, Development

5. **Deploy Production**
   ```bash
   vercel --prod
   ```

## Setelah Deploy

### 1. Cek Website
Buka URL yang diberikan Vercel, contoh: `https://web-smansaba.vercel.app`

### 2. Test Fitur
- Test koneksi ke backend
- Test semua fitur utama
- Cek console browser untuk error

### 3. Configure Domain (Opsional)
Jika punya domain sendiri:
1. Buka Project Settings di Vercel
2. Klik "Domains"
3. Tambahkan domain Anda
4. Ikuti instruksi untuk setting DNS

## Update Deployment

Setiap kali Anda push ke GitHub:
- Vercel otomatis build dan deploy ulang
- Atau gunakan: `vercel --prod` (jika via CLI)

## Troubleshooting

### Build Error
- Cek error message di Vercel logs
- Pastikan semua dependencies ada di `package.json`
- Test build lokal: `npm run build`

### API Not Connected
- Cek environment variable `VITE_API_URL` sudah benar
- Pastikan backend sudah enable CORS untuk domain Vercel
- Cek backend sudah berjalan dengan baik

### Page Not Found on Refresh
- Sudah diatasi dengan `vercel.json` yang ada
- Pastikan file `vercel.json` tetap ada

## Konfigurasi Backend CORS

Pastikan backend Laravel sudah allow domain Vercel Anda di `config/cors.php`:

```php
'allowed_origins' => [
    'https://your-project.vercel.app',
    'http://localhost:5173', // untuk development
],
```

Atau gunakan wildcard (kurang aman):
```php
'allowed_origins' => ['*'],
```

## Catatan Penting

1. **Root Directory**: Pastikan di Vercel setting, root directory diset ke `frontend`
2. **Environment Variables**: Harus diset di Vercel, bukan di `.env` lokal
3. **Backend URL**: Harus HTTPS untuk production
4. **Free Plan**: Vercel free plan sudah cukup untuk kebanyakan project

## Links

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html
