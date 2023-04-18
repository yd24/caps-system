'use strict';

const handleDriver = require('./handler');
const { emitter, pool } = require('../../eventPool');

describe('Testing driver events', () => {
  test('Testing that driver is listening for pickup event', () => {
    let spyEmitter = jest.spyOn(emitter, 'on');
    handleDriver();
    expect(spyEmitter).toHaveBeenCalled();
  });

  test('Testing that driver triggers in-transit/delivered event', () => {
    let spyEmitter = jest.spyOn(emitter, 'emit');
    handleDriver();
    expect(spyEmitter).toHaveBeenCalledTimes(2);
  });
});