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
    Favorites.findUserFavorites(req.params.id)
        .then(favorites => {
            res.status(200).json(favorites)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get favorites' });
        });
})

router.post('/users/:id', (req, res) => {
    favData = req.body
    const { id } = req.params
    Favorites
        .findById(id)
        .then(user => {
            if (user) {
                Favorites
                    .addFavorites(favData, id)
                    .then(newFavorite => {
                        res.status(201).json(newFavorite)
                    })
            } else {
                res.status(404).json({ message: 'could not find user with given id' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to create new step' });
        });

})



module.exports = router;
