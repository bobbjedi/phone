export default {
    domain: '',
    regDrop: 1000,
    comissionTrade: 0.2,
    withdrawComission: 1,
    knownCoins: ['BIP', 'ETH', 'USDT'],
    tradePairs: ['USDT_BIP', 'ETH_BIP', 'USDT_ETH'],
    coinsTradeLimits: {
        BIP: {
            min: 10,
            max: 100
        },
        ETH: {
            min: 0.0001,
            max: 0.5
        }
    }
};
