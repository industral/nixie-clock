'use strict';

const GPIO = require('./GPIO');
const utils = require('./utils');

const getValue = utils.getValueByWeight;

let isBlink = false;

class Time {
  constructor() {
    // turn off numbers
    GPIO.D1.writeSync(1);
    GPIO.D2.writeSync(1);
    GPIO.D3.writeSync(1);
    GPIO.D4.writeSync(1);

    // turn off all tubes
    GPIO.DS1.writeSync(0);
    GPIO.DS2.writeSync(0);
    GPIO.DS3.writeSync(0);
  }

  updateTime(tubeNumber, timeNumbers, numberPart) {
    // needed to blink functionality. Set to 0, means Y0 is active. And we start tubes from Y1.
    GPIO.DS1.writeSync(0);
    GPIO.DS2.writeSync(0);
    GPIO.DS3.writeSync(0);

    if (isBlink) return;

    const timeNumber = Number(String(timeNumbers)[numberPart]);

    GPIO.D1.writeSync(getValue(timeNumber, 1));
    GPIO.D2.writeSync(getValue(timeNumber, 2));
    GPIO.D3.writeSync(getValue(timeNumber, 4));
    GPIO.D4.writeSync(getValue(timeNumber, 8));

    GPIO.DS1.writeSync(getValue(tubeNumber, 1));
    GPIO.DS2.writeSync(getValue(tubeNumber, 2));
    GPIO.DS3.writeSync(getValue(tubeNumber, 4));
  }

  showTime(date) {
    const time = utils.getTime(date);

    this.updateTime(1, time.hh, 0);
    this.updateTime(2, time.hh, 1);

    this.updateTime(3, time.mm, 0);
    this.updateTime(4, time.mm, 1);

    this.updateTime(5, time.ss, 0);
    this.updateTime(6, time.ss, 1);
  }

  start(date) {
    const showTime = this.showTime.bind(this);
    this.t = setInterval(showTime(date), 1000);
  }

  startBlink() {
    this.blinkTimer = setInterval(() => {
      isBlink = !isBlink;
    }, 1000);
  }

  stopBlink() {
    clearInterval(this.blinkTimer);
  }

  stop() {
    clearInterval(this.t);
  }
}


module.exports = Time;
