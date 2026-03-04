<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ekstrakurikuler;

class EkstrakurikulerSeeder extends Seeder
{
    public function run(): void
    {
        $ekstrakurikuler = [
            [
                'nama' => 'Paskibra',
                'kategori' => 'Organisasi',
                'deskripsi' => 'Pasukan Pengibar Bendera sekolah yang bertugas dalam upacara bendera',
                'pembina' => 'Pak Budi Santoso',
                'icon' => 'EmojiEvents',
            ],
            [
                'nama' => 'Basket',
                'kategori' => 'Olahraga',
                'deskripsi' => 'Ekstrakurikuler basket untuk mengembangkan bakat dan keterampilan olahraga',
                'pembina' => 'Bu Ani Wijaya',
                'icon' => 'Sports',
            ],
            [
                'nama' => 'Robotika',
                'kategori' => 'Akademik',
                'deskripsi' => 'Belajar robotika dan programming untuk masa depan teknologi',
                'pembina' => 'Pak Dedi Kurniawan',
                'icon' => 'Science',
            ],
        ];

        foreach ($ekstrakurikuler as $item) {
            Ekstrakurikuler::create($item);
        }
    }
}
