#!/bin/bash
# @Author: Just be free
# @Date:   2019-10-29 16:54:01
# @Last Modified by:   Lizhuang
# @Last Modified time: 2019-11-27 17:10:05
# 清除一周以前的tag
current=`date "+%Y-%m-%d %H:%M:%S"`  
timeStamp=`date -d "$current" +%s`
aweek=$((30 * 24 * 60 * 60))
diff=`expr $timeStamp - $aweek`
aweekago=`date -d @$diff "+%Y%m%d%H%M%S"`
allTages=`git tag`
for tag in $allTages;
do
   originTag=$tag
   tag=${tag//t18/}
   tag=${tag//ecs-/}
   tag=${tag//trip-/}
   tag=${tag//dev/}
   tag=${tag//utest/}
   tag=${tag//test/}
   tag=${tag//release/}
   if [ $aweekago -gt $tag ];then
    git tag -d $originTag
    git push origin ":refs/tags/$originTag"
    leftTags=`git tag -l | wc -l`
    echo "the tag $originTag was deleted, there still have $leftTags tags"
   else
    echo 'stay';
   fi;
done;

# 批量删除本地tag
# utest20191029104235
# git tag -l| awk '/^(utest|test|release)\d{4}/ {print ":" $2}' | xargs git tag -d
# 批量删除远程tag
# git show-ref --tag | awk '// {print ":" $2}' | xargs git push origin 
# echo $aweekago

sleep 5s