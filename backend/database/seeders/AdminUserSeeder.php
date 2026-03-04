<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default admin user
        User::create([
            'name' => 'Admin SMANSABA',
            'email' => 'admin@smansaba.sch.id',
            'password' => Hash::make('admin123'),
            'email_verified_at' => now(),
        ]);
    }
}
