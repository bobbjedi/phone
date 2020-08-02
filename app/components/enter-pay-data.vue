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
                <span class="big">Ввод данных</span>
                <span class="big"><i class="fa fa-cog bigbig" aria-hidden="true"></i></span>
            </div>

            <!-- DARK_PATH -->
            <div class="txt-white center bigbig mb15 mt15">{{exchangeData.fromCoinAmount}} <span class="txt-lightgrey">{{exchangeData.fromCoin.slice(0, 5)}}</span> = {{exchangeData.toCoinAmount}} <span class="txt-lightgrey">{{exchangeData.toCoin.slice(0, 5)}}</span></div>
            <!-- WHITE-PATH -->
            <div class="page-content-block bg-white mt20">
                <f7-list v-if="buyCurency">
                    <f7-list-input
                        v-if="isNeedSellAddress"
                        class="small"
                        :label="sellCurency.label_sell + ' ' + sellCurency.bestchange_code"
                        type="text"
                        :placeholder="sellCurency.exemple"
                        :pattern="sellCurency.re"
                        validate
                        clear-button
                        :value="fromAddress"
                        @input="fromAddress = $event.target.value"
                        ></f7-list-input>
                    <f7-list-input class="small" :value="toAddress" @input="toAddress = $event.target.value" :label="buyCurency.label_buy + ' ' + buyCurency.bestchange_code" type="text" :placeholder="buyCurency.exemple" validate :pattern="buyCurency.re" clear-button></f7-list-input>
                    <f7-list-input class="small" :value="email" @input="email = $event.target.value" placeholder="example@gmail.com" label="Ваш email" type="text" validate clear-button pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"></f7-list-input>
                </f7-list>
                <div class="center mt15 agree-exchange" @click="isAgree = !isAgree">
                    <f7-checkbox :checked="isAgree" class="md"></f7-checkbox> <span class="ml5">Я согласен с правилами обмена</span>
                </div>
             <div class="mt15 small center">По курсу:
                <span v-if="!tiker.turn_the_course">1 {{exchangeData.fromCoin}} = {{(tiker && tiker.exchange_rate) || 0 | format}} {{exchangeData.toCoin}}</span>
                <span v-else>1 {{exchangeData.toCoin}} = {{(tiker && tiker.exchange_rate) || 0 | format}} {{exchangeData.fromCoin}}</span>
             </div>
             <div class="button-wrapper mt10" block>
                <f7-button :class="{'disable-button': !isValidForm}" class="bg-blue" fill round @click="makePay()">Продолжить</f7-button>
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
import api from '../core/api';
import {ordersDb} from '../core/localDb';
import bottomMenu from './bottom-menu.vue';

export default {
    components: {
        bottomMenu
    },
    data() {
        return {
            isAgree: true,
            fromAddress: '78745465465',
            toAddress: '17pCKgo5dCrdd31i1rn2v37Euunxuvve2W',
            email: 'dfghf@jlkj.com',
            //  isAgree: false,
            // fromAddress: '',
            // toAddress: '',
            // email: Store.user.email || '',
            tiker: {}
        };
    },
    created(){
        Store.$watch('user.email', v => this.email = v);
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
        exchangeData: () => Store.exchangeData,
        isValidForm(){

            return this.sellCurency && this.fromAddress && this.isAgree
                && new RegExp(this.sellCurency.re).test(this.fromAddress)
                && /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.email)
                && (!this.isNeedSellAddress || this.isNeedSellAddress && new RegExp(this.buyCurency.re).test(this.toAddress));
        }
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
            Store.exchangeData.toAddress = this.toAddress;
            Store.exchangeData.fromAddress = this.fromAddress;
            Store.exchangeData.email = this.email;
            const {email, fromAddress, toAddress, fromCoin, toCoin, fromCoinAmount, toCoinAmount} = Store.exchangeData;

            this.$f7.preloader.show();
            api('createOrder', {
                email,
                money1: fromCoin,
                money2: toCoin,
                req_money1: fromAddress,
                req_money2: toAddress,
                amount_money1: fromCoinAmount,
                amount_money2: toCoinAmount,
                rid: "none",
                rate: -1
            }, res=>{
                this.$f7.preloader.hide();
                if(res.success){
                    const order = res.data;
                    order._id = order.id;
                    new ordersDb(order, 1);
                    console.log(res);
                    Store.exchangeData.order = order;
                    this.$f7router.navigate('/make-payment');
                } else {
                    alert('ОШИБКА СОЗДАНИЯ ОРДЕРА');
                }
            });
        }
    }
};
</script>

<style scoped>
.agree-exchange {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
