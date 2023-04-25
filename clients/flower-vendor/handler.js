'use strict';

const Chance = require('chance');
const chance = new Chance();

function generatePayload() {
  return {
    store: 'Flowers Are US',
    orderId: chance.integer( {min: 10000, max: 99999} ),
    customer: chance.name(),
    address: chance.address(),
  };
}

function handleDeliveryMessage(payload) {
  console.log(`Thank you for your order, ${payload.customer}`);
}

function handlePickupMessage(payload) {
  console.log(`DRIVER: picked up ${payload.orderId}, ${payload.customer}`);
}

module.exports = {
  generatePayload,
  handleDeliveryMessage,
  handlePickupMessage,
};