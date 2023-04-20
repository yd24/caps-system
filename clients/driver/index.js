'use strict';
const startListeners = require('./handler');
const io = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001/caps';

const driverSocket = io(SERVER_URL);

const driver = () => {
  startListeners(driverSocket);
};

driver();