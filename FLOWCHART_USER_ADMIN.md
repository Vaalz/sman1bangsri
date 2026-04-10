  # Flowchart User dan Admin

Dokumen ini merangkum alur utama pengguna publik (user) dan admin berdasarkan implementasi routing frontend React dan endpoint backend Laravel API.

## 1) Flowchart User (Publik)

```mermaid
flowchart TD
    A[User membuka website] --> B{Path yang diakses}
    B -->|/| C[Redirect ke /beranda]
    B -->|Halaman publik| D[Render halaman publik]

    C --> D

    D --> E{Pilih menu konten}
    E -->|Beranda| F[GET /api/public/stats]
    E -->|Berita| G[GET /api/public/berita]
    E -->|Detail Berita| H[GET /api/public/berita/:id]
    E -->|Galeri| I[GET /api/public/galeri]
    E -->|Guru| J[GET /api/public/guru]
    E -->|Prestasi| K[GET /api/public/prestasi]
    E -->|Ekstrakurikuler| L[GET /api/public/ekstrakurikuler]
    E -->|Detail Ekstrakurikuler| M[GET /api/public/ekstrakurikuler/:id]
    E -->|Course| N[GET /api/public/courses]
    E -->|Tentang| O[GET /api/public/tentang]
    E -->|Kontak| P[GET /api/public/contact]
    E -->|Siswa PTN| Q[GET /api/public/siswa-ptn]

    F --> R[Tampilkan data ke user]
    G --> R
    H --> R
    I --> R
    J --> R
    K --> R
    L --> R
    M --> R
    N --> R
    O --> R
    P --> R
    Q --> R

    R --> S{User lanjut jelajah?}
    S -->|Ya| E
    S -->|Tidak| T[Selesai]
```

## 2) Flowchart Admin (Admin + Superadmin)

```mermaid
flowchart TD
    A[Admin/Superadmin buka /admin atau /admin/login] --> B{Sudah punya token?}
    B -->|Tidak| C[Halaman Login Admin]
    B -->|Ya| D[ProtectedRoute lolos]

    C --> E[Input email + password]
    E --> F[POST /api/login]
    F --> G{Login valid?}
    G -->|Tidak| H[Tampilkan error login]
    H --> C
    G -->|Ya| I[Simpan token + user ke localStorage]
    I --> D

    C --> FP[Lupa password?]
    FP -->|Ya| F1[POST /api/forgot-password]
    F1 --> F2[Buka halaman reset password]
    F2 --> F3[POST /api/reset-password]
    F3 --> C

    D --> J[Masuk Admin Layout dan Dashboard]
    J --> K[GET /api/admin/dashboard/stats]

    K --> L{Pilih menu admin}
    L -->|Berita| M[CRUD /api/admin/berita]
    L -->|Galeri| N[CRUD /api/admin/galeri]
    L -->|Guru| O[CRUD /api/admin/guru]
    L -->|Prestasi| P[CRUD /api/admin/prestasi]
    L -->|Ekstrakurikuler| Q[CRUD /api/admin/ekstrakurikuler]
    L -->|Course| R[CRUD /api/admin/courses]
    L -->|Sambutan| S[CRUD /api/admin/sambutan]
    L -->|Tentang| T[GET/PUT /api/admin/tentang]
    L -->|Kontak| U[GET/PUT /api/admin/contact]
    L -->|Siswa PTN| V[CRUD /api/admin/siswa-ptn]
    L -->|Pengaturan Akun| W[POST /api/change-password atau /api/change-email]

    M --> X[Data tersimpan dan list diperbarui]
    N --> X
    O --> X
    P --> X
    Q --> X
    R --> X
    S --> X
    T --> X
    U --> X
    V --> X
    W --> X

    X --> Y{Role superadmin?}
    Y -->|Tidak| Z{Logout?}
    Y -->|Ya| SA1[Akses Manajemen Admin]

    SA1 --> SA2[GET /api/superadmin/admins]
    SA2 --> SA3{Aksi manajemen}
    SA3 -->|Tambah admin| SA4[POST /api/superadmin/admins]
    SA3 -->|Aktif/Nonaktif| SA5[PATCH /api/superadmin/admins/:id/status]
    SA3 -->|Reset password admin| SA6[POST /api/superadmin/admins/:id/reset-password]
    SA3 -->|Hapus admin| SA7[DELETE /api/superadmin/admins/:id]

    SA4 --> Z
    SA5 --> Z
    SA6 --> Z
    SA7 --> Z

    Z -->|Ya| LO[POST /api/logout]
    Z -->|Tidak| L
    LO --> END[Selesai]
```

## 3) Catatan Implementasi

- Route frontend admin dilindungi oleh komponen `ProtectedRoute` (cek token di localStorage).
- Jika token invalid/expired saat akses area admin, frontend menghapus state auth dan redirect ke `/admin/login`.
- Menu `Manajemen Admin` hanya muncul untuk role `superadmin`.
- Seluruh konten website publik dibaca dari prefix endpoint `/api/public/*`.
