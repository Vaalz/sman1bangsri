<?php

namespace App\Http\Middleware;

use App\Models\ActivityLog;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class LogAdminActivity
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $this->storeActivity($request, $response);

        return $response;
    }

    protected function storeActivity(Request $request, Response $response): void
    {
        $user = $request->user();
        if (!$user) {
            return;
        }

        if (!$request->is('api/admin/*')) {
            return;
        }

        $method = strtoupper($request->method());
        if (!in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'], true)) {
            return;
        }

        if ($response->getStatusCode() >= 400) {
            return;
        }

        $resourceSegment = (string) $request->segment(3);
        if ($resourceSegment === '') {
            return;
        }

        $action = match ($method) {
            'POST' => 'menambahkan',
            'PUT', 'PATCH' => 'memperbarui',
            'DELETE' => 'menghapus',
            default => null,
        };

        if ($action === null) {
            return;
        }

        $resourceLabels = [
            'berita' => 'berita',
            'galeri' => 'galeri',
            'guru' => 'guru',
            'prestasi' => 'prestasi',
            'ekstrakurikuler' => 'ekstrakurikuler',
            'jadwal-ekstrakurikuler' => 'jadwal ekstrakurikuler',
            'struktur-ekstrakurikuler' => 'struktur ekstrakurikuler',
            'prestasi-ekstrakurikuler' => 'prestasi ekstrakurikuler',
            'courses' => 'course',
            'sambutan' => 'sambutan',
            'tentang' => 'profil tentang',
            'contact' => 'kontak sekolah',
            'siswa-ptn' => 'siswa PTN',
        ];

        $resource = $resourceLabels[$resourceSegment] ?? Str::of($resourceSegment)->replace('-', ' ')->toString();

        ActivityLog::create([
            'user_id' => $user->id,
            'action' => $action,
            'resource' => $resource,
            'description' => sprintf('%s %s data %s', $user->name, $action, $resource),
            'ip_address' => $request->ip(),
        ]);
    }
}
