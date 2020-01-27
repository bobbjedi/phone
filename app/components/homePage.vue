<template>
<f7-page :page-content="false">
    <f7-navbar title="Trade panel">
        <f7-nav-right>
            <f7-button raised panel-open="left">Menu</f7-button>
        </f7-nav-right>
    </f7-navbar>
    <br>
    <f7-block>
        <f7-swiper pagination navigation scrollbar id="main-slider">
            <f7-swiper-slide class="slide"><img src="img/slide1.jpg"></f7-swiper-slide>
            <f7-swiper-slide class="slide"><img src="img/slide2.jpg"></f7-swiper-slide>
            <f7-swiper-slide class="slide"><img src="img/slide3.jpg"></f7-swiper-slide>
        </f7-swiper>
    </f7-block>

    <!-- СПИСОК ПАР -->

    <div id="info-trading-pairs">
        <f7-block-title>Traiding pairs</f7-block-title>
        <f7-block>
            <table v-if="publicData.pairsData">
                <tr>
                    <td>Pair</td>
                    <td>Last price</td>
                    <td>Volume 24</td>
                    <td>Change</td>
                </tr>
                <div></div>
                <tr v-for="p in tradePairs" @click="openTerminal(p)" :key="p" class="hovered">
                    <td>{{p.replace('_', '/')}}</td>
                    <td :class="'txt-' + (publicData.pairsData[p].lastPrice.type === 'buy' ? 'green' : 'red')">{{publicData.pairsData[p].lastPrice.price | format}}</td>
                    <td>000000 {{p.split('_')[0]}}</td>
                    <td :class="'bg-' + (Math.random() > 0.5 ? 'green' : 'red') + ' txt-center'">3.5</td>
                </tr>
            </table>
        </f7-block>
    </div>

    <!-- Терминал -->
    <f7-popup class="char-popup-swipe" :opened="isOpenTerminal" @popup:closed="isOpenTerminal = false">
        <f7-page>
            <f7-navbar :title="'Trading ' + terminalPair">
                <f7-nav-right>
                    <f7-link popup-close>Close</f7-link>
                </f7-nav-right>
            </f7-navbar>
            <f7-block v-show="isLoadedPairData">
                <div class="terminal">
                    <div class="left-parth">
                        <sell-buy></sell-buy>
                        <historyOrders></historyOrders>
                    </div>
                    <div class="right-parth">
                        <depth></depth>
                        <open-orders></open-orders>
                    </div>
                </div>
            </f7-block>
        </f7-page>
    </f7-popup>

</f7-page>
</template>

<script>
// import pairTerminal from './pairTerminal.vue';
import Vue from 'vue';
import config from '../../config';
import Store from '../core/Store';
import sellBuy from './terminal/sellBuy.vue';
import openOrders from './terminal/openOrders.vue';
import depth from './terminal/depth.vue';
import historyOrders from './terminal/historyOrders.vue';
import api from '../core/api';

export default {
    data() {
        return {
            isOpenTerminal: false,
            isOpenCabinet: false,
            isLoadedPairData: false,
            tradePairs: config.tradePairs
        }
    },
    components: {
        sellBuy,
        openOrders,
        depth,
        historyOrders
    },
    watch: {
        async '$f7router.currentRoute.url'(v) {
            Store.currentRoute = v;
        },
        isOpenTerminal(v) {
            Store.isOpenTerminal = v;
        }
    },
    created() {
        Store.globalRouter = this.$f7router;
        Store.getPairData = cb => this.getPairData(cb);
    },
    computed: {
        publicData: () => Store.public,
        terminalPair: () => Store.terminalPair
    },
    methods: {
        openTerminal(pairName) {
            this.$f7.preloader.show();
            this.isOpenTerminal = true;
            Store.terminalPair = pairName;
            this.isLoadedPairData = false;
            this.getPairData();
            Store.updateUser();
        },
        getPairData(cb) {
            if (!this.isOpenTerminal) {
                return;
            }
            const pairName = Store.terminalPair;
            api({
                action: 'pairData',
                data: {
                    pairName
                }
            }, data => {
                data.prices.sell.reverse();
                Vue.set(Store.publicPairsData, pairName, data);
                cb && cb();
                setTimeout(() => {
                    this.$f7.preloader.hide();
                    this.isLoadedPairData = true;
                }, 1000);
            });
        }
    }
}
</script>
