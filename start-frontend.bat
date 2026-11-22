@echo off
title RGB Store - React Frontend
echo ========================================================
echo   Starting RGB Store React Frontend...
echo ========================================================
echo.

if exist "%~dp0frontend" (
    cd /d "%~dp0frontend"
) else (
    cd /d "%~dp0"
)

echo Frontend running on http://localhost:5173
npm run dev
pause
