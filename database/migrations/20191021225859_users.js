exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
        users.increments();

        users
            .string('username', 255)
            .notNullable()
            .unique();
        users.string('password', 255).notNullable()
        users.string('first_name', 255)
        users.string('last_name', 255)

    })
        .createTable('favorites', favorites => {
            favorites.increments()
            favorites
                .integer('user_id')
                .references('id')
                .inTable('users')
        })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('favorites')
        .dropTableIfExists('users')
};