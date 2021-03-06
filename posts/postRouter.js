const checkForValidUser = require('../common/checkForValidUser');
const checkForValidPost = require('../common/checkForValidPost');
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

router.get('/:id', (req, res) => {
  db.get(req.params.id)
    .then(post => {
      if (!post)
        res.status(400).json({errorMessage: 'there is no post with that id!'});
      else {
        res.status(200).json(post);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({errorMessage: `there was an error getting the post: ${err}`}),
    );
});

router.post('/:id', checkForValidUser, (req, res) => {
  // valid user is checked for by middleware, but check to ensure text is present
  if (!req.body.text) {
    res.status(400).json({errorMessage: 'the text field must not be empty'});
  } else {
    db.insert({userId: req.params.id, text: req.body.text})
      .then(id => {
        // post has been created, find it and return to user
        db.get(id)
          .then(post => res.status(201).json({post}))
          .catch(err =>
            res.status(500).json({
              errorMessage: `there was an error retrieving the new post: ${err}`,
            }),
          );
      })
      .catch(err =>
        res
          .status(500)
          .json({errorMessage: `there was an error creating the post: ${err}`}),
      );
  }
});

router.delete('/:id', checkForValidPost, (req, res) => {
  db.remove(req.params.id)
    .then(res.status(200).json({message: 'the post has been deleted'}))
    .catch(err =>
      res.status(500).json({
        errorMessage: `there was an error deleting the post: ${err}`,
      }),
    );
});

router.put('/:id', checkForValidPost, (req, res) => {
  // ensure post is valid
  db.update(req.params.id, req.body)
    .then(count => {
      if (count === 1) {
        // find the updated post and return it
        db.get(req.params.id)
          .then(post => res.status(200).json(post))
          .catch(err =>
            res
              .status(500)
              .json({
                errorMessage: `there was an error retrieving the updated post: ${err}`,
              }),
          );
      } else {
        res
          .status(500)
          .json({errorMessage: `there was an error updating the post!!`});
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({errorMessage: `there was an error updating the post: ${err}`}),
    );
});

module.exports = router;
