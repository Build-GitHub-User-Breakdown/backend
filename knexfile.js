const localPg = {
    host: 'localhost',
    port: 3300,
    user: 'justin',
    database: 'favorites',
};

const pgUser = process.env.PG_USER || 'justin';
const pgDb = process.env.PG_DB || 'favorites';

const prodConnection = `postgres://${pgUser}@localhost/${pgDb}`;

module.exports = {

    development: {
        client: 'sqlite3',
        connection: { filename: './database/auth.db3' },
        useNullAsDefault: true,
        migrations: {
            directory: './database/migrations',
        },
        seeds: { directory: './database/seeds' },
        pool: {
            afterCreate: (conn, done) => {
                // enforces foreign key constraints on SQLite, not needed for other DBMS
                conn.run('PRAGMA foreign_keys = ON', done);
            },
        },
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'pg',
        connection: prodConnection,
        migrations: {
            directory: './database/migrations',
        },
        seeds: { directory: './database/seeds' },
        pool: {
            min: 2,
            max: 10,
        },
    }
};
