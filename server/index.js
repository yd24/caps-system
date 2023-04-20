'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;
const io = new Server(PORT);
const eventPool = require('../eventPool');
const EventQueue = require('./lib/queue');

let caps = io.of('/caps');
let eventQueue = new EventQueue();

//Check if client is connected.
caps.on('connection', (socket) => {
  console.log('CLIENT HAS CONNECTED', socket.id);
  
  //connected socket is listening for join room
  socket.on(eventPool[3], (payload) => {
    socket.join(payload.store);
    console.log(`Client ${socket.id} has joined room ${payload.store}`);
  });

  //connected socket is listening for pickup
  socket.on(eventPool[0], (payload) => {
    console.log(`${payload.store} has prepared order ${payload.orderId}`);
    let orderQueue = eventQueue.read(payload.store);
    if (orderQueue) {
      orderQueue.store(payload.orderId, payload);
    } else {
      let orderQueue = new EventQueue();
      orderQueue.store(payload.orderId, payload);
      eventQueue.store(payload.store, orderQueue);
    }
    socket.broadcast.emit(eventPool[0], payload);
  });

  //only DriverSocket emits this
  //in-transit
  socket.on(eventPool[1], (payload) => {
    let orders = eventQueue.read(payload.store);
    caps.to(payload.store).emit(eventPool[1], orders);
  });

  //only DriverSocket emits this
  //delivered
  socket.on(eventPool[2], (payload) => {
    console.log('Delivered');
    caps.to(payload.store).emit(eventPool[2], payload);
  });
});

console.log('Server has started');

module.exports = eventPool;