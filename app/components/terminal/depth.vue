<template>
    <div id="depth">
        <div class="depth-header">
            <span>Price(BTC)</span><span>Amount(BIP)</span>
        </div>
        <div class="depth-path depth-sell">
            <div class="sell-line price-line" 
                 v-for="p in prices.sell"
                 :key="p"
                 :style="{background: 'linear-gradient(to left, rgb(232, 153, 150) ' + mathPercent(sell[p]) + '%, rgba(0,0,0,0) ' + mathPercent(sell[p]) + '%, rgba(0,0,0,0) ' + (100 - mathPercent(sell[p])) + '%)'}"
                 @click="setPrice(p)"
            >
                <div class="price txt-red">{{p}}</div>
                <div class="value">{{sell[p]}}</div>
            </div>
        </div>
        <div :class="'last-price txt-' + (lastPrice.type === 'sell' ? 'red' : 'green')">{{lastPrice.price}}</div>
        <div class="depth-path depth-buy">
            <div class="sell-line price-line"
                 v-for="p in prices.buy"
                 :style="{background: 'linear-gradient(to left, rgb(135, 243, 163) ' + mathPercent(buy[p]) + '%, rgba(0,0,0,0) ' + mathPercent(buy[p]) + '%, rgba(0,0,0,0) ' + (100 - mathPercent(buy[p])) + '%)'}"
                 :key="p"
                  @click="setPrice(p)"
                 >
                <div class="price txt-green">{{p}}</div>
                <div class="value">{{buy[p]}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import Store from '../../core/Store';

export default {
    data() {
        return {
            maxValue: 0,
            prices: {sell:[], buy:[]},
            sell: {},
            buy: {},
            lastPrice: {}
        }
    },
    created(){
        Store.$watch('publicPairsData', (c)=>{
            this.updateDepthData();
        }, {deep: true});
    },
    computed:{
        pairName: () => Store.terminalPair,
    },
    methods: {
        mathPercent(value) {
            return value / this.maxValue * 100;
        },
        updateDepthData(){
            const {terminalPair} = Store;
            const data = Store.publicPairsData[Store.terminalPair];
            this.prices = data.prices;
            this.sell = data.depth.sell;
            this.buy = data.depth.buy;
            this.lastPrice = data.lastPrice;
            this.maxValue = 0;
            this.prices.buy.forEach(p=> this.maxValue = Math.max(this.maxValue, data.depth.buy[p]));
            this.prices.sell.forEach(p=> this.maxValue = Math.max(this.maxValue, data.depth.sell[p]));
            console.log(this.maxValue);
        },
         setPrice(p){
             Store.setPrice(p);
         }
    },
}
</script>

<style>

</style>
