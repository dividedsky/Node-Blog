const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const server = express();

// middleware
server.use(morgan('dev'));
server.use(express.json());
server.use(helmet());

// routes
server.get('/', (req, res) => {
  res.status(200).send('sanity check!');
});

// user routes
server.get('/users/', (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      errorMessage: `there was an error retrieving the users: ${err}`;
    });
});

// export server
module.exports = server;
