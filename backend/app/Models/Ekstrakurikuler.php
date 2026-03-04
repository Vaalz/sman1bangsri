<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Ekstrakurikuler extends Model
{
    use HasFactory;

    protected $table = 'ekstrakurikuler';

    protected $fillable = [
        'nama',
        'slug',
        'kategori',
        'deskripsi',
        'pembina',
        'icon',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($ekskul) {
            if (empty($ekskul->slug)) {
                $ekskul->slug = Str::slug($ekskul->nama);
            }
        });

        static::updating(function ($ekskul) {
            if ($ekskul->isDirty('nama')) {
                $ekskul->slug = Str::slug($ekskul->nama);
            }
        });
    }
}
