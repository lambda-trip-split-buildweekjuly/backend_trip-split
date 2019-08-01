exports.up = function(knex) {
  return knex.schema
    .createTable("trips", tbl => {
      tbl.increments();
      tbl.string("trip_name", 255).notNullable();
      tbl.string("trip_destination", 255).notNullable();
      tbl.integer("trip_no_of_people", 255).notNullable();
      tbl.boolean("trip_opened").notNullable();
      tbl.string("trip_date", 255).notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.timestamps(false, true);
    })
    .createTable("peoples", tbl => {
      tbl.increments();
      tbl.string("people_name", 255).notNullable();
      tbl
        .integer("trip_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("trips")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.timestamps(false, true);
    })
    .createTable("expenses", tbl => {
      tbl.increments();
      tbl.string("expense_title", 255).notNullable();
      tbl.integer("expense_price", 11).notNullable();
      tbl
        .integer("trip_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("trips")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.timestamps(false, true);
    })
    .createTable("expenseMembers", tbl => {
      tbl.increments();
      tbl.integer("expense_amount_paid", 11).notNullable();
      tbl
        .integer("expense_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("expenses")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("people_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("peoples")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.timestamps(false, true);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("expenseMembers")
    .dropTableIfExists("expenses")
    .dropTableIfExists("peoples")
    .dropTableIfExists("trips");
};
