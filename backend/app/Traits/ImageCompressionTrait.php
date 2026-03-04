<?php

namespace App\Traits;

use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Storage;

trait ImageCompressionTrait
{
    /**
     * Upload and compress image
     * 
     * @param \Illuminate\Http\UploadedFile $file
     * @param string $folder - folder name in storage/app/public/
     * @param int $maxWidth - maximum width (default: 1920px)
     * @param int $quality - compression quality 0-100 (default: 80)
     * @return string - saved file path
     */
    protected function uploadCompressedImage($file, $folder, $maxWidth = 1920, $quality = 80)
    {
        // Generate unique filename
        $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $path = $folder . '/' . $filename;
        
        // Load and compress image
        $image = Image::read($file);
        
        // Resize if width exceeds max width (maintain aspect ratio)
        if ($image->width() > $maxWidth) {
            $image->scale(width: $maxWidth);
        }
        
        // Encode with compression quality
        $encoded = $image->encodeByExtension($file->getClientOriginalExtension(), quality: $quality);
        
        // Save to storage
        Storage::disk('public')->put($path, $encoded);
        
        return $path;
    }
    
    /**
     * Delete image from storage
     * 
     * @param string|null $path
     * @return void
     */
    protected function deleteImage($path)
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
