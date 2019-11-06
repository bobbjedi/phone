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
                <f7-swiper-slide class="slide">Slide 1</f7-swiper-slide>
                <f7-swiper-slide class="slide">Slide 2</f7-swiper-slide>
                <f7-swiper-slide class="slide">Slide 3</f7-swiper-slide>
            </f7-swiper>
        </f7-block>
        <div id="info-trading-pairs">
            <f7-block-title>Traiding pairs</f7-block-title>
            <f7-block>
                <table>
                    <tr>
                        <td>Pair</td>
                        <td>Last price</td>
                        <td>Volume 24</td>
                        <td>Change</td>
                    </tr>
                    <div></div>
                    <tr v-for="p in tradePairs" @click="openTerminal(p)" :key="p" class="hovered">
                        <td>{{p.replace('_', '/')}}</td>
                        <td :class="'txt-' + (Math.random() > 0.5 ? 'green' : 'red')">0.2345454</td>
                        <td>323445 {{p.split('_')[0]}}</td>
                        <td :class="'bg-' + (Math.random() > 0.5 ? 'green' : 'red') + ' txt-center'">3.5</td>
                    </tr>
                </table>
            </f7-block>
        </div>
        <f7-popup class="char-popup-swipe" swipe-to-close :opened="isOpenTerminal"
            @popup:closed="isOpenTerminal = false">
            <f7-page>
                <f7-navbar :title="'Trading ' + terminalPair">
                    <f7-nav-right>
                        <f7-link popup-close>Close</f7-link>
                    </f7-nav-right>
                </f7-navbar>
                <f7-block v-show="isLoadedgPairData">
                    <div class="terminal">
                        <div class="left-parth">
                            <sell-buy></sell-buy>
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
import config from '../../config';
import Store from '../core/Store';
import sellBuy from './terminal/sellBuy.vue';
import openOrders from './terminal/openOrders.vue';

export default {
    data(){
        return {
            isOpenTerminal: false,
            isLoadedgPairData: false,
            tradePairs: config.tradePairs
        }
    },
    components:{
        sellBuy,
        openOrders
    },
    watch: {
        async '$f7router.currentRoute.url'(v) {
            Store.currentRoute = v;
        }
    },
        created(){
        Store.globalRouter = this.$f7router;
    },
    computed: {
         terminalPair:()=> Store.terminalPair
    },
    methods: {
        openTerminal(pairName){
            this.$f7.preloader.show();
            this.isOpenTerminal = true;
            Store.terminalPair = pairName;
            this.isLoadedgPairData = false;
            setTimeout(()=>{
                this.$f7.preloader.hide();
                this.isLoadedgPairData = true;
            }, 1000);
        }
    }
}
</script>
