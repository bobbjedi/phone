import homePage from '../components/homePage.vue';
import walletsList from '../components/walletsList.vue';
import scnd from '../components/scnd.vue';
console.log('qwert');
export default [{
    path: '/',
    component: homePage,
},
{
    path: '/wallets-list',
    component: walletsList,
},
{
    path: '/scnd',
    component: scnd,
}
];