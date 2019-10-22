const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware')
const authRouter = require('../auth/auth-router.js');
const favoritesRouter = require('../favorites/favorites-router')


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth/', authRouter);
server.use('/api/favorites', authenticate, favoritesRouter)
// server.use('/api/git', authenticate, gitRouter);

server.get('/', (req, res) => {
    res.send("hi from server")
})

module.exports = server;