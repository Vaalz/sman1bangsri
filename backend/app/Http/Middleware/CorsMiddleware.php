<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    /**
     * Build allowed origins from env (comma-separated URLs).
     */
    private function getAllowedOrigins(): array
    {
        $raw = (string) env('CORS_ALLOWED_ORIGINS', 'http://localhost:5173,http://localhost:3000');

        return array_values(array_filter(array_map('trim', explode(',', $raw))));
    }

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $allowedOrigins = $this->getAllowedOrigins();
        $requestOrigin = $request->headers->get('Origin');

        $allowOrigin = in_array($requestOrigin, $allowedOrigins, true)
            ? $requestOrigin
            : ($allowedOrigins[0] ?? '*');

        if ($request->getMethod() === 'OPTIONS') {
            $response = response('', 204);
        } else {
            $response = $next($request);
        }

        $response->headers->set('Vary', 'Origin');
        $response->headers->set('Access-Control-Allow-Origin', $allowOrigin);
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
        $response->headers->set('Access-Control-Allow-Credentials', 'false');

        return $response;
    }
}
