const {syncNedb, modelDb} = require('../helpers/syncNedb');
const Datastore = require('nedb');

module.exports = {
    usersDb: modelDb(syncNedb(new Datastore({
        filename: 'db/users',
        autoload: true
    }), 10)),
   
    txsDb: modelDb(syncNedb(new Datastore({
        filename: 'db/txs',
        autoload: true
    }), 10))
};