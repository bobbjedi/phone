<template>
  <f7-page no-toolbar no-swipeback login-screen>
      <f7-navbar title="Login Page" back-link="Back">
            <f7-nav-right>
                <f7-button raised panel-open="left">Menu</f7-button>
            </f7-nav-right>
        </f7-navbar>

    <f7-login-screen-title>Sign In</f7-login-screen-title>
    <f7-list form>
      <f7-list-input
        label="Login"
        type="text"
        placeholder="Your login"
        :value="user.login"
        @input="user.login = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        v-if="!user.isLoginned"
        label="Address"
        type="text"
        placeholder="Your minter address"
        :value="user.address"
        @input="user.address = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Password"
        type="password"
        placeholder="Your password"
        :value="user.password"
        @input="user.password = $event.target.value"
      ></f7-list-input>
    </f7-list>
    <f7-list>
      <f7-list-button @click="logreg">{{status}}</f7-list-button>
      <f7-block-footer>
        <p @click="user.isLoginned =!user.isLoginned">
          <u v-if="user.isLoginned">Got registration?</u>
          <u v-else>Got login?</u>
        </p>
      </f7-block-footer>
    </f7-list>
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
    computed: {
        status() {
            return this.user.isLoginned ? 'Login' : 'Registration';
        }
    },
    methods: {
        logreg() {
            const user = this.user;
            if (!user.login || !user.password || !user.isLoginned && !user.address) {
                Store.notify({type: 'error', text: 'Все поля должны быть заполнены!'});
                return;
            }
            if (user.address && (user.address.length < 40 || !user.address.startsWith('Mx'))){
                Store.notify({type: 'warn', text: 'Ваш minter adress должен быть Mx345536dsv34344...!'
                });
                return;
            }
            api({
                action: this.status.toLowerCase(),
                data: user
            }, (data) => {
                Vue.set(Store, 'user', Object.assign(Store.user, data));
                Store.notify({type: 'success', text: 'Добро пожаловать!'});
                Store.user.isLogged = true;
                this.$f7router.back();
            });
        }
    }
  };
</script>

