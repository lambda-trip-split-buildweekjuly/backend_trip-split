require("dotenv").config();
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "timileyinojo",
      password: "080timi2323",
      database: "trip-split"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/data/migrations",
      tableName: "dbmigrations"
    },
    seeds: { directory: "./src/data/seeds" }
  },
  testing: {
    client: "sqlite3",
    connection: { filename: "./database/test-split-trip.db3" },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/data/migrations",
      tableName: "dbmigrations"
    },
    seeds: { directory: "./src/data/seeds" }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: "./src/data/migrations",
      tableName: "dbmigrations"
    },
    seeds: { directory: "./src/data/seeds" }
  }
};
