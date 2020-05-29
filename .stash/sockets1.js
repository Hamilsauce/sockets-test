var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/', function (req, res) {
  //res.sendfile('sockets1.css');
  res.sendfile('sockets1.html');
});

//* Socket rooms

var roomno = 1;
io.on('connection', socket => { //! Upon new connecion event, test if room contains 2 peopele and if so, create new room by incrementing roomno.
  if (io.nsps['/'].adapter.rooms["room-" + roomno] &&
    io.nsps['/'].adapter.rooms["room-" + roomno].length > 1) {
    roomno++;
  }
  socket.join("room-" + roomno);

  //Send this event to everyone in the room.
  io.sockets.in("room-" + roomno).emit('connectToRoom', "You are in room no. " + roomno);
})

//* Socket name spaces
/*
var nsp = io.of('/space1');
nsp.on('connection', function(socket) {
  console.log('someone connected');
  nsp.emit('hi', 'Hello everyone at space !');
});

*/
//* Broadcasting messages vs emitting messages
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
http.listen(3002, function () {
  console.log('listening on localhost:3002');
});