# Integrasi Frontend dengan Backend API - SMAN 1 BANGSRI

## ✅ Selesai

Semua halaman publik website telah terhubung dengan Laravel Backend API.

## 📋 Yang Sudah Dikerjakan

### 1. **API Service** (`frontend/src/services/api.js`)
- ✅ Setup axios dengan base URL `http://localhost:8000/api`
- ✅ Auto-attach token dari localStorage untuk admin routes
- ✅ Public API endpoints (berita, galeri, guru, prestasi, ekstrakurikuler, courses)
- ✅ Admin API endpoints (CRUD operations)
- ✅ Helper function `getImageUrl()` untuk generate URL gambar

### 2. **Halaman Publik yang Sudah Terintegrasi**

#### ✅ **BeritaPage** (`/berita`)
- Fetch berita dari: `GET /api/public/berita`
- Menampilkan loading state
- Menampilkan pesan jika belum ada data
- Klik berita → navigasi ke `/detail-berita/{slug}`

#### ✅ **DetailBeritaPage** (`/detail-berita/:slug`)
- Fetch detail berita: `GET /api/public/berita/{slug}`
- Loading state dan error handling
- Format tanggal otomatis ke Bahasa Indonesia

#### ✅ **GaleriPage** (`/galeri`)
- Fetch galeri dari: `GET /api/public/galeri`
- Filter berdasarkan kategori (ALL, SCHOOL, TEACHERS, STUDENTS, CEREMONY, UNIVERSITY CORNER)
- Modal untuk preview gambar full-size

#### ✅ **GuruPage** (`/guru`)
- Fetch daftar guru: `GET /api/public/guru`
- Menampilkan foto, nama, jabatan, dan mata pelajaran

#### ✅ **PrestasiPage** (`/prestasi`)
- Fetch prestasi: `GET /api/public/prestasi`
- Warna badge otomatis berdasarkan tingkat (Nasional=Red, Provinsi=Blue, Kabupaten=Green)

#### ✅ **EkstrakurikulerPage** (`/ekstrakurikuler`)
- Fetch ekstrakurikuler: `GET /api/public/ekstrakurikuler`
- Klik card → navigasi ke detail

#### ✅ **DetailEkstrakurikulerPage** (`/ekstrakurikuler/:slug`)
- Fetch detail: `GET /api/public/ekstrakurikuler/{slug}`
- Loading state dan error handling

#### ✅ **CoursePage** (`/course`)
- Fetch courses: `GET /api/public/courses`
- Filter berdasarkan mata pelajaran (dinamis dari data API)

## 🚀 Cara Testing

### 1. **Setup Backend**

```bash
cd backend

# Install dependencies (jika belum)
composer install

# Setup .env
cp .env.example .env
# Edit .env, atur database name: DB_DATABASE=sman_bangsri

# Generate key
php artisan key:generate

# Run migrations + seeders
php artisan migrate:fresh --seed

# Create storage link
php artisan storage:link

# Start server
php artisan serve
```

Backend akan jalan di: **http://localhost:8000**

### 2. **Setup Frontend**

```bash
cd frontend

# Install dependencies (jika belum)
npm install

# Start dev server
npm run dev
```

Frontend akan jalan di: **http://localhost:5173**

### 3. **Test Halaman Publik**

Buka browser dan cek:

- ✅ http://localhost:5173/berita → Harus tampil data dari seeder
- ✅ http://localhost:5173/galeri → Harus tampil foto-foto
- ✅ http://localhost:5173/guru → Harus tampil daftar guru
- ✅ http://localhost:5173/prestasi → Harus tampil prestasi
- ✅ http://localhost:5173/ekstrakurikuler → Harus tampil ekstrakurikuler
- ✅ http://localhost:5173/course → Harus tampil materi course

### 4. **Test Admin Dashboard**

1. Login: http://localhost:5173/admin/login
   - Email: `admin@sman1bangsri.sch.id`  
   - Password: `admin123`

