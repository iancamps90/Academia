# Script de prueba para la API de Academy

Write-Host "🧪 Probando API de Academy" -ForegroundColor Green
Write-Host ""

# Probar health check
Write-Host "1. Probando Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/health" -UseBasicParsing
    Write-Host "✅ Health Check: $($response.StatusCode)" -ForegroundColor Green
    $health = $response.Content | ConvertFrom-Json
    Write-Host "   Mensaje: $($health.message)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Health Check falló: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Probar API root
Write-Host "2. Probando API Root..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/" -UseBasicParsing
    Write-Host "✅ API Root: $($response.StatusCode)" -ForegroundColor Green
    $api = $response.Content | ConvertFrom-Json
    Write-Host "   Mensaje: $($api.message)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ API Root falló: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Probar cursos
Write-Host "3. Probando API de Cursos..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/courses" -UseBasicParsing
    Write-Host "✅ API Cursos: $($response.StatusCode)" -ForegroundColor Green
    $courses = $response.Content | ConvertFrom-Json
    Write-Host "   Cursos encontrados: $($courses.Count)" -ForegroundColor Cyan
    foreach ($course in $courses) {
        Write-Host "   📚 $($course.title) - €$($course.price)" -ForegroundColor White
    }
} catch {
    Write-Host "❌ API Cursos falló: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Respuesta: $($_.Exception.Response)" -ForegroundColor Red
}

Write-Host ""

# Probar registro
Write-Host "4. Probando Registro de Usuario..." -ForegroundColor Yellow
$testUser = @{
    name = "Usuario Test"
    email = "test@example.com"
    password = "test123"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/auth/register" -Method POST -Body $testUser -ContentType "application/json" -UseBasicParsing
    Write-Host "✅ Registro: $($response.StatusCode)" -ForegroundColor Green
    $result = $response.Content | ConvertFrom-Json
    Write-Host "   Usuario creado: $($result.user.name)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Registro falló: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 Pruebas completadas!" -ForegroundColor Green
