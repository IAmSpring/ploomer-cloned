# Setup development environment
Write-Host "🚀 Setting up development environment..." -ForegroundColor Yellow

# Create .env file if it doesn't exist
if (-not (Test-Path .env)) {
    Write-Host "📝 Creating .env file from .env.development..." -ForegroundColor Yellow
    Copy-Item .env.development .env
}

# Ensure development environment
Write-Host "🔧 Ensuring development environment..." -ForegroundColor Yellow
$env:NODE_ENV = "development"

# Clean up any existing containers and volumes
Write-Host "🧹 Cleaning up existing containers and volumes..." -ForegroundColor Yellow
docker-compose down -v

# Start the development environment
Write-Host "🐳 Starting development environment..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml up -d

Write-Host "✨ Development environment is ready!" -ForegroundColor Green
Write-Host "You can now access:"
Write-Host "- Next.js App: http://localhost:3000" -ForegroundColor Yellow
Write-Host "- FastAPI: http://localhost:8000" -ForegroundColor Yellow
Write-Host "- Streamlit: http://localhost:8501" -ForegroundColor Yellow 