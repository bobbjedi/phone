import Vue from 'vue';
import api from './api';
import _ from 'underscore';
import listenerOrders from './listenerOrders';

export default new Vue({
    async created() {
        Vue.prototype.navigate = v => this.$f7router.navigate(v);
        this.getCurencyesData();
        this.updateOrdersHistory();
        listenerOrders.init();
    },
    data: {
        exchangeData: {
            fromCoin: '',
            toCoin: '',
            fromCoinAmount: 0,
            toCoinAmount: 0,
            tiker: {}
        }, // данные для обмена
        currentRoute: '/',
        globalRouter: {},
        user: {
            email_validated: false,
            userName: '',
            email: '',
            isLogged: false
        },
        curencyes: [],
        tikers: [],
        ordersHistory: [],
        lastPageHistoryLoad: 1
    },
    methods: {
        noty(subtitle, text, delay = 3){
            this.$f7.notification.create({
                icon: '<i class="txt-green fa fa-btc" aria-hidden="true"></i>',
                title: "Alfa Bit",
                subtitle,
                text,
                closeButton: true,
                closeTimeout: delay * 1000
            }).open();
        },
        logOut() {
            this.user.isLogged = false;
            this.tokens = false;
        },
        getCurencyesData(){
            api('curencyes', {}, res => {
                if (res.success) {
                    this.curencyes = res.data;
                }
            });
        },
        updateOrdersHistory(nextPage = false){
            let page = 1;
            if (nextPage){
                page = ++this.lastPageHistoryLoad;
            } else {
                this.lastPageHistoryLoad = 1;
            }
            console.log({page, lastPageHistoryLoad: this.lastPageHistoryLoad});
            api('ordersHistory', { page }, res => {
                if (res.success) {
                    if (nextPage){
                        return this.ordersHistory = this.ordersHistory.concat(res.data.results);
                    }
                    this.ordersHistory = res.data.results;
                }
            });
        }
    }
});
