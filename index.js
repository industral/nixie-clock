'use strict';

const Gpio = require('onoff').Gpio;
const Time = require('./Time');
const Alarm = require('./Alarm');
const GPIO = require('./GPIO');

let isSetup = false;

const time = new Time();
const alarm = new Alarm();

time.start(() => new Date());

GPIO.B1_SETUP.watch((err) => {
  if (err) throw err;
  if (alarm.isAlarming()) return;

  isSetup = !isSetup;

  if (isSetup) {
    return alarm.enterSetup();
  }

  return alarm.leaveSetup();
});

process.on('SIGINT', () => {
  time.stop();
  process.exit();

  //TODO: add unexport
});
