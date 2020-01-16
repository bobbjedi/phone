<template>
<f7-page no-toolbar no-swipeback login-screen>
    <f7-navbar title="Cabinet" back-link="Back">
        <f7-nav-right>
            <f7-button raised panel-open="left">Menu</f7-button>
        </f7-nav-right>
    </f7-navbar>

    <f7-block-title>Аккаунт пользователя {{user.login}}</f7-block-title>
    <f7-block strong>
        <p>На этой странице Вы можете добавлять адреса кошельков, пополнять, выводить средства на внешние кошельки. А так же увидеть общую сводку депозитов.</p>
    </f7-block>
    <f7-block-title>Коины</f7-block-title>
    <!-- <f7-list> -->

    <f7-block v-for="coinName in Object.keys(user.deposits)" :key="coinName">
        <div>
            <div class="small">{{user.addresses[coinName]}}</div>
            <f7-row>

                <f7-col width="85"><span class="big txt-white">{{coinName}}</span>
                    &nbsp;Balance:&nbsp; <span class="txt-yellow">{{(user.deposits[coinName].balance - user.deposits[coinName].pending) | format}}
                        &nbsp;/&nbsp;
                        {{user.deposits[coinName].pending | format}}
                    </span>
                </f7-col>
                <f7-col width="15">
                    <i class="fa fa-arrow-circle-down txt-green" aria-hidden="true"></i>&nbsp;
                    <i class="fa fa-arrow-circle-up txt-red" aria-hidden="true"></i>
                </f7-col>
            </f7-row>
        </div>
    </f7-block>
    <!-- <f7-list-item  link="#" :header="user.addresses[coinName]" :title="coinName + ' ' + (user.deposits[coinName].balance - user.deposits[coinName].pending) + '/' + user.deposits[coinName].pending">
            <f7-icon slot="media" icon="demo-list-icon"></f7-icon>
        </f7-list-item> -->
    <!-- </f7-list> -->
</f7-page>
</template>

<script>
import Store from '../core/Store';
import api from '../core/api';
import Vue from 'vue';

export default {
    data() {
        return {
            user: Store.user
        };
    },

    computed: {},
    methods: {

    }
};
</script>
