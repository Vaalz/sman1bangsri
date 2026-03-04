# Dokumentasi CRUD Admin Dashboard

## 🎯 Ringkasan

Sistem CRUD (Create, Read, Update, Delete) telah diimplementasikan untuk semua resource di admin dashboard. Admin dapat mengelola semua data website melalui interface admin panel.

## 📋 Resource yang Tersedia

### 1. **Berita**
- **Fields**: judul, kategori, penulis, konten, foto, tanggal
- **Auto-Generate**: slug (otomatis dari judul)
- **Endpoint**: `/api/admin/berita`
- **Admin Page**: `/admin/berita`

### 2. **Galeri**
- **Fields**: judul, foto, kategori
- **Kategori**: CEREMONY, SCHOOL, STUDENTS
- **Endpoint**: `/api/admin/galeri`
- **Admin Page**: `/admin/galeri`

### 3. **Guru**
- **Fields**: nama, jabatan, mapel, foto
- **Endpoint**: `/api/admin/guru`
- **Admin Page**: `/admin/guru`

### 4. **Prestasi**
- **Fields**: judul, tingkat, kategori, tahun
- **Tingkat**: Nasional, Provinsi, Kabupaten
- **Endpoint**: `/api/admin/prestasi`
- **Admin Page**: `/admin/prestasi`

### 5. **Ekstrakurikuler**
- **Fields**: nama, kategori, pembina, deskripsi, icon
- **Auto-Generate**: slug (otomatis dari nama)
- **Icon Options**: Sports, MusicNote, Palette, Science, Language
- **Endpoint**: `/api/admin/ekstrakurikuler`
- **Admin Page**: `/admin/ekstrakurikuler`

### 6. **Course (Mata Pelajaran)**
- **Fields**: judul, mapel, kelas, deskripsi, konten, file
- **File Types**: PDF, DOC, DOCX
- **Endpoint**: `/api/admin/courses`
- **Admin Page**: `/admin/course`

## 🔄 Cara Kerja CRUD

### Frontend (React)
Setiap halaman admin menggunakan struktur yang sama:

1. **Fetch Data**: Memanggil API saat komponen di-mount
2. **Loading State**: Menampilkan spinner loading
3. **Empty State**: Menampilkan pesan "Belum ada data" jika kosong
4. **Table Display**: Menampilkan data dalam tabel dengan opsi edit/delete
5. **Modal Form**: Form untuk tambah/edit data

### Backend (Laravel)
Semua controller memiliki 5 method standar:

1. **index()**: Mengambil semua data
2. **store()**: Membuat data baru
3. **show($id)**: Mengambil 1 data by ID
4. **update($id)**: Update data by ID
5. **destroy($id)**: Hapus data by ID

## 🛠️ Cara Menggunakan CRUD

### Menambah Data Baru
1. Buka halaman admin resource (misal: `/admin/berita`)
2. Klik tombol **"Tambah [Resource]"**
3. Isi form yang muncul
4. Klik **"Simpan"**
5. Data akan otomatis refresh dan tampil di tabel

### Mengedit Data
1. Klik icon **Pensil (Edit)** pada baris data yang ingin diedit
2. Modal form akan terbuka dengan data terisi
3. Ubah data yang diperlukan
4. Klik **"Simpan"**
5. Data akan otomatis diperbarui

### Menghapus Data
1. Klik icon **Tempat Sampah (Delete)** pada baris data
2. Konfirmasi penghapusan akan muncul
3. Klik **"OK"** untuk menghapus
4. Data akan dihapus dan tabel refresh otomatis

## 📡 API Endpoints

### Public Endpoints (untuk website publik)
```
GET /api/public/berita
GET /api/public/berita/{id}
GET /api/public/galeri
GET /api/public/guru
GET /api/public/prestasi
GET /api/public/ekstrakurikuler
GET /api/public/courses
```

