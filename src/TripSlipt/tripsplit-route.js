const db = require("./tripsplit-model");
const bcrypt = require("bcryptjs");

const { verifyNewUser, authUserLogin } = require("./tripsplit-middleware");

module.exports = server => {
  server.get("/", home);
  server.post("/api/register", verifyNewUser, register);
  server.post("/api/login", authUserLogin, login);
};

function home(req, res) {
  res.status(200).send("Welcome to Split Trip API");
}

function login(req, res) {
  res.status(200).json({ message: "Welcome", token: req.user.token });
}

function register(req, res) {
  const { name, email, password } = req.body;
  const data = {
    name,
    email,
    password: bcrypt.hashSync(password, 10)
  };
  db.createUser(data)
    .then(dbResponse => {
      return res.status(201).json({
        data: dbResponse
      });
    })
    .catch(err => {
      if (err.constraint === "users_email_unique") {
        return res.status(500).json({ error: "Email Already Exit" });
      }
      res.status(500).send(err);
    });
}


