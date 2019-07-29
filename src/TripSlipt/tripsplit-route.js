const axios = require("axios");
const db = require("./tripsplit-model");

const { myBcrypt, validateUser } = require("../auth/authenticate");

module.exports = server => {
  server.get("/api/", home);
  server.post("/api/register", validateUser, register);
};

function home(req, res) {
  res.status(200).send("Welcome to Split Trip API");
}

function register(req, res) {
  // implement user registration
  const { username, password } = req.body;
  const data = {
    username: username,
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
        return res.status(500).json({ error: "Username Already Exit" });
      }
      res.status(500).send(err);
    });
}
