const db = require('../data/helpers/postDb');

module.exports = (req, res, next) => {
  db.get(req.params.id)
    .then(post => {
      if (!post) {
        // no post!
        res.status(404).json({errorMessage: `there is no post with that id!`});
      } else next();
    })
    .catch(err =>
      res.status(500).json({errorMessage: `there was an error: ${err}`}),
    );
};
