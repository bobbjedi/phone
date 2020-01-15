<template>
    <div id="depth">
        <div class="depth-header">
            <span>Price(BTC)</span><span>Amount(BIP)</span>
        </div>
        <div class="depth-path depth-sell">
            <div class="sell-line price-line" v-for="p in prices.sell"
                 :key="p"
                 :style="{background: 'linear-gradient(to left, rgb(232, 153, 150) ' + mathPercent(20 * p) + '%, rgba(0,0,0,0) ' + mathPercent(20 * p) + '%, rgba(0,0,0,0) ' + (100 - mathPercent(20 * p)) + '%)'}"
            >
                <div class="price txt-red">{{p}}</div>
                <div class="value">{{sell[p]}}</div>
            </div>
        </div>
        <div class="last-price txt-red">1.3454535</div>
        <div class="depth-path depth-buy">
            <div class="sell-line price-line"
                 v-for="p in prices.buy"
                 :style="{background: 'linear-gradient(to left, rgb(135, 243, 163) ' + mathPercent(20 * p) + '%, rgba(0,0,0,0) ' + mathPercent(20 * p) + '%, rgba(0,0,0,0) ' + (100 - mathPercent(20 * p)) + '%)'}"
                 :key="p"
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
            maxValue: 200,
            prices: {sell:[], buy:[]},
            sell: {},
            buy: {}
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
        }
    }
}
</script>

<style>

</style>
