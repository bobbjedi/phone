<template>
<f7-page :page-content="false">
    <div class="page-block-with-menu bg-blue">
        <!-- MAIN-BLOCK -->
        <div class="main-block" id="scrollable-block-exchange">

            <!-- HEADER PAGE -->
            <div class="header-block txt-white center">
                <span></span>
                <span class="big">Обмен</span>
                <span class="big"><i class="fa fa-cog bigbig" aria-hidden="true"></i></span>
            </div>

            <!-- DARK_PATH -->
            <div class="coin-exchange-block txt-white">
                <div class="coin-path" @click="changeCoin('from')">
                    <div class="small">Отдаете</div>
                    <div class="currency-name mt5"> <coin-icon :code="fromCoin" width="25" /><span class="ml5">{{fromCoin}}</span><i class="ml5 fa fa-caret-down" aria-hidden="true"></i></div>
                </div>
                <input class="big" type="number" v-model.number="fromCoinAmount" :min="tiker.min_money1" :max="tiker.max_money1">
            </div>
            <div class="coin-exchange-block txt-white">
                <div class="coin-path" @click="changeCoin('to')">
                    <div class="small">Получаете</div>
                    <div class="currency-name mt5"> <coin-icon :code="toCoin" width="25" /><span class="ml5">{{toCoin}}</span><i class="ml5 fa fa-caret-down" aria-hidden="true"></i></div>
                </div>
                <input class="big" type="number" v-model.number="toCoinAmount" :min="tiker.min_money2" :max="tiker.max_money2">
            </div>

            <div class="mt20 mb5 small center txt-white">
                По курсу:
                <span v-if="!tiker.turn_the_course">1 {{fromCoin}} = {{(tiker && tiker.exchange_rate) || 0 | format}} {{toCoin}}</span>
                <span v-else>1 {{toCoin}} = {{(tiker && tiker.exchange_rate) || 0 | format}} {{fromCoin}}</span>
            </div>

            <div class="button-wrapper" block>
                <f7-button :class="{'disable-button': !isValidAmount}" class="bg-white txt-blue" fill round @click="startExchange()">Начать обмен</f7-button>
            </div>
            <!-- WHITE-PATH -->
            <div class="page-content-block bg-white mt20">
                <div class="ml15 mt10 big mb5 bold">Новости</div>
                <f7-swiper class="swiper-parent mb5" :params="{speed:500, slidesPerView: 2, spaceBetween: 20}">
                    <f7-swiper-slide>Slide 1</f7-swiper-slide>
                    <f7-swiper-slide>Slide 2</f7-swiper-slide>
                    <f7-swiper-slide>Slide 3</f7-swiper-slide>
                    <f7-swiper-slide>Slide 4</f7-swiper-slide>
                    <f7-swiper-slide>Slide 5</f7-swiper-slide>
                    <f7-swiper-slide>Slide 6</f7-swiper-slide>
                </f7-swiper>
                <div class="ml15 mt10 big mb5 bold">История обменов</div>

                <!-- HISTORY -->
                <div class="orders-history-list" v-if="ordersHistory.length">
                    <div class="order-history-item txt-lightgrey" v-for="o in ordersHistory" :key="o.id"
                    @click="$f7router.navigate('/make-payment/' + (o.uid || o.unique_id))">
                        <div class="j-between big"><span>№{{o.id}}</span> <span>{{o.date_make_order * 1000 | d_m_y}}</span></div>
                        <div class="center big mt10 mb10 txt-grey">{{o.status | status}}</div>
                        <div class="j-around big">
                            <span class="column-center">
                                <coin-icon :code="o.money1" width="25" />
                                <span>{{o.amount_money1 | format}}</span>
                            </span>
                            <i class="txt-grey fa fa-exchange bigbig" aria-hidden="true"></i>
                            <span class="column-center">
                                <coin-icon :code="o.money2" width="25" />
                                <span>{{o.amount_money2 | format}}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div v-if="!ordersHistory.length" class="big center txt-grey">Обменов нет</div>
                <div class="center mb5" :style="{opacity: (isNexPageLoaded ? 1: 0)}"><f7-preloader color="#3b3b56" ></f7-preloader></div>
            </div>
        </div>

        <!-- СМЕНА КОИНА -->
        <f7-sheet :opened="isChangedCoin" @sheet:closed="isChangedCoin = false" swipe-to-close backdrop class="sheet-change-coin">
            <f7-page-content>
               <div class="touch-close-line"></div>
                <f7-block>
                    <div class="big bold">Выбор вылюты</div>
                    <div class="small">которую {{changedCoinType === 'from' ? 'отдаёте' : 'получаете'}}</div>
                    <!-- FIND -->
                    <f7-list class="mt5 mb5" id="list-find">
                        <f7-list-input :value="searchKey" @input="searchKey = $event.target.value" type="text" placeholder="Поиск" clear-button>
                        </f7-list-input>
                    </f7-list>
                    <!-- TABS -->

                    <div class="tabs-parent">
                        <div class="tab-item" :class="{active: filteredGroup === 'ALL'}" @click="filteredGroup = 'ALL'">Все</div>
                        <div class="tab-item" :class="{active: filteredGroup === 'COIN'}" @click="filteredGroup = 'COIN'">Крипто</div>
                        <div class="tab-item" :class="{active: filteredGroup === 'FIAT'}" @click="filteredGroup = 'FIAT'">Фиат</div>
                    </div>

                    <div class="curencyes-list overflow-auto mt15">
                        <div class="curency-item mt10" v-show="(searchKey.length && c.code.toLowerCase().includes(searchKey.toLowerCase()) || !searchKey.length) && (filteredGroup === 'ALL' || filteredGroup === c.currency_type)" v-for="c in optionsSelect" :key="c.code" @click="choiceCoin(c.code)">
                            <div class="curency-name-block">
                                <coin-icon :code="c.code" width="20" />
                                <span class="big ml5">{{c.code}}</span>
                            </div>
                            <div class="txt-grey">{{c.reserv_data.data.value | format}}</div>
                        </div>
                    </div>
                </f7-block>
            </f7-page-content>
        </f7-sheet>

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
            fromCoinTikers: [],
            tiker: {},
            fromCoin: 'Qiwi(RUB)',
            toCoin: '',
            fromCoinAmount: 0,
            toCoinAmount: 0,
            searchKey: '',
            isChangedCoin: false,
            changedCoinType: '',
            filteredGroup: 'ALL'
        };
    },
    mounted() {
        console.log('MOUNTED');
        Store.exchangeData = {};
        // setTimeout(()=>this.$f7router.navigate('/make-payment/8c89de41-9005-424e-85b2-6e7f87fdb767/'), 500);
        this.getFromCoinTikers();
        this.tikerTimer = setInterval(()=> this.getTiker(), 10000);
        const el = document.getElementById('scrollable-block-exchange');
        el.addEventListener('scroll', () => {
            if (el.scrollHeight - el.scrollTop - el.clientHeight < 2) {
               Store.updateOrdersHistory(true);
            }
        });
         el.addEventListener('touchmove', () => {
            if (el.scrollHeight - el.scrollTop - el.clientHeight < 2) {
               Store.updateOrdersHistory(true);
            }
        });
    },
    computed: {
        user: () => Store.user,
        ordersHistory: () => Store.ordersHistory,
        isNexPageLoaded: () => Store.isNexPageLoaded,
        rate(){
            return this.tiker.turn_the_course ? 1 / this.tiker.exchange_rate : this.tiker.exchange_rate;
        },
        curency() {
            return Store.curencyes.find(c => c.code === this.fromCoin)
        },
        // curencyes: () => Store.curencyes,
        optionsSelect() {
            if (this.changedCoinType === 'from') {
                console.log('Curr', Store.curencyes);
                return Store.curencyes;
            }
            const coins = $u.clone(this.fromCoinTikers);
            return coins.map(c => {
                return {
                    code: c.buy_curency.code,
                    currency_type: c.buy_curency.currency_type,
                    reserv_data: {
                        data: c.rate_data
                    }
                };
            });
        },
        isValidAmount() {
            const {
                toCoinAmount,
                fromCoinAmount
            } = this;
            const {
                min_money1,
                min_money2,
                max_money1,
                max_money2
            } = this.tiker;
            // console.log(toCoinAmount >= min_money2, toCoinAmount <= max_money2, fromCoinAmount >= min_money1, fromCoinAmount <= max_money1);
            return toCoinAmount >= min_money2 && toCoinAmount <= max_money2
            // && fromCoinAmount >= min_money1 && fromCoinAmount <= max_money1
            ;
        }
    },
    methods: {
        changeCoin(type) {
            this.changedCoinType = type;
            this.isChangedCoin = true;
        },
        choiceCoin(coinName) {
            this[this.changedCoinType + 'Coin'] = coinName;
            this.isChangedCoin = false;
        },
        getFromCoinTikers() {
            this.$f7.dialog.preloader('Загрузка...');

            console.log('this.curency', Store.curencyes, this.curency);
            api('current', {
                url: 'cashe/operations/' + this.fromCoin
            }, res => {
                if (res.success) {
                    this.fromCoinTikers = res.data;
                    if (!res.data.some(c => c.buy_curency.code === this.toCoin)) {
                        this.toCoin = res.data[0].buy_curency.code;
                    } else {
                        this.getTiker();
                    }
                }
            });
        },
        getTiker() {
            api('current', {
                url: 'cashe/operations/detail/' + this.fromCoin + '/' + this.toCoin
            }, res => {
                 this.$f7.dialog.close();
                if (res.success) {
                    const t = res.data;
                    t.max_money2 = Math.min(t.buy_curency.reserv_data.data.value, t.max_money2);
                    this.tiker = t;
                    this.toCoinAmount = t.min_money2 * 1.1;
                    Store.exchangeData.tiker = t;
                    this.$nextTick(()=>Store.exchangeData.rate = this.rate);
                } else {
                    // Store.toast('Неустойчивое интернет соединение!');
                }
            });
        },
        // roundAmounts(){
        //     this.fromCoinAmount = $u.round(this.fromCoinAmount, this.curency.exponent);
        //     this.toCoinAmount = $u.round(this.toCoinAmount, this.tiker.buy_curency.exponent);
        // },
        startExchange() {
            Store.exchangeData = {
                fromCoin: this.fromCoin,
                toCoin: this.toCoin,
                fromCoinAmount: $u.round(this.fromCoinAmount),
                toCoinAmount: this.toCoinAmount,
                tiker: $u.clone(this.tiker),
            };
            this.$f7router.navigate('/enter-pay-data');
        }
    },
    watch: {
        fromCoin() {
            this.getFromCoinTikers();
        },
        toCoin() {
            this.getTiker();
        },
        toCoinAmount() {
            if (this.isBlock !== 'to') {
                this.fromCoinAmount = $u.round(this.toCoinAmount / this.rate, this.curency.exponent);
                this.isBlock = 'from';
                this.$nextTick(() => this.isBlock = false);
            }
        },
        fromCoinAmount() {
            if (this.isBlock !== 'from') {
                this.toCoinAmount = $u.round(this.fromCoinAmount * this.rate, this.tiker.buy_curency.exponent);
                this.isBlock = 'to';
                this.$nextTick(() => this.isBlock = false);
            }
        }
    },
    destroyed(){
        clearInterval(this.tikerTimer);
    }
};
</script>

