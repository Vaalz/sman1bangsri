<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $columns = Schema::getColumnListing('users');

        $payload = [
            'name' => 'Super Admin',
            'password' => Hash::make('superadmin123'),
            'role' => 'superadmin',
            'is_active' => true,
        ];

        if (in_array('username', $columns, true)) {
            $payload['username'] = 'superadmin';
        }

        if (in_array('updated_at', $columns, true)) {
            $payload['updated_at'] = now();
        }

        $insertPayload = array_merge(['email' => 'valzopsional@gmail.com'], $payload);
        if (in_array('created_at', $columns, true)) {
            $insertPayload['created_at'] = now();
        }

        $safePayload = array_filter(
            $payload,
            fn ($value, $key) => in_array($key, $columns, true),
            ARRAY_FILTER_USE_BOTH
        );

        $safeInsertPayload = array_filter(
            $insertPayload,
            fn ($value, $key) => in_array($key, $columns, true),
            ARRAY_FILTER_USE_BOTH
        );

        DB::table('users')->where('email', 'valzopsional@gmail.com')->update($safePayload);

        if (!DB::table('users')->where('email', 'valzopsional@gmail.com')->exists()) {
            DB::table('users')->insert($safeInsertPayload);
        }

        $this->command->info('SuperAdmin reset successfully!');
        $this->command->info('Email: valzopsional@gmail.com');
        $this->command->info('Password: superadmin123');
    }
}
