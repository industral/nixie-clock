/*
 * for Raspberry Model B GPIO configuration - https://www.raspberrypi.org/documentation/usage/gpio/
 * Some GPIO can be busy, so you have to change it ig it doesn't work. Use `dmesg` for information, also run tests
 * to ensure everything is working fine.
 */

const GPIO = {
  GPIO_D1: 2,
  GPIO_D2: 3,
  GPIO_D3: 4,
  GPIO_D4: 27,

  GPIO_DS1: 22,
  GPIO_DS2: 10,
  GPIO_DS3: 9,

  GPIO_B1: 11,
  GPIO_B2: 7,
  GPIO_B3: 8,
  GPIO_B4: 23
};

exports.GPIO = GPIO;
