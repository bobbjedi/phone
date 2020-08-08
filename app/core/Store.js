import Vue from 'vue';
import api from './api';
import _ from 'underscore';
import listenerOrders from './listenerOrders';
import auth from './auth';

export default new Vue({
    async created() {
        auth.init(api, this);
        Vue.prototype.navigate = v => this.$f7router.navigate(v);
        this.getCurencyesData();
        this.updateOrdersHistory();
        listenerOrders.init();
        window.Store = this;

        document.addEventListener('deviceready', ()=>{
            document.addEventListener('backbutton', e => {
                alert('BACK BUTTON');
                if (this.$f7.views.main.router.url !== '/'){
                    e.preventDefault();
                    this.$f7.views.main.buttonBack && this.$f7.views.main.buttonBack ||
                    this.$f7.views.main.router.back();
                }
            }, false);
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
            username: '',
            email: ''
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
        login({email, username, email_validated}){
            console.log('Login', {email, username, email_validated});
            this.user.email = email;
            this.user.username = username;
            this.user.email_validated = email_validated;
        },
        logOut() {
            this.user.email = '';
            this.user.username = '';
            this.user.email_validated = false;
            auth.logOut();
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
