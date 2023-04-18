'use strict';

const vendor = require('../vendor');
const { emitter, pool } = require('../eventPool');

describe('Testing vendor events', () => {
  test('Testing that vendor is emitting pickup event', () => {
    let spyEmitter = jest.spyOn(emitter, 'on');
    expect(spyEmitter).toHaveBeenCalledWith(pool[0]);
  });

  test('Testing that vendor is listening for delivered event', () => {
    let spyEmitter = jest.spyOn(emitter, 'emit');
    expect(spyEmitter).toHaveBeenCalledWith(pool[2]);
  });
});