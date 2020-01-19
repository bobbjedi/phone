<template>
<span v-if="Store.isLoad">
    <!-- Main Framework7 App component where we pass Framework7 params -->
    <f7-app :params="f7params" theme-dark>
        <!-- в main ретдерится из routes.js -->
        <f7-view main url="/"></f7-view>

        <!-- ЛЕВОЕ МЕНЮ -->
        <f7-panel left reveal resizable v-if="Store.globalRouter.navigate">
            <main-menu></main-menu>
        </f7-panel>
        <!-- КОНЕЦ ЛЕВОЕ МЕНЮ -->
        <!-- <modal></modal> -->
    </f7-app>
    <notifications group="foo" />
</span>
</template>

<script>
import Vue from 'vue';
import Store from './core/Store';
import routes from './core/routes';
import mainMenu from './components/menu.vue';

export default {
    components: {
        mainMenu
    },
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

setTimeout(() => {
    // Store.globalRouter.navigate('/cabinet')
}, 3000);
</script>
