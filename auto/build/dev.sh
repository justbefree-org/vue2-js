#!/bin/bash
# @Author: Just be free
# @Date:   2019-10-29 16:54:01
# @Last Modified by:   Just be free
# @Last Modified time: 2020-03-12 10:48:48
file=`cat print`
# echo -e "\e[35;40;1;5m $file  \e[0m "
function gitBranch {
  br=`git branch | grep "*"`
  echo ${br/* /}
}
function gitName {
  br=`git config user.name`
  echo ${br}
}

tag=$(date "+%Y%m%d%H%M%S")
./temp-tag.sh "dev$tag"
currentBranch=`gitBranch`
echo "Enter the root directory of this project..."
cd ../..
echo "Transform ES6 to ES5..."
echo -e "Hello, \033[32;49;1m`gitName`\033[39;49;0m"
# tag record
if [[ `getSystem` == "Darwin" ]]; then
  #statements
  sed -i "" "s/.*version.*/  version: 'The current version is dev$tag from `gitBranch` branch, published by `gitName`',/" ./src/configuration/dev.js
else
  sed -i "s/.*version.*/\tversion: 'The current version is dev$tag from `gitBranch` branch, published by `gitName`',/" ./src/configuration/dev.js
fi
echo -e "\033[32;49;1m $file  \033[39;49;0m "
npm run build:dev
echo "Successfully Transformed"
echo "Delete all files in public"
if [ -d "./public" ];then
  rm -rf ./public/*
else
  mkdir public
fi
echo "Successfully deleted"

./auto/delete-tmp-tag.sh

echo "Copy dist to public"
mv ./dist/* ./public/
echo "Successfully moved"
git add .
git commit -m "Transform ES6 to ES5" --no-verify
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