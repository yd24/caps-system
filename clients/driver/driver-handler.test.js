'use strict';

const { handlePickup, handleDelivery } = require('./handler');
const { pool } = require('../../eventPool');


describe('Testing driver events', () => {
  test('Testing that driver handles pickup', () => {
    let spyConsole = jest.spyOn(console, 'log');
    handlePickup({orderId: 1234});
    expect(spyConsole).toHaveBeenCalledWith(`Picked up 1234`);
  });

  test('Testing that driver handles delivery', () => {
    let spyConsole = jest.spyOn(console, 'log');
    handleDelivery({orderId:54321});
    expect(spyConsole).toHaveBeenCalledWith('Delivered 54321');
  });
});