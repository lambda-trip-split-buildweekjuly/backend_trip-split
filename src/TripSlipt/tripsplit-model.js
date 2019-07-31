const db = require("../data/dbConfig");

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  deleteUserById,
  patchUserById,
  createTrip,
  getAllTrips,
  getTripById,
  addExpenses
};

function getUserByEmail(email) {
  return db("users")
    .where({ email })
    .first();
}

// function findById(id) {
//   return db("users")
//     .where({ id })
//     .first();
// }

function createUser(data) {
  return db("users")
    .insert(data)
    .returning("*");
}
function getAllUsers() {
  return db("users");
}
function getUserById(id) {
  return db("users")
    .where({ id })
    .first();
}
function deleteUserById(id) {
  return db("users")
    .where({ id })
    .del();
}
function patchUserById(id, data) {
  return db("users")
    .where({ id })
    .update(data)
    .returning("*");
}

function createTrip(data, peoples) {
  db.transaction(function(trx) {
    return trx
      .insert(data)
      .into("trips")
      .returning("*")
      .then(function(output) {
        peoples.forEach(elem => (elem.trip_id = output[0].id));
        return trx("peoples").insert(peoples);
      });
  })
    .then(function(inserts) {
      return inserts;
    })
    .catch(function(error) {
      return error;
    });
}
async function getAllTrips() {
  const allTrip = await db("trips");
  const allPeople = await db("peoples");
  const allExpense = await db("expenses");
  const computedTrip = allTrip.map(trip => {
    return {
      ...trip,
      people: allPeople.filter(elem => trip.id === elem.trip_id),
      expense: allExpense.filter(elem => trip.id === elem.trip_id)
    };
  });
  return computedTrip;
}

async function getTripById(id) {
  const trip = await db("trips").where("id", id);
  const people = await db("peoples")
    .select(["id", "people_name"])
    .where("trip_id", id);
  const expense = await db("expenses").where("trip_id", id);
  return { ...trip[0], people, expense };
}

function addExpenses() {}


