var express = require('express');
var router = express.Router();

const jokes = require('../models/jokes');

router.get('/jokes', function(req, res, next) {
  jokes.allJokes(function(err, jokes) {
    if (err) throw err;
    res.json(jokes);
  });
});

router.post('/jokes', function(req, res, next) {
  jokes.addJoke(req.body, function(err, joke) {
    if (err) throw err;
    res.json(joke);
  });
});

router.put('/jokes', function(req, res, next) {
  jokes.editJoke(req.body, function(err, joke) {
    if (err) throw err;
    res.json(joke);
  });
});

router.delete('/jokes/:id', function(req, res, next) {
  jokes.deleteJoke(req.params.id, function(err, joke) {
    if (err) throw err;
    res.json(joke);
  });
});

router.get('/jokes/random', function(req, res, next) {
  jokes.randomJoke(function(err, joke) {
    if (err) throw err;
    res.json(joke);
  });
});

module.exports = router;
