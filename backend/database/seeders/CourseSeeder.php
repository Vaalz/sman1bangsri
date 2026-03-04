<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $courses = [
            [
                'judul' => 'Aljabar dan Trigonometri',
                'mapel' => 'Matematika',
                'kelas' => 'X',
                'deskripsi' => 'Materi Aljabar dan Trigonometri untuk kelas X',
                'konten' => 'Konten pembelajaran lengkap tentang Aljabar dan Trigonometri',
            ],
            [
                'judul' => 'Tata Bahasa Indonesia',
                'mapel' => 'Bahasa Indonesia',
                'kelas' => 'X',
                'deskripsi' => 'Materi Tata Bahasa Indonesia untuk kelas X',
                'konten' => 'Konten pembelajaran lengkap tentang Tata Bahasa Indonesia',
            ],
            [
                'judul' => 'Mekanika dan Hukum Newton',
                'mapel' => 'Fisika',
                'kelas' => 'X',
                'deskripsi' => 'Materi Mekanika dan Hukum Newton untuk kelas X',
                'konten' => 'Konten pembelajaran lengkap tentang Mekanika dan Hukum Newton',
            ],
        ];

        foreach ($courses as $item) {
            Course::create($item);
        }
    }
}
