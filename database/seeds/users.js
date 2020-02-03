
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, firstName: 'Jim', lastName: 'Raynor', email:'jim@raynor.com', password:'test'},
        {id: 2, firstName: 'Randy', lastName: 'Marsh', email:'randy@marsh.com', password:'test2'}
      ]);
    });
};

