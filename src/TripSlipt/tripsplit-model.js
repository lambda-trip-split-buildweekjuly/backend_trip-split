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
  getTripById,
  addExpenses,
  getTripByUserId
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

function createTrip(data, peoples) {
  return db
    .transaction(function(trx) {
      return trx
        .insert(data)
        .into("trips")
        .returning("*")
        .then(function(output) {
          peoples.forEach(elem => (elem.trip_id = output[0].id));
          return trx("peoples").insert(peoples);
        });
    })
    .catch(function(error) {
      return error;
    });
}
async function getAllTrips() {
  const allTrip = await db("trips").select(
    "id as trip_id",
    "trip_name",
    "trip_destination",
    "trip_no_of_people",
    "trip_opened",
    "trip_date",
    "user_id"
  );
  const allPeople = await db("peoples").select("id", "people_name", "trip_id");
  const allExpense = await db("expenses").select("expense_title", "expense_price", "trip_id", "id");

  const computedTrip = allTrip.map(trip => {
    return {
      ...trip,
      people: allPeople.filter(elem => trip.trip_id === elem.trip_id),
      expense: allExpense.filter(elem => trip.trip_id === elem.trip_id)
    };
  });

  const computedTripTwo = await Promise.all(
    computedTrip.map(async trip => {
      let arrayForExpense = [];
      if (trip.expense.length >= 0) {
        try {
          for (let i = 0; i < trip.expense.length; i++) {
            
            const memebers = await db("expenseMembers")
              .select("expense_amount_paid", "expense_id", "people_id")
              .where("expense_id", trip.expense[i].id);
            arrayForExpense.push({ ...trip.expense[i], memebers });
          }
        } catch (err) {
          return err;
        }
      }
      trip.expense = arrayForExpense;
      return trip;
    })
  );
  return computedTripTwo;
}

async function getTripById(id) {
  const trip = await db("trips")
    .select(
      "id as trip_id",
      "trip_name",
      "trip_destination",
      "trip_no_of_people",
      "trip_opened",
      "trip_date",
      "user_id"
    )
    .where("id", id);
  const people = await db("peoples")
    .select(["id", "people_name"])
    .where("trip_id", id);
  const expense = await db("expenses")
    .select("expense_title", "expense_price", "trip_id", "id")
    .where("trip_id", id);

  const helper1 = async expense => {
    let arrayForExpense = [];
    if (expense.length >= 0) {
      try {
        for (let i = 0; i < expense.length; i++) {
          const members = await db("expenseMembers")
            .select("expense_amount_paid", "expense_id", "people_id")
            .where("expense_id", expense[i].id);
          arrayForExpense.push({ ...expense[i], members });
        }
      } catch (err) {
        return err;
      }
    }
    return arrayForExpense;
  };
  return { ...trip[0], people, expense: [await helper1(expense)] };
}
async function getTripByUserId(id) {
  const allTrip = await db("trips").select(
    "id as trip_id",
    "trip_name",
    "trip_destination",
    "trip_no_of_people",
    "trip_opened",
    "trip_date",
    "user_id"
  ).where('user_id', id);
  const allPeople = await db("peoples").select("id", "people_name", "trip_id");
  const allExpense = await db("expenses").select("expense_title", "expense_price", "trip_id", "id");

  const computedTrip = allTrip.map(trip => {
    return {
      ...trip,
      people: allPeople.filter(elem => trip.trip_id === elem.trip_id),
      expense: allExpense.filter(elem => trip.trip_id === elem.trip_id)
    };
  });

  const computedTripTwo = await Promise.all(
    computedTrip.map(async trip => {
      let arrayForExpense = [];
      if (trip.expense.length >= 0) {
        try {
          for (let i = 0; i < trip.expense.length; i++) {
            
            const memebers = await db("expenseMembers")
              .select("expense_amount_paid", "expense_id", "people_id")
              .where("expense_id", trip.expense[i].id);
            arrayForExpense.push({ ...trip.expense[i], memebers });
          }
        } catch (err) {
          return err;
        }
      }
      trip.expense = arrayForExpense;
      return trip;
    })
  );
  return computedTripTwo;
}


function addExpenses(expenseDetails, expenseMember) {
  return db
    .transaction(function(trx) {
      return trx
        .insert(expenseDetails)
        .into("expenses")
        .returning("*")
        .then(function(output) {
          console.log(output);
          expenseMember.forEach(elem => (elem.expense_id = output[0].id));
          return trx("expenseMembers").insert(expenseMember);
        });
    })
    .catch(function(error) {
      return error;
    });
}
