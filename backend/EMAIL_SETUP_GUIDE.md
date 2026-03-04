# Setup Gmail SMTP untuk Email

## 🚀 Quick Start (Testing Mode)

Untuk testing, email sudah dikonfigurasi untuk menyimpan ke log file:
- Email tidak benar-benar dikirim
- Link reset password akan ditampilkan di response API
- Cek log di `backend/storage/logs/laravel.log`

**Konfigurasi saat ini (di .env):**
```env
MAIL_MAILER=log
```

---

## 📧 Setup Gmail SMTP untuk Production

Jika ingin benar-benar mengirim email via Gmail, ikuti langkah berikut:

### Step 1: Aktifkan 2-Step Verification di Google

1. Login ke akun Google Anda
2. Buka: https://myaccount.google.com/security
3. Di bagian "Signing in to Google", klik **2-Step Verification**
4. Ikuti instruksi untuk mengaktifkannya

### Step 2: Generate App Password

1. Setelah 2-Step Verification aktif, kembali ke: https://myaccount.google.com/security
2. Di bagian "Signing in to Google", klik **App passwords**
3. Pilih app: **Mail**
4. Pilih device: **Other** (masukkan nama: "SMAN Saba Laravel")
5. Klik **Generate**
6. Copy 16-digit password yang muncul (contoh: `abcd efgh ijkl mnop`)

### Step 3: Update .env File

Edit file `backend/.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=abcdefghijklmnop  # 16-digit app password (tanpa spasi)
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="your_email@gmail.com"
MAIL_FROM_NAME="SMAN Saba"
```

**Penting:**
- Ganti `your_email@gmail.com` dengan email Gmail Anda
- Ganti `abcdefghijklmnop` dengan App Password yang di-generate (16 digit, tanpa spasi)
- Jangan gunakan password Gmail biasa!

### Step 4: Restart Server

Setelah update .env, restart Laravel server:

```bash
# Stop server (Ctrl+C) lalu jalankan lagi
php artisan serve
```

---

## ✅ Testing Email

### Test 1: Forgot Password

1. Buka: http://localhost:5173/admin/forgot-password
2. Masukkan email yang terdaftar di database
3. Klik "Kirim Link Reset Password"
4. Check inbox email Anda
5. Klik link di email atau copy URL

### Test 2: Check Log (Log Mode)

Jika menggunakan `MAIL_MAILER=log`:

```bash
cd backend
tail -f storage/logs/laravel.log
```

Atau buka file: `backend/storage/logs/laravel.log`

---

## 🐛 Troubleshooting

### Error: "Authentication failed"

**Penyebab:** Password salah atau bukan App Password

**Solusi:**
1. Pastikan menggunakan App Password, bukan password Gmail biasa
2. Generate App Password baru dan update di .env
3. Pastikan tidak ada spasi di App Password

### Error: "Could not connect to SMTP host"

**Penyebab:** Port atau host salah

**Solusi:**
```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_ENCRYPTION=tls
```

Atau coba port 465 dengan ssl:
```env
MAIL_PORT=465
MAIL_ENCRYPTION=ssl
```

### Error: "Less secure app access"

**Penyebab:** Gmail memblokir akses dari aplikasi yang tidak aman

**Solusi:**
- Aktifkan 2-Step Verification
- Gunakan App Password
- Jangan aktifkan "Less secure app access" (deprecated)

### Email tidak masuk

1. Check spam/junk folder
2. Pastikan email penerima benar
3. Check log: `backend/storage/logs/laravel.log`
4. Verifikasi konfigurasi SMTP

---

## 🔄 Switch Between Log and SMTP

### Development (Testing):
```env
MAIL_MAILER=log
```
- Email disimpan di log file
- Tidak perlu konfigurasi SMTP
- Reset URL ditampilkan di response API

### Production (Real Email):
```env
MAIL_MAILER=smtp
```
- Email benar-benar dikirim
- Perlu App Password
- Reset URL hanya ada di email

---

## 📝 Testing Commands

### Test Koneksi SMTP

```bash
cd backend
php artisan tinker
```

Lalu jalankan:
```php
Mail::raw('Test email from Laravel', function($msg) {
    $msg->to('test@example.com')->subject('Test');
});
```

Jika sukses, Anda akan lihat pesan sukses. Jika error, lihat pesan error nya.

### Clear Config Cache

Jika sudah update .env tapi masih error:

```bash
php artisan config:clear
php artisan cache:clear
```

---

## 🔐 Security Best Practices

1. **Jangan commit .env file** ke Git (sudah ada di .gitignore)
2. **Jangan share App Password** dengan siapapun
3. **Rotate App Password** secara berkala
4. **Gunakan email khusus** untuk aplikasi (bukan email pribadi)
5. **Enable 2FA** untuk akun Google

---

## 📚 Alternative Email Services

Jika Gmail tidak bisa digunakan, alternatif lainnya:

### Mailtrap (Development)
```env
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
```

### SendGrid
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=your_sendgrid_api_key
```

### Mailgun
```env
MAIL_MAILER=mailgun
MAILGUN_DOMAIN=your_domain
MAILGUN_SECRET=your_mailgun_secret
```

---

## 📦 Summary

- ✅ Default: `MAIL_MAILER=log` untuk testing
- ✅ Production: `MAIL_MAILER=smtp` dengan Gmail App Password
- ✅ Link reset password valid selama 1 jam
- ✅ Support testing mode dengan URL di response
- ✅ Error handling dan logging lengkap

---

## 🆘 Need Help?

Jika masih ada masalah:
1. Check Laravel log: `backend/storage/logs/laravel.log`
2. Check terminal output saat hit API
3. Pastikan database tabel `password_reset_tokens` sudah ada
4. Test dengan MAIL_MAILER=log dulu untuk memastikan logic berjalan

---

Dokumentasi lengkap: [PASSWORD_MANAGEMENT_GUIDE.md](../PASSWORD_MANAGEMENT_GUIDE.md)
