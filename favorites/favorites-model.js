const db = require('../database/dbConfig');

module.exports = {
    find,
    findById,
    findUserFavorites,
    addFavorites
};

function find() {
    return db('users')
}

function findById(id) {
    return db('users')
        .select('username', 'first_name', 'last_name')
        .where({ id })
}

function addFavorites(favorite, user_id) {
    return db('favorites')
        .insert({ ...favorite, user_id })
        .then(id => {
            return db('favorites').where({ id: id[0] })
        })
}

function findUserFavorites(userId) {
    return db('favorites')
        .join('users', 'users.id', 'favorites.user_id')
        .select('favorites.id', 'favorites.favorites', 'users.username')
        .where({ user_id: userId })
}