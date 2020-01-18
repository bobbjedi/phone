<template>
<div class="terminall-sell-buy">
    <div class="terminal-input">
        <div class="buttons-type big">
            <div class="but-type" :class="{'txt-green active-type': orderType === 'buy'}" @click="orderType = 'buy'">BUY</div>
            <div class="vertical-thin-line"></div>
            <div :class="{'txt-red active-type': orderType === 'sell'}" class="but-type" @click="orderType = 'sell'">SELL</div>
        </div>
        <div class="label m5" v-if="pairName.length">
            {{baseCoin}}:{{deposits[baseCoin].free | format}} /
            {{altCoin}}:{{deposits[altCoin].free | format}}
        </div>
        <div class="custom-input">
            <div class="input-sign hovered txt-red" @click="price--">-</div>
            <input type="number" v-model.number="price">
            <div class="input-sign hovered txt-green" @click="price++">+</div>
        </div>
    </div>
    <div class="terminal-input">
        <div class="label">{{altCoin}} <span class="big" :class="'txt-' + (validate.freeAlt ? 'green' : 'red')">{{altAmount | format}}</span></div>
        <div class="custom-input">
            <div class="input-sign hovered txt-red" @click="altAmount--">-</div>
            <input type="number" v-model.number="altAmount" :class="{'txt-red': !validate.altAmount}">
            <div class="input-sign hovered txt-green" @click="altAmount++">+</div>
        </div>
    </div>
    <div class="terminal-input">
        <div class="label">{{baseCoin}}<span class="big" :class="'txt-' + (validate.freeBase ? 'green' : 'red')"> {{baseAmount | format}}</span></div>
        <!-- <div class="custom-input"> -->
        <!-- <div class="input-sign hovered txt-red" @click="baseAmount--">-</div> -->
        <!-- <input type="number" v-model.number="baseAmount"> -->

        <!-- <div class="input-sign hovered txt-green" @click="baseAmount++">+</div> -->
        <!-- </div> -->
    </div>
    <div class="percenage">
        <div class="el-percent hovered" @click="setPercent(25)">25%</div>
        <div class="el-percent hovered" @click="setPercent(50)">50%</div>
        <div class="el-percent hovered" @click="setPercent(75)">75%</div>
        <div class="el-percent hovered" @click="setPercent(100)">100%</div>
    </div>
    <div class="buts" :class="{'blockEvents': !isValid}">
        <div :class="'terminal-but-action but hovered bg-' + (orderType === 'sell' ? 'red' : 'green')" @click="setOrder">{{orderType.toUpperCase()}}&nbsp;{{altCoin}}</div>
        <!-- <div class="but bg-red hovered" @click="setOrder('sell')">Sell</div>
        <div class="but bg-green hovered" @click="setOrder('buy')">Buy</div> -->
    </div>
</div>
</template>

<script>
import Store from '../../core/Store';
import api from '../../core/api';
import config from '../../../config';
import $u from '../../core/utils';
import Vue from 'vue';
// TODO: в конфиг
const minVol = 0.1;
const minPrice = 0.1;

export default {
    data() {
        return {
            baseCoin: '',
            altCoin: '',
            altAmount: 0,
            price: 0,
            isPairChange: true,
            isBlockedButtons: false,
            orderType: 'buy',
            validate: {
                altAmount: true,
                price: true,
                freeAlt: true,
                freeBase: true
            }
        }
    },
    mounted() {
        Store.setPrice = p => this.price = p;
        this.$watch('altAmount', v => this.validateAmount());
        this.$watch('orderType', v => this.validateAmount());

        this.$watch('price', v => {
            if (v < 0) {
                this.price = 0.1;
            }
            this.validateDeposits();
        });
    },
    computed: {
        baseAmount() {
            return this.altAmount * this.price;
        },
        pairName() {
            [this.baseCoin, this.altCoin] = Store.terminalPair.split('_');
            Vue.nextTick(() => {
                this.limits.min && (this.altAmount = this.limits.min);
                const pairData = Store.public.pairsData[Store.terminalPair];
                this.price = pairData && pairData.lastPrice.price;
            });
            return Store.terminalPair
        },
        limits() {
            return config.coinsTradeLimits[this.altCoin];
        },
        deposits: () => Store.user.deposits || {},
        isValid() {
            for (const m in this.validate) {
                if (!this.validate[m]) {
                    return false;
                }
            }
            return true;
        }
    },
    methods: {
        validateDeposits() {
            const {
                validate,
                altAmount,
                price,
                deposits,
                altCoin,
                baseCoin,
                orderType
            } = this;
            validate.freeAlt = true;
            validate.freeBase = true;
            if (orderType === 'sell' && altAmount > deposits[altCoin].free) {
                validate.freeAlt = false;
            }

            if (orderType === 'buy' && (altAmount * price) > deposits[baseCoin].free) {
                validate.freeBase = false;
            }
        },
        validateAmount() {
            const {
                validate,
                altAmount
            } = this;
            validate.altAmount = true;

            if (altAmount < 0) {
                this.altAmount = 0;
            }
            if (altAmount < this.limits.min) {
                validate.altAmount = false;
            }
            if (altAmount > this.limits.max) {
                validate.altAmount = false;
            }
            this.validateDeposits();
        },
        setPercent(p){
            if(this.orderType === 'sell'){
                this.altAmount = $u.round(this.deposits[this.altCoin].free * p / 100); 
            } else {
                this.altAmount = $u.round(this.deposits[this.baseCoin].free * p / 100 / this.price); 
            }
        },
        /**
         * {type, value, price, pairName}
         */
        setOrder() {
            const type = this.orderType;
            if (this.isBlockedButtons) {
                return;
            }
            let err = false;
            if (type === 'sell' && this.deposits[this.altCoin].free < this.altAmount) {
                err = `Не достаточно ${this.altCoin} для продажи`;
            } else if (type === 'buy' && this.deposits[this.baseCoin].free < this.altAmount * this.price) {
                err = `Не достаточно ${this.baseCoin} для покупки`;
            }
            if (err) {
                return Store.notify({
                    type: 'error',
                    text: err
                });
            }

            this.$f7.preloader.show();
            this.isBlockedButtons = true;
            setTimeout(() => {
                this.isBlockedButtons = false;
                this.$f7.preloader.hide();
            }, 2000);
            api({
                action: 'setOrder',
                data: {
                    pairName: this.pairName,
                    price: this.price,
                    value: this.altAmount,
                    type
                }
            }, () => {
                setTimeout(() => {
                    Store.updateUser();
                    Store.getPairData();
                    this.isBlockedButtons = false;
                    this.$f7.preloader.hide();
                    Store.notify({
                        type: 'success',
                        text: 'Заявка отправлена!'
                    });
                }, 1000);
            });
        }
    }
}
</script>
