<template>
    <f7-page>
        <f7-navbar title="Main page">
            <f7-nav-right>
                <f7-button raised panel-open="left">Menu</f7-button>
            </f7-nav-right>
        </f7-navbar>
        <f7-block-title>Simple Link</f7-block-title>
        <f7-link href="/frst/">About Page</f7-link><br>
        <f7-link href="/scnd/">Login Page</f7-link>
        <f7-block-title>Routs ({{this.routes.length}})</f7-block-title>
        <p v-for="(r, i) in routes" :key="i">{{r}}</p>
    </f7-page>
</template>

<script>
import Store from '../core/Store';
import itemsDb from '../core/localDb';

export default {
    data(){
        return {
            routes: []
        }
    },
    watch: {
        async '$f7router.currentRoute.url'(v) {
            Store.currentRoute = v;
            await itemsDb.db.syncInsert({v});
            this.routes = await itemsDb.db.syncFind({});
        }
    },
    async created(){
        this.routes = await itemsDb.db.syncFind({});
        Store.globalRouter = this.$f7router;
    }
}
</script>
