const router = require('express').Router();
const db = require('../database/dbConfig')
const Favorites = require('./favorites-model')

//gets list of all users for me delete at some point
router.get('/users', (req, res) => {
    Favorites.find()
        .then(allUsers => {
            res.status(200).json(allUsers)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get users' });
        });
})

//gets one user object
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

//adds new favorites
router.post('/users/:id', (req, res) => {
    favData = { ...req.body, user_id: req.params.id }
    const id = req.params.id
    Favorites
        .findById(id)
        .then(user => {
            Favorites
                .addFavorites(favData)
                .then(newFavorite => {
                    Favorites.findUserFavorites(id)
                        .then(favorites => {
                            const userFavs = favorites.map(fav => {
                                return {
                                    id: fav.id,
                                    favorites: fav.favorites,
                                    notes: fav.notes
                                }
                            })
                            res.status(201).json({ ...user, favortes: userFavs })
                        })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json(err);
                })
        })
        .catch(err => {
            console.log(err, 'this one')
            res.status(500).json({ message: 'Failed to add new favorite' });
        });

})

//deletes favorites
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

//edit notes
router.put('/:id/notes', (req, res) => {
    const noteData = req.body.notes
    const id = req.params.id
    Favorites
        .findFavoriteById(id)
        .then(favorite => {
            Favorites
                .editNotes({ notes: noteData }, id)
                .then(newNote => {
                    res.status(201).json(newNote)
                })
                .catch(err => console.log(err))
        })
        .catch(err => {
            console.log(err, 'this one notes')
            res.status(500).json({ message: 'Failed to add new note' });
        });
})



module.exports = router;
