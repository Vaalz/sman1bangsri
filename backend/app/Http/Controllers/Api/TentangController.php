<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tentang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use Throwable;

class TentangController extends Controller
{
    /**
     * Get the about content (public access)
     * Returns the first (and should be only) record
     */
    public function show()
    {
        try {
            if (!Schema::hasTable('tentang')) {
                return response()->json([
                    'data' => [
                        'sejarah' => '',
                        'tentang_kami' => '',
                        'visi' => '',
                        'misi' => '',
                    ]
                ]);
            }

            $tentang = Tentang::first();

            if (!$tentang) {
                return response()->json([
                    'data' => [
                        'sejarah' => '',
                        'tentang_kami' => '',
                        'visi' => '',
                        'misi' => '',
                    ]
                ]);
            }

            return response()->json(['data' => $tentang]);
        } catch (Throwable $e) {
            return response()->json([
                'data' => [
                    'sejarah' => '',
                    'tentang_kami' => '',
                    'visi' => '',
                    'misi' => '',
                ]
            ]);
        }
    }

    /**
     * Get the about content for admin (protected)
     */
    public function getCurrent()
    {
        $tentang = Tentang::first();
        
        if (!$tentang) {
            // Create a default record if none exists
            $tentang = Tentang::create([
                'sejarah' => '',
                'tentang_kami' => '',
                'visi' => '',
                'misi' => '',
            ]);
        }

        return response()->json(['data' => $tentang]);
    }

    /**
     * Update the about content (admin only)
     * Uses update or create pattern since there should only be one record
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'sejarah' => 'nullable|string',
            'tentang_kami' => 'nullable|string',
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
        ]);

        $tentang = Tentang::first();
        
        if ($tentang) {
            $tentang->update($validated);
        } else {
            $tentang = Tentang::create($validated);
        }
        
        // Clear cache after updating
        Cache::flush();
        
        return response()->json([
            'message' => 'Data tentang berhasil diperbarui',
            'data' => $tentang
        ], 200);
    }
}
