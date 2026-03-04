<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Galeri;
use Carbon\Carbon;

class GaleriSeeder extends Seeder
{
    public function run(): void
    {
        $galeri = [
            [
                'judul' => 'Kegiatan Upacara Bendera',
                'kategori' => 'CEREMONY',
                'foto' => '',
            ],
            [
                'judul' => 'Ruang Kelas SMAN 1 BANGSRI',
                'kategori' => 'SCHOOL',
                'foto' => '',
            ],
            [
                'judul' => 'Kegiatan Ekstrakurikuler',
                'kategori' => 'STUDENTS',
                'foto' => '',
            ],
        ];

        foreach ($galeri as $item) {
            Galeri::create($item);
        }
    }
}
