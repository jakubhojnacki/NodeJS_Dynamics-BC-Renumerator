@echo off

set FirstArgument=One
set SecondArgument=Two
set ThirdArgument=Three

node "./main.js" "%FirstArgument%" "%SecondArgument%" "%ThirdArgument%"

pause