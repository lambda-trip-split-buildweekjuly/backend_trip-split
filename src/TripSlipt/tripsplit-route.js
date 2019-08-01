const db = require("./tripsplit-model");
const bcrypt = require("bcryptjs");

const {
  verifyNewUser,
  authUserLogin,
  authUser
} = require("./tripsplit-middleware");

module.exports = server => {
  server.get("/", home);
  server.post("/api/auth/register", verifyNewUser, register);
  server.post("/api/auth/login", authUserLogin, login);

  server.get("/api/users", authUser, getAllUsers);
  server.get("/api/users/:id", authUser, getUserById);
  server.patch("/api/users/:id", authUser, updateUserById);
  server.delete("/api/users/:id", authUser, deleteUserById);

  server.get("/api/trips", getAllTrips);
  server.get("/api/trips/:id", getTripById);
  server.get("/api/trips/user/:userId", getTripByUserId);
  server.post("/api/trips", authUser, createTrip);
  server.post("/api/expenses", addExpenses);
};

function home(req, res) {
  res.status(200).send("Welcome to Split Trip API");
}

function login(req, res) {
  res.status(200).json({ message: "Welcome", token: req.user.token });
}

function register(req, res) {
  const { name, email, password, role } = req.body;
  const data = {
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    role
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

async function getAllTrips(req, res) {
  try {
    const data = await db.getAllTrips();
    return res.status(200).json({
      AllTrips: data
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getTripById(req, res) {
  try {
    const data = await db.getTripById(req.params.id);
    return res.status(200).json({
      Trip: data
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
async function getTripByUserId(req, res) {
  try {
    const data = await db.getTripByUserId(req.params.userId);
    return res.status(200).json({
      Trip: data
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function createTrip(req, res) {
  const {
    trip_name,
    trip_destination,
    trip_date,
    peoples,
    trip_opened
  } = req.body;
  const tripData = {
    trip_name,
    trip_destination,
    trip_no_of_people: peoples.length,
    trip_date,
    user_id: req.user.token["id"],
    trip_opened
  };
  try {
    const data = await db.createTrip(tripData, peoples);
    return res.status(201).json({
      trip: `Trip saved with ${data.rowCount} People`
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function addExpenses(req, res) {
  const { expense_title, expense_price, trip_id } = req.body;
  const expenseDetails = { expense_title, expense_price, trip_id };
  const expenseMembers = req.body.expense_members
  try {
    const data = await db.addExpenses(expenseDetails, expenseMembers);
    return res.status(201).json({
      expense: `Expenses saved with ${data.rowCount} Members`
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function updateUserById(req, res) {
  const { id } = req.params;
  try {
    const data = await db.patchUserById(id, req.body);
    if (data === 0) {
      return res.status(200).json({
        user: `Update failed User doesn't exist`
      });
    }
    return res.status(200).json({
      user: `user with id-${id} updated`
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

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
      user: `user with id-${id} deleted`
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
