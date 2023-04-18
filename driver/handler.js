'use strict';

const { emitter, pool } = require('../eventPool');

//listening for pickup event
emitter.on(pool[0], (payload) => {
  //trigger in-transit
  console.log(`DRIVER: picked up ${payload.orderId}`);
  emitter.emit(pool[1], payload);

  //trigger delivered
  console.log(`DRIVER: delivered ${payload.orderId}`);
  emitter.emit(pool[2], payload);
});