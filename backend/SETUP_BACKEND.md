# Setup Backend Laravel - SMAN 1 BANGSRI

Instruksi lengkap untuk menjalankan backend Laravel.

## 📦 Installation

### 1. Install Dependencies

```bash
cd backend
composer install
```

### 2. Setup Environment

Copy file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Edit `.env` dan konfigurasi database:

```env
APP_NAME="SMAN 1 BANGSRI"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sman_bangsri
DB_USERNAME=root
DB_PASSWORD=
```

### 3. Generate Application Key

```bash
php artisan key:generate
```

### 4. Setup Database

Buat database di phpMyAdmin atau MySQL:

```sql
CREATE DATABASE sman_bangsri CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Run Migrations & Seeders

```bash
php artisan migrate --seed
```

### 6. Create Storage Link

```bash
php artisan storage:link
```

### 7. Start Development Server

```bash
php artisan serve
```

Backend akan berjalan di: **http://localhost:8000**

## 🧪 Test API

Test apakah API berjalan:

```bash
curl http://localhost:8000/api/test
```

Response:
```json
{
  "message": "API Laravel jalan"
}
```

## 📝 API Documentation

Lihat file [DATABASE_SETUP.md](DATABASE_SETUP.md) untuk dokumentasi lengkap API endpoints.

## 🔧 Commands Berguna

```bash
# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Generate IDE helper
php artisan ide-helper:generate

# Reset database
php artisan migrate:fresh --seed

# Create new migration
php artisan make:migration create_tablename_table

# Create new model
php artisan make:model ModelName

# Create new controller
php artisan make:controller ControllerName

# Create new seeder
php artisan make:seeder SeederName
```

## 🌐 CORS Configuration

CORS sudah dikonfigurasi untuk:
- http://localhost:5173 (Vite default)
- http://localhost:3000 (React default)

Jika menggunakan port lain, edit `config/cors.php`:

```php
'allowed_origins' => [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:YOURPORT'
],
```

## 📁 Struktur Folder

```
backend/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── Api/
│   │           ├── BeritaController.php
│   │           ├── GaleriController.php
│   │           ├── GuruController.php
│   │           ├── PrestasiController.php
│   │           ├── EkstrakurikulerController.php
│   │           └── CourseController.php
│   └── Models/
│       ├── Berita.php
│       ├── Galeri.php
│       ├── Guru.php
│       ├── Prestasi.php
│       ├── Ekstrakurikuler.php
│       └── Course.php
├── database/
│   ├── migrations/
│   │   ├── 2024_02_25_000001_create_berita_table.php
│   │   ├── 2024_02_25_000002_create_galeri_table.php
│   │   ├── 2024_02_25_000003_create_guru_table.php
│   │   ├── 2024_02_25_000004_create_prestasi_table.php
│   │   ├── 2024_02_25_000005_create_ekstrakurikuler_table.php
│   │   └── 2024_02_25_000006_create_courses_table.php
│   └── seeders/
│       ├── BeritaSeeder.php
│       ├── GaleriSeeder.php
│       ├── GuruSeeder.php
│       ├── PrestasiSeeder.php
│       ├── EkstrakurikulerSeeder.php
│       └── CourseSeeder.php
├── routes/
│   └── api.php
└── storage/
    └── app/
        └── public/
            ├── berita/
            ├── galeri/
            ├── guru/
            ├── prestasi/
            ├── ekstrakurikuler/
            └── courses/
```

## 🔐 Authentication (Coming Soon)

Authentication menggunakan Laravel Sanctum akan ditambahkan untuk:
- Login admin
- Protected routes
- Token management

## 🚀 Production Deployment

### Optimize untuk production:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
composer install --optimize-autoloader --no-dev
```

### Set environment:

```env
APP_ENV=production
APP_DEBUG=false
```

## 📊 Database Management

### Menggunakan phpMyAdmin

1. Buka http://localhost/phpmyadmin
2. Login dengan username `root` (password kosong)
3. Pilih database `sman_bangsri`
4. Explore tables dan data

### Backup Database

```bash
php artisan db:backup
```

Atau manual via phpMyAdmin:
1. Export → Quick → SQL
2. Save file

### Restore Database

```bash
mysql -u root -p sman_bangsri < backup.sql
```

## 🐛 Troubleshooting

### Port 8000 sudah digunakan
```bash
php artisan serve --port=8001
```

### Storage permission error
```bash
chmod -R 775 storage bootstrap/cache
```

### Database connection error
- Pastikan MySQL running
- Check credentials di `.env`
- Test connection: `php artisan tinker` → `DB::connection()->getPdo();`

---

**Backend ready!** 🚀 Lanjut ke frontend setup.
