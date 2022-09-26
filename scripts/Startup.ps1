invoke-expression 'cmd /c start powershell -Command .\startup\nodemon.cmd'
invoke-expression 'cmd /c start powershell -Command .\startup\lt.ps1'

Start-Sleep -Seconds 5
$ltPID = Get-Content ".\PID.txt"
taskkill /F /PID $ltPID
$cmdOutput = Get-Content ".\url.txt"
($cmdOutput).Substring( ($cmdOutput).IndexOf("http") ) | Out-File -FilePath .\url.txt
$cmdOutput = Get-Content ".\url.txt"
echo $cmdOutput

$content = Get-Content "..\sproutshare-client\App.js" 
$content[22] = "const nodeServer = '$cmdOutput';" 
echo $content[22]
$content | Set-Content "..\sproutshare-client\App.js"

Remove-Item .\url.txt
Remove-Item .\PID.txt

cd ..\sproutshare-client

npm start