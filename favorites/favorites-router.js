const router = require('express').Router();
const db = require('../database/dbConfig')
const Favorites = require('./favorites-model')
const Users = require('../auth/auth-model')

router.get('/users', (req, res) => {
    Users.findAllUsers()
        .then(allUsers => {
            res.status(200).json(allUsers)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get user' });
        });
})

router.get('/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Could not find user with given id.' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get user' });
        });
})



module.exports = router;
