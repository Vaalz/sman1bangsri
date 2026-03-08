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

    /**
     * Upload logo with background removal (for white/light backgrounds)
     * Converts to PNG with transparency
     * 
     * @param \Illuminate\Http\UploadedFile $file
     * @param string $folder - folder name in storage/app/public/
     * @param int $maxWidth - maximum width (default: 400px)
     * @return string - saved file path
     */
    protected function uploadLogoWithTransparency($file, $folder, $maxWidth = 400)
    {
        // Generate unique filename with .png extension
        $filename = time() . '_' . uniqid() . '.png';
        $path = $folder . '/' . $filename;
        
        // Load image
        $image = Image::read($file);
        
        // Resize if width exceeds max width (maintain aspect ratio)
        if ($image->width() > $maxWidth) {
            $image->scale(width: $maxWidth);
        }
        
        // Try to remove white/light background and make transparent
        try {
            // Get image as GD resource for pixel manipulation
            $img = $image->core()->native();
            
            // Enable alpha blending and save alpha channel
            imagealphablending($img, false);
            imagesavealpha($img, true);
            
            $width = imagesx($img);
            $height = imagesy($img);
            
            // Sample corner pixels to determine background color
            $bgColor = imagecolorat($img, 0, 0);
            $bgRgb = imagecolorsforindex($img, $bgColor);
            
            // Define tolerance for color matching (0-100)
            $tolerance = 30;
            
            // Iterate through pixels and make similar colors transparent
            for ($x = 0; $x < $width; $x++) {
                for ($y = 0; $y < $height; $y++) {
                    $pixelColor = imagecolorat($img, $x, $y);
                    $pixelRgb = imagecolorsforindex($img, $pixelColor);
                    
                    // Calculate color difference
                    $rDiff = abs($pixelRgb['red'] - $bgRgb['red']);
                    $gDiff = abs($pixelRgb['green'] - $bgRgb['green']);
                    $bDiff = abs($pixelRgb['blue'] - $bgRgb['blue']);
                    $diff = ($rDiff + $gDiff + $bDiff) / 3;
                    
                    // If color is similar to background, make it transparent
                    if ($diff < $tolerance) {
                        $transparent = imagecolorallocatealpha($img, 0, 0, 0, 127);
                        imagesetpixel($img, $x, $y, $transparent);
                    }
                }
            }
            
            // Convert back to Intervention Image
            $image = Image::read($img);
        } catch (\Exception $e) {
            // If background removal fails, continue with original image
            \Log::warning('Background removal failed: ' . $e->getMessage());
        }
        
        // Encode as PNG with transparency
        $encoded = $image->encodeByExtension('png', quality: 90);
        
        // Save to storage
        Storage::disk('public')->put($path, $encoded);
        
        return $path;
    }
}
