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
    public function index(Request $request)
    {
        // Check if pagination is requested
        $perPage = $request->get('per_page', 12);
        
        $galeri = Galeri::select(['id', 'judul', 'kategori', 'foto', 'created_at'])
            ->latest()
            ->paginate($perPage);
            
        return response()->json($galeri);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|in:CEREMONY,SCHOOL,STUDENTS',
            'foto' => 'required|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $this->uploadCompressedImage($request->file('foto'), 'galeri', 1920, 85);
        }

        $galeri = Galeri::create($validated);
        return response()->json(['data' => $galeri], 201);
    }

    public function show($id)
    {
        $galeri = Galeri::findOrFail($id);
        return response()->json(['data' => $galeri]);
    }

    public function update(Request $request, $id)
    {
        $galeri = Galeri::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'kategori' => 'sometimes|required|in:CEREMONY,SCHOOL,STUDENTS',
            'foto' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $this->deleteImage($galeri->foto);
            $validated['foto'] = $this->uploadCompressedImage($request->file('foto'), 'galeri', 1920, 85);
        }

        $galeri->update($validated);
        return response()->json(['data' => $galeri]);
    }

    public function destroy($id)
    {
        $galeri = Galeri::findOrFail($id);
        
        $this->deleteImage($galeri->foto);
        
        $galeri->delete();
        return response()->json(['message' => 'Galeri deleted successfully']);
    }
}