<style scoped>
.page-content-block {
    border-radius: 10px 10px 0 0;
}

.coin-exchange-block {
    color: rgb(212, 209, 209);
    margin: 20px;
    border-bottom: 1px solid rgb(212, 209, 209);
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
}

.currency-name {
    display: flex;
    align-items: center;
}

.swiper-slide {
    height: 100px;
    border: 1px solid grey;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(232, 233, 232);
}

.swiper-parent {
    margin: 5px;
    z-index: 0;
}

input {
    height: 100%;
    width: 110px;
    text-align: right;
    background: transparent;
    border: 0px;
    padding-top: 12px;
}

.sheet-change-coin {
    height: 90%;
    border-radius: 15px 15px 0 0;
}

.sheet-change-coin .page-content {
    /* overflow: hidden; */
}

/* Табы */
.tabs-parent {
    width: 100%;
    border: 1px solid #3b3b56;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.tab-item {
    transition: .5s;
    text-align: center;
    width: 33.3%;
    height: 100%;
    padding: 5px 0;
    color: #3b3b56;
    border-radius: 14px;
    /* border: 1px solid transparent; */
}

.tab-item.active {
    background-color: #3b3b56;
    /* border-color: #3b3b56; */
    color: white;
}

/* Список валют при выборе */
.curencyes-list {
    height: 100%;
}

.curency-item {
    display: flex;
    justify-content: space-between;
}

.curency-name-block {
    display: flex;
    align-items: center;
}

/* История */
.order-history-list {
    display: flex;
    flex-wrap: wrap;
}

.order-history-item {
    min-width: 250px;
    max-width: 300px;
    margin: 10px auto;
    border-radius: 10px;
    background: #e2e2e4;
    padding: 15px;
}

.touch-close-line {
    margin: 5px auto;
    height: 3px;
    width: 100px;
    border-radius: 50px;
    background: #797988;
}
</style>
