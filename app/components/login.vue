<template>
<f7-login-screen :opened="loginScreenOpened" @loginscreen:closed="loginScreenOpened = false">
    <f7-page login-screen>
        <f7-login-screen-title><span @click="loginScreenOpened = false"><f7-icon icon="icon-back"></f7-icon></span> {{isEntered ? 'Войти' : 'Регистрация'}}</f7-login-screen-title>
        <f7-list form>

            <f7-list-input v-show="isEntered" label="Логин или email" type="text" placeholder="Ваш логин или email" :value="email" @input="email = $event.target.value" clear-button></f7-list-input>

            <f7-list-input v-show="!isEntered" label="Email" type="email" placeholder="Ваш email" :value="email" @input="email = $event.target.value" clear-button></f7-list-input>

            <f7-list-input v-show="!isEntered" label="Логин" type="text" placeholder="Ваш логин" :value="username" @input="username = $event.target.value" clear-button></f7-list-input>

            <f7-list-input label="Пароль" type="password" placeholder="Ваш пароль" :value="password" @input="password = $event.target.value" clear-button>
                <i class="fa fa-lock" aria-hidden="true"></i>
            </f7-list-input>
            <f7-list-input v-show="!isEntered" label="Повтор пароля" type="password" placeholder="Повторите Ваш пароль" :value="password2" @input="password2 = $event.target.value" clear-button>
                <i class="fa fa-lock" aria-hidden="true"></i>
            </f7-list-input>
        </f7-list>
        <f7-list>
            <f7-list-button @click="actionType = (isEntered ? 'reg' : 'enter')">{{isEntered ? 'Еще не зарегистрированны?' : 'Уже есть акаунт? Войти'}}</f7-list-button>
            <f7-block>
                <f7-button class="bg-blue" fill round @click="sent">{{isEntered ? 'Войти' : 'Зарегистрироваться'}}</f7-button>
            </f7-block>
        </f7-list>
    </f7-page>
</f7-login-screen>
</template>

<script>
import Store from "../core/Store";
import api from '../core/api';
import auth from '../core/auth';

export default {
    data() {
        return {
            loginScreenOpened: false,
            actionType: "enter",
            password: "51645164",
            password2: "",
            username: "",
            email: "twswtest@gmail.com"
        };
    },
    created(){
        Store.$on('openLoginForm', ()=> {this.loginScreenOpened = true});
    },
    computed: {
        isEntered() {
            return this.actionType === "enter";
        }
    },
    methods: {
        sent() {
            const {email, password} = this;
            const app = this.$f7;
            if (!email.length || !password.length) {
                return app.dialog.alert(`
                    <b class="big">Логин и пароль введены неверно</b>
                    <br>
                    <br>
                    <span class="small">Вы забыли логин  или пароль? Попробуйте <a>восстановить его</a></span>`);
            }
            let action = 'login';
            const data = {
                email: this.email,
                password: this.password
            }
            if (!this.isEntered) {
                action = 'registration';
                data.password2 = this.password2;
                data.username = this.username;
            }
            this.$f7.preloader.show();
            api(action, data, res => {
                if (res.success) {
                    const {email, username, access, refresh, tokens} = res.data;
                    Store.user.email = email;
                    Store.user.userName = username;
                    Store.user.isLogged = true;
                    const savedTokens = tokens || {access, refresh};
                    console.log('SAVED', savedTokens);
                    savedTokens.jwtInfo = this.password; // очень плохо ((
                    auth.setTokens(savedTokens); // для реги tokens, для логина {access, refresh}
                    app.loginScreen.close();
                    Store.noty("Успешный вход!", "Здравcтсвуйте, " + username + "!");
                    this.$f7.preloader.hide();
                } else {
                    alert('ERROR ' + res.status);
                    this.$f7.preloader.hide();
                }
            });
        }
    }
};
</script>
