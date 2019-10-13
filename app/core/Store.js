import Vue from 'vue';
import api from './api';
import $u from './utils';
import config from '../../config';

export default new Vue({
    created() {
        this.user.token = localStorage.getItem('wstoken') || false;
        if (this.user.token) {
            this.updateUser();
        } else {
            this.isLoad = true;
        }
    },
    data: {
        currentRoute: '/',
        isLoad: false,
        globalRouter: {},
        user: {
            isLogged: false,
            isLoginned: true, // хочет логиниться / регаться
            address: '',
            token: false,
            deposit: 0
        }
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
    },
    watch: {
        'user.token'() {
            localStorage.setItem('wstoken', this.user.token);
        }
    }
});
