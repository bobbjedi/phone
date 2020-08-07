<template>
<f7-page :page-content="false">
    <div class="page-block-with-menu bg-blue">
        <!-- MAIN-BLOCK -->
        <div class="main-block">
            <!-- HEADER PAGE -->
            <div class="header-block txt-white center">
                <span @click="goMainPage">
                    <f7-icon icon="icon-back"></f7-icon>
                </span>
                <span class="big">{{title}} #{{order.id}}</span>
                <span class="big mr5"><i class="fa fa-cog bigbig" aria-hidden="true"></i></span>
            </div>

            <!-- DARK_PATH -->
            <div class="txt-white center mb20" v-if="order.id && order.status === 3">
                <div class="txt-lightgrey j-between ml15 mr15 big"><span>Заявка #{{order.id}}</span><span>Осталось: {{this.timeLeft | leftTime}}</span></div>
            </div>

            <!-- WHITE-PATH -->
            <div class="page-content-block bg-grey">
                <div v-if="order.id" class="w100p main-path">
                    <!-- <div class="big m5 mb10 txt-grey center">{{order.status | status}} ({{order.status}})</div> -->
                    <div class="mt15 small center">По курсу:
                        <span v-if="!tiker.turn_the_course">1 {{order.money1}} = {{order.exchange_rate | format}} {{order.money2}}</span>
                        <span v-else>1 {{order.money2}} = {{(tiker && tiker.exchange_rate) || 0 | format}} {{order.money1}}</span>
                    </div>

                    <!-- Блоки монет -->
                    <div>
                        <div class="coin-ex-block a-center j-left">
                            <div class="column-left">
                                <div class="small mb5">Отдаете</div>
                                <coin-icon :code="order.money1" width="25" />
                            </div>
                            <div class="column-left ml10">
                                <div :class="(isNeedSellAddress ? 'mt5 big' : 'mt10 bigbig')">{{order.amount_money1 | format}} {{order.money1}}</div>
                                <div v-if="isNeedSellAddress" class="small txt-grey">{{order.req_money1}}</div>
                            </div>
                        </div>

                        <!-- <div class="center txt-blue exchange-icon-block bg-grey"><i class="bg-grey exchange-icon fa fa-exchange bigbig" aria-hidden="true"></i></div> -->
                        <i class="bg-grey exchange-icon fa fa-exchange bigbig" aria-hidden="true"></i>
                        <div class="coin-ex-block a-center j-left mt25 bottom-coin-block">
                            <div class="column-left">
                                <div class="small mb5">Получаете</div>
                                <coin-icon :code="order.money2" width="25" />
                            </div>
                            <div class="column-left ml10">
                                <div :class="'mt5 big'">{{order.amount_money2 | format}} {{order.money2}}</div>
                                <div class="small txt-grey">{{order.req_money2}}</div>
                            </div>
                        </div>
                    </div>

                    <!-- /Блоки монет -->

                    <!-- Если ждет кош или дали кош -->
                    <div class="m10" v-if="[1, 3].includes(order.status)">
                        <div>Сделайте перевод по реквизитам:</div>
                        <div v-show="order.status === 3" class="txt-grey mt5 j-left"><span class="small">{{order.payment_number}}</span>
                            <clone class="txt-blue ml5 big" :value="order.payment_number"></clone>
                        </div>
                         <div v-show="order.status === 3 && order.pay_link" class="mt5 j-left txt-blue">
                                <f7-link @click="open(order.pay_link, '_blank')">Перейти для оплаты <i class="fa fa-link" aria-hidden="true"></i></f7-link>
                        </div>

                        <div v-show="order.status === 3 && order.view_comment && order.comment_in" class="txt-grey mt5">
                            <div>Комментарий:</div>
                            <span class="small">{{order.comment_in}}</span>
                            <!-- <clone class="txt-blue ml5 big" :value="order.comment_in"></clone> -->
                        </div>
                        <div v-show="order.status === 1" class="center mb5">
                            <f7-preloader color="#3b3b56"></f7-preloader>
                        </div>
                    </div>
                    <!-- /Если ждет кош или дали кош -->

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
                    <!-- Показываю кнопку для статуса 3 /-->

                    <!-- Поля в обработке или ошибка -->
                    <div class="column-center bg-white info-block mt15 page-content-block" v-if="isErrorOrder || [5].includes(order.status)">
                        <div class="mt15 page-content-block">

                            <!-- Все кроме успешно -->
                            <div v-if="![5].includes(order.status)">
                                <div class="center icon-status">
                                    <i v-if="isErrorOrder" class="txt-red fa fa-times-circle-o" aria-hidden="true"></i>
                                </div>
                                <div class="bigbig m5 bold center">{{processMessage}}</div>
                                <div class="button-wrapper mt15">
                                    <f7-button fill round>Обратиться к оператору</f7-button>
                                </div>
                            </div>
                            <!-- Все кроме успешно /-->

                            <!-- Успешно -->
                            <div v-else class="center mt15">
                                <div class="bigbig">Ваши впечатления?</div>

                                <div class="star-line center mt10">
                                    <i v-for="i in [1,2,3,4,5]" :class="'fa fa-star' + ( i > stars ? '-o' : '')" aria-hidden="true" :key="i" @click="stars = i"></i>
                                </div>

                                <f7-list class="comment-form">
                                    <f7-list-input floating-label outline label="Ваше имя" type="text" placeholder="Имя" validate clear-button :value="commentName" @input="commentName = $event.target.value"></f7-list-input>
                                    <f7-list-input floating-label outline label="Ваш комментарий" type="textarea" placeholder="Комментарий" validate clear-button :value="commentText" @input="commentText = $event.target.value"></f7-list-input>
                                </f7-list>
                                <div class="button-wrapper mt15 mb15">
                                    <f7-button class="bg-blue" fill round @click="sentComment">Отправить отзыв</f7-button>
                                </div>
                            </div>
                            <!-- /Успешно -->

                        </div>
                    </div>

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
import listenerOrders from '../core/listenerOrders';

