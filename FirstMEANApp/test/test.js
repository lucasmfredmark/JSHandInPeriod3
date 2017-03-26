const expect = require('chai').expect;
const http = require('http');
const request = require('request');

const db = require('../db/db');
const DB_URL = 'mongodb://localhost:27017/firstmeanapp';

var server;
const app = require('../app');
const port = 3000;

const jokes = require('../models/jokes');

describe('Testing Joke API', function() {
    before(function(done) {
        db.connect(DB_URL, function(err) {
            if (err) return console.log('Could not connect to database.');

            server = http.createServer(app);
            server.listen(port, function() {
                done();
            });
        });
    });

    describe('GET: /api/jokes/random', function() {
        it('should return a random joke from all the jokes', function(done) {
            request.get('http://localhost:' + port + '/api/jokes/random', function(error, response, body) {
                let joke = JSON.parse(body);
                expect(joke).to.have.lengthOf(1);
                done();
            });
        });
    });

    describe('GET: /api/jokes', function() {
        it('should return all the jokes', function(done) {
            request.get('http://localhost:' + port + '/api/jokes', function(error, response, body) {
                let jokes = JSON.parse(body);
                expect(jokes).to.have.length.above(5);
                done();
            });
        });
    });

    describe('POST: /api/jokes', function() {
        it('should return all the jokes with the new one added', function(done) {
            const jokeToAdd = { joke: 'It\'s better to be late than to arrive ugly.' };
            const options = {
                url: 'http://localhost:' + port + '/api/jokes',
                method: 'POST',
                json: true,
                body: jokeToAdd
            };

            request(options, function(error, response, body) {
                let newJoke = body;
                expect(newJoke).to.have.property('_id').and.not.equal(null);
                expect(newJoke.joke).to.be.equal(jokeToAdd.joke);
                done();
            });
        });
    });

    describe('PUT: /api/jokes', function() {
        it('should return the updated joke', function(done) {
            const jokeToUpdate = {
                _id: 2,
                joke: 'Reality is an illusion created by a lack of alcohol',
                type: ['short', 'alcohol', 'quote'],
                reference: { author: 'Someone', link: ''},
                lastEdited: new Date()
            };
            const options = {
                url: 'http://localhost:' + port + '/api/jokes',
                method: 'PUT',
                json: true,
                body: jokeToUpdate
            };

            request(options, function(error, response, body) {
                const updatedJoke = body;
                expect(updatedJoke).to.have.property('_id').and.not.equal(null);
                expect(updatedJoke.joke).to.be.equal(jokeToUpdate.joke);
                expect(updatedJoke.lastEdited).to.not.equal(jokeToUpdate.lastEdited);
                done();
            });
        });
    });

    after(function(done) {
        server.close();
        done();
    });
});