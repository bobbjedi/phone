const Db = require('../modules/DB');
const config = require('../helpers/configReader');
const $u = require('./utils');
const _ = require('underscore');
const depth = require('../modules/depth');

module.exports = {
    pairsData: {},
    usersBlockedActions: {},
    async init(){
        let system = await Db.storeDb.findOne({});
        if (!system){
            system = new Db.storeDb({});
        }
        system.save();
        this.system = system;
        setInterval(() => this.updatePairsData(), 5000);
    },
    updatePairsData(){
        config.tradePairs.forEach(async c=>{
            // this.pairsData[c] = {lastPrice: depth[c].lastPrice};
            this.pairsData[c] = {};
            const history = (await Db[c + '_CloseOrders']
                .find({isTaker: true}))
                .sort((a, b) => b.time - a.time)
                .slice(0, 20)
                .map(o=>{
                    return {
                        time: o.time,
                        amount: o.amount,
                        price: o.price,
                        type: o.type,
                    };
                });
            this.pairsData[c].history = history;
            this.pairsData[c].lastPrice = history[0] || {type: '', price: 0};
        });
    }
};

module.exports.init();
