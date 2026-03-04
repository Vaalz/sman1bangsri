<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestEmailCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:test {email?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test email configuration by sending a test email';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email') ?? config('mail.from.address');
        
        $this->info('Testing email configuration...');
        $this->info('Sending to: ' . $email);
        $this->newLine();
        
        try {
            Mail::raw('This is a test email from SMAN 1 BANGSRI system. Email configuration is working correctly!', function ($message) use ($email) {
                $message->to($email)
                        ->subject('Test Email - SMAN 1 BANGSRI');
            });
            
            $this->newLine();
            $this->info('✅ Email sent successfully!');
            $this->info('Please check your inbox at: ' . $email);
            $this->info('If you don\'t see the email, check your spam folder.');
            $this->newLine();
            $this->info('Email Configuration:');
            $this->table(
                ['Setting', 'Value'],
                [
                    ['MAIL_MAILER', config('mail.default')],
                    ['MAIL_HOST', config('mail.mailers.smtp.host')],
                    ['MAIL_PORT', config('mail.mailers.smtp.port')],
                    ['MAIL_USERNAME', config('mail.mailers.smtp.username')],
                    ['MAIL_FROM', config('mail.from.address')],
                    ['MAIL_ENCRYPTION', config('mail.mailers.smtp.encryption')],
                ]
            );
            
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->newLine();
            $this->error('❌ Failed to send email!');
            $this->error('Error: ' . $e->getMessage());
            $this->newLine();
            $this->warn('Common issues:');
            $this->warn('1. Wrong MAIL_USERNAME or MAIL_PASSWORD in .env');
            $this->warn('2. Gmail App Password not generated (need 2FA enabled)');
            $this->warn('3. Internet connection issue');
            $this->warn('4. Firewall blocking SMTP port');
            $this->newLine();
            $this->info('Check logs at: storage/logs/laravel.log');
            
            return Command::FAILURE;
        }
    }
}
