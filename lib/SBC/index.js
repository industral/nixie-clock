'use strict';

const I2C_HH_MM_PORT = 0x20;
const I2C_SS_TUBES_PORT = 0x21;

const i2c = require('i2c-bus');
const utils = require('./utils');

const bus = i2c.openSync(1);

setInterval(() => {
  const time = utils.getTime(new Date());

  console.log(time, getHexNumber(time.hh), Buffer.from([getHexNumber(time.hh), getHexNumber(time.mm)]));

  bus.i2cWriteSync(I2C_HH_MM_PORT, 2, Buffer.from([getHexNumber(time.hh), getHexNumber(time.mm, false)]));
  bus.i2cWriteSync(I2C_SS_TUBES_PORT, 2, Buffer.from([getHexNumber(time.ss), 0x00]));
}, 1000);

function getHexNumber(string, isReverse = true) {
  let str = fixNumber(string);

  if (isReverse) {
    str = Array.from(str).reverse().join('');
  }

  return Number('0x' + str);
}

function fixNumber(string) {
  return Array.from(string).map((n) => map[n]).join('');
}

const map = {
  0: 1,
  1: 0,
  2: 9,
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4,
  8: 3,
  9: 2
};

process.on('SIGINT', () => {
  process.exit();
});
