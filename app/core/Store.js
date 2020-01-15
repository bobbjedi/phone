import Vue from 'vue';
import api from './api';
import $u from './utils';
import config from '../../config';

export default new Vue({
    created() {
        this.logOut();
        this.user.token = localStorage.getItem('wstoken') || false;
        if (this.user.token) {
            this.updateUser();
        } else {
            this.isLoad = true;
        }
        this.notify = (obj)=>{
            obj.group = 'foo';
            const {type} = obj;
            if (type === 'error'){
                obj.title = 'Ошибка!';
            } else if (type === 'success'){
                obj.title = 'Успешно!';
            } else if (type === 'warning'){
                obj.title = 'Внимание!';
            } else if (type === 'info'){
                obj.title = 'Информация!';
            } 
            this.$notify(obj);
        };
        this.updatePublic();
        setInterval(()=>{
            this.updatePublic();
            this.getPairData();
        }, 10000);
    },
    data: {
        currentRoute: '/',
        isLoad: false,
        globalRouter: {},
        user: {},
        components: {},
        terminalPair: '',
        isOpenTerminal: false,
        public: {},
        publicPairsData: {}, // хранятся подробные данные по парам
        ordersData: {} // хранятся данные по парам
    },
    methods: {
        updateUser() {
            this.isLoad = true;
            const self = this;
            api({
                action: 'getUser',
                token: this.user.token
            }, (data) => {
                self.user = data;
            }, true);
        },
        updatePublic() {
            api({
                action: 'getPublic'
            }, (data) => {
                console.log('getPublic', data)
                this.public = data;
            }, true, 'public');
        },
        updateOrdersData(opts){
            api({
                action: 'getFullUserData',
                data: opts
            }, data => {
                const pairName = opts.openOrders || opts.closeOrders;
                Vue.set(this.ordersData, pairName, {openOrders: data.openOrders[pairName]});
                // closeOrders: data.closeOrders[pairName]
            });
        },
        logOut(){
            this.user = {
                isLogged: false,
                isLoginned: true, // хочет логиниться / регаться
                password: '',
                login: '',
                address: '',
                token: false
            };
        },
    },
    watch: {
        'user.token'() {
            localStorage.setItem('wstoken', this.user.token);
        }
    }
});