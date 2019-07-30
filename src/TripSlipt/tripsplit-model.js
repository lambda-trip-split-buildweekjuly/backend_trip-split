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
  getTripById
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
function createTrip(data) {
  return db("trips")
    .insert(data)
    .returning("*");
}
function getAllTrips() {
  return db("trips")
}

function getTripById(id){
  return db("trips")
  .where({ id })
  .first();
}
