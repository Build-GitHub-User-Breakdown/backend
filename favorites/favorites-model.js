const db = require('../database/dbConfig');

module.exports = {
    find,
    findById,
    findUserFavorites,
    findFavoriteById,
    addFavorites,
    deleteFavorites,
    editNotes,
};

function find() {
    return db('users')
}

function findById(id) {
    return db('users')
        // .select('username', 'first_name', 'last_name')
        .where({ id })
        .first()
}

function findUserFavorites(id) {
    return db('favorites')
        .where('user_id', id)
}

function findFavoriteById(id) {
    return db('favorites')
        .where({ id })
}

function addFavorites(newfav) {
    return db('favorites').insert(newfav)
}

function deleteFavorites(id) {
    return db('favorites').where({ id }).del()
}

function editNotes(changes, id) {
    console.log(changes, id)
    return db('favorites').where({ id }).update(changes)
}

