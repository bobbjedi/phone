<template>
<f7-page :page-content="false">
    <div class="page-block-with-menu bg-blue">
        <!-- MAIN-BLOCK -->
        <div class="main-block">
            <!-- HEADER PAGE -->
            <div class="header-block txt-white center">
                <span @click="$f7router.navigate('/');">
                    <f7-icon icon="icon-back"></f7-icon>
                </span>
                <span class="big">Перевод средств</span>
                <span class="big mr5"><i class="fa fa-cog bigbig" aria-hidden="true"></i></span>
            </div>

            <!-- DARK_PATH -->
            <div class="txt-white center" v-if="order.id">
                <div class="txt-lightgrey j-between ml15 mr15 big"><span>Заявка № {{order.id}}</span><span>Время: {{order.date_make_order * 1000 | h_m}}</span></div>
            </div>

            <!-- WHITE-PATH -->
            <div class="page-content-block bg-white mt20">
                <span v-if="order.id">
                    <div class="big m5 mb10 txt-grey center">{{order.status | status}} ({{order.status}})</div>
                    <div class="mt15 small center">По курсу:
                        <span v-if="!tiker.turn_the_course">1 {{order.money1}} = {{order.exchange_rate | format}} {{order.money2}}</span>
                        <span v-else>1 {{order.money2}} = {{(tiker && tiker.exchange_rate) || 0 | format}} {{order.money1}}</span>
                    </div>

                    <div class="coin-ex-block a-center j-left">
                        <div class="column-left">
                            <div class="small mb5">Отдаете</div>
                            <coin-icon :code="order.money1" width="25" />
                        </div>
                        <div class="column-left ml10">
                            <div :class="(isNeedSellAddress ? 'mt5 big' : 'mt10 bigbig')">{{order.amount_money1}} {{order.money1}}</div>
                            <div v-if="isNeedSellAddress" class="small txt-grey">{{order.req_money1}}</div>
                        </div>
                    </div>
                    <div class="center txt-blue exchange-icon-block"><i class="exchange-icon fa fa-exchange bigbig" aria-hidden="true"></i></div>
                    <div class="coin-ex-block a-center j-left mt25">
                        <div class="column-left">
                            <div class="small mb5">Получаете</div>
                            <coin-icon :code="order.money2" width="25" />
                        </div>
                        <div class="column-left ml10">
                            <div :class="'mt5 big'">{{order.amount_money2}} {{order.money2}}</div>
                            <div class="small txt-grey">{{order.req_money2}}</div>
                        </div>
                    </div>

                    <!-- Если ждет кош или дали кош -->
                    <div class="m10" v-if="[1, 3].includes(order.status)">
                        <div>Сделайте перевод по реквизитам:</div>
                        <div v-show="order.status === 3" class="txt-grey mt5 j-left"><span class="small">{{order.payment_number}}</span>
                            <clone class="txt-blue ml5 big" :value="order.payment_number"></clone>
                        </div>
                        <div v-show="order.status === 3 && order.view_comment && order.comment_in" class="txt-grey mt5 j-left"><span class="small">{{order.comment_in}}</span>
                            <div>Комментарий:</div>
                            <clone class="txt-blue ml5 big" :value="order.comment_in"></clone>
                        </div>
                        <div v-show="order.status === 1" class="center mb5"><f7-preloader color="#3b3b56" ></f7-preloader></div>
                    </div>
                    <!-- Показываю кнопку для статуса 3 -->
                    <div class="mt25 mb5" v-show="order.status === 3 && order.view_pay_button">
                        <div class="j-center">
                            <i class="bigbig txt-yellow fa fa-exclamation-triangle" aria-hidden="true"></i>
                            <div class="ml10 small txt-grey">Обязательно!<br>После оплаты нажмите на кнопку!</div>
                        </div>
                        <div class="button-wrapper mt15">
                            <f7-button class="bg-blue" fill round @click="pressPay()">Я оплатил</f7-button>
                        </div>
                    </div>


                    <!-- <div class="button-wrapper mt10" block>

            </div> -->
                </span>
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
import listenerOrders from '../core/listenerOrders';

export default {
    props: ['orderUid'],
    components: {
        bottomMenu
    },
    data() {
        return {
            order: {},
            tiker: {}
        };
    },
    created() {},
    mounted() {
        this.$f7.preloader.show();
        this.updateOrderData();
        Store.$on('update_' + this.orderUid, () => this.updateOrderData());
    },
    computed: {
        isNeedSellAddress(){
            return (Store.curencyes.find(c => c.code === this.order.money1) || {}).isAskReqSell;
        }
    },
    methods: {
        updateOrderData() {
            listenerOrders.getOrderData(this.orderUid, res => {
                if (res.id) {
                    this.order = res;
                    this.getTiker();
                } else {
                    this.$f7.preloader.hide();
                }
            });
        },
        getTiker() {
            api('current', {
                url: 'cashe/operations/detail/' + this.order.money1 + '/' + this.order.money2
            }, res => {
                this.$f7.preloader.hide();
                if (res.success) {
                    this.tiker = res.data;
                }
            });
        },
        pressPay() {
            this.$f7.dialog.preloader('Отправляем в обработку...');
            api('current', {
                url: 'order/start/check/' + this.orderUid
            }, res => {
                setTimeout(()=>{
                    this.$f7.dialog.close();
                    if (res.success) {
                        this.tiker = res.data;
                        this.$f7router.navigate('/');
                        // Store.noty('Успешно!', 'Ваша заявка в обработке. Пожалуйста ожидайте.', 4);
                    }
                }, 500);
            });
            // Store.exchangeData.toAddress = this.toAddress;
            // Store.exchangeData.fromAddress = this.fromAddress;
            // Store.exchangeData.email = this.email;
            // this.$f7router.navigate('/make-payment');
        }
    }
};
</script>

<style scoped>
.coin-ex-block {
    margin: 10px;
    border-radius: 10px;
    background: #e2e2e4;
    padding: 15px;
}

.exchange-icon-block {
    position: absolute;
    width: 100%;
    margin-top: -25px;
}

.exchange-icon {
    padding: 15px;
    background: white;
    border-radius: 50px;
}
</style>
