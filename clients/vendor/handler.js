'use strict';

const Chance = require('chance');
const chance = new Chance();
const eventPool = require('../../eventPool');
const io = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001/caps';

const store_name = chance.company();

//Making a socket instance and sending it over to the main server
let vendorSocket = io(SERVER_URL);

const payload = {
  store: store_name,
  orderId: chance.integer( {min: 10000, max: 99999} ),
  customer: chance.name(),
  address: chance.address(),
};
vendorSocket.emit(eventPool[3], payload);
vendorSocket.emit(eventPool[0], payload);

vendorSocket.on(eventPool[1], (payload) => {
  console.log(`DRIVER: picked up ${payload.orderId}, ${payload.customer}`);
});

vendorSocket.on(eventPool[2], (payload) => {
  console.log(`Thank you for your order, ${payload.customer}`);
});