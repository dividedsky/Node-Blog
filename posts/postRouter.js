const express = require('express');
const db = require('../data/helpers/postDb');
const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({errorMessage: 'There was an error retrieving the posts'}),
    );
});

module.exports = router;
