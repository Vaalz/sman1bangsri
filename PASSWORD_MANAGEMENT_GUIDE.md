# Fitur Ganti Password dan Lupa Password

Dokumentasi lengkap untuk fitur manajemen password untuk Superadmin dan Admin.

## 📋 Fitur yang Telah Dibuat

### 1. **Ganti Password** (Change Password)
Fitur untuk admin/superadmin yang sudah login untuk mengubah password mereka.

### 2. **Lupa Password** (Forgot Password)
Fitur untuk admin/superadmin yang lupa password untuk meminta link reset password via email.

### 3. **Reset Password** (Reset Password)
Fitur untuk mereset password menggunakan token yang dikirim via email.

---

## 🔧 Backend Implementation

### API Endpoints

#### 1. Change Password (Protected)
```
POST /api/change-password
Authorization: Bearer {token}
```
**Request Body:**
```json
{
  "current_password": "password_lama",
  "new_password": "password_baru",
  "new_password_confirmation": "password_baru"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Password berhasil diubah. Silakan login kembali."
}
```

#### 2. Forgot Password (Public)
```
POST /api/forgot-password
```
**Request Body:**
```json
{
  "email": "admin@smansaba.sch.id"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Link reset password telah dikirim ke email Anda"
}
```

#### 3. Reset Password (Public)
```
POST /api/reset-password
```
**Request Body:**
```json
{
  "email": "admin@smansaba.sch.id",
  "token": "token_dari_email",
  "password": "password_baru",
  "password_confirmation": "password_baru"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Password berhasil direset. Silakan login dengan password baru."
}
```

### Files Created/Modified (Backend)

1. **Migration:**
   - `backend/database/migrations/2024_03_04_000001_create_password_reset_tokens_table.php`
   - Membuat tabel untuk menyimpan token reset password

2. **Controller:**
   - `backend/app/Http/Controllers/Api/AuthController.php`
   - Added methods: `changePassword()`, `forgotPassword()`, `resetPassword()`

3. **Mail:**
   - `backend/app/Mail/ResetPasswordMail.php`
   - Email template handler untuk kirim link reset password

4. **View:**
   - `backend/resources/views/emails/reset-password.blade.php`
   - Template HTML email untuk reset password

5. **Routes:**
   - `backend/routes/api.php`
   - Added routes untuk change password, forgot password, dan reset password

---

## 🎨 Frontend Implementation

### Pages Created

1. **ChangePassword.jsx**
   - Path: `/admin/change-password`
   - Features:
     - Form untuk input password lama
     - Form untuk input password baru
     - Validasi password minimal 8 karakter
     - Konfirmasi password
     - Auto logout setelah berhasil ganti password

2. **ForgotPassword.jsx**
   - Path: `/admin/forgot-password`
   - Features:
     - Form input email
     - Kirim request reset password ke backend
     - Menampilkan pesan sukses/error

3. **ResetPassword.jsx**
   - Path: `/reset-password?email={email}&token={token}`
   - Features:
     - Auto-populate email dari query parameter
     - Form input password baru
     - Konfirmasi password
     - Validasi token dari URL
     - Redirect ke login setelah berhasil

### Files Modified (Frontend)

1. **App.jsx**
   - Added imports untuk 3 komponen baru
   - Added routes:
     - `/admin/forgot-password`
     - `/reset-password`
     - `/admin/change-password` (protected)

2. **AdminLogin.jsx**
   - Added link "Lupa Password?" di bawah tombol login

3. **AdminSettings.jsx**
   - Improved layout dengan informasi akun
   - Added button "Ganti Password" untuk navigate ke halaman change password

---

## 🚀 Cara Menggunakan

### 1. Ganti Password (Admin/Superadmin sudah login)

1. Login ke dashboard admin
2. Klik menu **Pengaturan** di sidebar
3. Klik button **Ganti Password**
4. Masukkan password lama
5. Masukkan password baru (minimal 8 karakter)
6. Konfirmasi password baru
7. Klik **Ubah Password**
8. Akan otomatis logout dan harus login kembali dengan password baru

### 2. Lupa Password

1. Di halaman login admin, klik link **"Lupa Password?"**
2. Masukkan email yang terdaftar
3. Klik **Kirim Link Reset Password**
4. Cek inbox email untuk menerima link reset password
5. Klik link di email atau salin URL ke browser
6. Masukkan password baru
7. Klik **Reset Password**
8. Login dengan password baru

---

## ⚙️ Konfigurasi Email

### Pengaturan di .env (Backend)

