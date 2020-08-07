
import io from 'socket.io-client';
import config from '../../config';
import $u from './utils';
import {ordersDb} from './localDb';
import api from './api';
import Store from './Store';

const socket = io(config.domain + '/order/status/');
const listenOrders = {};

// order из
export default {
    async init(){
        try {
            console.log('findone', await ordersDb.findOne({}));
        } catch (error) {
            alert('Error DB');
        }

        (await ordersDb
            .find({ $where: function () { return this.isClosed === undefined; } }))
            .forEach(o => this.addListenner(o));
        this.getOrdersFromApi();
    },
    async addListenner(order){
        const uid = order.uid || order.unique_id;
        if ($u.ordersIsNeedClose(order)){
            order.isClosed = true;
            listenOrders[order.id] = true; // заглушка
            await order.save();
        }
        // console.log('addListenner', uid);
        const processedOrder = async data => {
            Store.$emit('update_' + uid); // кричим подписчикам
            if (data.status !== order.status) {
                Store.noty('Новый статус заказа № ' + order.id, $u.parseStatus(data.status), 5);
                const i = Store.ordersHistory.findIndex(o => o.id === order.id);
                if (~i) {
                    Store.ordersHistory[i] = data;
                }
            }
            // console.log(order.id, $u.parseStatus(order.status));
            await order.update(data, 1);

            if (order.isClosed || listenOrders[order.id]){
                return;
            }

            socket.send(JSON.stringify({ id: uid }));
            socket.on('status/' + uid, () => getOrderData(uid, processedOrder)); // обновляем
            console.log('set listenner', order.id);
            listenOrders[order.id] = true;
        };

        getOrderData(uid, processedOrder);
    },
    // Слушаем ордера из апи
    getOrdersFromApi() {
        api('ordersHistory', { page: 1 }, res => {
            if (res.success) {
                res.data.results.forEach(async o => {
                    let order = await ordersDb.findOne({ id: o.id });
                    if (!order) {
                        console.log(o.id, 'Создан вне приложения');
                        o._id = o.id;
                        order = new ordersDb(o, 1);
                        !listenOrders[o.id] && this.addListenner(order);
                    } else {
                        // console.log(o.id, 'из апи уже есть', o);
                    }
                });
            }
        });
    },
    getOrderData
};

function getOrderData(uid, cb) {
    api('current', {url: 'order/' + uid}, res => {
        if (res.success){
            cb(res.data);
        }
    });
};

