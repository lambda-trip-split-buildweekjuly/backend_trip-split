const axios = require("axios");
const db = require("./tripsplit-model");

const { myBcrypt, validateUser } = require("./tripsplit-middleware");

module.exports = server => {
  server.get("/", home);
  server.post("/api/register", register);
  server.post("/api/login", login);
};

function home(req, res) {
  res.status(200).send("Welcome to Split Trip API");
}

function register(req, res) {
  const { email, password } = req.body;
  const data = {
    email: email,
    password: myBcrypt(password, 10)
  };
  db.createUser(data)
    .then(dbResponse => {
      return res.status(201).json({
        data: dbResponse
      });
    })
    .catch(err => {
      if (err.code === "SQLITE_CONSTRAINT") {
        return res.status(500).json({ error: "Email Already Exit" });
      }
      res.status(500).send(err);
    });
}

function login(req, res) {
  res.status(200).json({ message: "Welcome", token: req.user.token });
}
