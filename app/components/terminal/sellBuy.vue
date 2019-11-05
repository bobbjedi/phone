<template>
    <div class="terminall-sell-buy">
      <div class="terminal-input">
          <div class="label">Price</div>
          <div class="custom-input">
              <div class="input-sign hovered txt-red" @click="price--">-</div>
                <input type="number" v-model.number="price">
              <div class="input-sign hovered txt-green" @click="price++">+</div>
          </div>
      </div>
      <div class="terminal-input">
          <div class="label">Amount {{altCoin}}</div>
          <div class="custom-input">
              <div class="input-sign hovered txt-red" @click="altAmount--">-</div>
                <input type="number" v-model.number="altAmount">
              <div class="input-sign hovered txt-green" @click="altAmount++">+</div>
          </div>
      </div>
       <div class="terminal-input">
          <div class="label">Amount {{baseCoin}}</div>
          <div class="custom-input">
              <div class="input-sign hovered txt-red" @click="baseAmount--">-</div>
                <input type="number" v-model.number="baseAmount">
              <div class="input-sign hovered txt-green" @click="baseAmount++">+</div>
          </div>
      </div>
      <div class="percenage">
          <div class="el-percent hovered">25%</div>
          <div class="el-percent hovered">50%</div>
          <div class="el-percent hovered">75%</div>
          <div class="el-percent hovered">100%</div>
      </div>
    <div class="buts">
        <div class="but bg-red hovered">Sell</div>
        <div class="but bg-green hovered">Buy</div>
    </div>
    </div>
</template>

<script>
export default {
    props: ['pairName'],
    data() {
        return {
            baseCoin: '',
            altCoin: '',
            baseAmount: 0,
            altAmount: 0,
            price: 0
        }
    },
    created() {
        [this.baseCoin, this.altCoin] = this.pairName.split('_');
    }

}
</script>
