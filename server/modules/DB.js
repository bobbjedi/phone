const {syncNedb, modelDb} = require('../helpers/syncNedb');
const Datastore = require('nedb');
const config = require('../helpers/configReader');

module.exports = {
    usersDb: modelDb(syncNedb(new Datastore({
        filename: 'db/users',
        autoload: true
    }), 10)),

    storeDb: modelDb(syncNedb(new Datastore({
        filename: 'db/store',
        autoload: true
    }), 10)),
    
    restorePswdDb: modelDb(syncNedb(new Datastore({
        filename: 'db_/restorePswd',
        autoload: true
    }), 600)),

};

config.knownCoins.forEach(c=>{
    module.exports['depositsDb_' + c] = modelDb(syncNedb(new Datastore({
        filename: 'db/deposits/' + c,
        autoload: true
    })));
});

config.tradePairs.forEach(p=>{
    module.exports[p + '_Depth'] = modelDb(syncNedb(new Datastore({
        filename: 'db/depths/' + p,
        autoload: true
    }), 10));

    module.exports[p + '_CloseOrders'] = modelDb(syncNedb(new Datastore({
        filename: 'db/closeOrders/' + p,
        autoload: true
    })));
});
