<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use App\Traits\ImageCompressionTrait;

class BeritaController extends Controller
{
    use ImageCompressionTrait;
    public function index(Request $request)
    {
        // Check if pagination is requested
        $perPage = $request->get('per_page', 10);
        
        // Cache key based on pagination
        $cacheKey = "berita_list_page_{$perPage}_" . request('page', 1);
        
        // Cache response for 5 minutes (300 seconds)
        $berita = Cache::remember($cacheKey, 300, function () use ($perPage) {
            return Berita::select(['id', 'judul', 'kategori', 'penulis', 'foto', 'slug', 'tanggal', 'created_at'])
                ->orderBy('tanggal', 'desc')
                ->paginate($perPage);
        });
            
        return response()->json($berita);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'nullable|string',
            'penulis' => 'required|string',
            'konten' => 'required|string',
            'foto' => 'nullable|image|max:2048',
            'tanggal' => 'required|date',
        ]);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $this->uploadCompressedImage($request->file('foto'), 'berita', 1920, 80);
        }

        $berita = Berita::create($validated);
        
        // Clear cache after creating new berita
        Cache::flush();
        
        return response()->json(['data' => $berita], 201);
    }

    public function show($slugOrId)
    {
        $berita = Berita::where('slug', $slugOrId)->orWhere('id', $slugOrId)->firstOrFail();
        return response()->json(['data' => $berita]);
    }

    public function update(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'kategori' => 'sometimes|nullable|string',
            'penulis' => 'sometimes|required|string',
            'konten' => 'sometimes|required|string',
            'foto' => 'nullable|image|max:2048',
            'tanggal' => 'sometimes|required|date',
        ]);

        if ($request->hasFile('foto')) {
            $this->deleteImage($berita->foto);
            $validated['foto'] = $this->uploadCompressedImage($request->file('foto'), 'berita', 1920, 80);
        }

        $berita->update($validated);
        
        // Clear cache after updating berita
        Cache::flush();
        
        return response()->json(['data' => $berita]);
    }

    public function destroy($id)
    {
        $berita = Berita::findOrFail($id);
        
        $this->deleteImage($berita->foto);
        
        $berita->delete();
        
        // Clear cache after deleting berita
        Cache::flush();
        
        return response()->json(['message' => 'Berita deleted successfully']);
    }
}
