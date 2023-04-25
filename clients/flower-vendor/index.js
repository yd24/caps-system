'use strict';
const { generatePayload, handleDeliveryMessage, handlePickupMessage } = require('./handler');
const eventPool = require('../../eventPool');
const { subscribe, trigger } = require('../socket');

const payload = generatePayload();

//emit get all delivered
trigger(eventPool[5], payload);

//emit join room
trigger(eventPool[3], payload);
//emit pickup
trigger(eventPool[0], payload);

//listen for in-transit
subscribe(eventPool[1], (payload) => {
  handlePickupMessage(payload);
});

//listen for delivered
subscribe(eventPool[2], (payload) => {
  handleDeliveryMessage(payload);
});