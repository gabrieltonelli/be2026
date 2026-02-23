@echo off
setlocal
echo Buscando procesos en el puerto 8001...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8001') do (
    echo Matando proceso con PID %%a...
    taskkill /F /PID %%a
)
echo.
echo Operacion completada. El puerto 8001 deberia estar libre.
pause
