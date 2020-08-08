import exchange from '../components/exchange.vue';
import enterPayData from '../components/enter-pay-data.vue';
import order from '../components/order.vue';
import profile from '../components/profile.vue';

export default [{
    path: '/',
    component: exchange,
}, {
    path: '/enter-pay-data',
    component: enterPayData,
},
{
    path: '/order/:orderUid',
    component: order,
},
{
    path: '/profile',
    component: profile,
}
];
