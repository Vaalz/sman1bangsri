<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $payload = [
            'name' => 'Super Admin',
            'password' => Hash::make('superadmin123'),
            'role' => 'superadmin',
            'is_active' => true,
        ];

        if (Schema::hasColumn('users', 'username')) {
            $payload['username'] = 'superadmin';
        }

        User::updateOrCreate(['email' => 'valzopsional@gmail.com'], $payload);

        $this->command->info('SuperAdmin reset successfully!');
        $this->command->info('Email: valzopsional@gmail.com');
        $this->command->info('Password: superadmin123');
    }
}
