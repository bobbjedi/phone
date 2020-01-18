const DB = require('../../modules/DB');
const {usersDb} = DB;
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
    async wait(sec){
        return new Promise(resolve=>setTimeout(resolve, 1000 * sec));
    },
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
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
        const {deposits} = user;
        config.knownCoins.forEach(c=> deposits[c].pending = deposits[c].free = 0);
        if (openOrders){
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
            config.knownCoins.forEach(c=> deposits[c].free = deposits[c].balance - deposits[c].pending);
        };
        if (closeOrders){
            user.closeOrders[closeOrders] = await DB[closeOrders + '_CloseOrders'].db.syncFind({user_id: user._id});
        };
        return user;
    },

    async createUser(params){
        const {regDrop, knownCoins} = config;
        const deposits = {};
        const user = new usersDb({
            deposits,
            login: params.login,
            password: this.createPswd(params.password),
        });
        knownCoins.forEach(c=>{
            deposits[c] = {
                balance: regDrop || 0,
                pending: 0
            };
            user['address_' + c] = null;
        });
        user.address_BIP = this.capitalize(params.address);
        await user.save();
        // if (regDrop){
        //     depositsDb.db.syncInsert({user_id: user._id, amount: regDrop, type: 'regdrop'});
        // }
        return user;
    },
    createPswd(password){
        return sha256(password.toString());
    },
};
