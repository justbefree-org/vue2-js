#!/bin/sh
# 参数$1 代表项目名称
# 参数$2 代表tag号
echo $1 $2
# curl -d "name=project&value=%5B12025%5Dykb_schedule_mobile.bat&name=tag&value=utest20190523112244&name=CPU&value=1&name=MEMORY&value=1&statusCode=303&redirectTo=.&json=%7B%22parameter%22%3A+%5B%7B%22name%22%3A+%22project%22%2C+%22value%22%3A+%22%5B12025%5Dykb_schedule_mobile.bat%22%7D%2C+%7B%22name%22%3A+%22tag%22%2C+%22value%22%3A+%22utest20190523112244%22%7D%2C+%7B%22name%22%3A+%22CPU%22%2C+%22value%22%3A+%221%22%7D%2C+%7B%22name%22%3A+%22MEMORY%22%2C+%22value%22%3A+%221%22%7D%5D%2C+%22statusCode%22%3A+%22303%22%2C+%22redirectTo%22%3A+%22.%22%7D&Submit=Build" http://192.168.32.217:8080/view/%E4%BA%91%E5%BF%AB%E6%8A%A5kubernetes/job/%E4%BA%91%E5%BF%AB%E6%8A%A5UK8S%E9%9B%86%E6%88%90/build?delay=0sec
#curl -d "name=project&value=%5B12025%5Dykb_schedule_mobile.bat&name=tag&value=$2&name=CPU&value=1&name=MEMORY&value=1&statusCode=303&redirectTo=.&json=%7B%22parameter%22%3A+%5B%7B%22name%22%3A+%22project%22%2C+%22value%22%3A+%22%5B12025%5Dykb_schedule_mobile.bat%22%7D%2C+%7B%22name%22%3A+%22tag%22%2C+%22value%22%3A+%22$2%22%7D%2C+%7B%22name%22%3A+%22CPU%22%2C+%22value%22%3A+%221%22%7D%2C+%7B%22name%22%3A+%22MEMORY%22%2C+%22value%22%3A+%221%22%7D%5D%2C+%22statusCode%22%3A+%22303%22%2C+%22redirectTo%22%3A+%22.%22%7D&Submit=Build" http://192.168.32.217:8080/view/%E4%BA%91%E5%BF%AB%E6%8A%A5kubernetes/job/%E4%BA%91%E5%BF%AB%E6%8A%A5UK8S%E9%9B%86%E6%88%90/build?delay=0sec



# http://192.168.32.217:8080/view/%E4%BA%91%E5%BF%AB%E6%8A%A5kubernetes/job/%E4%BA%91%E5%BF%AB%E6%8A%A5UK8S%E9%9B%86%E6%88%90/build?delay=0sec
# name: project
# value: [12025]ykb_schedule_mobile.bat
# name: tag
# value: utest20190523112244
# name: CPU
# value: 1
# name: MEMORY
# value: 1
# statusCode: 303
# redirectTo: .
# json: {"parameter": [{"name": "project", "value": "[12025]ykb_schedule_mobile.bat"}, {"name": "tag", "value": "utest20190523112244"}, {"name": "CPU", "value": "1"}, {"name": "MEMORY", "value": "1"}], "statusCode": "303", "redirectTo": "."}
# Submit: Build
