import homePage from '../components/homePage.vue';
import trade from '../components/trade.vue';
import login from '../components/login.vue';


export default [{
    path: '/',
    component: homePage,
},
{
    path: '/trade',
    component: trade,
},
{
    path: '/login',
    component: login,
}
];