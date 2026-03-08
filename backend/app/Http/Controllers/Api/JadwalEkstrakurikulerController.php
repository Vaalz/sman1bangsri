<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JadwalEkstrakurikuler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class JadwalEkstrakurikulerController extends Controller
{
    public function index(Request $request)
    {
        $ekstrakurikulerId = $request->get('ekstrakurikuler_id');
        
        $query = JadwalEkstrakurikuler::query();
        
        if ($ekstrakurikulerId) {
            $query->where('ekstrakurikuler_id', $ekstrakurikulerId);
        }
        
        $jadwal = $query->orderBy('hari', 'asc')
            ->orderBy('waktu_mulai', 'asc')
            ->get();
        
        return response()->json(['data' => $jadwal]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ekstrakurikuler_id' => 'required|exists:ekstrakurikuler,id',
            'hari' => 'required|string',
            'waktu_mulai' => 'required|date_format:H:i',
            'waktu_selesai' => 'required|date_format:H:i',
            'tempat' => 'required|string',
            'keterangan' => 'nullable|string',
        ]);

        $jadwal = JadwalEkstrakurikuler::create($validated);
        
        Cache::flush();
        
        return response()->json(['data' => $jadwal], 201);
    }

    public function show($id)
    {
        $jadwal = JadwalEkstrakurikuler::findOrFail($id);
        return response()->json(['data' => $jadwal]);
    }

    public function update(Request $request, $id)
    {
        $jadwal = JadwalEkstrakurikuler::findOrFail($id);

        $validated = $request->validate([
            'ekstrakurikuler_id' => 'sometimes|required|exists:ekstrakurikuler,id',
            'hari' => 'sometimes|required|string',
            'waktu_mulai' => 'sometimes|required|date_format:H:i',
            'waktu_selesai' => 'sometimes|required|date_format:H:i',
            'tempat' => 'sometimes|required|string',
            'keterangan' => 'nullable|string',
        ]);

        $jadwal->update($validated);
        
        Cache::flush();
        
        return response()->json(['data' => $jadwal]);
    }

    public function destroy($id)
    {
        $jadwal = JadwalEkstrakurikuler::findOrFail($id);
        $jadwal->delete();
        
        Cache::flush();
        
        return response()->json(['message' => 'Jadwal deleted successfully']);
    }
}
