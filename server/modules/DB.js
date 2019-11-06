const {syncNedb, modelDb} = require('../helpers/syncNedb');
const Datastore = require('nedb');
const config = require('../helpers/configReader');

module.exports = {
    usersDb: modelDb(syncNedb(new Datastore({
        filename: 'db/users',
        autoload: true
    }), 10)),

    depositsDb: modelDb(syncNedb(new Datastore({
        filename: 'db/deposits',
        autoload: true
    }))),

    storeDb: modelDb(syncNedb(new Datastore({
        filename: 'db/store',
        autoload: true
    }), 10))
};

config.tradePairs.forEach(p=>{
    module.exports[p + '_Depth'] = modelDb(syncNedb(new Datastore({
        filename: 'db/' + p + '_Depth',
        autoload: true
    }), 10));

    module.exports[p + '_CloseOrders'] = modelDb(syncNedb(new Datastore({
        filename: 'db/' + p + '_CloseOrders',
        autoload: true
    }), 10));


});
