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

    //create dailyMood rating and timeCreated variable

    .createTable('sleepLog', tbl => {
        tbl.increments();
        tbl.date('date',20) // 01/01/2020
        .notNullable();
        tbl.date('timeCreated')
        .notNullable();
        tbl.integer('wakeUpRating')
        .notNullable();
        tbl.integer('dayRating')
        .notNullable();
        tbl.integer('nightRating')
        .notNullable();
        tbl.time('wokeUp');
        tbl.time('fellAsleep');
        tbl.integer('totalTimeSlept')
        .notNullable();
        tbl.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })


    
  };

  exports.down = function(knex, Promise) {
  
    return knex.schema
    .dropTableIfExists('sleepLog')
    .dropTableIfExists('users')

};