Pastikan konfigurasi email sudah benar di file `backend/.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_gmail_app_password_here
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="your_email@gmail.com"
MAIL_FROM_NAME="SMAN Saba"

FRONTEND_URL=http://localhost:5173
```

### Cara Setup Gmail App Password

1. Login ke akun Google
2. Go to: https://myaccount.google.com/security
3. Enable 2-Step Verification
4. Go to App passwords
5. Generate app password untuk "Mail"
6. Copy password yang dihasilkan
7. Paste ke `MAIL_PASSWORD` di `.env`

---

## 🛡️ Security Features

1. **Token Expiration:** Token reset password expired dalam 1 jam
2. **One-Time Use:** Token hanya bisa digunakan sekali
3. **Password Validation:** Minimal 8 karakter
4. **Auto Logout:** Setelah ganti password, semua token login dihapus
5. **Hash Token:** Token disimpan dalam bentuk hash di database

---

## 📝 Database Schema

### Table: password_reset_tokens

| Column      | Type      | Description                    |
|-------------|-----------|--------------------------------|
| email       | string    | Email user (Primary Key)       |
| token       | string    | Hashed reset token             |
| created_at  | timestamp | Timestamp ketika token dibuat  |

---

## ✅ Testing

### Test Change Password

1. Login sebagai admin
2. Navigate ke `/admin/change-password`
3. Test dengan password lama yang salah (harus error)
4. Test dengan password baru yang tidak match (harus error)
5. Test dengan password baru yang valid (harus berhasil dan logout)

### Test Forgot Password

1. Navigate ke `/admin/forgot-password`
2. Test dengan email yang tidak terdaftar (harus error)
3. Test dengan email yang valid (harus berhasil dan email terkirim)
4. Cek inbox email untuk link reset

### Test Reset Password

1. Klik link dari email
2. Test dengan password yang tidak match (harus error)
3. Test dengan password yang terlalu pendek (harus error)
4. Test dengan password valid (harus berhasil dan redirect ke login)
5. Test menggunakan token yang sama lagi (harus error - token expired)

---

## 🐛 Troubleshooting

### Email tidak terkirim

1. Pastikan konfigurasi SMTP di `.env` sudah benar
2. Pastikan `MAIL_PASSWORD` menggunakan App Password, bukan password Gmail biasa
3. Cek log di `backend/storage/logs/laravel.log`
4. Test koneksi SMTP dengan command:
   ```bash
   php artisan tinker
   Mail::raw('Test email', function($msg) {
       $msg->to('test@example.com')->subject('Test');
   });
   ```

### Token tidak valid

1. Token expired setelah 1 jam
2. Token hanya bisa digunakan sekali
3. Request token baru jika token sudah expired

### Password tidak berubah

1. Pastikan password lama yang diinput benar
2. Pastikan password baru minimal 8 karakter
3. Pastikan konfirmasi password match dengan password baru

---

## 📱 UI/UX Features

1. **Show/Hide Password:** Toggle visibility untuk semua input password
2. **Loading States:** Loading indicator saat proses request
3. **Error Handling:** Alert messages untuk error
4. **Success Messages:** Alert messages untuk sukses
5. **Auto Redirect:** Auto redirect setelah sukses
6. **Responsive Design:** Mobile-friendly UI
7. **Consistent Styling:** Menggunakan Material-UI theme

---

## 🔄 Auto Logout Behavior

Setelah ganti password atau reset password:
- Semua token Sanctum untuk user tersebut dihapus
- User harus login kembali dengan password baru
- Ini untuk keamanan, memastikan tidak ada session lama yang masih aktif

---

## 📚 References

- Laravel Sanctum: https://laravel.com/docs/sanctum
- Laravel Mail: https://laravel.com/docs/mail
- React Router: https://reactrouter.com/
- Material-UI: https://mui.com/

---

## 💡 Future Improvements

1. Rate limiting untuk forgot password (mencegah spam)
2. Email notification saat password berubah
3. Password strength meter
4. Password history (tidak bisa menggunakan password lama)
5. Two-factor authentication (2FA)

---

## ✨ Summary

Fitur lengkap manajemen password untuk superadmin dan admin sudah berhasil dibuat dengan:
- ✅ Backend API endpoints
- ✅ Email notification system
- ✅ Frontend pages dan forms
- ✅ Security features
- ✅ User-friendly UI/UX
- ✅ Error handling
- ✅ Auto logout untuk keamanan

Semua fitur sudah terintegrasi dan siap digunakan! 🎉
