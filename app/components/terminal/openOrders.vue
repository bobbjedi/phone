<template>
<div class="open-orders">
    <div class="txt-yellow txt-center">Open orders {{pairName}}</div>
    <div class="block-open-orders">
        <table>
            <tr>
                <td>Price</td>
                <td>Amount</td>
                <td></td>
            </tr>
            <tr v-for="o in pairData" :key="o._id" :class="'txt-' + (o.type === 'sell' ? 'red' : 'green')">
                <td>{{o.price | format}}</td>
                <td>{{o.amount| format}}</td>
                <td class="txt-red hovered" @click="closeOrder(o._id)">&#10006;</td>
            </tr>
        </table>
    </div>
</div>
</template>

<script>
import Store from '../../core/Store';
import api from '../../core/api';

export default {
    computed: {
        pairName: () => Store.terminalPair,
        pairData() {
            // автоподстройка по высоте
            mathHeight('.block-open-orders');
            mathHeight('.block-history-orders');
            return Store.user.openOrders && Store.user.openOrders[this.pairName] || {};
        }
    },
    methods: {
        closeOrder(orderId) {
            this.$f7.preloader.show();
            api({
                action: 'removeOrder',
                data: {
                    orderId,
                    pairName: this.pairName
                }
            }, () => {
                Store.updateUser();
                Store.getPairData();
                setTimeout(() => {
                    Store.notify({
                        type: 'success',
                        text: 'Ордер успешно удален!'
                    });
                    this.$f7.preloader.hide();
                }, 500);
            });
        }
    }
}

function mathHeight(className) {
    setTimeout(() => {
        const el = document.querySelector(className);
        if (!el) {
            return;
        }
        const windowHeight = parseInt(document.documentElement.clientHeight);
        const y = el.getBoundingClientRect().y;
        el.style.maxHeight = (windowHeight - y - 36) + 'px';
    }, 1000);
}
</script>
