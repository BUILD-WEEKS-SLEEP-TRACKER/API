
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, firstName: 'Jim', lastName: 'Raynor', email:'jim@raynor.com', password:'$2a$08$q2e5A3jVRRz6AEN8VrqMo.9noBV7PVaKORybOoZwYqw8M7rL.qxmG'},
        {id: 2, firstName: 'Randy', lastName: 'Marsh', email:'randy@marsh.com', password:'$2a$08$b5DoB.g3RaBSf6uwzlNel.7nAWNNZjSN1rYIW518KlgrGy6aUr9nq'}
      ]);
    });
};

