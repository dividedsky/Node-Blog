const configureMiddleware = require('../config/middleware');
const userRouter = require('../users/userRouter');
const postRouter = require('../posts/postRouter');

const express = require('express');

const server = express();

configureMiddleware(server);

// ROUTES
server.get('/', (req, res) => {
  res.status(200).send('sanity check!');
});

server.use('/users', userRouter);

// POST ROUTES
server.use('/posts', postRouter);

// export server
module.exports = server;
