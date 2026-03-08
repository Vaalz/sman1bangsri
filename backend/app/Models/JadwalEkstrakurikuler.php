<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JadwalEkstrakurikuler extends Model
{
    use HasFactory;

    protected $table = 'jadwal_ekstrakurikuler';

    protected $fillable = [
        'ekstrakurikuler_id',
        'hari',
        'waktu_mulai',
        'waktu_selesai',
        'tempat',
        'keterangan',
    ];

    /**
     * Get the ekstrakurikuler that owns the jadwal.
     */
    public function ekstrakurikuler()
    {
        return $this->belongsTo(Ekstrakurikuler::class);
    }
}
