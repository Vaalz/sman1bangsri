<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SocialLink;
use Illuminate\Http\Request;

class SocialLinkController extends Controller
{
    public function index()
    {
        $links = SocialLink::query()
            ->select(['id', 'platform', 'url', 'created_at'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json(['data' => $links]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'platform' => 'required|string|max:50',
            'url' => 'required|url|max:500',
        ]);

        $link = SocialLink::create($validated);

        return response()->json(['data' => $link], 201);
    }

    public function update(Request $request, $id)
    {
        $link = SocialLink::findOrFail($id);

        $validated = $request->validate([
            'platform' => 'sometimes|required|string|max:50',
            'url' => 'sometimes|required|url|max:500',
        ]);

        $link->update($validated);

        return response()->json(['data' => $link]);
    }

    public function destroy($id)
    {
        $link = SocialLink::findOrFail($id);
        $link->delete();

        return response()->json(['message' => 'Social link deleted successfully']);
    }
}
