<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Galeri;

class GaleriSeeder extends Seeder
{
    public function run()
    {
        $galeri = [
            [
                'judul' => 'Upacara Bendera',
                'kategori' => 'Kegiatan Rutin',
                'foto' => 'default-placeholder.jpg',
                'caption' => 'Upacara bendera hari Senin di halaman sekolah',
                'tanggal' => '2024-03-01',
            ],
            [
                'judul' => 'Kegiatan Ekstrakurikuler Basket',
                'kategori' => 'Ekstrakurikuler',
                'foto' => 'default-placeholder.jpg',
                'caption' => 'Latihan rutin basket setiap hari Rabu dan Jumat',
                'tanggal' => '2024-03-05',
            ],
            [
                'judul' => 'Lomba Kebersihan Kelas',
                'kategori' => 'Kompetisi',
                'foto' => 'default-placeholder.jpg',
                'caption' => 'Penilaian lomba kebersihan kelas tingkat sekolah',
                'tanggal' => '2024-03-10',
            ],
        ];

        foreach ($galeri as $item) {
            Galeri::create($item);
        }
    }
}
