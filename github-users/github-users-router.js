const axios = require('axios')
const router = require('express').Router();

router.get('/', (req, res) => {
    const requestOptions = {
        headers: { accept: 'application/json' },
    }

    axios
        .get('https://api.github.com/user', requestOptions)
        .then(res => {
            res.status(200).json(res)
        })
        .catch(err => {
            res.status(500).json({ message: 'error on github api' });
        });
})

module.exports = router;