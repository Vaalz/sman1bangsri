<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prestasi extends Model
{
    use HasFactory;

    protected $table = 'prestasi';

    protected $fillable = [
        'judul',
        'nama_siswa',
        'tingkat',
        'kategori',
        'juara',
        'tahun',
    ];
}
