# Database Setup - SMAN 1 BANGSRI

Panduan lengkap untuk setup database Laravel dengan phpMyAdmin.

## 📋 Prerequisites

- PHP >= 8.1
- Composer
- MySQL/MariaDB
- XAMPP/LARAGON (untuk phpMyAdmin)

## 🗄️ Struktur Database

Database ini terdiri dari 6 tabel utama:

1. **berita** - Manajemen berita dan artikel
2. **galeri** - Manajemen galeri foto
3. **guru** - Data guru dan staff
4. **prestasi** - Prestasi siswa
5. **ekstrakurikuler** - Data ekstrakurikuler
6. **courses** - Mata pelajaran

## 🚀 Setup Instructions

### 1. Konfigurasi Database

Edit file `.env` di folder backend:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sman_bangsri
DB_USERNAME=root
DB_PASSWORD=
```

### 2. Buat Database

Buka phpMyAdmin (http://localhost/phpmyadmin) dan buat database baru:

```sql
CREATE DATABASE sman_bangsri CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Atau gunakan command line:

```bash
mysql -u root -p -e "CREATE DATABASE sman_bangsri"
```

### 3. Install Dependencies

```bash
cd backend
composer install
```

### 4. Generate Application Key

```bash
php artisan key:generate
```

### 5. Run Migrations

Migrations akan membuat semua tabel yang diperlukan:

```bash
php artisan migrate
```

Jika ingin reset database dan migrate ulang:

```bash
php artisan migrate:fresh
```

### 6. Run Seeders

Seeders akan mengisi database dengan data dummy:

```bash
php artisan db:seed
```

Atau jalankan semuanya sekaligus (reset + migrate + seed):

```bash
php artisan migrate:fresh --seed
```

### 7. Create Storage Link

Untuk menyimpan file upload:

```bash
php artisan storage:link
```

### 8. Start Development Server

```bash
php artisan serve
```

Server akan berjalan di: http://localhost:8000

## 📊 Database Schema

### Table: berita
```sql
- id (bigint, primary key)
- title (varchar)
- slug (varchar, unique)
- category (varchar)
- author (varchar)
- content (text)
- image (varchar, nullable)
- status (enum: published, draft)
- published_date (date)
- created_at, updated_at (timestamp)
```

### Table: galeri
```sql
- id (bigint, primary key)
- title (varchar)
- category (varchar)
- description (text, nullable)
- image (varchar)
- date (date)
- created_at, updated_at (timestamp)
```

### Table: guru
```sql
- id (bigint, primary key)
- name (varchar)
- subject (varchar)
- email (varchar, unique)
- phone (varchar)
- education (varchar, nullable)
- bio (text, nullable)
- photo (varchar, nullable)
- created_at, updated_at (timestamp)
```

### Table: prestasi
```sql
- id (bigint, primary key)
- title (varchar)
- student (varchar)
- level (enum: Kabupaten, Provinsi, Nasional, Internasional)
- year (varchar)
- category (varchar)
- description (text, nullable)
- image (varchar, nullable)
- created_at, updated_at (timestamp)
```

### Table: ekstrakurikuler
```sql
- id (bigint, primary key)
- name (varchar)
- category (varchar)
- coach (varchar)
- schedule (varchar)
- description (text, nullable)
- image (varchar, nullable)
- created_at, updated_at (timestamp)
```

### Table: courses
```sql
- id (bigint, primary key)
- name (varchar)
- code (varchar, unique)
- teacher (varchar)
- class (varchar)
- hours (varchar)
- description (text, nullable)
- syllabus (varchar, nullable)
- created_at, updated_at (timestamp)
```

## 🔌 API Endpoints

### Admin API (CRUD Operations)

**Base URL:** `http://localhost:8000/api/admin`

#### Berita
- GET `/api/admin/berita` - List all berita
- POST `/api/admin/berita` - Create berita
- GET `/api/admin/berita/{id}` - Show berita
- PUT/PATCH `/api/admin/berita/{id}` - Update berita
- DELETE `/api/admin/berita/{id}` - Delete berita

