'use strict';

const util = require('util');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;
const io = new Server(PORT);
const eventPool = require('../eventPool');
const MessageQueue = require('./lib/queue');

let caps = io.of('/caps');
const pickupQueue = new MessageQueue();
const deliveredQueue = new MessageQueue();

//Check if client is connected.
caps.on('connection', (socket) => {
  console.log('CLIENT HAS CONNECTED', socket.id);
  
  //clientServerSocket is listening for join room
  socket.on(eventPool[3], (payload) => {
    socket.join(payload.store);
    console.log(`Client ${socket.id} has joined room ${payload.store}`);
  });

  //clientServerSocket is listening for pickup
  socket.on(eventPool[0], (payload) => {
    console.log(`${payload.store} has prepared order ${payload.orderId}`);

    setPickup(payload);

    socket.broadcast.emit(eventPool[0], payload);
  });

  //only DriverServerSocket emits this
  //in-transit
  socket.on(eventPool[1], (payload) => {
    caps.to(payload.store).emit(eventPool[1], payload);
  });

  //only DriverServerSocket emits this
  //delivered
  socket.on(eventPool[2], (payload) => {
    // console.log('PICKUP QUEUE BEFORE REMOVE', util.inspect(pickupQueue, false, null));
    // console.log('DELIVERY QUEUE BEFORE ADD', util.inspect(deliveredQueue, false, null));
    let orders = pickupQueue.read(payload.store);
    let order = orders.remove(payload.orderId);

    setDelivered(payload, order);

    socket.broadcast.to(payload.store).emit(eventPool[2], payload);
  });

  //DriverServerSocket is listening for catch-pickup from drivers
  socket.on(eventPool[4], (payload) => {
    let orders = pickupQueue.read(payload.store);
    if (orders) {
      orders = pickupQueue.remove(payload.store);
      for (const id in orders) {
        let order = orders[id];
        socket.emit(eventPool[0], order);
        setDelivered(payload, order);
      }
    }
  });

  //VendorServerSocket is listening for catch-delivered from stores
  socket.on(eventPool[5], (payload) => {
    let deliveredOrders = deliveredQueue.read(payload.store);
    if (deliveredOrders) {
      let orders = deliveredOrders.remove(payload.store);
      for (const id in orders) {
        let order = orders[id];
        socket.emit(eventPool[2], order);
      }
    }
  });
});

function setDelivered(payload, order) {
  let storeDelivered = deliveredQueue.read(payload.store);
  if (!storeDelivered) {
    storeDelivered = new MessageQueue();
  }
  storeDelivered.store(order.orderId, order);
  deliveredQueue.store(order.store, storeDelivered);
}

function setPickup(payload) {
  let orders = pickupQueue.read(payload.store);
  if (!orders) {
    orders = new MessageQueue();
  }
  orders.store(payload.orderId, payload);
  pickupQueue.store(payload.store, orders);
}

console.log('Server has started');

module.exports = eventPool;