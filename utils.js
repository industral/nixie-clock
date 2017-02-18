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

module.exports = {
  getValueByWeight: getValueByWeight,
  getTime: getTime,
  getDate: getDate
};
