'use strict';

const driver = require('../driver');
const { emitter, pool } = require('../eventPool');

describe('Testing driver events', () => {
  test('Testing that driver triggers in-transit event', () => {
    let spyEmitter = jest.spyOn(emitter, 'emit');
    let payload = {orderId: 12};
    emitter.emit(pool[0], payload);
    expect(spyEmitter).toHaveBeenCalledWith(pool[1], expect.objectContaining({orderId: 12}));
  });

  test('Testing that driver triggers delivered event', () => {
    let spyEmitter = jest.spyOn(emitter, 'emit');
    let payload = {orderId: 15};
    emitter.emit(pool[0], payload);
    expect(spyEmitter).toHaveBeenCalledWith(pool[2], expect.objectContaining({orderId: 15}));
  });

  test('Testing that driver is listening for pickup event', () => {
    let spyConsole = jest.spyOn(global.console, 'log');
    let payload = {orderId: 123};
    emitter.emit(pool[0], payload);
    expect(spyConsole).toHaveBeenCalledWith(`DRIVER: picked up ${payload.orderId}`);
  });
});