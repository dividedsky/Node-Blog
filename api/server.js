const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

// MIDDLEWARE
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

// capitalize users name
const capitalizeName = (req, res, next) => {
  // expects an object with a 'name' field, ie: {name: 'justin'}
  if (!req.body.name) {
    res.status(400).json({errorMessage: 'no name in request'});
  } else {
    //req.body.name = req.body.name[0].toUpperCase() + req.body.name.slice(1);
    let name = req.body.name.split(' ');
    console.log(name);
    name = name.map(word => word[0].toUpperCase() + word.slice(1));
    console.log(name);
    req.body.name = name.join(' ');

    next();
  }
};

// ensure user exists
const checkForValidUser = (req, res, next) => {
  const id = req.params.id;
  userDb
    .get(id)
    .then(user => {
      // user was found, carry on
      if (user) {
        next();
      } else {
        res
          .status(400)
          .json({errorMessage: 'a user with that id does not exist'});
      }
    })
    .catch(err => {
      // i don't know what this error could be, actually
      res
        .status(500)
        .json({errorMessage: `there was an error retrieving the user: ${err}`});
    });
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
server.get('/users/:id', checkForValidUser, (req, res) => {
  userDb
    .get(req.params.id)
    // user is retrieved, send back to client
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err =>
      res
        .status(500)
        .json({errorMessage: `There was an error fetching the user: ${err}`}),
    );
});

// add a user
server.post('/users', capitalizeName, (req, res) => {
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
    .catch(err => res.status(500).json({errorMessage: 'user creation failed'}));
});

// update a user
server.put('/users/:id', checkForValidUser, capitalizeName, (req, res) => {
  userDb
    .update(req.params.id, req.body)
    .then(count => {
      // user has been updated. find updated user and return it
      userDb
        .get(req.params.id)
        .then(updatedUser => res.status(200).json(updatedUser))
        .catch(err =>
          res.status(500).json({
            errorMessage:
              'the user was updated, but there was an error finding the updated user',
          }),
        );
    })
    .catch(err => {
      // there was an error updating the user
      res
        .status(500)
        .json({errorMessage: `there was an error updating the user: ${err}`});
    });
});

// delete a user
server.delete('/users/:id', checkForValidUser, (req, res) => {
  userDb
    .remove(req.params.id)
    .then(count => {
      // return updated user list
      if (count === 1) {
        userDb
          .get()
          .then(users => res.status(200).json(users))
          .catch(err => {
            errorMessage: `user was deleted, but there was an error fetching the updated user list: ${err}`;
          });
      } // idk what happened
      else
        res
          .status(500)
          .send({errorMessage: 'there was an error removing the user'});
    })
    .catch(err => {
      errorMessage: 'there was an error deleting the user';
    });
});

// POST ROUTES

// export server
module.exports = server;
