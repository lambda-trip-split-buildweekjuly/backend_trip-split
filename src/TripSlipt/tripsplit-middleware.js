const jwt = require("jsonwebtoken");
const db = require("../database/user-model");
const md5 = require("md5");

// quickly see what this file exports
module.exports = {
  validateUser
};

function validateUser(req, res, next) {
  const { email, password } = req.body;
  if (!req.body) {
    return res.status(400).json({
      message: "missing user data"
    });
  } else if (!email || email.trim().length < 1) {
    return res.status(400).json({
      message: "missing required email field"
    });
  } else if (!password || password.trim().length < 1) {
    return res.status(400).json({
      message: "missing required password field"
    });
  }
  next();
}
