Start-Sleep -Seconds 5
$nodeServer = Get-Content "..\sproutshare-client\.env"
echo $nodeServer

$content = Get-Content "..\sproutshare-client\App.js" 
$content[0] = $nodeServer;
echo $content[0]
$content | Set-Content "..\sproutshare-client\App.js"

#$content = "const nodeServer = '$cmdOutput';"# export const { newNodeServer };" 
#echo $content
#$content | Set-Content "..\sproutshare-client\NewNodeServer.js"

cd ..\sproutshare-client

npm start