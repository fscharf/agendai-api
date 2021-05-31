const cors = require("cors");

const corsOptions = {
  origin: "*",
  optionSuccesStatus: 200,
};

module.exports = cors(corsOptions);
