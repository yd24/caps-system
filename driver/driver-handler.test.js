'use strict';

const driver = require('../driver');
const { emitter, pool } = require('../eventPool');

describe('Testing driver events', () => {
  test('Testing that driver is listening for pickup event', () => {
    let spyEmitter = jest.spyOn(emitter, 'on');
    expect(spyEmitter).toHaveBeenCalledWith(pool[0]);
  });

  test('Testing that driver triggers in-transit event', () => {
    let spyEmitter = jest.spyOn(emitter, 'emit');
    expect(spyEmitter).toHaveBeenCalledWith(pool[1]);
  });

  test('Testing that driver triggers delivered event', () => {
    let spyEmitter = jest.spyOn(emitter, 'emit');
    expect(spyEmitter).toHaveBeenCalledWith(pool[2]);
  });
});