var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/../Client/build'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/../Client/build/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('newMessage', ({username, message})=>{
    io.emit('newMessage', {username, message});
  });

});


http.listen(port, function(){
  console.log(`listening on *:${port}`);
});