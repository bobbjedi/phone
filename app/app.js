import Vue from 'vue';
import Framework7 from 'framework7/framework7.esm.bundle.js';
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';
Framework7.use(Framework7Vue);
import App from './app.vue';

new Vue({
    el: '#app',
    render: (h) => h(App),
});

import itemsDb from './core/localDb';

(async ()=>{
    console.log({itemsDb});
    console.log('1>', await itemsDb.db.syncFind({}));
    const n = new itemsDb({qwe: 'tst'});
    await n.save();
    console.log('2>', await itemsDb.db.syncFind({}));
})();
