<template>
  <f7-page>
    <f7-navbar title="Кошельки" back-link="Назад"></f7-navbar>

<f7-list no-hairlines-md>
  <f7-list-input
    :label="'Поиск среди' + coinsList.length + 'криптовалют'"
    floating-label
    type="text"
    placeholder="Введите коин"
    clear-button
    @input="searchKey = $event.target.value"
  >
  </f7-list-input>
</f7-list>
    <f7-block>
      <f7-block-title>Ваши кошельки</f7-block-title>
      <f7-list>
        <f7-list-item 
        v-for="(c,i) in addedCoins"
        :key="i"
        :title="c.coinName"
        v-show="c.toLowerCase().includes(searchKey.toLowerCase())"
        >
          <img slot="media" :src="'./assets/svgicon/' + c.toLowerCase() + '.svg'" width="30" />
          <f7-toggle slot="after" checked @change="change(c, 'rm')"></f7-toggle>
        </f7-list-item>
      </f7-list>
    </f7-block>
    <f7-block>
      <f7-block-title>Добавить еще</f7-block-title>
      <f7-list>
        <f7-list-item
          v-for="(c,i) in coinsList"
          :key="i"
          :title="c"
          v-show="!addedCoins.includes(c) && c.toLowerCase().includes(searchKey.toLowerCase())"
        >
          <img slot="media" :src="'./assets/svgicon/' + c.toLowerCase() + '.svg'" width="30" />
          <f7-toggle slot="after" @change="change(c, 'add')"></f7-toggle>
        </f7-list-item>
      </f7-list>
    </f7-block>
    <!-- <f7-block-title>Добавленные кошельки</f7-block-title>
<f7-list>
 <f7-list-item title="With toggle">
    <f7-icon slot="media" icon="demo-list-icon"></f7-icon>
    <f7-toggle slot="after"></f7-toggle>
  </f7-list-item>
    </f7-list>-->
  </f7-page>
</template>

<script>
import Store from "../core/Store";

export default {
  data() {
    return {
      coinsList: [],
      addedCoins: [],
      searchKey: ''
    };
  },
  mounted() {
    this.addedCoins = Store.walletsData.crypto.map(c => c.coinName).slice();
    this.coinsList = this.addedCoins
      .slice()
      .concat(["BCH", "LTC", "LVC", "ETH", "NEM", "OMG"]);
  },
  computed: {},
  methods: {
    change(c, type) {
      this.$f7.preloader.show();
      setTimeout(() => {
        if (type === "rm") {
          this.addedCoins.splice(
            this.addedCoins.findIndex(c_ => c === c_),
            1
          );
        } else {
          this.addedCoins.push(c);
        }
          this.$f7.notification
          .create({
            icon: '<i class="txt-green fa fa-btc" aria-hidden="true"></i>',
            title: "P2P Exchange",
            subtitle: "Успешно!",
            text: 'Коин ' + c + ' успешно ' + (type === 'rm' ? ' удален ' : ' добавлен'),
            closeButton: true,
            closeTimeout: 2000
          })
          .open();
        this.$f7.preloader.hide();
      }, 500);
    }
  }
};
</script>
