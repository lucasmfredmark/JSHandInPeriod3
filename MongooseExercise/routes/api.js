let router = require("express").Router();
let Joke = require('../models/Joke');

router.get('/jokes', (req, res) => {
  Joke.find({}, (err, jokes) => {
    if (err) throw err;
    res.json(jokes);
  });
});

router.get('/jokes/:id', (req, res) => {
  Joke.findById(req.params.id, (err, joke) => {
    if (err) throw err;
    res.json(joke);
  });
});

router.post('/jokes', (req, res) => {
  let joke = new Joke(req.body);

  joke.save((err, newJoke) => {
    if (err) throw err;
    res.status(200).json(newJoke);
  });
});

router.put('/jokes/:id', (req, res) => {
  Joke.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, newJoke) => {
    if (err) throw err;
    res.json(newJoke);
  });
});

router.delete('/jokes/:id', (req, res) => {
  Joke.findByIdAndRemove(req.params.id, (err, removedJoke) => {
    if (err) throw err;
    res.status(204).end();
  });
});

module.exports = router;
