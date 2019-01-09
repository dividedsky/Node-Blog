const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const server = express();

// MIDDLEWARE
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

// yelling is better
const uppercaseName = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
};

// ROUTES
server.get('/', (req, res) => {
  res.status(200).send('sanity check!');
});

// USER ROUTES
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

// add a user
server.post('/users', uppercaseName, (req, res) => {
  // expects an object with a 'name' field, ie: {name: 'justin'}
  if (!req.body.name) {
    res.status(400).json({errorMessage: 'no name in request'});
  } else {
    userDb
      .insert(req.body)
      .then(newUser => {
        // user has been created. return created user
        userDb
          .get(newUser.id)
          .then(user => res.status(201).json({user}))
          .catch(err => {
            // get by id failed
            res
              .status(500)
              .json({errorMessage: 'User was created, but find failed'});
          });
      })
      // insert failed
      .catch(err =>
        res.status(500).json({errorMessage: 'user creation failed'}),
      );
  }
});

// export server
module.exports = server;
