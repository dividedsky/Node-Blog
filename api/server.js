const postDb = require('../data/helpers/postDb');
const configureMiddleware = require('../config/middleware');
const userRouter = require('../users/userRouter');

const express = require('express');

const server = express();

configureMiddleware(server);

// ROUTES
server.get('/', (req, res) => {
  res.status(200).send('sanity check!');
});

server.use('/users', userRouter);
// POST ROUTES

// export server
module.exports = server;
