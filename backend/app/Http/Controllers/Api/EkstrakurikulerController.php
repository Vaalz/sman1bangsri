<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ekstrakurikuler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Traits\ImageCompressionTrait;

class EkstrakurikulerController extends Controller
{
    use ImageCompressionTrait;
    
    public function index(Request $request)
    {
        // Check if pagination is requested
        $perPage = $request->get('per_page', 10);
        
        // Cache key based on pagination
        $cacheKey = "ekstrakurikuler_list_page_{$perPage}_" . request('page', 1);
        
        // Cache response for 5 minutes (300 seconds)
        $ekstrakurikuler = Cache::remember($cacheKey, 300, function () use ($perPage) {
            return Ekstrakurikuler::select(['id', 'nama', 'kategori', 'pembina', 'deskripsi', 'logo', 'slug', 'created_at'])
                ->orderBy('nama', 'asc')
                ->paginate($perPage);
        });
            
        return response()->json($ekstrakurikuler);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kategori' => 'required|string',
            'pembina' => 'required|string',
            'deskripsi' => 'nullable|string',
            'icon' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $this->uploadCompressedImage($request->file('logo'), 'ekstrakurikuler', 800, 85);
        }

        $ekstrakurikuler = Ekstrakurikuler::create($validated);
        
        // Clear cache after creating
        Cache::flush();
        
        return response()->json(['data' => $ekstrakurikuler], 201);
    }

    public function show($slugOrId)
    {
        $ekstrakurikuler = Ekstrakurikuler::where('slug', $slugOrId)->orWhere('id', $slugOrId)->firstOrFail();
        return response()->json(['data' => $ekstrakurikuler]);
    }

    public function update(Request $request, $id)
    {
        $ekstrakurikuler = Ekstrakurikuler::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'sometimes|required|string|max:255',
            'kategori' => 'sometimes|required|string',
            'pembina' => 'sometimes|required|string',
            'deskripsi' => 'nullable|string',
            'icon' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            // Delete old logo if exists
            if ($ekstrakurikuler->logo) {
                $this->deleteImage($ekstrakurikuler->logo);
            }
            $validated['logo'] = $this->uploadCompressedImage($request->file('logo'), 'ekstrakurikuler', 800, 85);
        }

        $ekstrakurikuler->update($validated);
        
        // Clear cache after updating
        Cache::flush();
        
        return response()->json(['data' => $ekstrakurikuler]);
    }

    public function destroy($id)
    {
        $ekstrakurikuler = Ekstrakurikuler::findOrFail($id);
        
        // Delete logo if exists
        if ($ekstrakurikuler->logo) {
            $this->deleteImage($ekstrakurikuler->logo);
        }
        
        $ekstrakurikuler->delete();
        
        // Clear cache after deleting
        Cache::flush();
        
        return response()->json(['message' => 'Ekstrakurikuler deleted successfully']);
    }
}
