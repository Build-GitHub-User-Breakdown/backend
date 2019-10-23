
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('favorites').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        { user_id: 1, favorites: 'jtmccutcheon', notes: 'the best' },
        { user_id: 1, favorites: 'thejoshcooter', notes: 'actual best' },
        { user_id: 1, favorites: 'lilmatchamonster', notes: 'Real best' },
      ]);
    });
};
