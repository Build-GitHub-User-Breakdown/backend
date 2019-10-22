const db = require('../database/dbConfig');

module.exports = {
    find,
    findById,
};

function find() {
    return db('users')
}

function findById(id) {
    return db('users')
        .select('username', 'first_name', 'last_name')
        .where({ id })

}

