exports.up = function(knex) {
  return knex.schema
    .createTable("expenses", tbl => {
      tbl.increments();
      tbl.string("expense_title", 255).notNullable();
      tbl.integer("expense_price", 11).notNullable();
    })
    .createTable("trips", tbl => {
      tbl.increments();
      tbl.string("trip_name", 255).notNullable();
      tbl.string("trip_destination", 255).notNullable();
      tbl.integer("trip_no_of_people", 255).notNullable();
      tbl.string("trip_date", 255).notNullable();
      tbl
        .integer("expense_id")
        .unsigned()
        .references("id")
        .inTable("expenses")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
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
      tbl.integer("people_amount_paid", 11).notNullable();
      tbl.integer("people_amount_owned", 11).notNullable();
      tbl.integer("people_amount_owning", 11).notNullable();
      tbl
        .integer("trip_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("trips")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("expense_id")
        .unsigned()
        .references("id")
        .inTable("expenses")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("peoples")
    .dropTableIfExists("trips")
    .dropTableIfExists("expenses");
};
