'use strict';

const Chance = require('chance');
const chance = new Chance();
const eventPool = require('../../eventPool');

function generatePayload() {
  return {
    store: chance.company(),
    orderId: chance.integer( {min: 10000, max: 99999} ),
    customer: chance.name(),
    address: chance.address(),
  };
}

function handleOrder(vendorSocket, payload) {
  vendorSocket.emit(eventPool[3], payload);
  vendorSocket.emit(eventPool[0], payload);
}

function handleDeliveryMessage(payload) {
  console.log(`Thank you for your order, ${payload.customer}`);
}

function handlePickupMessage(payload) {
  console.log(`DRIVER: picked up ${payload.orderId}, ${payload.customer}`);
}

module.exports = {
  generatePayload,
  handleOrder,
  handleDeliveryMessage,
  handlePickupMessage,
};