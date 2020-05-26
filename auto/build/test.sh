#!/bin/bash
# @Author: Just be free
# @Date:   2019-10-29 16:54:01
# @Last Modified by:   Just be free
# @Last Modified time: 2020-03-12 10:50:37

#delete useless tags
# ./clean-tags.sh

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
function bye {
  read -p "Press Enter to exit...:" cu
  echo "$cu I don't wanna see you no more, Bye"
  sleep 2s
  exit 0
}
# if [ "`gitName`" != "just be free" ]; then
#   echo -e "\033[32;49;1mOops, looks you don't have the right to execute this shell !!\033[39;49;0m"
#   bye
# fi
tag=$(date "+%Y%m%d%H%M%S")
./temp-tag.sh "utest$tag"
currentBranch=`gitBranch`
echo "Enter the root directory of this project..."
cd ../..
echo "Transform ES6 to ES5..."
echo -e "Hello, \033[32;49;1m`gitName`\033[39;49;0m"
if [[ `getSystem` == "Darwin" ]]; then
  #statements
  sed -i "" "s/.*version.*/  version: 'The current version is test$tag from `gitBranch` branch, published by `gitName`',/" ./src/configuration/test.js
else
  sed -i "s/.*version.*/\tversion: 'The current version is test$tag from `gitBranch` branch, published by `gitName`',/" ./src/configuration/test.js
fi
echo -e "\033[32;49;1m $file  \033[39;49;0m "
npm run build:test
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
mv ./dist/* ./public
echo "Successfully moved"
git add src/configuration public/
git commit -m "Transform ES6 to ES5" --no-verify
if [ $? != 0 ]; then
  echo "something wrong with this commit"
  bye
fi
git push
if [ $? != 0 ]; then
  git push origin $currentBranch -u
fi
git tag "utest$tag" -a -m "utest$tag"
git push origin "utest$tag"
# git push origin --tags
echo "Successfully taged"
echo "##########################################"

echo -e "         \033[32;49;1mutest$tag 12025\033[39;49;0m"

echo "##########################################"

#curl -d "name=project&value=%5B12025%5Dykb_schedule_mobile.bat&name=tag&value=utest$tag&name=CPU&value=1&name=MEMORY&value=1&statusCode=303&redirectTo=.&json=%7B%22parameter%22%3A+%5B%7B%22name%22%3A+%22project%22%2C+%22value%22%3A+%22%5B12025%5Dykb_schedule_mobile.bat%22%7D%2C+%7B%22name%22%3A+%22tag%22%2C+%22value%22%3A+%22utest$tag%22%7D%2C+%7B%22name%22%3A+%22CPU%22%2C+%22value%22%3A+%221%22%7D%2C+%7B%22name%22%3A+%22MEMORY%22%2C+%22value%22%3A+%221%22%7D%5D%2C+%22statusCode%22%3A+%22303%22%2C+%22redirectTo%22%3A+%22.%22%7D&Submit=Build" http://192.168.32.217:8080/view/%E4%BA%91%E5%BF%AB%E6%8A%A5kubernetes/job/%E4%BA%91%E5%BF%AB%E6%8A%A5UK8S%E9%9B%86%E6%88%90/build?delay=0sec
#echo "Publishing...just wait for a while"
bye
# exit 0
