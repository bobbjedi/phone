const Store = require('../helpers/Store');
const ethAddress = require('./coinsUtils/ETH/api').ADDRESS;
const bipAddress = require('./coinsUtils/BIP/api').ADDRESS;
const btcAddress = require('./coinsUtils/BTC/api').ADDRESS;
module.exports = (req, res, success) => { 
    success({
        pairsData: Store.pairsData,
        addresses: {
            BIP: bipAddress,
            ETH: ethAddress,
            BTC: btcAddress
        }
    }, res);
};
