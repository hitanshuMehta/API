const logger = require("../config/logger.js");

module.exports = (err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ message: "Server Error" });
};
