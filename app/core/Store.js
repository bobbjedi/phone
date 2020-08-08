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
        window.Store = this;
        document.addEventListener('backbutton', e =>{
            e.preventDefault();
            if (this.$f7.views.main.router.url !== '/'){
                this.$f7.views.main.router.back();
            }
        }, false);
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
        nextPageHistoryLoad: 2,
        isNexPageLoaded: false
    },
    computed: {
        isLogged(){
            return !!this.user.email;
        }
    },
    methods: {
        noty(subtitle, text, delay = 3){
            this.$f7.notification.create({
                icon: '<i class="txt-blue fa fa-btc" aria-hidden="true"></i>',
                title: "Alfa Bit",
                subtitle,
                text,
                closeButton: true,
                closeTimeout: delay * 1000
            }).open();
        },
        toast(text, position = 'top'){
            this.$f7.toast.create({
                text,
                position,
                cssClass: 'center',
                closeTimeout: 2000
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
            if (this.isNexPageLoaded) {
                return;
            }
            this.isNexPageLoaded = true;
            let page = 1;
            if (nextPage){
                page = this.nextPageHistoryLoad;
            } else {
                this.nextPageHistoryLoad = 2;
            }

            if (!this.ordersHistory.length){
                page = 1;
            }
            console.log({page, nextPageHistoryLoad: this.nextPageHistoryLoad});
            api('ordersHistory', { page }, res => {
                this.$nextTick(()=> this.isNexPageLoaded = false);
                if (res.success) {
                    if (nextPage){
                        this.nextPageHistoryLoad++;
                        return this.ordersHistory = this.ordersHistory.concat(res.data.results);
                    }
                    this.ordersHistory = res.data.results;
                }
            });
        }
    }
});