2. Coba tambah berita baru di admin
3. Cek apakah berita muncul di `/berita` (public page)

## 📊 Struktur Data API

### Berita
```json
{
  "id": 1,
  "judul": "Judul Berita",
  "slug": "judul-berita",
  "foto": "berita/filename.jpg",
  "konten": "Konten lengkap...",
  "penulis": "Nama Penulis",
  "kategori": "Prestasi",
  "tanggal": "2024-02-25",
  "created_at": "2024-02-25T10:00:00",
  "updated_at": "2024-02-25T10:00:00"
}
```

### Galeri
```json
{
  "id": 1,
  "judul": "Judul Foto",
  "foto": "galeri/filename.jpg",
  "kategori": "SCHOOL",
  "created_at": "2024-02-25T10:00:00",
  "updated_at": "2024-02-25T10:00:00"
}
```

### Guru
```json
{
  "id": 1,
  "nama": "Nama Guru",
  "jabatan": "Kepala Sekolah",
  "mapel": "Matematika",
  "foto": "guru/filename.jpg",
  "created_at": "2024-02-25T10:00:00",
  "updated_at": "2024-02-25T10:00:00"
}
```

### Prestasi
```json
{
  "id": 1,
  "judul": "Juara 1 Olimpiade Matematika",
  "tingkat": "Nasional",
  "kategori": "Akademik",
  "tahun": "2024",
  "created_at": "2024-02-25T10:00:00",
  "updated_at": "2024-02-25T10:00:00"
}
```

### Ekstrakurikuler
```json
{
  "id": 1,
  "nama": "Paskibra",
  "slug": "paskibra",
  "kategori": "Organisasi",
  "deskripsi": "Deskripsi lengkap...",
  "pembina": "Nama Pembina",
  "icon": "EmojiEvents",
  "created_at": "2024-02-25T10:00:00",
  "updated_at": "2024-02-25T10:00:00"
}
```

### Courses
```json
{
  "id": 1,
  "judul": "Materi Aljabar",
  "mapel": "Matematika",
  "kelas": "X",
  "deskripsi": "Deskripsi materi...",
  "konten": "Konten lengkap...",
  "file": "courses/filename.pdf",
  "created_at": "2024-02-25T10:00:00",
  "updated_at": "2024-02-25T10:00:00"
}
```

## 🔧 Troubleshooting

### CORS Error
Jika muncul CORS error saat frontend akses backend:

1. Pastikan `backend/config/cors.php` sudah ada
2. Cek `allowed_origins` sudah include `http://localhost:5173`

### Gambar Tidak Muncul
1. Pastikan sudah run `php artisan storage:link`
2. Cek folder `backend/storage/app/public` ada
3. Cek URL gambar: `http://localhost:8000/storage/{path}`

### Data Tidak Muncul
1. Cek backend API: `curl http://localhost:8000/api/public/berita`
2. Cek browser console untuk error
3. Pastikan migrations + seeders sudah dijalankan

### Network Error
1. Pastikan backend running di port 8000
2. Pastikan frontend running di port 5173
3. Cek base URL di `frontend/src/services/api.js`

## 📝 Next Steps

Untuk implementasi lebih lanjut:

1. **Authentication**: Implement Laravel Sanctum untuk admin authentication
2. **File Upload**: Test upload gambar dari admin panel
3. **Validation**: Tambahkan validasi form di frontend
4. **Loading State**: Improve UX saat loading data
5. **Error Handling**: Better error messages untuk user
6. **Pagination**: Implement pagination untuk list yang panjang
7. **Search**: Tambah fitur pencarian di list page

## 🎉 Hasil Akhir

Sekarang website SMAN 1 BANGSRI sudah:
- ✅ Frontend terhubung dengan Backend API
- ✅ Data dinamis dari database
- ✅ Admin bisa CRUD data, langsung muncul di website
- ✅ Gambar upload terintegrasi
- ✅ Loading states dan error handling
- ✅ Ready untuk production (after authentication & testing)

---

**Happy Coding! 🚀**
