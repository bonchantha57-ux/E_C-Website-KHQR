@echo off
title RGB Store - Laravel Backend API & Admin
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

:: Run Laravel Server in backend folder
if exist "%~dp0backend" (
    cd /d "%~dp0backend"
) else (
    cd /d "%~dp0backend-api"
)

echo.
echo ========================================================
echo   Laravel Server is running on: http://127.0.0.1:8000
echo   - Admin Panel:    http://127.0.0.1:8000/admin
echo   - API Categories: http://127.0.0.1:8000/api/categories
echo   - API Products:   http://127.0.0.1:8000/api/products
echo ========================================================
echo.
php artisan serve --port=8000
pause
