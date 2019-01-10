const userDb = require('../data/helpers/userDb');
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

module.exports = checkForValidUser;
