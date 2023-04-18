'use strict';

const vendor = require('./handler');
const { emitter, pool } = require('../../eventPool');
const Chance = require('chance');
const chance = new Chance();

describe('Testing vendor events', () => {
  const store_name = chance.company();
  test('Testing that vendor is emitting pickup event', () => {
    let spyEmitter = jest.spyOn(emitter, 'emit');
    vendor(store_name);
    expect(spyEmitter).toHaveBeenCalled();

  });

  test('Testing that vendor is listening for delivered event', () => {
    let spyEmitter = jest.spyOn(emitter, 'emit');
    let spyConsole = jest.spyOn(console, 'log');
    vendor(store_name);
    expect(spyEmitter).toHaveBeenCalled();
  });
});