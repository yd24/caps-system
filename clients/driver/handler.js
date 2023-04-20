'use strict';

const eventPool = require('../../eventPool');

//listening for pickup event
function startListeners(driverSocket) {
  driverSocket.on(eventPool[0], (payload) => {
    driverSocket.emit(eventPool[3], payload);
    //trigger in-transit
    console.log(`Picked up ${payload.orderId}`);
    driverSocket.emit(eventPool[1], payload);
  
    //trigger delivered
    console.log(`Delivered ${payload.orderId}`);
    driverSocket.emit(eventPool[2], payload);
  });
}

module.exports = startListeners;