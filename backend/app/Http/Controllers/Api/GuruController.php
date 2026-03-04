<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Traits\ImageCompressionTrait;

class GuruController extends Controller
{
    use ImageCompressionTrait;
    public function index(Request $request)
    {
        // Check if pagination is requested
        $perPage = $request->get('per_page', 15);
        
        $guru = Guru::select(['id', 'nama', 'jabatan', 'mapel', 'foto', 'created_at'])
            ->orderBy('nama', 'asc')
            ->paginate($perPage);
            
        return response()->json($guru);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string',
            'mapel' => 'required|string',
            'foto' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $this->uploadCompressedImage($request->file('foto'), 'guru', 800, 85);
        }

        $guru = Guru::create($validated);
        return response()->json(['data' => $guru], 201);
    }

    public function show($id)
    {
        $guru = Guru::findOrFail($id);
        return response()->json(['data' => $guru]);
    }

    public function update(Request $request, $id)
    {
        $guru = Guru::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'sometimes|required|string|max:255',
            'jabatan' => 'sometimes|required|string',
            'mapel' => 'sometimes|required|string',
            'foto' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $this->deleteImage($guru->foto);
            $validated['foto'] = $this->uploadCompressedImage($request->file('foto'), 'guru', 800, 85);
        }

        $guru->update($validated);
        return response()->json(['data' => $guru]);
    }

    public function destroy($id)
    {
        $guru = Guru::findOrFail($id);
        
        $this->deleteImage($guru->foto);
        
        $guru->delete();
        return response()->json(['message' => 'Guru deleted successfully']);
    }
}
