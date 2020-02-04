const db = require('../database/dbConfig.js');

module.exports = {
    get,
    getById,
    add,
    update,
    remove
}

function get(id){
    return db('sleepLog')
    .select( 'sleepLog.id', 'u.firstName', 'sleepLog.date', 'sleepLog.wakeUpRating', 'sleepLog.dayRating', 'sleepLog.nightRating', 'sleepLog.wokeUp', 'sleepLog.fellAsleep')
    .join('users as u', 'u.id', 'sleepLog.user_id')
    .where({user_id: id})
}

function getById(logId){
    return db('sleepLog')
    .where({id: logId})
    .first();
}

function add(log){
    return db('sleepLog').insert(log)
    .then(([id])=> {
        return getById(id);
    })
}

function remove(id){
    return db('sleepLog')
    .where({id})
    .del();
}

function update(id, changes){
    return db('sleepLog')
    .where({id})
    .update(changes);
}