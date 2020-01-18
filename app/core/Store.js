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
        }
        window.notify = this.notify = (obj)=>{
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

        setTimeout(() => {
            this.isLoad = true;
        }, 2000);
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
        ordersData: {} // хранятся данные по ордерам пар
    },
    methods: {
        updateUser() {
            const self = this;
            api({
                action: 'getUser',
                token: this.user.token,
                data: {pairNameFull: true}
            }, (data) => {
                self.user = data;
            }, true);
        },
        updatePublic() {
            api({
                action: 'getPublic'
            }, (data) => {
                this.public = data;
            }, true, 'public');
        },
        logOut(){
            this.user = {
                isLogged: false,
                isLoginned: true, // хочет логиниться / регаться
                password: '',
                login: '',
                address: '',
                token: false,
                deposits: {}
            };
        },
    },
    watch: {
        'user.token'() {
            localStorage.setItem('wstoken', this.user.token);
        }
    }
});

