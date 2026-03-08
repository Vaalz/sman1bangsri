<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StrukturEkstrakurikuler extends Model
{
    use HasFactory;

    protected $table = 'struktur_ekstrakurikuler';

    protected $fillable = [
        'ekstrakurikuler_id',
        'nama',
        'jabatan',
        'kelas',
        'foto',
        'urutan',
    ];

    /**
     * Get the ekstrakurikuler that owns the struktur.
     */
    public function ekstrakurikuler()
    {
        return $this->belongsTo(Ekstrakurikuler::class);
    }
}
