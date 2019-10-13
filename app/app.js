import Vue from 'vue';
import Framework7 from 'framework7/framework7.esm.bundle.js';
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';
Framework7.use(Framework7Vue);
import App from './app.vue';

new Vue({
    el: '#app',
    render: (h) => h(App),
});
