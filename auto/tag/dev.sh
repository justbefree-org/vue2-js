#!/bin/bash
# @Author: Just be free
# @Date:   2019-10-29 16:54:01
# @Last Modified by:   Just be free
function getSystem {
  system=`uname`
  echo ${system}
}
function gitBranch {
  br=`git branch | grep "*"`
  echo ${br/* /}
}
function gitName {
  br=`git config user.name`
  echo ${br}
}

tag=$(date "+%Y%m%d%H%M%S")
currentBranch=`gitBranch`
echo "Enter the root directory of this project..."
cd ../..
echo "auto tag"
echo -e "Hello, \033[32;49;1m`gitName`\033[39;49;0m"
# tag record
if [[ `getSystem` == "Darwin" ]]; then
  #statements
  sed -i "" "s/.*version.*/  version: 'The current version is dev$tag from `gitBranch` branch, published by `gitName`',/" ./src/configuration/dev.js
else
  sed -i "s/.*version.*/\tversion: 'The current version is dev$tag from `gitBranch` branch, published by `gitName`',/" ./src/configuration/dev.js
fi

git add .
git commit -m "new tag dev$tag published by `gitName`" --no-verify
git push
if [ $? != 0 ]; then
  git push origin $currentBranch -u
fi
git tag "dev$tag" -a -m "dev$tag"
git push origin "dev$tag"
# git push origin --tags
echo "Successfully taged"
echo "##########################################"

echo -e "         \033[32;49;1mdev$tag 12025\033[39;49;0m"

echo "##########################################"
read -p "Press Enter to exit...:" cu
echo "$cu I don't wanna see you no more, Bye"
sleep 2s
exit 0
# exit 0