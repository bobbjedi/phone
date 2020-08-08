import $u from './utils';

let api, Store;

const auth = {
    tokens: {
        access: '',
        refresh: ''
    },
    init(api_, Store_) {
        api = api_;
        Store = Store_;
        this.setTokens(localStorage.getItem('tokens'));
        if (this.tokens.access){
            this.refreshTokens(api);
        }
    },
    logOut(){
        this.tokens = false;
        localStorage.removeItem('tokens');
    },
    setTokens(tokens = false) {
        if (tokens) {
            if (typeof tokens === 'string') {
                tokens = JSON.parse(tokens);
            }
            const username = tokens.username || this.tokens.exp.username;
            console.log('USERNAME:', username);
            // this.tokens.exp.username = tokens.username;
            // const username = tokens.username || this.tokens.exp.username;
            tokens.exp = _parseTokenData(tokens.access);
            tokens.exp.username = username;
            tokens.jwtInfo = tokens.jwtInfo || this.tokens.jwtInfo;
            localStorage.setItem('tokens', JSON.stringify(tokens));
            this.tokens = tokens;
        }
    },

    refreshTokens(api){
        console.log('REFRESH pswd', this.tokens.jwtInfo);
        if (this.tokens.exp < $u.unix() / 1000){
            console.log('REFRESH');
            api('login', { email: this.tokens.exp.email, password: this.tokens.jwtInfo}, res => {
                if (res.success) {
                    Store.login(res.data);
                    this.setTokens(res.data.tokens);
                } else {
                    console.log('ERROR refreshTokens:', res);
                }
            });
        } else {
            Store.login(this.tokens.exp);
            console.log(this.tokens);
            console.log('NOT REFRESH', this.tokens.exp, (this.tokens.exp.exp - $u.unix() / 1000) / 3600);
        }
        console.log({ email: this.tokens.exp.email, password: this.tokens.jwtInfo});
    },

    async refreshTokensIfNeeded(){
        return;
    }
};


function _parseTokenData (accessToken) {
    let payload = '';
    let tokenData = {};

    try {
        payload = accessToken.split('.')[1];
        tokenData = JSON.parse(atob(payload));
    } catch (error) {
        throw new Error(error);
    }

    return tokenData;
};

export default auth;
