<template>
    <!-- Main Framework7 App component where we pass Framework7 params -->
    <f7-app :params="f7params" theme-dark>
        <!-- в main ретдерится из routes.js -->
        <f7-view main url="/"></f7-view>

        <!-- ЛЕВОЕ МЕНЮ -->
        <f7-panel left reveal resizable v-if="Store.globalRouter.navigate">
            <f7-view>
                <f7-page>
                    <f7-block>Hello!</f7-block>
                    <f7-link v-if="!Store.user.isLogged" panel-close="left"
                        @click="Store.globalRouter.navigate('/login')">Enter</f7-link>
                    <f7-link v-else panel-close="left" @click="Store.globalRouter.navigate('/')">{{Store.user.login}}
                    </f7-link>
                    <br>
                    <f7-link panel-close="left" @click="Store.globalRouter.navigate('/')">Main page</f7-link>
                    <br>
                   <f7-link class="txt-red" panel-close="left" @click="Store.logOut()" v-if="Store.user.isLogged">Exit</f7-link>
                </f7-page>
            </f7-view>
        </f7-panel>
        <!-- КОНЕЦ ЛЕВОЕ МЕНЮ -->
        <!-- <modal></modal> -->
        <notifications group="foo" />
    </f7-app>
</template>

<script>
import Vue from 'vue';
import Store from './core/Store';
import routes from './core/routes';

export default {
    data() {
      return {
          Store,
        // Framework7 parameters that we pass to <f7-app> component
        f7params: {
          name: 'My Application',
          theme: 'ios',
          id: 'com.myapp.test',
          'theme-dark': true,
          routes
        }
      }
    }
  }
</script>