export default {
    props: ['orderUid'],
    components: {
        bottomMenu
    },
    data() {
        return {
            order: {},
            tiker: {},
            timeLeft: 0,
            commentText: '',
            commentName: '',
            stars: 5
        };
    },
    created() {},
    mounted() {
        this.$f7.preloader.show();
        this.updateOrderData();
        Store.$on('update_' + this.orderUid, () => this.updateOrderData());
        this.timeOutLeftTime = setInterval(() => this.timeLeft--, 1000);
    },
    computed: {
        isNeedSellAddress() {
            return (Store.curencyes.find(c => c.code === this.order.money1) || {}).isAskReqSell;
        },
        isErrorOrder() {
            return [4, 13, 18].includes(this.order.status);
        },
        title() {
            const {
                status,
                id
            } = this.order;
            if (this.isErrorOrder) {
                return `Заявка #${id} не выполнена`;
            }
            if ([5].includes(status)) {
                return `Заявка #${id} выполнена`;
            }
            return 'Перевод средств';
        },
        processMessage() {
            const s = this.order.status;
            if (s === 4) {
                return 'Ваша заявка не оплачена во время';
            }
            if (s === 13) {
                return 'Оплата пришла не вся';
            }
            if (s === 18) {
                return 'Произошла техническая ошибка';
            }
        }
    },
    methods: {
        open: (v) => window.open(v),
        updateOrderData() {
            listenerOrders.getOrderData(this.orderUid, res => {
                if (res.id) {
                    this.order = res;
                    this.timeLeft = res.date_end_order - new Date() / 1000;
                    this.getTiker();
                    console.log('>', res)
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
        goMainPage() {
            if (this.$f7router.history[this.$f7router.history.length - 2] === '/') {
                this.$f7router.back();
            } else {
                this.$f7router.navigate('/');
            }
        },
        pressPay() {
            this.$f7.dialog.preloader('Отправляем в обработку...');
            api('current', {
                url: 'order/start/check/' + this.orderUid
            }, res => {
                setTimeout(() => {
                    this.$f7.dialog.close();
                    if (res.success) {} else {
                        Store.noty('Ошибка!', 'Попробуйте еще раз.', 2);
                    }
                }, 500);
            });
        },
        sentComment() {
            alert('Ok');
        }
    },
    destroyed() {
        clearInterval(this.timeOutLeftTime);
    }
};
</script>

<style scoped>
.coin-ex-block {
    margin: 10px;
    border-radius: 10px;
    background: white;
    padding: 15px;
    position: relative;
    z-index: 1;
}

.bottom-coin-block {
    margin-top: -35px !important;
    /* position: unset; */
}

.exchange-icon-block {
    position: relative;
    width: 100%;
    margin-top: -25px;
}

.exchange-icon {
    padding: 15px;
    border-radius: 50px;
    z-index: 3;
    position: relative;
    top: -25px;
    left: calc(50% - 25px);
}

.main-path {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.icon-status {
    font-size: 3em;
}

.info-block {
    border-radius: 15px 15px 0 0;
}

.star-line i {
    font-size: 3em;
    margin: 4px;
    color: gold;
}

.star-line i.fa-star-o {
    color: grey !important;
}

.comment-form ul {
    background: #9696a1;
}
</style>
