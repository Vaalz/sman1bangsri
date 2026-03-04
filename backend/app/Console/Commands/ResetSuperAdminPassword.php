<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ResetSuperAdminPassword extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'superadmin:reset-password {email} {password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset superadmin password';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $password = $this->argument('password');

        $user = User::where('email', $email)->first();

        if (!$user) {
            $this->error('User not found with email: ' . $email);
            return 1;
        }

        $user->password = Hash::make($password);
        $user->role = 'superadmin';
        $user->is_active = true;
        
        // Set username if null
        if (empty($user->username)) {
            $user->username = explode('@', $user->email)[0];
        }
        
        $user->save();

        $this->info('Password updated successfully!');
        $this->info('Email: ' . $email);
        $this->info('New Password: ' . $password);
        $this->info('Role: superadmin');

        return 0;
    }
}
