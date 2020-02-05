const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  remove,
  findBy,
  findById,
};


function find() {
  return db('users').select('id', 'firstName', 'lastName');
}

function findBy(email) {
    return db('users').where({email});
  }

  function remove(id) {
    return db('users')
    .where({id})
    .del(id);
  }

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}