<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'valzopsional@gmail.com'],
            [
                'name' => 'Super Admin',
                'username' => 'superadmin',
                'password' => Hash::make('superadmin123'),
                'role' => 'superadmin',
                'is_active' => true,
            ]
        );

        $this->command->info('SuperAdmin reset successfully!');
        $this->command->info('Email: valzopsional@gmail.com');
        $this->command->info('Password: superadmin123');
    }
}
