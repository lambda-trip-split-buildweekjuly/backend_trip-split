const jwt = require("jsonwebtoken");
const db = require("./tripsplit-model");
const bcrypt = require("bcryptjs");

module.exports = {
  validateUser,
  validateUserPassword
};

function RegexEmailValidation(email) {
  const RegexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return RegexEmail.test(String(email).toLowerCase());
}

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
  } else if (!RegexEmailValidation(email)) {
    return res.status(400).json({
      message: "valid email required"
    });
  }
  next();
}


async function validateUserPassword(req, res, next) {
  const { email, password } = req.body;
  try {
    let userData = await db.getUserByEmail(email);
    let compareOutput = bcrypt.compareSync(password, userData.password);
    if (!compareOutput) {
      return res.status(401).json({ error: "Incorrect Password" });
    }
    const Encrypted = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: userData.id
      },
      process.env.JWT_SECRET
    );
    req.user = { token: Encrypted };
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Incorrect Email" });
  }
}
