<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ucapan;
use Illuminate\Http\Request;
use App\Traits\ImageCompressionTrait;

class UcapanController extends Controller
{
    use ImageCompressionTrait;

    // Admin listing
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 50);
        $ucapan = Ucapan::orderBy('created_at', 'desc')->paginate($perPage);
        return response()->json($ucapan);
    }

    // Public listing - only active and within date range (if set)
    public function publicIndex(Request $request)
    {
        $now = now()->toDateString();

        $query = Ucapan::where('is_active', true)
            ->where(function ($q) use ($now) {
                $q->whereNull('start_date')->orWhere('start_date', '<=', $now);
            })
            ->where(function ($q) use ($now) {
                $q->whereNull('end_date')->orWhere('end_date', '>=', $now);
            })
            ->orderBy('created_at', 'desc');

        // Return all active items (could be one or more); frontend will pick first
        $data = $query->get();
        return response()->json(['data' => $data]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'caption' => 'nullable|string',
            'tanggal' => 'nullable|date',
            'foto' => 'required|image|max:5120',
            'is_active' => 'sometimes|boolean',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
        ]);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $this->uploadCompressedImage(
                $request->file('foto'),
                'ucapan',
                1920,
                85
            );
        }

        $ucapan = Ucapan::create($validated);

        return response()->json([
            'message' => 'Ucapan berhasil ditambahkan',
            'data' => $ucapan
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $ucapan = Ucapan::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'caption' => 'nullable|string',
            'tanggal' => 'nullable|date',
            'foto' => 'nullable|image|max:5120',
            'is_active' => 'sometimes|boolean',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
        ]);

        if ($request->hasFile('foto')) {
            if ($ucapan->foto) {
                $this->deleteImage($ucapan->foto);
            }
            $validated['foto'] = $this->uploadCompressedImage(
                $request->file('foto'),
                'ucapan',
                1920,
                85
            );
        }

        $ucapan->update($validated);

        return response()->json([
            'message' => 'Ucapan berhasil diupdate',
            'data' => $ucapan
        ]);
    }

    public function destroy($id)
    {
        $ucapan = Ucapan::findOrFail($id);
        if ($ucapan->foto) {
            $this->deleteImage($ucapan->foto);
        }
        $ucapan->delete();

        return response()->json(['message' => 'Ucapan berhasil dihapus']);
    }
}
