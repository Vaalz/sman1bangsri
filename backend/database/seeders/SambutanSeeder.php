<?php

namespace Database\Seeders;

use App\Models\Sambutan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SambutanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Sambutan::create([
            'nama' => 'Drs. Ahmad Sudrajat, M.Pd.',
            'jabatan' => 'Kepala Sekolah',
            'foto' => null,
            'sambutan' => 'Assalamu\'alaikum Warahmatullahi Wabarakatuh.

Puji syukur kita panjatkan kehadirat Allah SWT yang telah melimpahkan rahmat dan hidayah-Nya kepada kita semua. Shalawat serta salam semoga senantiasa tercurahkan kepada Nabi Muhammad SAW, keluarga, sahabat, dan pengikutnya hingga akhir zaman.

Selamat datang di website resmi SMA Negeri 1 Bangsri. Website ini kami hadirkan sebagai media informasi dan komunikasi untuk seluruh warga sekolah, orang tua siswa, alumni, dan masyarakat umum. Melalui website ini, kami berharap dapat memberikan informasi terkini mengenai berbagai kegiatan, prestasi, dan program-program yang ada di SMA Negeri 1 Bangsri.

SMA Negeri 1 Bangsri sebagai salah satu lembaga pendidikan menengah atas di Kabupaten Jepara, senantiasa berupaya memberikan pendidikan terbaik bagi peserta didik. Kami berkomitmen untuk mencetak generasi yang tidak hanya unggul dalam prestasi akademik, tetapi juga memiliki karakter yang baik, berakhlak mulia, dan siap menghadapi tantangan masa depan.

Kami mengucapkan terima kasih kepada seluruh pihak yang telah mendukung kemajuan SMA Negeri 1 Bangsri. Mari kita bersama-sama terus berkarya dan berinovasi untuk mewujudkan pendidikan yang berkualitas.

Wassalamu\'alaikum Warahmatullahi Wabarakatuh.',
        ]);
    }
}
