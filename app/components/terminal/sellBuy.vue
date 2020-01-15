<template>
    <div class="terminall-sell-buy">
      <div class="terminal-input">
          <div class="label">Price {{pairName}}</div>
          <div class="custom-input">
              <div class="input-sign hovered txt-red" @click="price--">-</div>
                <input type="number" v-model.number="price">
              <div class="input-sign hovered txt-green" @click="price++">+</div>
          </div>
      </div>
      <div class="terminal-input">
          <div class="label">Amount {{altCoin}} <span class="txt-yellow">0.12123</span></div>
          <div class="custom-input">
              <div class="input-sign hovered txt-red" @click="altAmount--">-</div>
                <input type="number" v-model.number="altAmount">
              <div class="input-sign hovered txt-green" @click="altAmount++">+</div>
          </div>
      </div>
       <div class="terminal-input">
          <div class="label">Amount {{baseCoin}} <span class="txt-yellow big"> {{baseAmount}}</span></div>
          <!-- <div class="custom-input"> -->
              <!-- <div class="input-sign hovered txt-red" @click="baseAmount--">-</div> -->
                <!-- <input type="number" v-model.number="baseAmount"> -->
               
              <!-- <div class="input-sign hovered txt-green" @click="baseAmount++">+</div> -->
          <!-- </div> -->
      </div>
      <div class="percenage">
          <div class="el-percent hovered">25%</div>
          <div class="el-percent hovered">50%</div>
          <div class="el-percent hovered">75%</div>
          <div class="el-percent hovered">100%</div>
      </div>
    <div class="buts">
        <div class="but bg-red hovered" @click="setOrder('sell')">Sell</div>
        <div class="but bg-green hovered" @click="setOrder('buy')">Buy</div>
    </div>
    </div>
</template>

<script>
import Store from '../../core/Store';
import api from '../../core/api';

export default {
    data() {
        return {
            baseCoin: '',
            altCoin: '',
            altAmount: 0,
            price: 0,
        }
    },
    mounted() {
    },
    computed: {
        baseAmount(){
           return this.altAmount * this.price;
        },
        pairName() {
            [this.baseCoin, this.altCoin] = Store.terminalPair.split('_');
            return Store.terminalPair
        }
    },
    methods: {
        /**
         * {type, value, price, pairName}
         */
        setOrder(type){
            api({
                action: 'setOrder',
                data: {
                    pairName: this.pairName,
                    price: this.price,
                    value: this.altAmount,
                    type
                }
            }, Store.getPairData);
        }
    }

}
</script>
