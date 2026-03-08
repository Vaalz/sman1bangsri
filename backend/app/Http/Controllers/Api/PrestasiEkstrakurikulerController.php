<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PrestasiEkstrakurikuler;
use App\Traits\ImageCompressionTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class PrestasiEkstrakurikulerController extends Controller
{
    use ImageCompressionTrait;

    public function index(Request $request)
    {
        $ekstrakurikulerId = $request->get('ekstrakurikuler_id');
        
        $query = PrestasiEkstrakurikuler::query();
        
        if ($ekstrakurikulerId) {
            $query->where('ekstrakurikuler_id', $ekstrakurikulerId);
        }
        
        $prestasi = $query->orderBy('tahun', 'desc')
            ->orderBy('id', 'desc')
            ->get();
        
        return response()->json(['data' => $prestasi]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ekstrakurikuler_id' => 'required|exists:ekstrakurikuler,id',
            'nama_prestasi' => 'required|string',
            'juara' => 'nullable|string',
            'tingkat' => 'required|string',
            'tahun' => 'required|integer|min:1900|max:2100',
            'deskripsi' => 'nullable|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        // Handle foto upload
        if ($request->hasFile('foto')) {
            $validated['foto'] = $this->uploadCompressedImage($request->file('foto'), 'prestasi-ekskul');
        }

        $prestasi = PrestasiEkstrakurikuler::create($validated);
        
        Cache::flush();
        
        return response()->json(['data' => $prestasi], 201);
    }

    public function show($id)
    {
        $prestasi = PrestasiEkstrakurikuler::findOrFail($id);
        return response()->json(['data' => $prestasi]);
    }

    public function update(Request $request, $id)
    {
        $prestasi = PrestasiEkstrakurikuler::findOrFail($id);

        $validated = $request->validate([
            'ekstrakurikuler_id' => 'sometimes|required|exists:ekstrakurikuler,id',
            'nama_prestasi' => 'sometimes|required|string',
            'juara' => 'nullable|string',
            'tingkat' => 'sometimes|required|string',
            'tahun' => 'sometimes|required|integer|min:1900|max:2100',
            'deskripsi' => 'nullable|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        // Handle foto upload
        if ($request->hasFile('foto')) {
            // Delete old foto
            if ($prestasi->foto) {
                $this->deleteImage($prestasi->foto);
            }
            $validated['foto'] = $this->uploadCompressedImage($request->file('foto'), 'prestasi-ekskul');
        }

        $prestasi->update($validated);
        
        Cache::flush();
        
        return response()->json(['data' => $prestasi]);
    }

    public function destroy($id)
    {
        $prestasi = PrestasiEkstrakurikuler::findOrFail($id);
        
        // Delete foto
        if ($prestasi->foto) {
            $this->deleteImage($prestasi->foto);
        }
        
        $prestasi->delete();
        
        Cache::flush();
        
        return response()->json(['message' => 'Prestasi deleted successfully']);
    }
}
