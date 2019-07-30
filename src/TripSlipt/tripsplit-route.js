const db = require("./tripsplit-model");
const bcrypt = require("bcryptjs");

const { verifyNewUser, authUserLogin } = require("./tripsplit-middleware");

module.exports = server => {
  server.get("/", home);
  server.post("/api/auth/register", verifyNewUser, register);
  server.post("/api/auth/login", authUserLogin, login);

  server.get("/api/users", getAllUsers);
  server.get("/api/users/:id", getUserById);
  server.patch("/api/users/:id", getUserById);
  server.delete("/api/users/:id", getUserById);

  server.get("/api/trips", getAllTrips);
  server.get("/api/trips/:id", getTripById);
  server.post("/api/trips", createTrip);
  server.post("/api/expenses", addExpenses);
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

function getAllTrips() {}

function getTripById() {}

function createTrip() {}

function addExpenses() {}

async function getAllUsers(req, res) {
  try {
    const data = await db.getAllUsers();
    return res.status(200).json({
      AllUsers: data
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const data = await db.getUserById(id);
    return res.status(200).json({
      user: data
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
