'use strict';

const { emitter, pool } = require('./eventPool');

const eventLog = (event) => (payload) => {
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
};

//listens for all events and logs them
pool.forEach(event => {
  emitter.on(event, eventLog(event));
});

require('./driver');
require('./vendor');
