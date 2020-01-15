<template>
    <div class="open-orders">
        <p>Open orders {{pairName}}</p>
        <table>
            <tr>
                <td>Price</td>
                <td>Amount</td>
                <td></td>
            </tr>
            <tr
            v-for="o in pairData.openOrders" 
            :key="o._id" 
            :class="'txt-' + (o.type === 'sell' ? 'red' : 'green')">
                <td>{{o.price}}</td>
                <td>{{o.amount}}</td>
                <td class="txt-red hovered" @click="closeOrder(o._id)">&#10006;</td>
            </tr>
        </table>
    </div>
</template>

<script>
import Store from '../../core/Store';
import api from '../../core/api';

export default {
    computed: {
        pairName: () => Store.terminalPair,
        pairData(){
            console.log(Store.ordersData);
            return Store.ordersData[this.pairName] || {};
        }
    },
    methods:{
        closeOrder(orderId){
             api({
                action: 'removeOrder',
                data: {orderId, pairName: this.pairName}
            }, ()=>{
                Store.updateOrdersData({openOrders: this.pairName});
                Store.notify({type: 'success', text: 'Ордер успешно удален!'});
                Store.getPairData();
            });
        }
    }
}
</script>
