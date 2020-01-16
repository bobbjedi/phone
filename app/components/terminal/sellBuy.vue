<template>
<div class="terminall-sell-buy">
    <div class="terminal-input">
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
        <div class="label">{{altCoin}} <span class="txt-yellow big">{{altAmount | format}}</span></div>
        <div class="custom-input">
            <div class="input-sign hovered txt-red" @click="altAmount--">-</div>
            <input type="number" v-model.number="altAmount">
            <div class="input-sign hovered txt-green" @click="altAmount++">+</div>
        </div>
    </div>
    <div class="terminal-input">
        <div class="label">{{baseCoin}}<span class="txt-yellow big"> {{baseAmount | format}}</span></div>
        <!-- <div class="custom-input"> -->
        <!-- <div class="input-sign hovered txt-red" @click="baseAmount--">-</div> -->
        <!-- <input type="number" v-model.number="baseAmount"> -->

        <!-- <div class="input-sign hovered txt-green" @click="baseAmount++">+</div> -->
        <!-- </div> -->
    </div>
    <div class="percenage">
        <div class="el-percent hovered">25%</div>
        <div class="el-percent hovered">50%</div>
        <div class="el-percent hovered">75%</div>
        <div class="el-percent hovered">100%</div>
    </div>
    <div class="buts">
        <div class="but bg-red hovered" @click="setOrder('sell')">Sell</div>
        <div class="but bg-green hovered" @click="setOrder('buy')">Buy</div>
    </div>
</div>
</template>

<script>
import Store from '../../core/Store';
import api from '../../core/api';

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
            isBlockedButtons: false
        }
    },
    mounted() {
        Store.setPrice = p => this.price = p;
        this.$watch('altAmount', v => this.altAmount = Math.max(minVol, v));
        this.$watch('price', v => this.price = Math.max(minPrice, v));
    },
    computed: {
        baseAmount() {
            return this.altAmount * this.price;
        },
        pairName() {
            [this.baseCoin, this.altCoin] = Store.terminalPair.split('_');
            this.altAmount = minVol;
            this.price = minPrice;
            return Store.terminalPair
        },
        deposits: () => Store.user.deposits || {},
    },
    methods: {
        /**
         * {type, value, price, pairName}
         */
        setOrder(type) {
            if (this.isBlockedButtons) {
                return;
            }
            let err = false;
            console.log(type, this.deposits[this.baseCoin].free, this.altAmount * this.price)
            if (type === 'sell' && this.deposits[this.altCoin].free < this.altAmount) {
                err = `Не достаточно ${this.altCoin} для продажи`;
            } else if (type === 'buy' && this.deposits[this.baseCoin].free < this.altAmount * this.price) {
                err = `Не достаточно ${this.baseCoin} для покупки`;
            }
            console.log({err});
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
