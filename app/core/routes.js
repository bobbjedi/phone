import exchange from '../components/exchange.vue';
import enterPayData from '../components/enter-pay-data.vue';
import makePayment from '../components/make-payment.vue';

export default [{
    path: '/',
    component: exchange,
}, {
    path: '/enter-pay-data',
    component: enterPayData,
},
{
    path: '/make-payment',
    component: makePayment,
}
];
