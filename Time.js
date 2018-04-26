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
    return new Promise((resolve, reject) => {
      // needed to blink functionality. Set to 0, means Y0 is active. And we start tubes from Y1.


      if (isBlink) return;

      const timeNumber = utils.fixMyWrongFootPrint(Number(String(timeNumbers)[numberPart]));

      // GPIO.DS1.writeSync(0);
      // GPIO.DS2.writeSync(0);
      // GPIO.DS3.writeSync(0);

      GPIO.D1.writeSync(getValue(timeNumber, 1));
      GPIO.D2.writeSync(getValue(timeNumber, 2));
      GPIO.D3.writeSync(getValue(timeNumber, 4));
      GPIO.D4.writeSync(getValue(timeNumber, 8));

      GPIO.DS1.writeSync(getValue(tubeNumber, 1));
      GPIO.DS2.writeSync(getValue(tubeNumber, 2));
      GPIO.DS3.writeSync(getValue(tubeNumber, 4));

      // resolve();
      setTimeout(() => {
        resolve();
      }, 3);
    });
  }

  async showTime(dateFn) {
    const time = utils.getTime(dateFn());

    try {
      await this.updateTime(1, time.hh, 0);
      await this.updateTime(2, time.hh, 1);

      await this.updateTime(3, time.mm, 0);
      await this.updateTime(4, time.mm, 1);

      await this.updateTime(5, time.ss, 0);
      await this.updateTime(6, time.ss, 1);

      // process.nextTick(() => {
        this.showTime(dateFn);
      // });

    } catch(error) {
      console.error(error);
    }
    // setTimeout(() => {this.showTime(dateFn)}, 2);
  }

  async start(dateFn) {
    this.stop();

    const showTime = this.showTime.bind(this, dateFn);
    showTime();

    //
    //
    //  const r = () => {
    //    await this.showTime();
    //   await r();
    // }
    //
    // r();

    // let result = r();
    // if (result)


    // let r =
    // if (r)

    // let r = true;
    // while (r) {
    //
    // }
    // this.t = setInterval(showTime, 10);
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

    GPIO.DS1.writeSync(0);
    GPIO.DS2.writeSync(0);
    GPIO.DS3.writeSync(0);
  }
}


module.exports = Time;
