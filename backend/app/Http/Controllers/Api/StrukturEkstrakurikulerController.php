<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StrukturEkstrakurikuler;
use App\Traits\ImageCompressionTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class StrukturEkstrakurikulerController extends Controller
{
    use ImageCompressionTrait;

    public function index(Request $request)
    {
        $ekstrakurikulerId = $request->get('ekstrakurikuler_id');
        
        $query = StrukturEkstrakurikuler::query();
        
        if ($ekstrakurikulerId) {
            $query->where('ekstrakurikuler_id', $ekstrakurikulerId);
        }
        
        $struktur = $query->orderBy('urutan', 'asc')
            ->orderBy('id', 'asc')
            ->get();
        
        return response()->json(['data' => $struktur]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ekstrakurikuler_id' => 'required|exists:ekstrakurikuler,id',
            'nama' => 'required|string',
            'jabatan' => 'required|string',
            'kelas' => 'nullable|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'urutan' => 'nullable|integer',
        ]);

        // Handle foto upload
        if ($request->hasFile('foto')) {
            $validated['foto'] = $this->uploadCompressedImage($request->file('foto'), 'struktur-ekskul');
        }

        $struktur = StrukturEkstrakurikuler::create($validated);
        
        Cache::flush();
        
        return response()->json(['data' => $struktur], 201);
    }

    public function show($id)
    {
        $struktur = StrukturEkstrakurikuler::findOrFail($id);
        return response()->json(['data' => $struktur]);
    }

    public function update(Request $request, $id)
    {
        $struktur = StrukturEkstrakurikuler::findOrFail($id);

        $validated = $request->validate([
            'ekstrakurikuler_id' => 'sometimes|required|exists:ekstrakurikuler,id',
            'nama' => 'sometimes|required|string',
            'jabatan' => 'sometimes|required|string',
            'kelas' => 'nullable|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'urutan' => 'nullable|integer',
        ]);

        // Handle foto upload
        if ($request->hasFile('foto')) {
            // Delete old foto
            if ($struktur->foto) {
                $this->deleteImage($struktur->foto);
            }
            $validated['foto'] = $this->uploadCompressedImage($request->file('foto'), 'struktur-ekskul');
        }

        $struktur->update($validated);
        
        Cache::flush();
        
        return response()->json(['data' => $struktur]);
    }

    public function destroy($id)
    {
        $struktur = StrukturEkstrakurikuler::findOrFail($id);
        
        // Delete foto
        if ($struktur->foto) {
            $this->deleteImage($struktur->foto);
        }
        
        $struktur->delete();
        
        Cache::flush();
        
        return response()->json(['message' => 'Struktur deleted successfully']);
    }
}
