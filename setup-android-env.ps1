# Setup Android SDK Environment Variables
$AndroidSdkPath = "$env:LOCALAPPDATA\Android\Sdk"
$AndroidStudioPath = "C:\Program Files\Android Studio"

# Check if Android Studio is installed
$androidStudioInstalled = $false
if (Test-Path $AndroidStudioPath) {
    $androidStudioInstalled = $true
    Write-Host "Android Studio found at: $AndroidStudioPath" -ForegroundColor Green
} else {
    Write-Host "Android Studio not found in the default location." -ForegroundColor Yellow
    Write-Host "You need to install Android Studio first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://developer.android.com/studio" -ForegroundColor Cyan
    Write-Host "2. Run the installer and follow the installation wizard" -ForegroundColor Cyan
    Write-Host "3. Make sure to check 'Android SDK', 'Android SDK Platform', and 'Android Virtual Device'" -ForegroundColor Cyan
    
    $installChoice = Read-Host "Would you like to open the Android Studio download page now? (y/n)"
    if ($installChoice -eq "y") {
        Start-Process "https://developer.android.com/studio"
        Write-Host "After installing Android Studio, run this script again." -ForegroundColor Green
        exit 0
    }
}

# Check if Android SDK exists at the default location
$sdkExists = Test-Path $AndroidSdkPath
if ($sdkExists) {
    Write-Host "Android SDK found at: $AndroidSdkPath" -ForegroundColor Green
} else {
    # Check other common locations
    $alternativePaths = @(
        "C:\Android\Sdk",
        "$env:USERPROFILE\AppData\Local\Android\Sdk",
        "$env:ProgramFiles\Android\Sdk"
    )
    
    foreach ($path in $alternativePaths) {
        if (Test-Path $path) {
            $AndroidSdkPath = $path
            $sdkExists = $true
            Write-Host "Android SDK found at alternative location: $AndroidSdkPath" -ForegroundColor Green
            break
        }
    }
    
    # If still not found, prompt for SDK path
    if (-not $sdkExists) {
        Write-Host "Android SDK not found in common locations." -ForegroundColor Yellow
        if ($androidStudioInstalled) {
            Write-Host "Since Android Studio is installed, you need to install the Android SDK through Android Studio:" -ForegroundColor Yellow
            Write-Host "1. Open Android Studio" -ForegroundColor Cyan
            Write-Host "2. Go to Tools > SDK Manager" -ForegroundColor Cyan
            Write-Host "3. Install the SDK components" -ForegroundColor Cyan
            
            $openStudio = Read-Host "Would you like to open Android Studio now? (y/n)"
            if ($openStudio -eq "y") {
                Start-Process "$AndroidStudioPath\bin\studio64.exe"
                Write-Host "After installing the SDK through Android Studio, run this script again." -ForegroundColor Green
                exit 0
            }
        }
        
        $AndroidSdkPath = Read-Host "Enter the path to your Android SDK (e.g., C:\Users\YourUsername\AppData\Local\Android\Sdk)"
        
        if (-not (Test-Path $AndroidSdkPath)) {
            Write-Host "The specified path does not exist. Please install Android SDK first." -ForegroundColor Red
            exit 1
        }
    }
}

# Set environment variables for current session
$env:ANDROID_HOME = $AndroidSdkPath
$env:PATH = "$env:PATH;$AndroidSdkPath\platform-tools;$AndroidSdkPath\tools;$AndroidSdkPath\tools\bin;$AndroidSdkPath\emulator"

# Set environment variables permanently
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", $AndroidSdkPath, [System.EnvironmentVariableTarget]::User)
$currentPath = [System.Environment]::GetEnvironmentVariable("PATH", [System.EnvironmentVariableTarget]::User)
$pathToAdd = "$AndroidSdkPath\platform-tools;$AndroidSdkPath\tools;$AndroidSdkPath\tools\bin;$AndroidSdkPath\emulator"
if (-not $currentPath.Contains($pathToAdd)) {
    [System.Environment]::SetEnvironmentVariable("PATH", "$currentPath;$pathToAdd", [System.EnvironmentVariableTarget]::User)
}

Write-Host "Android SDK environment variables have been set:" -ForegroundColor Green
Write-Host "ANDROID_HOME: $env:ANDROID_HOME" -ForegroundColor Green
Write-Host "PATH has been updated to include Android SDK tools" -ForegroundColor Green

# Check if adb is available now
$adbPath = "$AndroidSdkPath\platform-tools\adb.exe"
if (Test-Path $adbPath) {
    Write-Host "ADB found at: $adbPath" -ForegroundColor Green
} else {
    Write-Host "ADB not found. You may need to install platform-tools:" -ForegroundColor Yellow
    Write-Host "1. Open Android Studio" -ForegroundColor Cyan
    Write-Host "2. Go to Tools > SDK Manager > SDK Tools tab" -ForegroundColor Cyan
    Write-Host "3. Check 'Android SDK Platform-Tools' and click Apply" -ForegroundColor Cyan
}

Write-Host "Please restart your terminal or IDE for the changes to take effect." -ForegroundColor Green
Write-Host "After restarting, you can run 'npm run android' to start your app." -ForegroundColor Green 