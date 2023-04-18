'use strict';

const { eventPool } = require('../server');
const io = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001/caps';

const driverSocket = io(SERVER_URL);

//listening for pickup event
driverSocket.on(eventPool[0], (payload) => {
  driverSocket.emit(eventPool[3], payload);
  //trigger in-transit
  console.log(`DRIVER: picked up ${payload.orderId}`);
  driverSocket.to(payload.store_name).emit(eventPool[1], payload);

  //trigger delivered
  console.log(`DRIVER: delivered ${payload.orderId}`);
  driverSocket.to(payload.store_name).emit(eventPool[2], payload);
});
