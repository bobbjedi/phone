const Store = require('../helpers/Store');

module.exports = (req, res, success) => { 
    success({pairsData: Store.pairsData}, res);
};
