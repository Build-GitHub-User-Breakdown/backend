const router = require('express').Router();
const db = require('../database/dbConfig')
const Favorites = require('./favorites-model')


router.get('/users', (req, res) => {
    Favorites.find()
        .then(allUsers => {
            res.status(200).json(allUsers)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get users' });
        });
})

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
                            githubUser: fav.favorites,
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

router.delete('/users/:id/:favId', (req, res) => {
    const id = req.params.id
    Favorites.findById(id)
        .then(user => {
            Favorites.f
        })
})

router.post('/users/:id', (req, res) => {
    favData = { ...req.body, user_id: req.params.id }
    const id = req.params.id
    Favorites
        .findById(id)
        .then(user => {
            if (user) {
                Favorites
                    .addFavorites(favData)
                    .then(newFavorite => {
                        res.status(201).json(newFavorite)
                    })
            } else {
                res.status(404).json({ message: 'could not find user with given id' })
            }
        })
        .catch(err => {
            console.log(err, 'this one')
            res.status(500).json({ message: 'Failed to add new favorite' });
        });
})


router.delete('/:id', (req, res) => {
    Favorites
        .deleteFavorites(req.params.id)
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
})





module.exports = router;
