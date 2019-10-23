const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Users = require('./auth-model')
const secret = require('../config/secrets')


router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error adding user" });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          id: user.id,
          message: `Hi, ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "error logging in" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error logging in" });
    });
});



function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secret.jwtSecret, options)
}



module.exports = router;

