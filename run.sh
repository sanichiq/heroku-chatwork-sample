#! /bin/sh

API_ACCESS_TOKEN="please input Chatwork API access token"

if test $# -eq 0 || test $1 = "local"; then
    export CHATWORK_API_TOKEN=${API_ACCESS_TOKEN}
    npm start
    exit 0
elif test $1 = "heroku"; then
    heroku config:add CHATWORK_API_TOKEN=${API_ACCESS_TOKEN}
    exit 0
fi

echo "error."
exit 1
