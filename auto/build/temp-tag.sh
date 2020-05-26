#!/bin/bash
# @Author: Just be free
# @Date:   2019-11-06 12:04:56
# @Last Modified by:   Lizhuang
# @Last Modified time: 2019-11-06 16:16:38

# read -p "ENTER THE TAG NAME:" a
tagName=$1
echo -ne "$tagName" > ../build/tag.tmp