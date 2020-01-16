const DB = require('../../modules/DB')
const {usersDb, depositsDb} = DB;
const config = require('../../helpers/configReader');
const sha256 = require('sha256');
const log = require('../log');

module.exports = {
    clone: require('clone'),
    round(n) {
        return Number(n.toFixed(8));
    },
    unix(){
        return new Date().getTime();
    },
    async getUserFromQ (q, opt = {}) {
        const user = await usersDb.findOne(q);
        const {openOrders, closeOrders} = opt;
        if (!user){
            return;
        }
        // TODO: В отлельные методы утилиты / тяжелые запросы
        user.openOrders = {};
        user.closeOrders = {};
        if (openOrders){
            const {deposits} = user;
            config.knownCoins.forEach(c=> deposits[c].pending = 0);
            for (const pairName of config.tradePairs){
                user.openOrders[pairName] = await DB[pairName + '_Depth'].db.syncFind({user_id: user._id});
                const [baseCoin, altCoin] = pairName.split('_');
                user.openOrders[pairName].forEach(o=>{
                    if (o.type === 'sell'){
                        deposits[altCoin].pending += o.amount;
                    } else {
                        deposits[baseCoin].pending += o.baseCoinAmount;
                    }
                });
            };
        };
        if (closeOrders){
            user.closeOrders[closeOrders] = await DB[closeOrders + '_CloseOrders'].db.syncFind({user_id: user._id});
        };
        return user;
    },

    async createUser(params){
        const {regDrop, knownCoins} = config;
        const deposits = {};
        const addresses = {};
        knownCoins.forEach(c=>{
            deposits[c] = {
                balance: regDrop || 0,
                pending: 0
            };
            addresses[c] = null;
        });
        addresses['BIP'] = params.address;
        const user = new usersDb({
            deposits,
            addresses,
            login: params.login,
            password: this.createPswd(params.password),
        });
        await user.save();
        if (regDrop){
            depositsDb.db.syncInsert({user_id: user._id, amount: regDrop, type: 'regdrop'});
        }
        return user;
    },
    createPswd(password){
        return sha256(password.toString());
    },
};
