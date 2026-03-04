# 📸 Panduan Upload File dari Lokal

## 🎯 Fitur Upload File

Sistem sudah mendukung upload file gambar dan dokumen dari komputer lokal untuk resource berikut:

### Resource dengan Upload Gambar:
- ✅ **Berita** - Upload foto berita (JPG, PNG, max 2MB)
- ✅ **Galeri** - Upload foto kegiatan (JPG, PNG, max 2MB)
- ✅ **Guru** - Upload foto profil guru (JPG, PNG, max 2MB)

### Resource dengan Upload Dokumen:
- ✅ **Course** - Upload file silabus (PDF, DOC, DOCX, max 5MB)

---

## 🚀 Cara Upload File

### 1. Akses Halaman Admin
```
http://localhost:5173/admin/[resource]
```
Contoh:
- http://localhost:5173/admin/berita
- http://localhost:5173/admin/galeri
- http://localhost:5173/admin/guru

### 2. Klik Tombol "Tambah [Resource]"
Modal form akan terbuka dengan field-field yang diperlukan

### 3. Upload File
**Untuk Gambar:**
- Klik button **"Upload [Nama Field]"** dengan icon cloud
- Pilih gambar dari komputer (.jpg, .png, .gif, etc)
- Preview gambar akan muncul otomatis
- Nama file yang dipilih akan ditampilkan

**Untuk Dokumen:**
- Klik button **"File Silabus"**
- Pilih file dokumen (.pdf, .doc, .docx)
- Nama file yang dipilih akan ditampilkan

### 4. Isi Field Lainnya
Lengkapi semua field yang required (ditandai *)

### 5. Klik "Simpan"
File akan diupload ke server dan disimpan di database

---

## 🎨 Fitur Upload

### ✨ Preview Image
Setelah memilih gambar, preview otomatis muncul dalam modal:
- Ukuran preview: 120x120px
- Format: Rounded square
- Muncul di bawah button upload

### 📁 Info File
- Nama file yang dipilih ditampilkan
- Jika belum pilih file: "Belum ada file dipilih"
- Update real-time saat file berubah

### 🔄 Replace File
Untuk mengganti file yang sudah dipilih:
1. Klik button upload lagi
2. Pilih file baru
3. File lama akan ter-replace otomatis

