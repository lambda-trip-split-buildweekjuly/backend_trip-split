const db = require('../data/dbConfig');

module.exports = {
  createUser,
  getUserByEmail
};

function getUserByEmail(email) {
  return db("users")
    .where({ email })
    .first();
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function createUser(data) {
  return db("users")
    .insert(data)
    .then(ids => {
      return findById(ids[0]);
    });
}
