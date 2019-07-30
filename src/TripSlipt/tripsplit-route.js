const db = require("./tripsplit-model");
const bcrypt = require("bcryptjs");

const { verifyNewUser, authUserLogin } = require("./tripsplit-middleware");

module.exports = server => {
  server.get("/", home);
  server.post("/api/auth/register", verifyNewUser, register);
  server.post("/api/auth/login", authUserLogin, login);

  server.get("/api/users", getAllUsers);
  server.get("/api/users/:id", getUserById);
  server.patch("/api/users/:id", patchUserById);
  server.delete("/api/users/:id", deleteUserById);

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

async function getAllTrips(req, res) {}

async function getTripById(req, res) {}

async function createTrip(req, res) {}

async function addExpenses(req, res) {}

async function patchUserById(req, res) {}

async function deleteUserById(req, res) {
  const { id } = req.params;
  try {
    const data = await db.deleteUserById(id);
    if (data === 0) {
      return res.status(200).json({
        user: `Delete failed User doesn't exist`
      });
    }
    return res.status(200).json({
      user: `user with id No-${id} deleted`
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

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
