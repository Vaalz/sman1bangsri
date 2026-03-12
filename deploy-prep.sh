#!/bin/bash
# Quick Deploy Script for Web SMANSABA

echo "🚀 Starting deployment preparation..."

# 1. Update dependencies
echo "📦 Installing backend dependencies..."
cd backend
composer install --optimize-autoloader --no-dev

# 2. Generate APP_KEY
echo "🔑 Generating APP_KEY..."
php artisan key:generate --show

echo ""
echo "✅ Backend ready for deployment!"
echo ""
echo "📝 Next steps:"
echo "1. Copy the APP_KEY above"
echo "2. Go to Railway.app and create new project"
echo "3. Add MySQL database to project"
echo "4. Set environment variables (see DEPLOYMENT_GUIDE.md)"
echo "5. Deploy backend to Railway"
echo "6. Deploy frontend to Vercel with VITE_API_URL pointing to Railway"
echo ""
echo "📚 Full guide: DEPLOYMENT_GUIDE.md"
