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
                <span class="big">Перевод средств</span>
                <span class="big"><i class="fa fa-cog bigbig" aria-hidden="true"></i></span>
            </div>

            <!-- DARK_PATH -->
            <div class="txt-white center mb5 mt5">
                <div class="txt-lightgrey id-time-block"><span>Заявка №: 23687</span>     <span>Время: 07:04</span></div>
             </div>

            <!-- WHITE-PATH -->
            <div class="page-content-block bg-white mt20">
                 <div class="mt15 small center">По курсу:
                    <span v-if="!tiker.turn_the_course">1 {{exchangeData.fromCoin}} = {{(tiker && tiker.exchange_rate) || 0 | format}} {{exchangeData.toCoin}}</span>
                    <span v-else>1 {{exchangeData.toCoin}} = {{(tiker && tiker.exchange_rate) || 0 | format}} {{exchangeData.fromCoin}}</span>
                </div>
             <div class="button-wrapper mt10" block>
                <f7-button :class="{'disable-button': false}" class="bg-blue" fill round @click="makePay()">Продолжить</f7-button>
            </div>
            </div>
        </div>

        <!-- BOTTOM_MENU -->
        <bottom-menu></bottom-menu>
    </div>
</f7-page>
</template>

<script>
import Store from "../core/Store";
import $u from '../core/utils';
import bottomMenu from './bottom-menu.vue';
import api from '../core/api';

export default {
    components: {
        bottomMenu
    },
    data() {
        return {
            tiker: {}
        };
    },
    created(){
    },
    mounted() {
        this.tiker = Store.exchangeData.tiker;
        // console.log(Store.exchangeData.tiker);
        setTimeout(() => this.getTiker(), 2000);
    },
    computed: {
        isNeedSellAddress(){
            return this.sellCurency.isAskReqSell;
        },
        buyCurency(){
            return this.tiker.buy_curency;
        },
        sellCurency(){
            return Store.curencyes.find(c=> c.code === Store.exchangeData.fromCoin);
        },
        exchangeData: () => Store.exchangeData
    },
    methods: {
        getTiker() {
            api('current', {
                url: 'cashe/operations/detail/' + this.exchangeData.fromCoin + '/' + this.exchangeData.toCoin
            }, res => {
                this.$f7.preloader.hide();
                if (res.success) {
                    this.tiker = res.data;
                    Store.exchangeData.tiker = res.data;
                    console.log('tiker', res.data);
                }
            });
        },
        makePay(){
            // Store.exchangeData.toAddress = this.toAddress;
            // Store.exchangeData.fromAddress = this.fromAddress;
            // Store.exchangeData.email = this.email;
            // this.$f7router.navigate('/make-payment');
        }
    }
};
</script>

<style scoped>
.id-time-block{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
}
</style>
