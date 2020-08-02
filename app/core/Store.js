import Vue from 'vue';
import api from './api';
import config from '../../config';
import _ from 'underscore';
import {ordersDb} from './localDb';
import io from 'socket.io-client';

export default new Vue({
    async created() {
        Vue.prototype.navigate = v => this.$f7router.navigate(v);
        this.getCurencyesData();
        setTimeout(()=>api('ordersHistory', {page: 1}, console.log), 1000);
        console.log('ordersDb', await ordersDb.find({}));
        (await ordersDb.find({})).forEach(o => this.addOrderListenner(o));
    },
    data: {
        exchangeData: {
            fromCoin: '',
            toCoin: '',
            fromCoinAmount: 0,
            toCoinAmount: 0,
            tiker: {}
        }, // данные для обмена
        currentRoute: '/',
        globalRouter: {},
        user: {
            email_validated: false,
            userName: '',
            email: '',
            isLogged: false
        },
        curencyes: [],
        tikers: [],
        listenOrders: {}
    },
    methods: {
        logOut() {
            this.user.isLogged = false;
            this.tokens = false;
        },
        getCurencyesData(){
            api('curencyes', {}, res => {
                if (res.success) {
                    console.log(res.data);
                    this.curencyes = res.data;
                }
            });
        },
        addOrderListenner(order) {
            const { uid } = order;
            getOrderData(uid, res => {
                const {data} = res;
                order.update(data, 1);
                const socket = io(config.domain + '/order/status/');
                socket.send(JSON.stringify({ id: order.uid }));
                socket.on('status/' + order.uid, msg => getOrderData(uid, data => order.update(data, 1))); // обновляем
                console.log('set listenner', order.uid);
                this.listenOrders[order.id] = {
                    id: order.id,
                    socket
                };
            });
        }
    }
});


const getOrderData = (uid, cb)=>{
    api('current', {url: 'order/' + uid}, res => {
        if (res.success){
            cb(res.data);
        }
    });
};
