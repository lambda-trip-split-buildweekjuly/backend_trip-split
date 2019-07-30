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
// function createTrip(data, peoples) {
//   return db("trips")
//     .insert(data)
//     .returning("*")
//     .then(output => createPeople(output.id, peoples));
// }

// function createPeople(id, peoples) {
//   peoples.map(elem => {
//     const peopleData = {
//       people_name: elem,
//       trip_id: id
//     };
//     return db("peoples").insert(peopleData);
//   });

// }
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
      return inserts
    })
    .catch(function(error) {
      return error;
    });
}

function getAllTrips() {
  return db("trips");
}

function getTripById(id) {
  return db("trips")
    .where({ id })
    .first();
}

function addExpenses() {}
