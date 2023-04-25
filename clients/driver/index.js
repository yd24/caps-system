'use strict';

const { trigger, subscribe } = require('../socket');
const { handlePickup, handleDelivery } = require('./handler');
const eventPool = require('../../eventPool');

trigger(eventPool[4], {store: 'Flowers Are US'});

//listening for pickup event
subscribe(eventPool[0], (payload) => {
  //join room
  trigger(eventPool[3], payload);

  //in-transit
  setTimeout(() => {
    trigger(eventPool[1], payload);
    handlePickup(payload);
  }, 2000);

  //delivered
  setTimeout(() => {
    trigger(eventPool[2], payload);
    handleDelivery(payload);
  }, 5000);
});