const jwt = require("jsonwebtoken");
const db = require("./tripsplit-model");
const bcrypt = require("bcryptjs");

module.exports = {
  verifyNewUser,
  authUserLogin,
  authUser
};

function RegexEmailValidation(email) {
  const RegexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return RegexEmail.test(String(email).toLowerCase());
}

// function validateUser(req, res) {
//   const { email, password, name } = req.body;
//   if (!req.body) {
//     return res.status(400).json({
//       message: "missing user data"
//     });
//   } else if (!name || name.trim().length < 1) {
//     console.log("object");
//     return res.status(400).json({
//       message: "missing required name field"
//     });
//   } else if (!email || email.trim().length < 1) {
//     return res.status(400).json({
//       message: "missing required email field"
//     });
//   } else if (!RegexEmailValidation(email)) {
//     return res.status(400).json({
//       message: "valid email required"
//     });
//   } else if (!password || password.trim().length < 1) {
//     return res.status(400).json({
//       message: "missing required password field"
//     });
//   }
// }

function verifyNewUser(req, res, next) {
  const { email, password, name, role } = req.body;
  if (!req.body) {
    return res.status(400).json({
      message: "missing user data"
    });
  } else if (!name || name.trim().length < 1) {
    console.log("object");
    return res.status(400).json({
      message: "missing required name field"
    });
  } else if (!email || email.trim().length < 1) {
    return res.status(400).json({
      message: "missing required email field"
    });
  } else if (!RegexEmailValidation(email)) {
    return res.status(400).json({
      message: "valid email required"
    });
  } else if (!password || password.trim().length < 1) {
    return res.status(400).json({
      message: "missing required password field"
    });
  }
  if (!role || role.trim().length < 1 || role.trim().toLowerCase() !== "user") {
    console.log("kk");
    return res.status(400).json({
      message: "missing or invalid role field"
    });
  }
  next();
}

async function authUserLogin(req, res, next) {
  const { email, password } = req.body;
  if (!req.body) {
    return res.status(400).json({
      message: "missing user data"
    });
  } else if (!email || email.trim().length < 1) {
    return res.status(400).json({
      message: "missing required email field"
    });
  } else if (!RegexEmailValidation(email)) {
    return res.status(400).json({
      message: "valid email required"
    });
  } else if (!password || password.trim().length < 1) {
    return res.status(400).json({
      message: "missing required password field"
    });
  }
  try {
    let userData = await db.getUserByEmail(email);
    if (!userData) {
      return res.status(401).json({ error: "Invalid Email" });
    }
    let compareOutput = bcrypt.compareSync(password, userData.password);
    if (!compareOutput) {
      return res.status(401).json({ error: "Invalid Password" });
    }
    const encrypted = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        id: userData.id
      },
      process.env.JWT_SECRET
    );
    req.user = { token: encrypted };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Incorrect Email" });
  }
}

async function authUser(req, res, next) {
  const header = req.headers["authorization"];
  try {
    jwt.verify(header, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      req.user = { token: decoded };
      next();
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
