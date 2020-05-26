#!/bin/bash
# @Author: Just be free
# @Date:   2019-10-30 09:46:11
# @Last Modified by:   Lizhuang
# @Last Modified time: 2019-10-30 09:47:02

reponsitory_name="$1"
cd $reponsitory_name;
echo " -R welcome the 【$reponsitory_name】 reponsitory, you will delete the branches, WARNNING !!! ";
echo " -R !!! WARNNING !!! ";
all_branches=`git branch -a`;
#echo $all_branches;
for br1 in $all_branches;
do
    br1_simple_name=`echo $br1 | grep '/' | cut -d '/' -f3`
    if [[ "" !=  "$br1_simple_name"
            && "HEAD" != "$br1_simple_name" 
            && "master" != "$br1_simple_name" 
            && "dev" != "$br1_simple_name"
            ]]; then
        echo " -D begin delete branch " $br1 " --->> " $br1_simple_name;
        read -p " -W Are you sure delete the branch ** $br1 (y/n)[n]: " answer
        if [[ "$answer" = "Y" || "${answer}" = "y"  ]]; then
            echo " Yes! deleting branch $br1 -> $br1_simple_name";
            git push origin --delete $br1_simple_name;
        else
            echo " Skipped!!!";
        fi;
    fi;
    
done;
echo "over";