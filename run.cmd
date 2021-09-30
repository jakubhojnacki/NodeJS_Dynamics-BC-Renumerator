@echo off

set ApplicationDirectoryPath=c:\Temp\Product_nHanced-Base
set RenumberatorDirectoryPath=c:\Development\Work\Tools\Tool_Dynamics-Renumberator

cd "%RenumberatorDirectoryPath%"
node "./src/main.js" "%ApplicationDirectoryPath%"

pause