const clone = require('clone');
const {usersDb, gamesDb, gameTransDb, depositsDb} = require('../../modules/DB');
const config = require('../../helpers/configReader');
const words = require('./words');
const sha256 = require('sha256');
const log = require('../log');


module.exports = {
    unix(){
        return new Date().getTime();
    },
    async getUserFromQ (q){
        const user = await usersDb.findOne(q);
        return user;
    },
    async createUser(){
        const seed = this.createSeed();
        const address = this.createAddressFromSeed(seed);
        const user = new usersDb({
            _id: address,
            address,
            seed,
            deposit: 0
        });
        await user.save();
        return user;
    },
    createSeed(){
        let seed = '';
        const count = words.length;
        let i = 0;
        while (i++ < 12){
            const num = parseInt(Math.random() * count);
            seed += ' ' + words[num];
        }
        return seed.trim();
    },
    createAddressFromSeed(seed){
        return 'Gx' + (sha256(seed + 'scam').slice(1, 30));
    }
};


// const seed = module.exports.createSeed();
// const address = module.exports.createAddressFromSeed(seed);
// console.log({seed, address});