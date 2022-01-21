@echo off

set ApplicationDirectoryPath=c:\Temp\Product_nHanced-Base
set RenumeratorDirectoryPath=c:\Development\Work\Tools\Tool_Dynamics-Renumerator

cd "%RenumeratorDirectoryPath%"
node "./src/main.mjs" "%ApplicationDirectoryPath%"

pause