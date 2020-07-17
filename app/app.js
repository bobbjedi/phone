import Vue from 'vue';
import Framework7 from 'framework7/framework7.esm.bundle.js';
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';
import 'framework7/css/framework7.bundle.css';
import 'framework7-icons';
import '../public/assets/font-awesome/css/font-awesome.min.css';
import './core/filters';

Framework7.use(Framework7Vue);

import App from './app.vue';

new Vue({
    el: '#app',
    render: (h) => h(App),
});
