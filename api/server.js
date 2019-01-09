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
      console.log(users);

      res.status(200).json(users);
    })
    .catch(err =>
      res.status(400).json({
        errorMessage: `there was an error retrieving the users: ${err}`,
      }),
    );
});

// get specific user
server.get('/users/:id', (req, res) => {
  userDb
    .get(req.params.id)
    // user is retrieved, send back to client
    .then(user => {
      if (user) {
        console.log(user);

        res.status(200).json(user);
      } else {
        // user not found, return error
        res.status(404).json({errorMessage: `no user with that id`});
      }
    });
});

// export server
module.exports = server;
