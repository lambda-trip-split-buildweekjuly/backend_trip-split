exports.up = function(knex) {
  return knex.schema
    .createTable("trips", tbl => {
      tbl.increments();
      tbl.string("trip_name", 255).notNullable();
      tbl.string("trip_destination", 255).notNullable();
      tbl.integer("trip_no_of_people", 255).notNullable();
      tbl.string("trip_date", 255).notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
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
    })
    .createTable("expenses", tbl => {
      tbl.increments();
      tbl.string("expense_title", 255).notNullable();
      tbl.integer("expense_price", 11).notNullable();
      tbl.integer("expense_amount_paid", 11).notNullable();
      tbl.integer("expense_amount_owned", 11).notNullable();
      tbl.integer("expense_amount_owning", 11).notNullable();
      tbl
        .integer("people_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("peoples")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("trip_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("trips")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("expenses")
    .dropTableIfExists("peoples")
    .dropTableIfExists("trips");
};
