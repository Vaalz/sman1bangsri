<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sambutan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use App\Traits\ImageCompressionTrait;

class SambutanController extends Controller
{
    use ImageCompressionTrait;
    public function index(Request $request)
    {
        // Check if pagination is requested
        $perPage = $request->get('per_page', 10);
        
        // Exclude large 'sambutan' text field from list view
        $sambutan = Sambutan::select(['id', 'nama', 'jabatan', 'foto', 'created_at'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
            
        return response()->json($sambutan);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'foto' => 'nullable|image|max:2048',
            'sambutan' => 'required|string',
        ]);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $this->uploadCompressedImage($request->file('foto'), 'sambutan', 800, 85);
        }

        $sambutan = Sambutan::create($validated);
        
        // Clear cache after creating
        Cache::flush();
        
        return response()->json(['data' => $sambutan], 201);
    }

    public function show($id)
    {
        $sambutan = Sambutan::findOrFail($id);
        return response()->json(['data' => $sambutan]);
    }

    public function update(Request $request, $id)
    {
        $sambutan = Sambutan::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'sometimes|required|string|max:255',
            'jabatan' => 'sometimes|required|string|max:255',
            'foto' => 'nullable|image|max:2048',
            'sambutan' => 'sometimes|required|string',
        ]);

        if ($request->hasFile('foto')) {
            $this->deleteImage($sambutan->foto);
            $validated['foto'] = $this->uploadCompressedImage($request->file('foto'), 'sambutan', 800, 85);
        }

        $sambutan->update($validated);
        
        // Clear cache after updating
        Cache::flush();
        
        return response()->json(['data' => $sambutan]);
    }

    public function destroy($id)
    {
        $sambutan = Sambutan::findOrFail($id);
        
        $this->deleteImage($sambutan->foto);
        
        $sambutan->delete();
        
        // Clear cache after deleting
        Cache::flush();
        
        return response()->json(['message' => 'Sambutan deleted successfully']);
    }

    // Get current/active sambutan (first record)
    public function getCurrent()
    {
        // Cache sambutan for 5 minutes (300 seconds)
        $sambutan = Cache::remember('current_sambutan', 300, function () {
            return Sambutan::first();
        });
        
        if (!$sambutan) {
            return response()->json([
                'data' => null,
                'message' => 'Belum ada sambutan'
            ]);
        }

        return response()->json(['data' => $sambutan]);
    }
}
