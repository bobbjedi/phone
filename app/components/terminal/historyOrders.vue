<template>
<div class="open-orders">
    <div class="txt-yellow txt-center">History orders </div>
    <div class="block-history-orders">
        <table>
            <tr>
                <td>Price</td>
                <td>Amount</td>
                <td>Time</td>
            </tr>
            <tr v-for="o in historyOrders" :key="o._id" :class="'txt-' + (o.type === 'sell' ? 'red' : 'green')">
                <td>{{o.price | format}}</td>
                <td>{{o.amount| format}}</td>
                <td>{{o.time | unix}}</td>
            </tr>
        </table>
    </div>
</div>
</template>

<script>
import $u from '../../core/utils';
import Store from '../../core/Store';
import Vue from 'vue';

export default {
    data() {
        return {
            historyOrders: []
        }
    },
    created() {
        Store.$watch('terminalPair', v => this.updateHistory());
        Store.$watch('public.pairsData', v => this.updateHistory());
    },
    methods:{
        updateHistory(){
             Vue.nextTick(() => {
                const pairData = Store.public.pairsData[Store.terminalPair];
                this.historyOrders = pairData && pairData.history || [];
            });
        }
    }
}
</script>
