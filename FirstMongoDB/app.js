const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// connection URL
const url = 'mongodb://localhost:27017/firstmongodb';

// use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to server.');

    insertDocuments(db, function() {
        indexCollection(db, function() {
            db.close();
        });
    });
});

var insertDocuments = function(db, callback) {
    // insert some documents
    db.collection('documents').insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log('Inserted 3 documents into the collection.');
        callback(result);
    });
};

var findDocuments = function(db, callback) {
    // find some documents
    db.collection('documents').find({ a: 3 }).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log('Found the following records:');
        console.log(docs);
        callback(docs);
    });
};

var updateDocument = function(db, callback) {
    // update document where a is 2, set b equal to 1
    db.collection('documents').updateOne({ a: 2 }, { $set: { b: 1 } }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log('Updated the document with the field a equal to 2.');
        callback(result);
    });
};

var removeDocument = function(db, callback) {
    // delete document where a is 3
    db.collection('documents').deleteOne({ a: 3 }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log('Removed the document with the field a equal to 3.');
        callback(result);
    });
};

var indexCollection = function(db, callback) {
    db.collection('documents').createIndex({ a: 1 }, null, function(err, results) {
        console.log(results);
        callback();
    });
};