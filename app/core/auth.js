import Store from './Store';
import api from './api';

const auth = {
    tokens: {
        access: '',
        refresh: ''
    },
    init() {
        this.setTokens(localStorage.getItem('tokens'));
        console.log('Init', this.tokens);
    },

    setTokens(tokens = false) {
        if (tokens) {
            if (typeof tokens === 'string') {
                tokens = JSON.parse(tokens);
            }
            tokens.exp = _parseTokenData(tokens.access);
            localStorage.setItem('tokens', JSON.stringify(tokens));
            this.tokens = tokens;
            console.log('setTokens', tokens);
        }
    },

    refreshTokens(){
        api('login', { email: this.tokens.exp.email, password: this.tokens.jwtInfo}, res => {
            if (res.success) {
                const {email, username, access, refresh, tokens} = res.data;
                Store.user.email = email;
                Store.user.userName = username;
                Store.user.isLogged = true;
                const savedTokens = tokens || {access, refresh};
                this.setTokens('Set tokens', savedTokens); // для реги tokens, для логина {access, refresh}
            } else {
                alert('ERROR refreshTokens:' + res.status);
            }
        });
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
auth.init();
