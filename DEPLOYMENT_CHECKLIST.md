# ✅ DEPLOYMENT CHECKLIST

## Persiapan (5 menit)

- [ ] Punya akun GitHub (untuk Railway & Vercel login)
- [ ] Repository web-smansaba sudah di GitHub
- [ ] Sudah commit & push semua perubahan terbaru

## Deploy Backend ke Railway (10-15 menit)

- [ ] Login ke https://railway.app dengan GitHub
- [ ] Buat project baru dari GitHub repo
- [ ] Tambahkan MySQL database
- [ ] Setup environment variables (copy dari DEPLOYMENT_GUIDE.md)
- [ ] Generate & set APP_KEY
- [ ] Deploy berhasil & dapat URL backend
- [ ] Jalankan migration: `php artisan migrate --force`
- [ ] Jalankan seeder: `php artisan db:seed --force`
- [ ] Jalankan storage link: `php artisan storage:link`
- [ ] Test endpoint: `https://your-backend.railway.app/api/public/berita`

## Deploy Frontend ke Vercel (5-10 menit)

- [ ] Login ke https://vercel.com dengan GitHub
- [ ] Import repository web-smansaba
- [ ] Set Root Directory ke `frontend`
- [ ] Set Framework Preset ke `Vite`
- [ ] Tambahkan environment variable `VITE_API_URL` (URL Railway + `/api`)
- [ ] Deploy & tunggu selesai
- [ ] Dapat URL frontend (misal: web-smansaba.vercel.app)

## Update CORS (2 menit)

- [ ] Kembali ke Railway Variables
- [ ] Update `CORS_ALLOWED_ORIGINS` dengan URL Vercel
- [ ] Redeploy backend jika perlu

## Testing (5 menit)

- [ ] Buka URL Vercel di browser
- [ ] Landing page tampil dengan benar
- [ ] Data berita/galeri/guru ter-load
- [ ] Cek browser console (F12) - tidak ada CORS error
- [ ] Test login admin
- [ ] Test CRUD di admin panel
- [ ] Test upload gambar

## Share! 🎉

- [ ] Copy URL Vercel
- [ ] Share ke teman/guru/siswa
- [ ] Website sudah live & bisa diakses publik!

---

## 🆘 Jika Ada Masalah

1. Baca section **Troubleshooting** di DEPLOYMENT_GUIDE.md
2. Cek logs di Railway/Vercel dashboard
3. Pastikan semua environment variables sudah benar
4. Clear browser cache & hard refresh (Ctrl + Shift + R)

## 📝 Notes

- Railway free tier: $5 credit/month (~500 hours)
- Vercel free tier: Unlimited deployments, 100GB bandwidth
- Auto-deploy aktif: Push ke GitHub = auto redeploy
- Custom domain bisa ditambahkan nanti

**Selamat Deploying! 🚀**