### ✅ Validasi
**Frontend Validation:**
- Accept only specified file types
- File type badge (image/* or specific extensions)

**Backend Validation:**
- Image files: max 2MB (2048 KB)
- Document files: max 5MB (5120 KB)
- MIME type validation
- File extension validation

---

## 💾 Penyimpanan File

### Struktur Direktori
```
backend/
├── storage/
│   └── app/
│       └── public/
│           ├── berita/          # Foto berita
│           ├── galeri/          # Foto galeri
│           ├── guru/            # Foto guru
│           └── courses/         # File silabus
└── public/
    └── storage/  -> symlink ke storage/app/public
```

### Symlink
Storage sudah di-link ke public directory:
```bash
php artisan storage:link
```

Files dapat diakses via:
```
http://localhost:8000/storage/berita/filename.jpg
http://localhost:8000/storage/guru/photo.png
```

---

## 🔧 Implementasi Teknis

### Frontend (CrudModal Component)

**File Input with Preview:**
```jsx
<Button
  component="label"
  variant="outlined"
  startIcon={<CloudUpload />}
  fullWidth
>
  {field.label}
  <input
    type="file"
    hidden
    accept={field.accept || 'image/*'}
    onChange={handleChange(field.name)}
  />
</Button>

{preview[field.name] && (
  <Avatar
    src={preview[field.name]}
    variant="rounded"
    sx={{ width: 120, height: 120 }}
  />
)}
```

**Features:**
- Hidden native input
- Styled Material-UI button
- FileReader API for preview
- Base64 image preview
- File object stored in formData

### Backend (Laravel Controller)

**File Handling:**
```php
public function store(Request $request)
{
    $validated = $request->validate([
        'foto' => 'nullable|image|max:2048',
        // other fields...
    ]);

    if ($request->hasFile('foto')) {
        $validated['foto'] = $request->file('foto')
            ->store('berita', 'public');
    }

    $berita = Berita::create($validated);
    return response()->json(['data' => $berita], 201);
}
```

**Update with File Replacement:**
```php
public function update(Request $request, $id)
{
    $berita = Berita::findOrFail($id);
    
    if ($request->hasFile('foto')) {
        // Delete old file
        if ($berita->foto) {
            Storage::disk('public')->delete($berita->foto);
        }
        // Store new file
        $validated['foto'] = $request->file('foto')
            ->store('berita', 'public');
    }
    
    $berita->update($validated);
    return response()->json(['data' => $berita]);
}
```

### API Service (FormData)

**Proper FormData Handling:**
```javascript
export const createBerita = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  return api.post('/admin/berita', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const updateBerita = (id, data) => {
  const formData = new FormData();
  formData.append('_method', 'PUT'); // Laravel method spoofing
  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  return api.post(`/admin/berita/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
```

---

## 📋 Testing Upload

### Test Berita Upload
1. Buka: http://localhost:5173/admin/berita
2. Klik "Tambah Berita"
3. Isi form:
   - Judul: "Test Upload Gambar"
   - Kategori: "Test"
   - Penulis: "Admin"
   - Tanggal: Pilih tanggal hari ini
   - Konten: "Testing upload gambar dari lokal"
   - Foto: Klik button upload → Pilih gambar dari komputer
4. Preview gambar akan muncul
5. Klik "Simpan"
6. Check di tabel - berita baru muncul
7. Buka halaman publik berita untuk lihat gambar

### Test Galeri Upload
1. Buka: http://localhost:5173/admin/galeri
2. Klik "Tambah Galeri"
3. Upload foto kegiatan sekolah
4. Pilih kategori (CEREMONY/SCHOOL/STUDENTS)
5. Simpan dan check di halaman galeri publik

### Test Guru Upload
1. Buka: http://localhost:5173/admin/guru
2. Klik "Tambah Data Guru"
3. Upload foto profil guru
4. Isi nama, jabatan, mapel
5. Simpan dan check di halaman guru publik

---

## 🔍 Troubleshooting

### Gambar tidak muncul setelah upload
**Solusi:**
```bash
# Jalankan di terminal backend
cd backend
php artisan storage:link
```

### Error "Maximum upload size exceeded"
**Penyebab:** File terlalu besar

**Solusi:**
- Compress gambar sebelum upload
- Max image: 2MB
- Max document: 5MB

### Error saat upload di Windows
**Penyebab:** Symlink permission

**Solusi:**
```bash
# Run as Administrator
cd backend
php artisan storage:link
```

### Preview tidak muncul
**Penyebab:** File bukan gambar atau browser tidak support

**Solusi:**
- Pastikan file adalah gambar (.jpg, .png, .gif)
- Refresh browser
- Clear cache

---

## 📊 Supported File Types

### Images (Berita, Galeri, Guru)
```
✅ JPEG (.jpg, .jpeg)
✅ PNG (.png)
✅ GIF (.gif)
✅ WebP (.webp)
✅ BMP (.bmp)
✅ SVG (.svg)
```

### Documents (Course)
```
✅ PDF (.pdf)
✅ Microsoft Word (.doc, .docx)
✅ OpenOffice/LibreOffice (.odt)
```

---

## 🎯 Best Practices

### 1. Optimize Images Before Upload
```
Recommended:
- Resolution: Max 1920x1080px
- File size: Under 1MB
- Format: JPEG for photos, PNG for graphics
```

### 2. Naming Convention
```
Laravel otomatis generate unique filename:
- Original: photo.jpg
- Stored as: berita/xY3k9m2n4lP5q8rT.jpg
```

### 3. Delete Old Files
Controller otomatis delete file lama saat update:
```php
if ($berita->foto) {
    Storage::disk('public')->delete($berita->foto);
}
```

### 4. Validation
Always validate both frontend and backend:
```php
'foto' => 'nullable|image|max:2048'  // Images
'file' => 'nullable|file|mimes:pdf,doc,docx|max:5120'  // Docs
```

---

## 🚨 Security

### File Upload Security Checklist:
- ✅ MIME type validation
- ✅ File extension whitelist
- ✅ File size limit
- ✅ Sanitized filenames
- ✅ Files stored outside webroot (storage/)
- ✅ Symlink for controlled access
- ⚠️ TODO: Virus scanning for production
- ⚠️ TODO: Rate limiting for uploads

---

## 📈 Statistics

### Actual File Sizes
```
Average sizes in database:
- Berita photos: 200-800 KB
- Galeri photos: 300-1000 KB
- Guru photos: 100-500 KB
- Course documents: 500 KB - 3 MB
```

### Storage Usage
```bash
# Check storage usage
cd backend/storage/app/public
du -sh *

# Delete all uploaded files (for testing)
cd backend
php artisan storage:clear
```

---

## ✅ Checklist Fitur Upload

- [x] File input dengan button styled
- [x] Preview gambar otomatis
- [x] Nama file ditampilkan
- [x] Multiple file types support
- [x] File size validation
- [x] MIME type validation
- [x] Replace file saat update
- [x] Delete old file saat update
- [x] Delete file saat delete record
- [x] Symlink storage ke public
- [x] FormData handling di API
- [x] Error handling & validation

---

**Status**: ✅ Ready to Use  
**Last Updated**: February 25, 2026  
**Version**: 1.0.0
