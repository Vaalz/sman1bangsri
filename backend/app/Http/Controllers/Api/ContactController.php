<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ContactController extends Controller
{
    /**
     * Get the contact information (public access)
     * Returns the first (and should be only) record
     */
    public function show()
    {
        $contact = Contact::first();
        
        if (!$contact) {
            // Return empty structure if no record exists yet
            return response()->json([
                'data' => [
                    'alamat' => '',
                    'telepon' => '',
                    'email' => '',
                    'jam_operasional' => '',
                    'maps_embed_url' => '',
                ]
            ]);
        }

        return response()->json(['data' => $contact]);
    }

    /**
     * Get the contact information for admin (protected)
     */
    public function getCurrent()
    {
        $contact = Contact::first();
        
        if (!$contact) {
            // Create a default record if none exists
            $contact = Contact::create([
                'alamat' => '',
                'telepon' => '',
                'email' => '',
                'jam_operasional' => '',
                'maps_embed_url' => '',
            ]);
        }

        return response()->json(['data' => $contact]);
    }

    /**
     * Update the contact information (admin only)
     * Uses update or create pattern since there should only be one record
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'alamat' => 'required|string',
            'telepon' => 'required|string',
            'email' => 'required|email',
            'jam_operasional' => 'required|string',
            'maps_embed_url' => 'nullable|string',
        ]);

        $contact = Contact::first();
        
        if ($contact) {
            $contact->update($validated);
        } else {
            $contact = Contact::create($validated);
        }
        
        // Clear cache after updating
        Cache::flush();
        
        return response()->json([
            'message' => 'Data kontak berhasil diperbarui',
            'data' => $contact
        ], 200);
    }
}
