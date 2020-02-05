
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sleepLog').del()
    .then(function () {
      // Inserts seed entries
      return knex('sleepLog').insert([
        {id: 1,  date: '03/02/2120', wakeUpRating: 2, dayRating: 2, nightRating: 2, wokeup: "8:30 AM", fellAsleep: "11:00 PM", totalTimeSlept:"8:00", user_id:1},
        {id: 2,  date: '03/03/2120', wakeUpRating: 3, dayRating: 3, nightRating: 3, wokeup: "", fellAsleep: "",totalTimeSlept:"7:00",user_id:1},
        {id: 3, date: '03/02/2120', wakeUpRating: 1, dayRating: 2, nightRating: 3, wokeup: "7:30 AM", fellAsleep: "11:30 PM",totalTimeSlept:"6:00",user_id:2},
      ]);
    });
};
