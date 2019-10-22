
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('favorites').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        { user_id: 1, favorites: 'jtmccutcheon' },
        { user_id: 1, favorites: 'thejoshcooter' },
        { user_id: 1, favorites: 'lilmatchamonster' },
      ]);
    });
};
