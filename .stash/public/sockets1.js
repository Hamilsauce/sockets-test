var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('/'))

app.get('/', function(req, res) {
  res.sendfile('sockets1.html');
  //res.sendfile('index.html');
});

var nsp = io.of('/space1');
nsp.on('connection', function(socket) {
  console.log('someone connected');
  nsp.emit('hi', 'Hello everyone at space !');
});
/*
var clients = 0;
io.on('connection', function(socket) {
  clients++;
  socket.emit('newclientconnect', { description: 'Hey, welcome!' });
  socket.broadcast.emit('newclientconnect', { description: clients + ' clients connected!' })
  socket.on('disconnect', function() {
    clients--;
    socket.broadcast.emit('newclientconnect', { description: clients + ' clients connected!' })
  });
});
*/
http.listen(3001, function() {
  console.log('listening on localhost:3001');
});
