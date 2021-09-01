#!/bin/bash

FirstArgument=One
SecondArgument=Two
ThirdArgument=Three

node "./main.js" "$FirstArgument" "$SecondArgument" "$ThirdArgument"

read -p "Press enter to finish"    