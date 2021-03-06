const router = require('express').Router();
const db = require('../database/dbConfig')
const Favorites = require('./favorites-model')


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
                            res.status(201).json({ favorites: userFavs })
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


router.delete('/:id/:favId', (req, res) => {
    const favId = req.params.favId
    const id = req.params.id
    Favorites
        .findById(id)
        .then(user => {
            Favorites
                .deleteFavorites(favId)
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
                            res.status(201).json({ favorites: userFavs })
                        })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json(err);
                })
        })
        .catch(err => {
            console.log(err, 'this one')
            res.status(500).json({ message: 'Failed to delete favorite' });
        });
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
