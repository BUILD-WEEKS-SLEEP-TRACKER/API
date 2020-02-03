
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sleepLog').del()
    .then(function () {
      // Inserts seed entries
      return knex('sleepLog').insert([
        {id: 1,  date: '03/02/2120', wakeUpRating: 2, dayRating: 2, nightRating: 2, user_id:1},
        {id: 2,  date: '03/03/2120', wakeUpRating: 3, dayRating: 3, nightRating: 3, user_id:1},
        {id: 3, date: '03/02/2120', wakeUpRating: 1, dayRating: 2, nightRating: 3, user_id:2},
      ]);
    });
};
