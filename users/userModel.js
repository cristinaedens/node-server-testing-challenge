const db = require('../data/dbconfig');

module.exports = {
    add,
    remove,
    find
};

function add(user) {
    return db('users').insert(user)
}

function remove(id) {
    return db('users').where('id', id).del()
}

function find() {
    return db('users')
}