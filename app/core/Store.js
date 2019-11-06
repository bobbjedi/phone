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
    },
    data: {
        currentRoute: '/',
        isLoad: false,
        globalRouter: {},
        user: {},
        components: {},
        terminalPair: ''
    },
    methods: {
        updateUser(opts) {
            this.isLoad = true;
            const self = this;
            api({
                action: 'getUser',
                token: this.user.token,
                data: opts
            }, (data) => {
                self.user = data;
            }, true);
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