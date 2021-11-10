const adminName = "DAZN Admin";
const messageBody = {
  room: "testing123",
  data: {
    any: "data",
    could: "be",
    here: true,
  },
};

const messageFormatter = (username, args) => {
  const time = new Date().toLocaleTimeString();
  return {
    username,
    args,
    time,
  };
};

module.exports = {
  adminName,
  messageBody,
  messageFormatter,
};
