<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Prestasi;

class PrestasiSeeder extends Seeder
{
    public function run(): void
    {
        $prestasi = [
            [
                'judul' => 'Juara 1 Olimpiade Matematika Nasional',
                'tingkat' => 'Nasional',
                'kategori' => 'Akademik',
                'tahun' => '2024',
            ],
            [
                'judul' => 'Juara 2 Lomba Karya Ilmiah Remaja',
                'tingkat' => 'Provinsi',
                'kategori' => 'Akademik',
                'tahun' => '2024',
            ],
            [
                'judul' => 'Juara 1 Sepak Bola Antar SMA',
                'tingkat' => 'Kabupaten',
                'kategori' => 'Olahraga',
                'tahun' => '2023',
            ],
        ];

        foreach ($prestasi as $item) {
            Prestasi::create($item);
        }
    }
}
