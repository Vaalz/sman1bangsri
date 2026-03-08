<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrestasiEkstrakurikuler extends Model
{
    use HasFactory;

    protected $table = 'prestasi_ekstrakurikuler';

    protected $fillable = [
        'ekstrakurikuler_id',
        'nama_prestasi',
        'juara',
        'tingkat',
        'tahun',
        'deskripsi',
        'foto',
    ];

    /**
     * Get the ekstrakurikuler that owns the prestasi.
     */
    public function ekstrakurikuler()
    {
        return $this->belongsTo(Ekstrakurikuler::class);
    }
}
