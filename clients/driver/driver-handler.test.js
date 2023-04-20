'use strict';

const startListeners = require('./handler');
const { pool } = require('../../eventPool');


describe('Testing driver events', () => {
  test('Testing that driver is listening for pickup event', () => {
    let socket = {
      on: jest.fn(),
    };

    startListeners(socket);
    expect(socket.on).toHaveBeenCalledWith('pickup', expect.any(Function));
  });
});