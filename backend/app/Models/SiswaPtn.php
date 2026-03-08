<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiswaPtn extends Model
{
    use HasFactory;

    protected $table = 'siswa_ptn';

    protected $fillable = [
        'nama_siswa',
        'foto_siswa',
        'kelas',
        'nama_ptn',
        'logo_ptn',
        'jurusan',
    ];
}
