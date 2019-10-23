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
            favorites.increments() //the ID; a primary key
            favorites.string('favorites', 255) // the github username
            favorites.text('notes', 500) // the note itself
            favorites // user ID; a foreign key
                .integer('user_id')
                .references('id')
                .inTable('users')
                .unsigned()
                .notNullable()
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
};

exports.down = function (knex, Promise) {
    return knex.schema
        // .dropTableIfExists('notes')
        .dropTableIfExists('favorites')
        .dropTableIfExists('users')
};