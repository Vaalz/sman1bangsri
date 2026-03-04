# Sistem Login Admin

## Overview
Sistem login untuk admin dan superadmin dengan role-based access control (RBAC). Superadmin dapat membuat dan mengelola akun admin.

## Fitur Utama

### 1. Role System
- **SuperAdmin**: Memiliki akses penuh untuk mengelola admin
  - Membuat akun admin baru
  - Mengaktifkan/menonaktifkan admin
  - Menghapus admin
  - Akses ke semua fitur admin
  
- **Admin**: Mengelola konten website
  - Mengelola berita, galeri, guru, prestasi, ekstrakurikuler, course, sambutan
  - Tidak dapat mengelola admin lain

### 2. Authentication
- Login menggunakan email dan password
- Token-based authentication dengan Laravel Sanctum
- Protected routes - harus login untuk akses `/admin`
- Auto redirect ke login page jika belum authenticated

### 3. Admin Management (Superadmin Only)
- Halaman khusus untuk mengelola admin: `/admin/admins`
- Create, activate/deactivate, dan delete admin
- Hanya superadmin yang dapat akses

## Akun Default

### SuperAdmin
- **Email**: valzopsional@gmail.com
- **Password**: [Password existing Anda]
- **Role**: superadmin

> **Note**: Jika belum pernah membuat akun sebelumnya, password default adalah `superadmin123`. Silakan ganti password setelah login pertama kali.

## Cara Menggunakan

### Login
1. Akses `/admin/login`
2. Masukkan email dan password
3. Klik tombol Login
4. Akan diarahkan ke dashboard admin

### Membuat Admin Baru (Superadmin)
1. Login sebagai superadmin
2. Klik menu "Manajemen Admin" di sidebar
3. Klik tombol "Tambah Admin"
4. Isi form:
   - Nama
   - Email
   - Password (minimal 8 karakter)
   - Konfirmasi Password
5. Klik "Tambah"
6. Admin baru akan langsung aktif dan dapat login

### Mengelola Status Admin (Superadmin)
1. Di halaman "Manajemen Admin"
2. Klik icon ✓ (centang hijau) untuk nonaktifkan admin
3. Klik icon ✗ (silang merah) untuk aktifkan admin kembali
4. Admin yang nonaktif tidak dapat login

### Menghapus Admin (Superadmin)
1. Di halaman "Manajemen Admin"
2. Klik icon 🗑️ (trash/delete) pada admin yang ingin dihapus
3. Konfirmasi penghapusan
4. Admin akan dihapus permanen dari database

### Logout
1. Klik menu "Logout" di sidebar kiri bawah
2. Akan diarahkan kembali ke halaman login

## API Endpoints

### Public Endpoints
- `POST /api/login` - Login with email and password

### Protected Endpoints (Requires Authentication)
- `POST /api/logout` - Logout current user
- `GET /api/me` - Get current user info

### Superadmin Endpoints (Requires Superadmin Role)
- `GET /api/superadmin/admins` - Get all admin users
- `POST /api/superadmin/admins` - Create new admin
- `PATCH /api/superadmin/admins/{id}/status` - Update admin status
- `DELETE /api/superadmin/admins/{id}` - Delete admin

## Technical Details

### Backend (Laravel)

#### Database
- Tabel `users` memiliki kolom:
  - `role`: enum('superadmin', 'admin')
  - `is_active`: boolean

#### Models
- `User` model dengan helper methods:
  - `isSuperAdmin()`: Check if user is superadmin
  - `isAdmin()`: Check if user is admin
  - `isActive()`: Check if user is active

#### Middleware
- `auth:sanctum`: Memastikan user sudah login
- `superadmin`: Memastikan user adalah superadmin

#### Routes Protection
```php
// Admin routes - requires authentication
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    // All admin routes here
});

// Superadmin routes - requires superadmin role
Route::middleware(['auth:sanctum', 'superadmin'])->prefix('superadmin')->group(function () {
    // Superadmin only routes
});
```

### Frontend (React)

#### Components
- `AdminLogin`: Login page component
- `ProtectedRoute`: HOC untuk protect routes
- `AdminManagement`: Superadmin page untuk manage admins

#### Services
- `authService`: Handle authentication
  - `login()`: Login user
  - `logout()`: Logout user
  - `me()`: Get current user
  - `isAuthenticated()`: Check if authenticated
  - `isSuperAdmin()`: Check if superadmin
  - `getAdmins()`: Get all admins (superadmin)
  - `createAdmin()`: Create new admin (superadmin)
  - `updateAdminStatus()`: Update admin status (superadmin)
  - `deleteAdmin()`: Delete admin (superadmin)

#### Route Protection
```jsx
<Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
  // Protected admin routes
</Route>
```

#### Storage
- Token disimpan di `localStorage` dengan key `token`
- User info disimpan di `localStorage` dengan key `user`

## Security

### Password
- Minimal 8 karakter
- Di-hash menggunakan bcrypt di Laravel

### Token
- Token dibuat menggunakan Laravel Sanctum
- Token dihapus saat logout
- Token dikirim dalam header `Authorization: Bearer {token}`

### Role-Based Access
- Middleware `superadmin` memastikan hanya superadmin yang dapat akses endpoint tertentu
- Frontend juga check role untuk menampilkan menu

### Active Status
- Admin yang nonaktif tidak dapat login
- Token admin yang nonaktif akan dihapus otomatis

## Setup Instructions

### Backend
1. Jalankan migration:
   ```bash
   cd backend
   php artisan migrate
   ```

2. Seed superadmin:
   ```bash
   php artisan db:seed --class=SuperAdminSeeder
   ```

3. Start Laravel server:
   ```bash
   php artisan serve
   ```

### Frontend
1. Install dependencies (jika belum):
   ```bash
   cd frontend
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Akses aplikasi di browser

## Troubleshooting

### Lupa Password Superadmin
1. Jalankan command berikut di backend:
   ```bash
   php artisan tinker
   ```
2. Update password:
   ```php
   $user = User::where('email', 'valzopsional@gmail.com')->first();
   $user->password = Hash::make('newpassword123');
   $user->save();
   ```

### Token Expired / Invalid
- Logout dan login kembali
- Clear localStorage di browser

### Admin Tidak Bisa Login
- Check apakah admin status `is_active = true`
- Pastikan email dan password benar
- Check di log Laravel untuk error details

## Future Enhancements
- Email notification saat admin baru dibuat
- Password reset functionality
- Two-factor authentication
- Activity logs
- Session management
