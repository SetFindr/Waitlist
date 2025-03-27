# SetFindr Deployment Script

# Stop any existing servers on port 8000
Write-Host "Stopping any existing servers on port 8000..."
try {
    $connections = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue
    foreach ($conn in $connections) {
        Stop-Process -Id (Get-Process -Id $conn.OwningProcess).Id -Force -ErrorAction SilentlyContinue
    }
} catch {
    Write-Host "No existing servers found on port 8000."
}

# Get the local IP address
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "*" | Where-Object { $_.IPAddress -notlike "127.*" } | Select-Object -First 1).IPAddress

# Display deployment information
Write-Host "\n===== SetFindr Deployment Information ====="
Write-Host "Local URL: http://localhost:8000"
Write-Host "Network URL: http://$ipAddress`:8000"
Write-Host "\nScan this QR code with your phone to access the website:"

# Generate QR code URL for the network address
$qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://$ipAddress`:8000"
Write-Host "QR Code URL: $qrCodeUrl"
Write-Host "\nOpen this URL in your browser to view the QR code."

Write-Host "\n===== Starting Web Server ====="
Write-Host "Press Ctrl+C to stop the server\n"

# Start a simple HTTP server
$serverCode = @"
`$listener = New-Object System.Net.HttpListener
`$listener.Prefixes.Add('http://+:8000/')
try {
    `$listener.Start()
    Write-Host "Server started at http://localhost:8000/"
    Write-Host "Access from other devices at http://$ipAddress`:8000/"
    
    while (`$listener.IsListening) {
        `$context = `$listener.GetContext()
        `$requestUrl = `$context.Request.Url.LocalPath
        `$response = `$context.Response
        
        if (`$requestUrl -eq '/') {
            `$requestUrl = '/index.html'
        }
        
        `$filePath = Join-Path (Get-Location) (`$requestUrl.Substring(1))
        
        if (Test-Path `$filePath) {
            `$contentType = 'text/plain'
            if (`$filePath -match '\.html$') { `$contentType = 'text/html' }
            elseif (`$filePath -match '\.css$') { `$contentType = 'text/css' }
            elseif (`$filePath -match '\.js$') { `$contentType = 'application/javascript' }
            elseif (`$filePath -match '\.(jpg|jpeg)$') { `$contentType = 'image/jpeg' }
            elseif (`$filePath -match '\.png$') { `$contentType = 'image/png' }
            elseif (`$filePath -match '\.svg$') { `$contentType = 'image/svg+xml' }
            
            `$response.ContentType = `$contentType
            
            if (`$contentType -match '^text/' -or `$contentType -eq 'application/javascript' -or `$contentType -eq 'image/svg+xml') {
                `$content = Get-Content -Path `$filePath -Raw
                `$buffer = [System.Text.Encoding]::UTF8.GetBytes(`$content)
            } else {
                `$buffer = [System.IO.File]::ReadAllBytes(`$filePath)
            }
            
            `$response.ContentLength64 = `$buffer.Length
            `$response.OutputStream.Write(`$buffer, 0, `$buffer.Length)
        } else {
            `$response.StatusCode = 404
            `$notFoundMessage = "404 - File not found: `$requestUrl"
            `$buffer = [System.Text.Encoding]::UTF8.GetBytes(`$notFoundMessage)
            `$response.ContentLength64 = `$buffer.Length
            `$response.OutputStream.Write(`$buffer, 0, `$buffer.Length)
        }
        
        `$response.Close()
    }
} finally {
    if (`$listener -ne `$null) {
        `$listener.Stop()
        `$listener.Close()
    }
}
"@

# Run the server
PowerShell -Command $serverCode