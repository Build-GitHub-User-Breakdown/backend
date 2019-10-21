
exports.up = function (knex) {
    return knex.schema.createTable('favorites', favorites => {
        favorites.increments()
        favorites
            .integer('user_id')
            .references('id')
            .inTable('users')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('favorites');
};
