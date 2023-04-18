'use strict';

const Chance = require('chance');
const chance = new Chance();
const { emitter, pool } = require('../eventPool');

const store_name = chance.company();

//trigger pickup event
emitter.emit(pool[0], {
  store: store_name,
  orderId: chance.integer( {min: 10000, max: 99999} ),
  customer: chance.name(),
  address: chance.address(),
  test: 'test',
});

//listening for delivered event
emitter.on(pool[2], (payload) => {
  console.log(`Thank you for your order, ${payload.customer}`);
});