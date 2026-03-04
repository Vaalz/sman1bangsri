<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ekstrakurikuler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class EkstrakurikulerController extends Controller
{
    public function index(Request $request)
    {
        // Check if pagination is requested
        $perPage = $request->get('per_page', 10);
        
        // Cache key based on pagination
        $cacheKey = "ekstrakurikuler_list_page_{$perPage}_" . request('page', 1);
        
        // Cache response for 5 minutes (300 seconds)
        $ekstrakurikuler = Cache::remember($cacheKey, 300, function () use ($perPage) {
            return Ekstrakurikuler::select(['id', 'nama', 'kategori', 'pembina', 'icon', 'slug', 'created_at'])
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
        ]);

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
        ]);

        $ekstrakurikuler->update($validated);
        
        // Clear cache after updating
        Cache::flush();
        
        return response()->json(['data' => $ekstrakurikuler]);
    }

    public function destroy($id)
    {
        $ekstrakurikuler = Ekstrakurikuler::findOrFail($id);
        $ekstrakurikuler->delete();
        
        // Clear cache after deleting
        Cache::flush();
        
        return response()->json(['message' => 'Ekstrakurikuler deleted successfully']);
    }
}
