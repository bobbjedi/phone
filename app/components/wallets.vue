<template>
  <div id="wallets-page">
    <div class="center total-deposit-block txt-white big" v-if="walletsData.totalDeposit">
      <div class="big">Кошельки</div>
      <div class="deposit-round bigbig mt10">${{walletsData.totalDeposit | format}}</div>
    </div>

    <f7-list class="coins-list">
      <f7-list-item v-for="(c,i) in walletsData.crypto" :key="i" link="#">
        <img slot="media" :src="'./assets/svgicon/' + c.coinName.toLowerCase() + '.svg'" width="30" />
        <div class="coin-block">
          <div class="coin-block-left">
            {{c.deposit | format}} {{c.coinName}}
            <span class="small txt-grey">${{c.price | format}}</span>
          </div>
          <div :class="'block-percent txt-' + (c.percent > 0 ? 'green' : 'red')">{{Math.abs(c.percent)}}%</div>
        </div>
      </f7-list-item>
    </f7-list>
    <div class="button-wrapper" block>
       <f7-button fill round  @click="navigate('/wallets-list')">Добавить еще</f7-button>
    </div>
    <f7-row class="buttons-row">
      <f7-col class="bottom-menu-item">
        <i class="fa fa-connectdevelop bigbig" aria-hidden="true"></i>
        <span>Кошелек</span>
      </f7-col>
      <f7-col class="bottom-menu-item">
        <i class="fa fa-exchange bigbig" aria-hidden="true"></i>
        <span>Обмен</span>
      </f7-col>
      <f7-col class="bottom-menu-item">
        <i class="fa fa-handshake-o bigbig" aria-hidden="true"></i>
        <span>Услуги</span>
      </f7-col>
    </f7-row>
  </div>
</template>

<script>
import Store from "../core/Store";

export default {
  data() {
    return {};
  },
  computed: {
    user: () => Store.user,
    walletsData: () => Store.walletsData
  },
  methods: {}
};
</script>
<style scoped>
#wallets-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.total-deposit-block {
  background: mediumseagreen;
  padding: 15px;
}

.deposit-round {
  width: 250px;
  height: 250px;
  border: 1px solid wheat;
  margin: auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.coins-list {
  overflow-y: auto;
  margin-bottom: 3px;
}
.coin-block {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}
.coin-block-left {
  display: flex;
  flex-direction: column;
}
.button-wrapper{
  margin: 5px;
  padding: 0 8%;
}
</style>
