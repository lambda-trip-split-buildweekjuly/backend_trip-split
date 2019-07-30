const db = require("../data/dbConfig");

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers
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
