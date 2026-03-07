<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tentang extends Model
{
    use HasFactory;

    protected $table = 'tentang';

    protected $fillable = [
        'sejarah',
        'tentang_kami',
        'visi',
        'misi',
    ];

    // Optional: Disable timestamps if you don't need them
    // public $timestamps = true;
}
