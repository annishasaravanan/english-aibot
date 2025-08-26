@echo off
echo Starting EnglishAI Chat Development Environment...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm start"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend Development Server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo ✅ Both servers are starting!
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:4028
echo.
echo Press any key to close this window...
pause > nul