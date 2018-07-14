'use strict';

const expect = require('expect.js');
const Time = require('../Time');
const GPIO = require('../GPIO');
const utils = require('../utils');


describe('functions', () => {
  const time = new Time();

  it('should work', () => {
    // 1
    expect(utils.getValueByWeight(1, 1)).to.be.equal(1);
    expect(utils.getValueByWeight(2, 1)).to.be.equal(0);
    expect(utils.getValueByWeight(3, 1)).to.be.equal(1);
    expect(utils.getValueByWeight(4, 1)).to.be.equal(0);
    expect(utils.getValueByWeight(5, 1)).to.be.equal(1);
    expect(utils.getValueByWeight(6, 1)).to.be.equal(0);
    expect(utils.getValueByWeight(7, 1)).to.be.equal(1);
    expect(utils.getValueByWeight(8, 1)).to.be.equal(0);
    expect(utils.getValueByWeight(9, 1)).to.be.equal(1);
    expect(utils.getValueByWeight(0, 1)).to.be.equal(0);

    // 2
    expect(utils.getValueByWeight(1, 2)).to.be.equal(0);
    expect(utils.getValueByWeight(2, 2)).to.be.equal(1);
    expect(utils.getValueByWeight(3, 2)).to.be.equal(1);
    expect(utils.getValueByWeight(4, 2)).to.be.equal(0);
    expect(utils.getValueByWeight(5, 2)).to.be.equal(0);
    expect(utils.getValueByWeight(6, 2)).to.be.equal(1);
    expect(utils.getValueByWeight(7, 2)).to.be.equal(1);
    expect(utils.getValueByWeight(8, 2)).to.be.equal(0);
    expect(utils.getValueByWeight(9, 2)).to.be.equal(0);
    expect(utils.getValueByWeight(0, 2)).to.be.equal(0);

    // 4
    expect(utils.getValueByWeight(1, 4)).to.be.equal(0);
    expect(utils.getValueByWeight(2, 4)).to.be.equal(0);
    expect(utils.getValueByWeight(3, 4)).to.be.equal(0);
    expect(utils.getValueByWeight(4, 4)).to.be.equal(1);
    expect(utils.getValueByWeight(5, 4)).to.be.equal(1);
    expect(utils.getValueByWeight(6, 4)).to.be.equal(1);
    expect(utils.getValueByWeight(7, 4)).to.be.equal(1);
    expect(utils.getValueByWeight(8, 4)).to.be.equal(0);
    expect(utils.getValueByWeight(9, 4)).to.be.equal(0);
    expect(utils.getValueByWeight(0, 4)).to.be.equal(0);

    // 8
    expect(utils.getValueByWeight(1, 8)).to.be.equal(0);
    expect(utils.getValueByWeight(2, 8)).to.be.equal(0);
    expect(utils.getValueByWeight(3, 8)).to.be.equal(0);
    expect(utils.getValueByWeight(4, 8)).to.be.equal(0);
    expect(utils.getValueByWeight(5, 8)).to.be.equal(0);
    expect(utils.getValueByWeight(6, 8)).to.be.equal(0);
    expect(utils.getValueByWeight(7, 8)).to.be.equal(0);
    expect(utils.getValueByWeight(8, 8)).to.be.equal(1);
    expect(utils.getValueByWeight(9, 8)).to.be.equal(1);
    expect(utils.getValueByWeight(0, 8)).to.be.equal(0);
  });

  it('should return correct time with leading 0', function() {
    const date = new Date();
    date.setHours(2);
    date.setMinutes(9);
    date.setSeconds(3);

    const resultTime = utils.getTime(date);

    expect(resultTime).to.be.an('object');
    expect(resultTime.hh).to.be.equal('02');
    expect(resultTime.mm).to.be.equal('09');
    expect(resultTime.ss).to.be.equal('03');
  });

  it('should return correct time', function() {
    const date = new Date();
    date.setHours(22);
    date.setMinutes(29);
    date.setSeconds(55);

    const resultTime = utils.getTime(date);

    expect(resultTime).to.be.an('object');
    expect(resultTime.hh).to.be.equal('22');
    expect(resultTime.mm).to.be.equal('29');
    expect(resultTime.ss).to.be.equal('55');
  });

});

