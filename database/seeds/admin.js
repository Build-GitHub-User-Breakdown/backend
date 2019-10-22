
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('new-users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('new-users').insert([
        { username: "admin", password: "admin" },
      ]);
    });
};