#### Galeri
- GET `/api/admin/galeri` - List all galeri
- POST `/api/admin/galeri` - Create galeri
- GET `/api/admin/galeri/{id}` - Show galeri
- PUT/PATCH `/api/admin/galeri/{id}` - Update galeri
- DELETE `/api/admin/galeri/{id}` - Delete galeri

#### Guru
- GET `/api/admin/guru` - List all guru
- POST `/api/admin/guru` - Create guru
- GET `/api/admin/guru/{id}` - Show guru
- PUT/PATCH `/api/admin/guru/{id}` - Update guru
- DELETE `/api/admin/guru/{id}` - Delete guru

#### Prestasi
- GET `/api/admin/prestasi` - List all prestasi
- POST `/api/admin/prestasi` - Create prestasi
- GET `/api/admin/prestasi/{id}` - Show prestasi
- PUT/PATCH `/api/admin/prestasi/{id}` - Update prestasi
- DELETE `/api/admin/prestasi/{id}` - Delete prestasi

#### Ekstrakurikuler
- GET `/api/admin/ekstrakurikuler` - List all ekstrakurikuler
- POST `/api/admin/ekstrakurikuler` - Create ekstrakurikuler
- GET `/api/admin/ekstrakurikuler/{id}` - Show ekstrakurikuler
- PUT/PATCH `/api/admin/ekstrakurikuler/{id}` - Update ekstrakurikuler
- DELETE `/api/admin/ekstrakurikuler/{id}` - Delete ekstrakurikuler

#### Courses
- GET `/api/admin/courses` - List all courses
- POST `/api/admin/courses` - Create course
- GET `/api/admin/courses/{id}` - Show course
- PUT/PATCH `/api/admin/courses/{id}` - Update course
- DELETE `/api/admin/courses/{id}` - Delete course

### Public API (Read Only)

**Base URL:** `http://localhost:8000/api/public`

Sama seperti admin, tapi hanya GET (read-only) untuk frontend public pages.

## 🧪 Testing API

### Using cURL

```bash
# Get all berita
curl http://localhost:8000/api/admin/berita

# Create berita
curl -X POST http://localhost:8000/api/admin/berita \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Berita",
    "category": "Pengumuman",
    "author": "Admin",
    "content": "Ini adalah konten test",
    "status": "published",
    "published_date": "2024-02-25"
  }'
```

### Using Postman

1. Import collection atau buat request manual
2. Set base URL: `http://localhost:8000/api`
3. Test semua endpoints

## 📁 File Upload

File upload disimpan di:
- `storage/app/public/berita/` - Gambar berita
- `storage/app/public/galeri/` - Foto galeri
- `storage/app/public/guru/` - Foto guru
- `storage/app/public/prestasi/` - Gambar prestasi
- `storage/app/public/ekstrakurikuler/` - Gambar ekstrakurikuler
- `storage/app/public/courses/` - Silabus courses

URL akses: `http://localhost:8000/storage/{path}`

## 🔧 Troubleshooting

### Error: SQLSTATE[HY000] [2002]
- Pastikan MySQL/MariaDB sudah running
- Check kredensial database di `.env`

### Error: Storage not linked
```bash
php artisan storage:link
```

### Error: Class not found
```bash
composer dump-autoload
```

### Reset Database
```bash
php artisan migrate:fresh --seed
```

## 🎯 Next Steps

1. Implement authentication (JWT/Sanctum)
2. Add validation rules
3. Implement image optimization
4. Add pagination
5. Implement search & filtering
6. Add caching
7. Setup CORS untuk frontend

## 📝 Notes

- Pastikan folder `storage/` dan `bootstrap/cache/` writable (chmod 775)
- Gunakan phpMyAdmin untuk monitoring database
- Backup database secara berkala
- Gunakan soft deletes untuk data penting

---

**Created for SMAN 1 BANGSRI** 🎓
