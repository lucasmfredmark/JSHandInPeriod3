const db = require('../db/db');

exports.allJokes = function(callback) {
    db.get().collection('jokes').find().toArray(function(err, jokes) {
        if (err) return callback(err, null);
        return callback(null, jokes);
    });
};

exports.findJoke = function(jokeId, callback) {
    db.get().collection('jokes').findOne({ _id: jokeId }, function(err, joke) {
        if (err) return callback(err, null);
        return callback(null, joke);
    });
};

exports.addJoke = function(joke, callback) {
    db.get().collection('jokes').insertOne(joke, function(err) {
        if (err) return callback(err, null);
        return callback(null, joke);
    });
};

exports.editJoke = function(joke, callback) {
    db.get().collection('jokes').updateOne({ _id: joke.id }, joke, function(err) {
        if (err) return callback(err, null);
        return callback(null, joke);
    });
};

exports.deleteJoke = function(jokeId, callback) {
    db.get().collection('jokes').deleteOne({ _id: jokeId }, function(err, joke) {
        if (err) return callback(err, null);
        return callback(null, joke);
    });
};

exports.randomJoke = function(callback) {
    db.get().collection('jokes').aggregate({ $sample: { size: 1 } }, function(err, joke) {
        if (err) return callback(err, null);
        return callback(null, joke);
    });
};