'use strict';

const { emitter, pool } = require('./eventPool');

//listens for all events and logs them
pool.forEach(event => {
  emitter.on(event, (payload) => {
    let log = {
      event: event,
      time: new Date().toISOString(),
      payload: payload,
    };
    console.log(`Event: {
      event: '${log.event}',
      time: '${log.time}',
      payload: {
        store: '${log.payload.store}',
        orderId: '${log.payload.orderId}',
        customer: '${log.payload.customer}',
        address: '${log.payload.address}',
      }
    }`);
  });
});

require('./driver');
require('./vendor');
