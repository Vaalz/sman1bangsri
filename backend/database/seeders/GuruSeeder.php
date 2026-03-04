<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Guru;

class GuruSeeder extends Seeder
{
    public function run(): void
    {
        $guru = [
            [
                'nama' => 'Dr. Ahmad Hidayat, S.Pd., M.Pd',
                'jabatan' => 'Kepala Sekolah',
                'mapel' => '',
                'foto' => '',
            ],
            [
                'nama' => 'Siti Nurhaliza, S.Pd',
                'jabatan' => 'Guru',
                'mapel' => 'Bahasa Indonesia',
                'foto' => '',
            ],
            [
                'nama' => 'Budi Santoso, S.Pd., M.Si',
                'jabatan' => 'Guru',
                'mapel' => 'Matematika',
                'foto' => '',
            ],
        ];

        foreach ($guru as $item) {
            Guru::create($item);
        }
    }
}
