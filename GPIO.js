const Gpio = require('onoff').Gpio;
const GPIO_CONST = require('./consts').GPIO;

const GPIO = {
  /*
   * SN74141 Decoder 4 - 10
   * By default inputs H. All inputs in L - 0.
   * https://neon1.net/nixieclock/sn74141.pdf
   */
  D1: new Gpio(GPIO_CONST.GPIO_D1, 'out'),
  D2: new Gpio(GPIO_CONST.GPIO_D2, 'out'),
  D3: new Gpio(GPIO_CONST.GPIO_D3, 'out'),
  D4: new Gpio(GPIO_CONST.GPIO_D4, 'out'),

  /*
   * 74HC238N Decoder 3 - 8
   * http://assets.nexperia.com/documents/data-sheet/74HC_HCT238.pdf
   */
  DS1: new Gpio(GPIO_CONST.GPIO_DS1, 'out'),
  DS2: new Gpio(GPIO_CONST.GPIO_DS2, 'out'),
  DS3: new Gpio(GPIO_CONST.GPIO_DS3, 'out'),

  B1_SETUP: new Gpio(GPIO_CONST.GPIO_B1, 'in', 'rising'),
  B2_HH: new Gpio(GPIO_CONST.GPIO_B2, 'in', 'rising'),
  B3_MM: new Gpio(GPIO_CONST.GPIO_B3, 'in', 'rising'),
  B4_ALARM: new Gpio(GPIO_CONST.GPIO_B4, 'in', 'both'),
};

module.exports = GPIO;
