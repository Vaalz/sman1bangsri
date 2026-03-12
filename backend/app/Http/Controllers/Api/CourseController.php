<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        // Check if pagination is requested
        $perPage = $request->get('per_page', 10);
        $search = $request->get('search', '');
        
        // Build query with search
        $query = Course::select(['id', 'judul', 'mapel', 'kelas', 'deskripsi', 'file', 'link', 'created_at']);
        
        // Apply search filter if search term exists
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('judul', 'like', '%' . $search . '%')
                  ->orWhere('mapel', 'like', '%' . $search . '%')
                  ->orWhere('kelas', 'like', '%' . $search . '%')
                  ->orWhere('deskripsi', 'like', '%' . $search . '%');
            });
        }
        
        $courses = $query->orderBy('mapel', 'asc')->paginate($perPage);
            
        return response()->json($courses);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'mapel' => 'required|string',
            'kelas' => 'required|string',
            'deskripsi' => 'nullable|string',
            'konten' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png,gif|max:5120',
            'link' => 'nullable|url|max:500',
        ]);

        if ($request->hasFile('file')) {
            $validated['file'] = $request->file('file')->store('courses', 'public');
        }

        $course = Course::create($validated);
        return response()->json(['data' => $course], 201);
    }

    public function show($id)
    {
        $course = Course::findOrFail($id);
        return response()->json(['data' => $course]);
    }

    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'mapel' => 'sometimes|required|string',
            'kelas' => 'sometimes|required|string',
            'deskripsi' => 'nullable|string',
            'konten' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png,gif|max:5120',
            'link' => 'nullable|url|max:500',
        ]);

        if ($request->hasFile('file')) {
            if ($course->file) {
                Storage::disk('public')->delete($course->file);
            }
            $validated['file'] = $request->file('file')->store('courses', 'public');
        }

        $course->update($validated);
        return response()->json(['data' => $course]);
    }

    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        
        if ($course->file) {
            Storage::disk('public')->delete($course->file);
        }
        
        $course->delete();
        return response()->json(['message' => 'Course deleted successfully']);
    }
}
