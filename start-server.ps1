# PowerShell script to start the SetFindr Waitlist CRM Server
Write-Host "Starting SetFindr Waitlist CRM Server..."
Write-Host ""
Write-Host "Access the waitlist at: http://localhost:3000/waitlist.html"
Write-Host "Access the admin dashboard at: http://localhost:3000/admin.html"
Write-Host ""
Write-Host "Press Ctrl+C to stop the server"
Write-Host ""

# Check if node_modules exists, if not install dependencies
if (-not (Test-Path -Path "node_modules")) {
    Write-Host "Installing dependencies..."
    & node -e "require('child_process').execSync('npm install', {stdio: 'inherit'})"
}

# Start the server using Node directly instead of npm
& node server.js