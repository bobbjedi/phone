require('./BIP/checkerTx');
require('./ETH/checkerTx');
const Db = require('../DB');
const $u = require('../../helpers/utils');
const log = require('../../helpers/log');
const {withdrawComission} = require('../../helpers/configReader');
const api = {
    BIP: require('./BIP/api'),
    ETH: require('./ETH/api'),
    USDT: require('./ETH/USDT')
};

const blockedUsers = {};
module.exports = {
    async withdraw (user_id, params){
        try {
            blockedUsers[user_id] = 1;
            const user = await $u.getUserFromQ({_id: user_id}, {openOrders: true});
            const {coinName, amount} = params;
            const error = validError(user, coinName, amount);
            if (error){
                log.error(error);
                delete blockedUsers[user_id];
                return error;
            }
            let resultWithdraw = false;
            if (coinName === 'BIP') {
                resultWithdraw = await api.BIP.withdraw(user, amount);
            } else {
                resultWithdraw = await withdrawEthNode(user, coinName, amount);
            }
            if (resultWithdraw){
                await user.save();
            }
            delete blockedUsers[user_id];
            return resultWithdraw;
        } catch (e) {
            delete blockedUsers[user_id];
            console.log(e);
            log.error('Global withdraw: ' + e);
        }
    }
};

async function withdrawEthNode(user, coinName, amount){
    const api_ = api[coinName];
    const amountSend = amount * (1 - (withdrawComission || 0) / 100);
    const tx = await api_.send({value: amountSend, address: user['address_' + coinName]});
    console.log(tx);
    if (tx.success){
        const userDeposit = user.deposits[coinName];
        const depositsDb = Db['depositsDb_' + coinName];
        const {hash} = tx;
        amount = $u.round(amount);
        userDeposit.balance = $u.round(userDeposit.balance - amount);
        depositsDb.db.insert({hash, user_id: user._id, type: 'withdraw', amount, unix: $u.unix()});
        log.info('Withdraw: ' + user.login + ' amount: ' + amount + ' hash: ' + hash);
        return true;
    }
}
function validError(user, coinName, amount){
    const {free} = user.deposits[coinName];
    console.log('FEE', api[coinName].FEE);
    if (free < amount || amount < api[coinName].FEE * 2){
        return 'Недостаточно средств для вывода!';
    }
}


setTimeout(async ()=>{
    console.log('withdraw:', await module.exports.withdraw('I5CDVixfOVHWKKnE', {coinName: 'ETH', amount: 0.001}));
}, 1000);
