'use strict';

function handlePickup(payload) {
  console.log(`Picked up ${payload.orderId}`);
}

function handleDelivery(payload) {
  console.log(`Delivered ${payload.orderId}`);
}

module.exports = {
  handlePickup,
  handleDelivery,
};