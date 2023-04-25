'use strict';

const { generatePayload, handleDeliveryMessage, handlePickupMessage } = require('./handler');

describe('Testing vendor events', () => {
  test('Testing that vendor is generating payload', () => {
    let payload = generatePayload();

    expect(payload.store).toBeTruthy();
    expect(payload.orderId).toBeTruthy();
    expect(payload.customer).toBeTruthy();
    expect(payload.address).toBeTruthy();
  });

  test('Testing that vendor is able to listen for events', () => {
    let payload = generatePayload();
    console.log = jest.fn();

    handlePickupMessage(payload);
    expect(console.log).toHaveBeenCalledWith(`DRIVER: picked up ${payload.orderId}, ${payload.customer}`);

    handleDeliveryMessage(payload);
    expect(console.log).toHaveBeenCalledWith(`Thank you for your order, ${payload.customer}`);
  });
});