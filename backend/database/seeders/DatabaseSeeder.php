<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin SMAN 1 BANGSRI',
            'username' => 'admin',
            'email' => 'valzopsional@gmail.com',
            'password' => Hash::make('admin123'),
        ]);

        // Call all seeders
        $this->call([
            BeritaSeeder::class,
            GaleriSeeder::class,
            GuruSeeder::class,
            PrestasiSeeder::class,
            EkstrakurikulerSeeder::class,
            CourseSeeder::class,
            SambutanSeeder::class,
        ]);
    }
}
