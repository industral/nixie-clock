const getTime = (d) => {
  const hh = ('0' + d.getHours()).slice(-2);
  const mm = ('0' + d.getMinutes()).slice(-2);
  const ss = ('0' + d.getSeconds()).slice(-2);

  return {hh, mm, ss};
};

module.exports = {
  getTime: getTime,
};
