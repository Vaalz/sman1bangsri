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
        // Check if superadmin exists
        $superadmin = User::where('email', 'valzopsional@gmail.com')->first();
        
        if (!$superadmin) {
            // Create new superadmin
            User::create([
                'name' => 'Super Admin',
                'username' => 'superadmin',
                'email' => 'valzopsional@gmail.com',
                'password' => Hash::make('superadmin123'), // Change this password after first login
                'role' => 'superadmin',
                'is_active' => true,
            ]);

            $this->command->info('SuperAdmin created successfully!');
            $this->command->info('Email: valzopsional@gmail.com');
            $this->command->info('Password: superadmin123');
        } else {
            // Update existing user to superadmin
            $superadmin->role = 'superadmin';
            $superadmin->is_active = true;
            if (empty($superadmin->password)) {
                $superadmin->password = Hash::make('superadmin123');
            }
            $superadmin->save();
            
            $this->command->info('SuperAdmin updated successfully!');
            $this->command->info('Email: valzopsional@gmail.com');
            $this->command->info('Please use your existing password or reset it.');
        }
    }
}
