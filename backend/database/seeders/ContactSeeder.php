<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contact;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Contact::create([
            'alamat' => 'Jl. Jerukwangi, Bangsri, Krajan, Jerukwangi, Kec. Jepara, Jawa Tengah, 59453',
            'telepon' => '(0291) 771186',
            'email' => 'smansaba@example.com',
            'jam_operasional' => "Senin - Jumat: 07.00 - 15.00 WIB\nSabtu: 07.00 - 12.00 WIB",
            'maps_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.1899876543!2d110.75476931477444!3d-6.513164095315428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e711e9b1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sSMA%20Negeri%201%20Bangsri!5e0!3m2!1sid!2sid!4v1234567890',
        ]);
    }
}
