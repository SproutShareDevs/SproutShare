#$host.UI.RawUI.WindowTitle = "zzzPowershell-Sproutshare"
$PID | Out-File -FilePath .\PID.txt
Start-Sleep -Seconds 1
#lt --port 3000 | Tee-Object -Variable cmdOutput
lt --port 3000 | Out-File -FilePath .\url.txt
#($cmdOutput).Substring( ($cmdOutput).IndexOf("http") ) | Out-File -FilePath .\url.txt
#echo $cmdOutput
exit