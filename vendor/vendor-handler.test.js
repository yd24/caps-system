'use strict';
const { emitter, pool } = require('../eventPool');

describe('Testing vendor events', () => {
  test('Testing that vendor is emitting pickup event', () => {
    let spyEmitter = jest.spyOn(emitter, 'emit');
    require('./handler');
    expect(spyEmitter).toHaveBeenCalledWith(pool[0], expect.objectContaining({test: 'test'}));
  });

  test('Testing that vendor is listening for delivered event', () => {
    let payload = {customer: 'meow'};
    let spyConsole = jest.spyOn(global.console, 'log');
    emitter.emit(pool[2], payload);
    expect(spyConsole).toHaveBeenCalledWith(`Thank you for your order, ${payload.customer}`);
  });
});