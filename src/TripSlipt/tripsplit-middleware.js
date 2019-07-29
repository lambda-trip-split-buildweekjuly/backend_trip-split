const jwt = require("jsonwebtoken");
const db = require("../database/user-model");
const bcrypt = require("bcryptjs");

// quickly see what this file exports
module.exports = {
  validateUser,
  validateUserPassword
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

async function validateUserPassword(req, res, next) {
    const { username, password } = req.body;
    try {
      let userData = await db.getByUsername(username);
      let compareOutput = bcrypt.compare(password, userData.password);
      if (!compareOutput) {
        return res.status(401).json({ error: "Incorrect Password" });
      }
      const Encrypted = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: userData.id
        },
        process.env.jwt_SECRET
      );
      req.user = { token: Encrypted };
      next();
    } catch (err) {
      return res.status(401).json({ error: "Incorrect Email" });
    }
  }
