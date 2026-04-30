<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Keuangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class KeuanganController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int) $request->get('per_page', 12);
        $search = trim((string) $request->get('search', ''));

        $query = Keuangan::select(['id', 'judul', 'tanggal', 'deskripsi', 'drive_link', 'file', 'created_at']);

        if (!empty($search)) {
            $searchTerm = '%' . mb_strtolower($search, 'UTF-8') . '%';

            $query->where(function ($q) use ($searchTerm) {
                $q->whereRaw('LOWER(judul) LIKE ?', [$searchTerm])
                    ->orWhereRaw('LOWER(deskripsi) LIKE ?', [$searchTerm])
                    ->orWhereRaw('CAST(tanggal AS CHAR) LIKE ?', [$searchTerm]);
            });
        }

        $reports = $query->orderBy('tanggal', 'desc')->orderBy('judul', 'asc')->paginate($perPage);

        return response()->json($reports);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'deskripsi' => 'nullable|string',
            'drive_link' => 'nullable|url|max:500',
            'file' => 'nullable|file|mimes:pdf|max:5120',
        ]);

        if ($request->hasFile('file')) {
            $validated['file'] = $request->file('file')->store('keuangan', 'public');
        }

        $report = Keuangan::create($validated);

        return response()->json(['data' => $report], 201);
    }

    public function show($id)
    {
        $report = Keuangan::findOrFail($id);

        return response()->json(['data' => $report]);
    }

    public function update(Request $request, $id)
    {
        $report = Keuangan::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'tanggal' => 'sometimes|required|date',
            'deskripsi' => 'nullable|string',
            'drive_link' => 'nullable|url|max:500',
            'file' => 'nullable|file|mimes:pdf|max:5120',
        ]);

        if ($request->hasFile('file')) {
            if ($report->file) {
                Storage::disk('public')->delete($report->file);
            }
            $validated['file'] = $request->file('file')->store('keuangan', 'public');
        }

        $report->update($validated);

        return response()->json(['data' => $report]);
    }

    public function destroy($id)
    {
        $report = Keuangan::findOrFail($id);

        if ($report->file) {
            Storage::disk('public')->delete($report->file);
        }

        $report->delete();

        return response()->json(['message' => 'Laporan keuangan deleted successfully']);
    }
}
