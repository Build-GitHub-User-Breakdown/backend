
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').delete()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: "admin", password: "admin" },
      ]);
    });
};
