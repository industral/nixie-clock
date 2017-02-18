'use strict';

const fs = require('fs');
const exec = require('child_process').exec;
const GPIO = require('./GPIO');
const utils = require('./utils');

class Alarm {
  constructor(time) {
    this.time = time;

    this.clockSettings = require('./clock-settings');
    this.isEnable = B4_ALARM.readSync();

    GPIO.B4_ALARM.watch((err, value) => {
      if (err) throw err;
      this.setOn(!value);
    });
  }

  enterSetup() {
    this.attachListeners();
    this.time.startBlink();

    this.clockSettings = require('./clock-settings');
    const d = this._getDate(this.clockSettings.hh, this.clockSettings.mm);

    this.time.start(d);
  }

  leaveSetup() {
    this.removeListeners();
    fs.write('./clock-settings', JSON.stringify(this.clockSettings), this.time.stopBlink.bind(this));
  }

  isAlarmEnabled() {
    return !!this.isEnable;
  }

  isAlarming() {
    return this.alarming;
  }

  setOn(isEnable) {
    if (isEnable) {
      const checkInterval = setInterval(() => {
        if (new Date().valueOf > utils.getDate(this.clockSettings.hh, this.clockSettings.mm)) return;

        clearInterval(checkInterval);
        this.isEnable = setInterval(this._checkForAlarmTime.bind(this), 1000);
      }, 1000);
    } else {
      clearInterval(this.isEnable);
      this.isEnable = false;
    }
  }

  startAlarm() {
    this.playingAlarm = fs.readdir('/mnt/', (err, files) => {
      const musicCount = files.length;
      const randomNumber = parseInt(Math.random() * musicCount);
      const randomMusic = files[randomNumber];

      const play = exec(`play ${randomMusic}`, (error, stdout, stderr) => {
        if (error) return console.error(error);

        this.alarming = true;

        console.log(stdout);
        console.error(stderr);
      });
    });
  }

  stopAlarm() {
    this.playingAlarm.kill();
    this.setOn(false);
    this.setOn(true);

    this.alarming = false;
  }

  attachListeners() {
    GPIO.B2_HH.watch((err) => {
      if (err) throw err;
      this.clockSettings.hh = ++this.clockSettings.hh % 12;
    });

    GPIO.B3_MM.watch((err) => {
      if (err) throw err;
      this.clockSettings.mm = ++this.clockSettings.mm % 60;
    });
  }

  removeListeners() {
    GPIO.B2_HH.unwatchAll();
    GPIO.B3_MM.unwatchAll();
  }

  _checkForAlarmTime() {
    const d = utils.getDate(this.clockSettings.hh, this.clockSettings.mm);

    if (new Date().valueOf() >= d.valueOf()) {
      this.startAlarm();

      GPIO.B1_SETUP.watch((err) => {
        if (err) throw err;
        this.stopAlarm();
        GPIO.B1_SETUP.unwatchAll();
      })
    }
  }
}

module.exports = Alarm;
