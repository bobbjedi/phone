<template>
  <f7-page>
    <login></login>
  </f7-page>
</template>

<script>
import Store from "../core/Store";
import itemsDb from "../core/localDb";
import login from './login.vue';
import wallets from './wallets.vue';

export default {
    components :{
        login,
        wallets
    },
    created(){
       Store.globalRouter = this.$f7router;
    }
};
</script>
