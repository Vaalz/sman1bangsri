# Laravel Optimization Commands

Jalankan commands berikut untuk mempercepat Laravel:

## 1. Cache Configuration
```bash
php artisan config:cache
```

## 2. Cache Routes
```bash
php artisan route:cache
```

## 3. Cache Views
```bash
php artisan view:cache
```

## 4. Optimize Autoloader (Composer)
```bash
composer install --optimize-autoloader --no-dev
```

## 5. Clear Cache (Jika Ada Masalah)
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

## 6. Buat Symbolic Link (Jika Belum)
```bash
php artisan storage:link
```

---

**Catatan**: Setelah update code di `routes` atau `config`, jalankan ulang cache command yang sesuai.
