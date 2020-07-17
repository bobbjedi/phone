import Vue from 'vue';
import api from './api';

export default new Vue({
    created() {
        this.user.token = localStorage.getItem('wstoken') || false;
        if (this.user.token) {
            this.updateUser();
        } else {
            this.isLoad = true;
        }
        Vue.prototype.navigate = v => this.globalRouter.navigate(v);
    },
    data: {
        currentRoute: '/',
        isLoad: false,
        globalRouter: {},
        user: {
            login: '',
            isLogged: false
        },
        walletsData: {}
    },
    methods: {
        updateUser(cb = false) {
            this.isLoad = true;
            const self = this;
            api({
                action: 'getUser',
                token: this.user.token
            }, (data) => {
                self.user = data;
            }, true);
        },
        logOut() {
            this.user.isLogged = false;
            this.user.token = false;
        },
        loadWalletsData(){
            this.$f7.preloader.show();
            setTimeout(() => this.$f7.preloader.hide(), 1000);
            this.walletsData = {
                totalDeposit: 1487488,
                crypto: [
                    {
                        coinName: 'BTC',
                        deposit: 0.23,
                        price: 9.95456,
                        percent: +0.34
                    },
                    { coinName: 'USDT',
                        deposit: 1324.23,
                        price: 0.998,
                        percent: -0.17
                    },
                    {
                        coinName: 'NEO',
                        deposit: 1.23,
                        price: 0.85456,
                        percent: -1.13
                    },
                    { coinName: 'DASH',
                        deposit: 0,
                        price: 9.45456,
                        percent: +1.34
                    },
                    { coinName: 'EOS',
                        deposit: 0,
                        price: 0.65456,
                        percent: -0.34
                    },
                    { coinName: 'QTUM',
                        deposit: 0,
                        price: 2.65456,
                        percent: -0.89
                    },
                ]
            };
        }
    },
    watch: {
        'user.token'() {
            localStorage.setItem('wstoken', this.user.token);
        }
    }
});
