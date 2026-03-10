<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Galeri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Traits\ImageCompressionTrait;

class GaleriController extends Controller
{
    use ImageCompressionTrait;

    /**
     * Display a listing of galeri (public endpoint)
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 12);
        
        $galeri = Galeri::select(['id', 'judul', 'kategori', 'foto', 'caption', 'tanggal', 'created_at'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
        
        return response()->json($galeri);
    }

    /**
     * Display the specified galeri (public endpoint)
     */
    public function show($id)
    {
        $galeri = Galeri::findOrFail($id);
        return response()->json(['data' => $galeri]);
    }

    /**
     * Store a newly created galeri (admin endpoint)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|string|max:255',
            'caption' => 'nullable|string',
            'tanggal' => 'nullable|date',
            'foto' => 'required|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $this->uploadCompressedImage(
                $request->file('foto'), 
                'galeri', 
                1920, 
                85
            );
        }

        $galeri = Galeri::create($validated);

        return response()->json([
            'message' => 'Galeri berhasil ditambahkan',
            'data' => $galeri
        ], 201);
    }

    /**
     * Update the specified galeri (admin endpoint)
     */
    public function update(Request $request, $id)
    {
        $galeri = Galeri::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'kategori' => 'sometimes|required|string|max:255',
            'caption' => 'nullable|string',
            'tanggal' => 'nullable|date',
            'foto' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            // Delete old image
            if ($galeri->foto) {
                $this->deleteImage($galeri->foto);
            }

            $validated['foto'] = $this->uploadCompressedImage(
                $request->file('foto'), 
                'galeri', 
                1920, 
                85
            );
        }

        $galeri->update($validated);

        return response()->json([
            'message' => 'Galeri berhasil diupdate',
            'data' => $galeri
        ]);
    }

    /**
     * Remove the specified galeri (admin endpoint)
     */
    public function destroy($id)
    {
        $galeri = Galeri::findOrFail($id);

        // Delete image file
        if ($galeri->foto) {
            $this->deleteImage($galeri->foto);
        }

        $galeri->delete();

        return response()->json([
            'message' => 'Galeri berhasil dihapus'
        ]);
    }
}
