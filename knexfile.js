require('dotenv').config()
module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./src/data/split-trip.db3"
    },
    migrations: {
      directory: "./src/data/migrations",
      tableName: "dbmigrations"
    },
    seeds: {
      directory: "./src/data/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
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
    migrations: {
      directory: "./src/data/migrations",
      tableName: "dbmigrations"
    },
    seeds: { directory: "./src/data/seeds" }
  }
};
