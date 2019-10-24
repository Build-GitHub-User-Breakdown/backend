router = require('express').Router();

const knex = require('knex');

const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig.development);


router.get('/users/:id', (req, res) => {
    const id = req.params.id
    Favorites.findById(id)
        .then(user => {
            Favorites.findUserFavorites(id)
                .then(favorites => {
                    // console.log(favorites)
                    const userFavs = favorites.map(fav => {
                        return {
                            id: fav.id,
                            favorites: fav.favorites,
                            notes: fav.notes
                        }
                    })
                    res.status(200).json({ ...user, favorites: userFavs });
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json(err);
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
})
