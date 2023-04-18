'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;
const io = new Server(PORT);

const eventPool = [
  'pickup', 
  'in-transit',
  'delivered',
  'join-room',
];

const caps = io.of('/caps');

//Check if client is connected.
caps.on('connection', (socket) => {
  console.log('CLIENT HAS CONNECTED', socket.id);
  
  //connected socket is listening for join room
  socket.on(eventPool[3], (payload) => {
    socket.join(payload.store_name);
  });

  socket.on(eventPool[0], (payload) => {
    socket.broadcast.emit(eventPool[0], payload);
  });
});

module.exports = eventPool;