describe('GPIO', () => {
  let time;

  beforeEach(() => {
    time = new Time();
  });

  it('D1-D4 should be in HIGH', function() {
    expect(GPIO.D1.readSync()).to.be.equal(1);
    expect(GPIO.D2.readSync()).to.be.equal(1);
    expect(GPIO.D3.readSync()).to.be.equal(1);
    expect(GPIO.D4.readSync()).to.be.equal(1);
  });

  it('DS1-DS3 should be in LOW', function() {
    expect(GPIO.DS1.readSync()).to.be.equal(0);
    expect(GPIO.DS2.readSync()).to.be.equal(0);
    expect(GPIO.DS3.readSync()).to.be.equal(0);
  });

  it('Should enable 1 tube and show number 2', function() {
    const date = new Date();
    date.setHours(23);

    const timeNumbers = utils.getTime(date);

    time.updateTime(1, timeNumbers.hh, 0);

    expect(GPIO.DS1.readSync()).to.be.equal(1);
    expect(GPIO.DS2.readSync()).to.be.equal(0);
    expect(GPIO.DS3.readSync()).to.be.equal(0);

    expect(GPIO.D1.readSync()).to.be.equal(0);
    expect(GPIO.D2.readSync()).to.be.equal(1);
    expect(GPIO.D3.readSync()).to.be.equal(0);
    expect(GPIO.D4.readSync()).to.be.equal(0);
  });

  it('Should enable 2nd tube and show number 3', function() {
    const date = new Date();
    date.setHours(23);

    const timeNumbers = utils.getTime(date);

    time.updateTime(2, timeNumbers.hh, 1);

    expect(GPIO.DS1.readSync()).to.be.equal(0);
    expect(GPIO.DS2.readSync()).to.be.equal(1);
    expect(GPIO.DS3.readSync()).to.be.equal(0);

    expect(GPIO.D1.readSync()).to.be.equal(1);
    expect(GPIO.D2.readSync()).to.be.equal(1);
    expect(GPIO.D3.readSync()).to.be.equal(0);
    expect(GPIO.D4.readSync()).to.be.equal(0);
  });

  it('Should enable 3nd tube and show number 5', function() {
    const date = new Date();
    date.setMinutes(53);

    const timeNumbers = utils.getTime(date);

    time.updateTime(3, timeNumbers.mm, 0);

    expect(GPIO.DS1.readSync()).to.be.equal(1);
    expect(GPIO.DS2.readSync()).to.be.equal(1);
    expect(GPIO.DS3.readSync()).to.be.equal(0);

    expect(GPIO.D1.readSync()).to.be.equal(1);
    expect(GPIO.D2.readSync()).to.be.equal(0);
    expect(GPIO.D3.readSync()).to.be.equal(1);
    expect(GPIO.D4.readSync()).to.be.equal(0);
  });

  it('Should enable 4nd tube and show number 3', function() {
    const date = new Date();
    date.setMinutes(53);

    const timeNumbers = utils.getTime(date);

    time.updateTime(4, timeNumbers.mm, 1);

    expect(GPIO.DS1.readSync()).to.be.equal(0);
    expect(GPIO.DS2.readSync()).to.be.equal(0);
    expect(GPIO.DS3.readSync()).to.be.equal(1);

    expect(GPIO.D1.readSync()).to.be.equal(1);
    expect(GPIO.D2.readSync()).to.be.equal(1);
    expect(GPIO.D3.readSync()).to.be.equal(0);
    expect(GPIO.D4.readSync()).to.be.equal(0);
  });

});
