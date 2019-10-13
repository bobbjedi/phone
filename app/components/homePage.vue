<template>
    <f7-page>
        <f7-navbar title="Main page">
            <f7-nav-right>
                <f7-button raised panel-open="left">Menu</f7-button>
            </f7-nav-right>
        </f7-navbar>
        <f7-block-title>Simple Link</f7-block-title>
        <f7-link href="/frst/">About Page</f7-link>
        <f7-link href="/scnd/">Login Page</f7-link>
    </f7-page>
</template>

<script>
import Store from '../core/Store';
export default {
    watch: {
        '$f7router.currentRoute.url'(v) {
            Store.currentRoute = v;
        }
    },
    created(){
        Store.globalRouter = this.$f7router;
    }
}
</script>
