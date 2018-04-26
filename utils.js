const getValueByWeight = (value, weight) => {
  return Number((value & weight) >= 1);
};

const getTime = (d) => {
  const hh = ('0' + d.getHours()).slice(-2);
  const mm = ('0' + d.getMinutes()).slice(-2);
  const ss = ('0' + d.getSeconds()).slice(-2);

  return {hh, mm, ss};
};

const getDate = (hh, mm, d = new Date()) => {
  d.setHours(hh);
  d.setMinutes(mm);
  d.setSeconds(0);

  return d;
};

const fixMyWrongFootPrint = (number) => {
  return {
    1: 0,
    2: 9,
    3: 8,
    4: 7,
    5: 6,
    6: 5,
    7: 4,
    8: 3,
    9: 2
  }[number];
};

module.exports = {
  getValueByWeight: getValueByWeight,
  getTime: getTime,
  getDate: getDate,
  fixMyWrongFootPrint: fixMyWrongFootPrint
};
