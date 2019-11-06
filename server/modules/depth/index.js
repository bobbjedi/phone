const pathDepth = require('./depthPath');
const config = require('../../helpers/configReader');

config.tradePairs.forEach(p =>{
    const [baseCoin, altCoin] = p.split('_');
    module.exports[p] = new pathDepth(baseCoin, altCoin);
});

