import homePage from '../components/homePage.vue';
import trade from '../components/trade.vue';
import login from '../components/login.vue';
import cabinet from '../components/cabinet.vue';
import security from '../components/security.vue';
import about from '../components/about.vue';
import contacts from '../components/contacts.vue';


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
},
{
    path: '/cabinet',
    component: cabinet,
},
{
    path: '/security',
    component: security,
},
{
    path: '/about',
    component: about
},
{
    path: '/contacts',
    component: contacts,
}
];