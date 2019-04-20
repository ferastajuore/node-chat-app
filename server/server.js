const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage , generateLocationMessage} = require('./units/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
// communicate bettween the server and clint
var io = socketIO(server);

// configure our express static middlerwar
app.use(express.static(publicPath))

// lesent to server 
  // connection To server
io.on('connection',(socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome To the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'))

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude));
  })

  // disconnect To server
  socket.on('disconnect',() => {
    console.log('Disconnect from Clint');
  })
})


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});