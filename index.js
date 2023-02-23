var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);

// socket
io.on('connection', function (socket) {

  // 部屋に対しテキストを送る
  socket.on('sendMessage', function (param) {
    const {text} = param;

    console.log("ALL", param)

    //　送信する。 socket.on('getMessage')で取得できる
    io.emit('getMessage', text);
  });

  /**
   * 
   * 部屋の参加と、部屋限定の送信
   * 
   */
  // 部屋に参加する
  socket.on('joinRoom', function (param) {
    // 配列可能
    const room_keys = param;
    socket.join(room_keys);
  });
  // 部屋を抜ける
  socket.on('leaveRoom', function (param) {
    // // 配列可能
    // const room_keys = param;
    // socket.leave(room_keys)

    socket.leaveAll()
  });

  // 部屋に対しテキストを送る
  socket.on('sendMessageRoom', function (param) {
    const {room_key, text} = param;

    console.log("ROOM", param)

    // 上でjoinした人だけが、 socket.on('getMessageRoom')で取得できる
    io.to(room_key).emit('getMessageRoom', text);
  });

});



// localhostを起動する
http.listen(3000, function () {
  console.log('server start @3000 port');
});


// http://localhost:3000/ で　index.htmlを表示する
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/main.html', function (req, res) {
  res.sendFile(__dirname + '/main.html');
});