'use strict';
const { generatePayload, handleOrder, handleDeliveryMessage, handlePickupMessage } = require('./handler');
const io = require('socket.io-client');
const eventPool = require('../../eventPool');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001/caps';

//Making a socket instance and sending it over to the main server
let vendorSocket = io(SERVER_URL);

const vendors = () => {
  const payload = generatePayload();

  //start listeners for in-transit/delivered
  vendorSocket.on(eventPool[1], (payload) => {
    handlePickupMessage(payload);
  });
  vendorSocket.on(eventPool[2], (payload) => {
    handleDeliveryMessage(payload);
  });
  
  handleOrder(vendorSocket, payload);
};

vendors();