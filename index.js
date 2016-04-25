var express = require('express');
var app = express();

var ejs = require('ejs');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// 環境変数からChatworkAPIアクセストークンを設定
var options = {
  token: process.env.CHATWORK_API_TOKEN,
};
app.set('options', options);

// ルーティング設定
app.get('/', function(request, response) {
  //response.send('Hello World!')
  response.render('index.ejs', {
    title: 'index',
    content: '<p>Hello, World!</p>'
  });
});
app.get('/rooms', function(request, response) {
  get_room(response, app.get('options').token);
});
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});


// ルーム一覧を取得
function get_room(response, access_token) {
  var request = require('request');
  var options = {
    url: 'https://api.chatwork.com/v1/rooms',
    method: 'GET',
    headers: { 'X-ChatWorkToken': access_token },
    timeout: 1500
  };
  request(options, function (error, res, body) {
    if (!error && res.statusCode == 200) {
      response.send(body);
    } else {
      response.send('failed');
    }
  });
};
