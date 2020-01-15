const {usersDb, storeDb} = require('../modules/DB');
const config = require('../helpers/configReader');
const $u = require('./utils');
const _ = require('underscore');
const depth = require('../modules/depth');

module.exports = {
    pairsData: {},

    async init(){
        let system = await storeDb.findOne({});
        if (!system){
            system = new storeDb({});
        }
        system.save();
        this.system = system;
        setInterval(() => this.updatePairsData(), 5000);
    },
    updatePairsData(){
        config.tradePairs.forEach(c=>{
            this.pairsData[c] = {lastPrice: depth[c].lastPrice};
        });
    }
};

module.exports.init();
