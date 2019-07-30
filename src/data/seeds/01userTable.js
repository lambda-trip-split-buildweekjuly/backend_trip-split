const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      return knex("users").insert([
        {
          name: "John Doe",
          email: "test@email.com",
          password:  bcrypt.hashSync('123456', 10),
          role: "admin"
        }
      ]);
    });
};
