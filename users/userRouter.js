const capitalizeName = require('../common/capitalizeName');
const checkForValidUser = require('../common/checkForValidUser');
const userDb = require('../data/helpers/userDb');

const express = require('express');
const router = express.Router();

// USER ROUTES
router.get('/', (req, res) => {
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
router.get('/:id', checkForValidUser, (req, res) => {
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

//// add a user
router.post('/users', capitalizeName, (req, res) => {
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

//// update a user
router.put('/users/:id', checkForValidUser, capitalizeName, (req, res) => {
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

//// delete a user
router.delete('/users/:id', checkForValidUser, (req, res) => {
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

module.exports = router;
