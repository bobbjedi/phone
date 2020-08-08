<template>
  <f7-page :page-content="false">
    <div class="page-block-with-menu bg-blue">
      <!-- MAIN-BLOCK -->
      <div class="main-block">
        <!-- HEADER PAGE -->
        <div class="header-block txt-white center">
          <span @click="$f7router.back()">
            <f7-icon icon="icon-back"></f7-icon>
          </span>
          <span class="big">Профиль</span>
          <span class="big">
            <i class="fa fa-cog bigbig" aria-hidden="true"></i>
          </span>
        </div>

        <!-- DARK_PATH -->
        <div class="txt-white center bigbig mb15 mt15">
          <div>{{user.username}}</div>
          <div @click="logOut">Выйти</div>
        </div>
        <!-- WHITE-PATH -->
        <div class="page-content-block bg-white mt20">Белый</div>
      </div>

      <!-- BOTTOM_MENU -->
      <bottom-menu></bottom-menu>
    </div>
  </f7-page>
</template>
<script>
import Store from "../core/Store";
import $u from "../core/utils";
import bottomMenu from "./bottom-menu.vue";
import api from "../core/api";

export default {
  components: {
    bottomMenu,
  },
  data() {
    return {};
  },
  methods: {
    logOut() {
        Store.logOut();
        this.$f7router.navigate('/');
    },
  },
  mounted() {},
  computed: {
    user: () => Store.user,
  },
  watch: {},
  destroyed() {},
};
</script>

<style scoped>
</style>
