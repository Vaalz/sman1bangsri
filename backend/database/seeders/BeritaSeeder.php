<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Berita;
use Carbon\Carbon;

class BeritaSeeder extends Seeder
{
    public function run(): void
    {
        $berita = [
            [
                'judul' => 'Prestasi Siswa SMAN 1 BANGSRI di Olimpiade Matematika',
                'kategori' => 'Prestasi',
                'penulis' => 'Admin SMAN 1 BANGSRI',
                'konten' => 'Siswa SMAN 1 BANGSRI berhasil meraih juara 1 dalam Olimpiade Matematika tingkat provinsi. Pencapaian luar biasa ini membuktikan dedikasi dan kerja keras siswa serta dukungan penuh dari guru pembimbing. Selamat kepada para juara!',
                'tanggal' => Carbon::parse('2024-02-20'),
            ],
            [
                'judul' => 'Kegiatan MPLS Tahun Ajaran 2024/2025',
                'kategori' => 'Kegiatan',
                'penulis' => 'Admin SMAN 1 BANGSRI',
                'konten' => 'SMAN 1 BANGSRI mengadakan Masa Pengenalan Lingkungan Sekolah (MPLS) untuk siswa baru tahun ajaran 2024/2025. Kegiatan berlangsung selama 3 hari dengan berbagai agenda pengenalan sekolah, perkenalan guru dan staf, serta tour sekolah.',
                'tanggal' => Carbon::parse('2024-02-18'),
            ],
            [
                'judul' => 'Pengumuman Libur Semester Genap',
                'kategori' => 'Pengumuman',
                'penulis' => 'Admin SMAN 1 BANGSRI',
                'konten' => 'Libur semester genap akan dimulai tanggal 15 Juni 2024 dan masuk kembali tanggal 15 Juli 2024. Diharapkan siswa menggunakan waktu libur dengan baik dan tetap belajar di rumah.',
                'tanggal' => Carbon::parse('2024-02-15'),
            ],
        ];

        foreach ($berita as $item) {
            Berita::create($item);
        }
    }
}
