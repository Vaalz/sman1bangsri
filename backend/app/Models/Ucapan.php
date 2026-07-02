<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ucapan extends Model
{
    use HasFactory;

    protected $table = 'ucapan';

    protected $fillable = [
        'judul',
        'foto',
        'caption',
        'tanggal',
        'is_active',
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'start_date' => 'date',
        'end_date' => 'date',
        'is_active' => 'boolean',
    ];
}
