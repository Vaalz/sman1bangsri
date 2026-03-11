<?php
// Script untuk menampilkan informasi database lengkap
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "\n========== INFORMASI DATABASE ==========\n\n";
echo "Database: " . config('database.connections.mysql.database') . "\n";
echo "Host: " . config('database.connections.mysql.host') . "\n\n";

$tables = [
    'users' => 'Data Pengguna/Admin',
    'berita' => 'Artikel dan Berita',
    'galeri' => 'Galeri Foto',
    'guru' => 'Data Guru',
    'prestasi' => 'Prestasi Siswa',
    'ekstrakurikuler' => 'Ekstrakurikuler',
    'courses' => 'Mata Pelajaran',
    'sambutan' => 'Sambutan Kepala Sekolah',
    'tentang' => 'Tentang Sekolah',
    'siswa_ptn' => 'Siswa Diterima PTN',
    'jadwal_ekstrakurikuler' => 'Jadwal Ekstrakurikuler',
    'struktur_ekstrakurikuler' => 'Struktur Organisasi Ekskul',
    'prestasi_ekstrakurikuler' => 'Prestasi Ekstrakurikuler',
];

echo "========== JUMLAH DATA PER TABEL ==========\n\n";
printf("%-35s %-15s %s\n", "TABEL", "JUMLAH DATA", "KETERANGAN");
echo str_repeat("-", 80) . "\n";

foreach ($tables as $table => $description) {
    try {
        $count = DB::table($table)->count();
        printf("%-35s %-15s %s\n", $table, $count, $description);
    } catch (\Exception $e) {
        printf("%-35s %-15s %s\n", $table, "Error", $description);
    }
}

echo "\n========== CONTOH DATA TERBARU ==========\n\n";

// Berita terbaru
echo "--- BERITA TERBARU (5 terakhir) ---\n";
$berita = DB::table('berita')->orderBy('created_at', 'desc')->limit(5)->get(['id', 'judul', 'created_at']);
foreach ($berita as $b) {
    echo "ID: {$b->id} | {$b->judul} | {$b->created_at}\n";
}

echo "\n--- GALERI TERBARU (5 terakhir) ---\n";
$galeri = DB::table('galeri')->orderBy('created_at', 'desc')->limit(5)->get(['id', 'judul', 'created_at']);
foreach ($galeri as $g) {
    echo "ID: {$g->id} | {$g->judul} | {$g->created_at}\n";
}

echo "\n--- USERS/ADMIN ---\n";
$users = DB::table('users')->get(['id', 'name', 'email', 'role', 'created_at']);
foreach ($users as $u) {
    $role = $u->role ?? 'user';
    echo "ID: {$u->id} | {$u->name} | {$u->email} | Role: {$role}\n";
}

echo "\n========================================\n\n";
