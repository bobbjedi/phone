<template>
<f7-view>
    <f7-page class="big">
        <f7-block class="top-menu" strong>
            <div class="avatar-container">
                <img src="https://vk.vkfaces.com/849416/v849416832/163825/r_9Ll0Fk5BU.jpg">
            </div>
            <div class="user-menu-path big">
                <f7-link v-if="!Store.user.isLogged" panel-close="left" @click="Store.globalRouter.navigate('/login')" class="txt-white">Войти <i class="fa fa-sign-in txt-blue" aria-hidden="true"></i></f7-link>
                <f7-link v-else panel-close="left" @click="Store.logOut()" class="txt-white">{{Store.user.login}} <i class="txt-red fa fa-sign-out txt-red hovered" aria-hidden="true"></i></f7-link>
                <!-- <f7-link v-else panel-close="left" @click="Store.globalRouter.navigate('/cabinet')">{{Store.user.login}}</f7-link>
                <f7-link panel-close="left" @click="Store.logOut()" v-if="Store.user.isLogged"> Exit <i class="txt-red fa fa-sign-out txt-red hovered" aria-hidden="true"></i></f7-link> -->
            </div>
        </f7-block>
        <f7-block class="menu-list">
            <f7-link class="menu-items" panel-close="left" @click="Store.globalRouter.navigate('/')">Главная страница</f7-link>
            <f7-link class="menu-items" panel-close="left" @click="Store.globalRouter.navigate(Store.user.isLogged ? '/cabinet' : '/login')">Кабинет</f7-link>
            <f7-link class="menu-items" panel-close="left" @click="Store.globalRouter.navigate('/security')">Политика безопасности</f7-link>
            <f7-link class="menu-items" panel-close="left" @click="Store.globalRouter.navigate('/contacts')">Контакты</f7-link>
            <f7-link class="menu-items" panel-close="left" @click="Store.globalRouter.navigate('/about')">О нас</f7-link>
        </f7-block>
    </f7-page>
</f7-view>
</template>

<script>
import Store from '../core/Store';
import api from '../core/api';
import Vue from 'vue';

export default {
    data() {
        return {
            Store
        };
    },
    computed: {

    },
    methods: {

    }
};
</script>
