<template>
    <!-- Main Framework7 App component where we pass Framework7 params -->
    <f7-app :params="f7params">
        <!-- initial page is specified in routes.js -->
        <f7-view main url="/"></f7-view>
         <f7-panel left reveal resizable v-if="Store.globalRouter.navigate">
            <f7-view>
                <f7-page>
                    <f7-block>Left panel content</f7-block>
                    <f7-link panel-close="left" @click="Store.globalRouter.navigate('/')">Main page</f7-link>
                    <f7-link panel-close="left" @click="Store.globalRouter.navigate('/scnd')">Tab Page</f7-link>
                </f7-page>
            </f7-view>
        </f7-panel>
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
          routes
        }
      }
    }
  }
</script>
