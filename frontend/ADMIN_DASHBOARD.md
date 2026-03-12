# Admin Dashboard - SMAN SABA

Admin dashboard untuk mengelola konten website SMAN SABA dengan fitur CRUD lengkap.

## 🚀 Fitur

### Dashboard Utama
- Statistik real-time (Berita, Galeri, Guru, Prestasi, dll)
- Aktivitas terbaru
- Quick stats dengan progress bar

### Modul CRUD
1. **Berita** - Manajemen artikel dan pengumuman
2. **Galeri** - Manajemen foto dan dokumentasi
3. **Guru** - Manajemen data guru dan staff
4. **Prestasi** - Manajemen prestasi siswa
5. **Ekstrakurikuler** - Manajemen kegiatan ekstrakurikuler
6. **Course** - Manajemen mata pelajaran

### Fitur Setiap Modul
- ✅ Tambah data baru
- ✅ Edit data existing
- ✅ Hapus data
- ✅ Pencarian/Search
- ✅ Pagination
- ✅ Upload file/foto
- ✅ Responsive design

## 📂 Struktur File

```
frontend/src/
├── components/
│   └── admin/
│       ├── AdminLayout.jsx      # Layout utama admin (sidebar + header)
│       ├── CrudTable.jsx        # Komponen tabel reusable
│       └── CrudModal.jsx        # Komponen modal form reusable
│
└── pages/
    └── admin/
        ├── AdminLogin.jsx            # Halaman login
        ├── AdminDashboard.jsx        # Dashboard utama
        ├── AdminBerita.jsx           # CRUD Berita
        ├── AdminGaleri.jsx           # CRUD Galeri
        ├── AdminGuru.jsx             # CRUD Guru
        ├── AdminPrestasi.jsx         # CRUD Prestasi
        ├── AdminEkstrakurikuler.jsx  # CRUD Ekstrakurikuler
        └── AdminCourse.jsx           # CRUD Course
```

## 🔐 Login

### Demo Credentials
```
Email: admin@smansaba.sch.id
Password: admin123
```

**Note:** Ini adalah kredensial demo. Untuk production, perlu integrasi dengan backend authentication.

## 🌐 Routes

### Public Routes
- `/` - Redirect ke beranda
- `/beranda` - Halaman utama
- `/tentang` - Tentang sekolah
- `/guru` - Daftar guru
- `/course` - Daftar mata pelajaran
- `/prestasi` - Daftar prestasi
- `/ekstrakurikuler` - Daftar ekstrakurikuler
- `/berita` - Daftar berita
- `/galeri` - Galeri foto
- `/kontak` - Kontak

### Admin Routes
- `/admin/login` - Login admin
- `/admin` - Dashboard admin
- `/admin/berita` - Manajemen berita
- `/admin/galeri` - Manajemen galeri
- `/admin/guru` - Manajemen guru
- `/admin/prestasi` - Manajemen prestasi
- `/admin/ekstrakurikuler` - Manajemen ekstrakurikuler
- `/admin/course` - Manajemen course

## 🎨 UI Components

### CrudTable
Komponen tabel reusable dengan fitur:
- Search/Filter
- Pagination
- Sort columns
- Action buttons (Edit, Delete)

**Props:**
```jsx
<CrudTable
  title="Judul Tabel"
  columns={[
    { field: 'name', headerName: 'Nama' },
    { field: 'email', headerName: 'Email' }
  ]}
  data={dataArray}
  onAdd={() => {}}
  onEdit={(row) => {}}
  onDelete={(row) => {}}
/>
```

### CrudModal
Komponen modal form reusable untuk add/edit:

**Props:**
```jsx
<CrudModal
  open={true}
  onClose={() => {}}
  onSubmit={(data) => {}}
  title="Tambah Data"
  fields={[
    { name: 'title', label: 'Judul', required: true },
    { name: 'content', label: 'Konten', multiline: true, rows: 4 },
    { name: 'image', label: 'Gambar', type: 'file' }
  ]}
  formData={formData}
  setFormData={setFormData}
/>
```

## 🔧 Next Steps (Backend Integration)

Untuk mengintegrasikan dengan backend Laravel:

1. **Authentication**
   - Implement JWT/Sanctum authentication
   - Protect admin routes dengan middleware
   - Update login logic di `AdminLogin.jsx`

2. **API Calls**
   - Buat axios instance dengan base URL
   - Replace dummy data dengan API calls
   - Implement error handling

3. **File Upload**
   - Handle multipart/form-data untuk upload foto
   - Implement preview before upload
   - Validation file size & type

4. **State Management**
   - Consider Redux/Zustand untuk complex state
   - Implement loading states
   - Implement error states

Contoh API integration:
```jsx
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const beritaAPI = {
  getAll: () => api.get('/berita'),
  create: (data) => api.post('/berita', data),
  update: (id, data) => api.put(`/berita/${id}`, data),
  delete: (id) => api.delete(`/berita/${id}`),
};
```

## 📱 Responsive Design

Dashboard sudah dioptimasi untuk:
- Desktop (≥1200px)
- Tablet (768px - 1199px)
- Mobile (<768px)

Sidebar otomatis collapse di mobile dengan hamburger menu.

## 🎯 Fitur yang Bisa Ditambahkan

- [ ] Rich text editor untuk konten (TinyMCE/Quill)
- [ ] Drag & drop untuk upload foto
- [ ] Bulk actions (delete multiple, export CSV)
- [ ] Advanced filters
- [ ] Role-based permissions
- [ ] Activity logs
- [ ] Dashboard analytics dengan charts
- [ ] Email notifications
- [ ] Dark mode

## 💡 Tips

1. **Dummy Data**: Saat ini menggunakan dummy data. Semua perubahan tidak persisten.
2. **Local Storage**: Token disimpan di localStorage. Clear untuk logout paksa.
3. **Customization**: Setiap CRUD page bisa dicustomize sesuai kebutuhan.
4. **Reusable**: Components dirancang reusable untuk mempercepat development.

---

**Created for SMAN SABA** 🎓
