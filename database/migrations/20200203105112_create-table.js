exports.up = function(knex) {
    return knex.schema.createTable('users', users=> {
        
        users.increments();

        users.string('firstName', 128)
        .notNullable();

        users.string('lastName', 128)
        .notNullable();
  
        users
        .string('email', 128)
        .notNullable()
        .unique();
  
        users.string('password', 128)
          .notNullable();

    })

    .createTable('sleepLog', tbl => {
        tbl.increments();
        tbl.date('date')
        .notNullable()
        .unique();
        tbl.integer('wakeUpRating')
        .notNullable();
        tbl.integer('dayRating')
        .notNullable();
        tbl.integer('nightRating')
        .notNullable();
    })


  };

  exports.down = function(knex, Promise) {
  
    return knex.schema
    .dropTableIfExists('sleepLog')
    .dropTableIfExists('users')

};
