/* Centralize DB access */

var MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server;

client = new MongoClient(new Server("localhost", 27017), {native_parser: true});

exports.db = client.db('wmiki');

client.open(function(err) {
    if (err)
        throw 'Couldn\'t connect to MongoDB';
});
