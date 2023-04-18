'use strict';

const Chance = require('chance');
const chance = new Chance();
const { eventPool } = require('../server');
const io = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001/caps';

const store_name = chance.company();
let vendorSocket = io(SERVER_URL);

vendorSocket.emit(eventPool[0], {
  store: store_name,
  orderId: chance.integer( {min: 10000, max: 99999} ),
  customer: chance.name(),
  address: chance.address(),
});

vendorSocket.on(eventPool[2], (payload) => {
  console.log(`Thank you for your order, ${payload.customer}`);
});