<template>
    <div id="depth">
        <div class="depth-header">
            <span>Price(BTC)</span><span>Amount(BIP)</span>
        </div>
        <div class="depth-path depth-sell">
            <div class="sell-line price-line" v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                 :key="i"
                 :style="{background: 'linear-gradient(to left, rgb(232, 153, 150) ' + mathPercent(20 * i) + '%, rgba(0,0,0,0) ' + mathPercent(20 * i) + '%, rgba(0,0,0,0) ' + (100 - mathPercent(20 * i)) + '%)'}"
            >
                <div class="price txt-red">{{50- i}}</div>
                <div class="value">{{20 * i || 5}}</div>
            </div>
        </div>
        <div class="last-price txt-red">1.3454535</div>
        <div class="depth-path depth-buy">
            <div class="sell-line price-line"
                 v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                 :style="{background: 'linear-gradient(to left, rgb(135, 243, 163) ' + mathPercent(20 * i) + '%, rgba(0,0,0,0) ' + mathPercent(20 * i) + '%, rgba(0,0,0,0) ' + (100 - mathPercent(20 * i)) + '%)'}"
                 :key="i"
                 >
                <div class="price txt-green">{{10 + i}}</div>
                <div class="value">{{20 * i}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            maxValue: 200
        }
    },
    methods: {
        mathPercent(value) {
            return value / this.maxValue * 100;
        }
    }
}
</script>

<style>

</style>
