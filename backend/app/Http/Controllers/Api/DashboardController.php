<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use App\Models\Guru;
use App\Models\Prestasi;
use App\Models\Ekstrakurikuler;
use App\Models\Course;
use App\Models\Galeri;
use Illuminate\Support\Facades\Cache;

class DashboardController extends Controller
{
    public function stats()
    {
        // Cache dashboard stats for 5 minutes
        $stats = Cache::remember('dashboard_stats', 300, function () {
            return [
                'total_berita' => Berita::count(),
                'total_guru' => Guru::count(),
                'total_prestasi' => Prestasi::count(),
                'total_ekstrakurikuler' => Ekstrakurikuler::count(),
                'total_course' => Course::count(),
                'total_galeri' => Galeri::count(),
                // Prestasi by tingkat
                'prestasi_nasional' => Prestasi::where('tingkat', 'LIKE', '%Nasional%')->count(),
                'prestasi_provinsi' => Prestasi::where('tingkat', 'LIKE', '%Provinsi%')->count(),
                'prestasi_kabupaten' => Prestasi::where('tingkat', 'LIKE', '%Kabupaten%')
                    ->orWhere('tingkat', 'LIKE', '%Kota%')
                    ->count(),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
}
