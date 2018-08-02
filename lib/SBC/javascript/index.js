'use strict';

const i2c = require('i2c-bus');
const utils = require('./utils');

const I2C_HH_MM_PORT = 0x20;
const I2C_SS_PORT = 0x24;

const I2C_IODIR_A = 0x0;
const I2C_GPIO_A = 0x12;

const bus = i2c.openSync(1);

/*
 * By default:
 * IOCON.BANK = 0
 * IOCON.SEQOP = 0 // Sequential writes
 */

/*
 * Set all GPIO as output, IODIRA and IODIRB.
 */
bus.writeI2cBlockSync(I2C_HH_MM_PORT, I2C_IODIR_A, 2, Buffer.from([0x0, 0x0]));
bus.writeI2cBlockSync(I2C_SS_PORT, I2C_IODIR_A, 2, Buffer.from([0x0, 0x0]));


setInterval(() => {
  const time = utils.getTime(new Date());

  /*
   * Set GPIOA and GPIOB
   */
  bus.writeI2cBlockSync(I2C_HH_MM_PORT, I2C_GPIO_A, 2, Buffer.from([getHexNumber(time.hh), getHexNumber(time.mm)]));
  bus.writeI2cBlockSync(I2C_SS_PORT, I2C_GPIO_A, 1, Buffer.from([getHexNumber(time.ss)]));
}, 1000);

function getHexNumber(string) {
  return (string[1] << 4) + Number(string[0]);
}

process.on('SIGINT', () => {
  bus.writeI2cBlockSync(I2C_HH_MM_PORT, I2C_IODIR_A, 2, Buffer.from([0xff, 0xff]));
  bus.writeI2cBlockSync(I2C_SS_PORT, I2C_IODIR_A, 2, Buffer.from([0xff, 0xff]));

  process.exit();
});
