const Store = require('../helpers/Store');

module.exports = (req, res) => {
    const action = req.query.action;
    const GET = JSON.parse(req.query.data);
    switch (action) {
    case ('getPublic'):
        send({}, res);
        break;
    };
};

function send(result, res) {
    res.json({
        success: true,
        result
    });
}
