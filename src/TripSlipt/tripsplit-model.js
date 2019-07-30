const db = require("../data/dbConfig");

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  deleteUserById
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
