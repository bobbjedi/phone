const log = require('../helpers/log');
const sha256 = require('sha256');
const {usersDb} = require('./DB');
const $u = require('../helpers/utils');
const publicApi = require('./publicApi');
const Store = require('../helpers/Store');
const config = require('../helpers/configReader');

module.exports = (app) => {
    app.get('/api', async (req, res) => {
        let checkUser;
        try {
            // console.log(req.query);
            const action = req.query.action;
            const GET = JSON.parse(req.query.data);
            const User = await $u.getUserFromQ({token: GET.token});
            // роуты
            switch (action) {
            case ('getUser'):
                if (User) {
                    //TODO: приделать время жизни токена
                    User.isLogged = true;
                    delete User.password;
                    delete User._id;
                    success(User, res);
                } else {
                    error(null, res);
                }
                break;

            case ('enter'):
                checkUser = await usersDb.findOne({seed: GET.seed});
                if (!checkUser){
                    error('This seed not found', res);
                    return;
                }
                success(await assignUser(checkUser), res);
                break;

            case ('create'):
                const newUser = await $u.createUser();
                success(await assignUser(newUser, true), res);
                break;
                
            default:
                error('error endpoint', res);
                break;
            }

        } catch (e) {
            console.log({e});
            error('Error api code 1', res);
        }
    });
    app.get('/public', async (req, res) => {
        publicApi(req, res);
    });
};

function error(msg, res) {
    try {
        log.error(msg);
        res.json({
            success: false,
            msg,
        });
    } catch (e) {
        console.log(e);
    }
}
function success(data, res) {
    try {
        res.json({
            success: true,
            result: data
        });
    } catch (e) {
        console.log(e);
    }
}

async function assignUser (user, isNoDeleteSeed){
    try {
        const token = sha256(new Date().toString());
        user.token = token;
        await user.save();
        delete user._id;
        if (!isNoDeleteSeed){
            delete user.seed;
        }
        return user;
    } catch (e){
        console.log('assignUser: ' + e);
    }
}


