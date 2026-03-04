<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prestasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PrestasiController extends Controller
{
    public function index(Request $request)
    {
        // Check if pagination is requested
        $perPage = $request->get('per_page', 10);
        
        // Cache key based on pagination
        $cacheKey = "prestasi_list_page_{$perPage}_" . request('page', 1);
        
        // Cache response for 5 minutes (300 seconds)
        $prestasi = Cache::remember($cacheKey, 300, function () use ($perPage) {
            return Prestasi::select(['id', 'judul', 'tingkat', 'kategori', 'tahun', 'created_at'])
                ->orderBy('tahun', 'desc')
                ->paginate($perPage);
        });
            
        return response()->json($prestasi);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'tingkat' => 'required|in:Kabupaten,Provinsi,Nasional',
            'kategori' => 'required|string',
            'tahun' => 'required|string',
        ]);

        $prestasi = Prestasi::create($validated);
        
        // Clear cache after creating
        Cache::flush();
        
        return response()->json(['data' => $prestasi], 201);
    }

    public function show($id)
    {
        $prestasi = Prestasi::findOrFail($id);
        return response()->json(['data' => $prestasi]);
    }

    public function update(Request $request, $id)
    {
        $prestasi = Prestasi::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'tingkat' => 'sometimes|required|in:Kabupaten,Provinsi,Nasional',
            'kategori' => 'sometimes|required|string',
            'tahun' => 'sometimes|required|string',
        ]);

        $prestasi->update($validated);
        
        // Clear cache after updating
        Cache::flush();
        
        return response()->json(['data' => $prestasi]);
    }

    public function destroy($id)
    {
        $prestasi = Prestasi::findOrFail($id);
        $prestasi->delete();
        
        // Clear cache after deleting
        Cache::flush();
        
        return response()->json(['message' => 'Prestasi deleted successfully']);
    }
}
