@echo off
title RGB Store - Laravel Backend API
echo ========================================================
echo   Starting MySQL (XAMPP) and Laravel Backend API...
echo ========================================================
echo.

:: Check if MySQL is running
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [OK] MySQL is already running.
) else (
    echo [INFO] Starting MySQL from XAMPP...
    start "" /B "C:\xampp\mysql\bin\mysqld.exe" --defaults-file="C:\xampp\mysql\bin\my.ini" --standalone
    timeout /t 2 /nobreak >nul
)

:: Run Laravel Server
cd /d "%~dp0backend-api"
echo.
echo ========================================================
echo   Backend API is running on: http://127.0.0.1:8000
echo   - Categories API: http://127.0.0.1:8000/api/categories
echo   - Products API:   http://127.0.0.1:8000/api/products
echo ========================================================
echo.
php artisan serve --port=8000
pause
