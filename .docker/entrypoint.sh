#!/bin/sh

set -e

echo "🚀 Starting Laravel container..."

cd /var/www/html

# ===============================
# Wait for MySQL
# ===============================
if [ -n "$DB_HOST" ]; then
  echo "⏳ Waiting for MySQL at $DB_HOST:$DB_PORT..."

  until nc -z -v -w30 "$DB_HOST" "${DB_PORT:-3306}"
  do
    echo "Waiting for database connection..."
    sleep 3
  done

  echo "✅ Database is ready!"
fi

# ===============================
# Laravel Setup
# ===============================

echo "⚙️ Running Laravel setup..."

php artisan config:clear || true
php artisan cache:clear || true
php artisan route:clear || true
php artisan view:clear || true

# Generate app key if missing
php artisan key:generate --force || true

# Run migrations (safe for production)
echo "🚨 RUNNING MIGRATION NOW..."
php artisan migrate:fresh --force --seed

# Optimize caches
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Storage link
php artisan storage:link || true

# ===============================
# Start services
# ===============================

echo "🔥 Starting Supervisor..."

exec /usr/bin/supervisord -c /etc/supervisord.conf