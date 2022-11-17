$content = Get-Content "..\sproutshare-client\App.js" 
$content[0] = "const NODE_SERVER = 'http://cs411-f22-yellow.student.cs.odu.edu:3000'"
echo $content[0]
$content | Set-Content "..\sproutshare-client\App.js"


cd ..\sproutshare-client

npx expo -c