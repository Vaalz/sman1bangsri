<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiswaPtn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;
use App\Traits\ImageCompressionTrait;
use Throwable;

class SiswaPtnController extends Controller
{
    use ImageCompressionTrait;
    
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 15);

        try {
            if (!Schema::hasTable('siswa_ptn')) {
                return response()->json([
                    'data' => [],
                    'current_page' => 1,
                    'last_page' => 1,
                    'per_page' => (int) $perPage,
                    'total' => 0,
                ]);
            }

            $preferredColumns = ['id', 'nama_siswa', 'foto_siswa', 'kelas', 'nama_ptn', 'logo_ptn', 'jurusan', 'created_at'];
            $availableColumns = array_values(array_filter($preferredColumns, fn ($column) => Schema::hasColumn('siswa_ptn', $column)));

            if (empty($availableColumns)) {
                return response()->json([
                    'data' => [],
                    'current_page' => 1,
                    'last_page' => 1,
                    'per_page' => (int) $perPage,
                    'total' => 0,
                ]);
            }

            $query = SiswaPtn::select($availableColumns);

            if (in_array('created_at', $availableColumns, true)) {
                $query->orderBy('created_at', 'desc');
            } elseif (in_array('id', $availableColumns, true)) {
                $query->orderBy('id', 'desc');
            }

            return response()->json($query->paginate($perPage));
        } catch (Throwable $e) {
            return response()->json([
                'data' => [],
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => (int) $perPage,
                'total' => 0,
            ]);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_siswa' => 'required|string|max:255',
            'foto_siswa' => 'nullable|image|max:2048',
            'kelas' => 'required|string|max:50',
            'nama_ptn' => 'required|string|max:255',
            'logo_ptn' => 'nullable|image|max:2048',
            'jurusan' => 'required|string|max:255',
        ]);

        if ($request->hasFile('foto_siswa')) {
            $validated['foto_siswa'] = $this->uploadCompressedImage($request->file('foto_siswa'), 'siswa-ptn', 800, 85);
        }

        if ($request->hasFile('logo_ptn')) {
            $validated['logo_ptn'] = $this->uploadLogoWithTransparency($request->file('logo_ptn'), 'siswa-ptn/logo', 400);
        }

        $siswaPtn = SiswaPtn::create($validated);
        return response()->json(['data' => $siswaPtn], 201);
    }

    public function show($id)
    {
        $siswaPtn = SiswaPtn::findOrFail($id);
        return response()->json(['data' => $siswaPtn]);
    }

    public function update(Request $request, $id)
    {
        $siswaPtn = SiswaPtn::findOrFail($id);

        $validated = $request->validate([
            'nama_siswa' => 'sometimes|required|string|max:255',
            'foto_siswa' => 'nullable|image|max:2048',
            'kelas' => 'sometimes|required|string|max:50',
            'nama_ptn' => 'sometimes|required|string|max:255',
            'logo_ptn' => 'nullable|image|max:2048',
            'jurusan' => 'sometimes|required|string|max:255',
        ]);

        if ($request->hasFile('foto_siswa')) {
            $this->deleteImage($siswaPtn->foto_siswa);
            $validated['foto_siswa'] = $this->uploadCompressedImage($request->file('foto_siswa'), 'siswa-ptn', 800, 85);
        }

        if ($request->hasFile('logo_ptn')) {
            $this->deleteImage($siswaPtn->logo_ptn);
            $validated['logo_ptn'] = $this->uploadLogoWithTransparency($request->file('logo_ptn'), 'siswa-ptn/logo', 400);
        }

        $siswaPtn->update($validated);
        return response()->json(['data' => $siswaPtn]);
    }

    public function destroy($id)
    {
        $siswaPtn = SiswaPtn::findOrFail($id);
        
        $this->deleteImage($siswaPtn->foto_siswa);
        $this->deleteImage($siswaPtn->logo_ptn);
        
        $siswaPtn->delete();
        return response()->json(['message' => 'Data siswa PTN berhasil dihapus']);
    }
}