### Admin Endpoints (untuk CRUD)
```
# Berita
GET    /api/admin/berita          - List semua berita
POST   /api/admin/berita          - Buat berita baru
GET    /api/admin/berita/{id}     - Detail 1 berita
PUT    /api/admin/berita/{id}     - Update berita
DELETE /api/admin/berita/{id}     - Hapus berita

# Galeri
GET    /api/admin/galeri
POST   /api/admin/galeri
PUT    /api/admin/galeri/{id}
DELETE /api/admin/galeri/{id}

# Guru
GET    /api/admin/guru
POST   /api/admin/guru
PUT    /api/admin/guru/{id}
DELETE /api/admin/guru/{id}

# Prestasi
GET    /api/admin/prestasi
POST   /api/admin/prestasi
PUT    /api/admin/prestasi/{id}
DELETE /api/admin/prestasi/{id}

# Ekstrakurikuler
GET    /api/admin/ekstrakurikuler
POST   /api/admin/ekstrakurikuler
PUT    /api/admin/ekstrakurikuler/{id}
DELETE /api/admin/ekstrakurikuler/{id}

# Courses
GET    /api/admin/courses
POST   /api/admin/courses
PUT    /api/admin/courses/{id}
DELETE /api/admin/courses/{id}
```

## 🎨 Fitur Khusus

### Auto-Generate Slug
- **Berita**: Slug otomatis dibuat dari judul
- **Ekstrakurikuler**: Slug otomatis dibuat dari nama
- Slug digunakan untuk URL SEO-friendly
- Contoh: "Prestasi Siswa" → "prestasi-siswa"

### Upload File
- **Berita & Galeri**: Menerima gambar (jpg, png, etc)
- **Guru**: Foto profil
- **Course**: File dokumen (PDF, DOC, DOCX)
- Files disimpan di `storage/app/public/`
- Accessible via `/storage/{path}`

### Empty State Handling
- Jika belum ada data, akan tampil pesan: "Belum ada data [resource]"
- Loading state menampilkan spinner
- Error state menampilkan alert error

### Form Validation
- Required fields ditandai dengan *
- Type-specific validation (email, date, file type)
- Frontend & backend validation

## 🔐 Keamanan (To Be Implemented)

Saat ini endpoint admin belum memiliki authentication. Untuk production, tambahkan:
- Login system untuk admin
- JWT/Sanctum authentication
- Middleware untuk protect admin routes
- Role-based access control

## 📱 Responsiveness

Semua halaman admin responsive dan dapat diakses dari:
- Desktop
- Tablet  
- Mobile devices

## 🚀 Testing CRUD

Untuk test CRUD operations:

1. **Start Backend**:
   ```bash
   cd backend
   php artisan serve
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Akses Admin Panel**:
   - Buka browser: `http://localhost:5173/admin`
   - Pilih menu resource yang ingin dikelola
   - Coba tambah, edit, dan hapus data

## 📊 Status Implementasi

✅ Backend API (Laravel)
✅ Frontend Admin Pages (React)
✅ CRUD Operations (Create, Read, Update, Delete)
✅ File Upload Handling
✅ Form Validation
✅ Empty State Handling
✅ Loading States
✅ Error Handling
✅ Auto-Generate Slug
✅ Select Dropdown Fields
✅ Indonesian Field Names

## 🔮 Future Enhancements

- [ ] Authentication & Authorization
- [ ] Image preview before upload
- [ ] Drag & drop file upload
- [ ] Bulk delete operations
- [ ] Search & filter functionality
- [ ] Pagination for large datasets
- [ ] Export data to Excel/PDF
- [ ] Activity log/audit trail
- [ ] Rich text editor untuk konten
- [ ] Image cropping/resizing

## 📝 Catatan Penting

1. **Database Seeder**: Data dummy sudah di-seed ke database
2. **Field Names**: Semua menggunakan nama field Indonesia
3. **Response Format**: Semua response dibungkus dalam `{ data: [...] }`
4. **File Storage**: Pastikan `php artisan storage:link` sudah dijalankan
5. **CORS**: Sudah dikonfigurasi untuk localhost:5173

---

**Last Updated**: February 25, 2026  
**Version**: 1.0.0
