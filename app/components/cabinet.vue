<template>
<f7-page no-toolbar no-swipeback login-screen>
    <f7-navbar title="Cabinet" back-link="Back">
        <f7-nav-right>
            <f7-button raised panel-open="left">Menu</f7-button>
        </f7-nav-right>
    </f7-navbar>

    <f7-block-title>Аккаунт пользователя {{user.login}}</f7-block-title>
    <f7-block strong>
        <p>На этой странице Вы можете добавлять адреса кошельков, пополнять, выводить средства на внешние кошельки. А так же увидеть общую сводку депозитов.</p>
    </f7-block>
    <f7-block-title>Коины</f7-block-title>
    <!-- <f7-list> -->

    <f7-block v-for="coinName in Object.keys(user.deposits)" :key="coinName">
        <div>
            <div class="small txt-blue" v-show="user.addresses[coinName]">{{user.addresses[coinName]}}</div>
            <f7-row>
                <f7-col width="80">
                    <span class="big txt-white">{{coinName}}</span>
                    <span v-if="user.addresses[coinName]">
                        &nbsp;Balance:&nbsp; <span class="txt-yellow">{{user.deposits[coinName].free | format}}
                            &nbsp;/&nbsp;
                            {{user.deposits[coinName].pending | format}}
                        </span>
                    </span>
                </f7-col>
                <f7-col width="20">
                    <span v-if="user.addresses[coinName]" class="big">
                        <i class="fa fa-arrow-circle-down txt-green hovered" aria-hidden="true" @click="openPopup('deposit', coinName)"></i>&nbsp;
                        <i class="fa fa-arrow-circle-up txt-red" aria-hidden="true" @click="openPopup('withdraw', coinName)"></i>
                    </span>
                    <span v-else>
                        <i class="fa fa-plus-circle bigbig txt-green hovered" aria-hidden="true" @click="openPopup('addAddress', coinName)"></i>
                    </span>
                </f7-col>
            </f7-row>
        </div>
    </f7-block>

    <f7-popup class="popup" :opened="popupOpened" @popup:closed="popupOpened = false">
        <f7-page>
            <f7-navbar :title="popupTitle">
                <f7-nav-right>
                    <f7-link popup-close>Close</f7-link>
                </f7-nav-right>
            </f7-navbar>

            <f7-block v-if="popupMethod === 'deposit'">
                <p>Deposit.</p>
            </f7-block>

            <f7-block v-if="popupMethod === 'withdraw'">
                <p>Withdraw</p>
            </f7-block>
            <span v-if="popupMethod === 'addAddress'">
                <f7-block strong>
                    <p>Будте крайне внимательны при добавлении адреса. Заменить его не будет возможности!</p>
                </f7-block>

                <f7-block>
                    <f7-block-header>Зачем нужен адрес и почему так важно его не потерять?</f7-block-header>
                    <p> Для пополнения счета {{activeCoinName}} в системе будут учитываться транзакции <b>только</b> с этого адреса. Вывод будет осущетсявляться также <b>только</b> на него. Поэтому будте внимательны и храните его seed фразу в надежном месте.</p>
                    <p>Сделано это исключительно для безопасности наших пользователей.</p>
                    <f7-list no-hairlines-md>
                        <f7-list-input @input="addedAddress = $event.target.value" :label="activeCoinName + ' address'" floating-label type="text" :placeholder="activeCoinName" clear-button>
                        </f7-list-input>
                    </f7-list>
                    <f7-col tag="span">
                        <f7-button large fill @click="addAddress">Сохранить</f7-button>
                    </f7-col>
                </f7-block>
            </span>

        </f7-page>
    </f7-popup>

</f7-page>
</template>

<script>
import Store from '../core/Store';
import api from '../core/api';
import Vue from 'vue';

export default {
    data() {
        return {
            popupOpened: false,
            popupMethod: '',
            activeCoinName: '',
            popupTitle: '',
            addedAddress: ''
        };
    },

    computed: {
        user: ()=> Store.user,
    },
    methods: {
        openPopup(popupMethod, coinName) {
            this.activeCoinName = coinName;
            this.popupMethod = popupMethod;
            switch (popupMethod) {
                case ('deposit'):
                    this.popupTitle = 'Ввести ' + coinName;
                    break;
                case ('withdraw'):
                    this.popupTitle = 'Вывести ' + coinName;
                    break;
                case ('addAddress'):
                    this.popupTitle = 'Добавить адрес для ' + coinName;
                    break;
            }
            this.popupOpened = true;
        },
        deposit() {
            this.popupOpened = false;
        },

        addAddress() {
            this.$f7.preloader.show();
            console.log(this.activeCoinName, this.addedAddress);
            api({
                action: 'setAddress',
                data: {
                    coinName: this.activeCoinName,
                    address: this.addedAddress
                }
            }, () => {
                setTimeout(() => {
                    Store.notify({
                        type: 'success',
                        text: 'Адрес ' + this.activeCoinName + ' успешно добавлен!'
                    });
                    this.$f7.preloader.hide();
                    this.popupOpened = false;
                    this.addedAddress = '';
                    Store.updateUser();
                }, 1000);
            });
        },

        withdraw() {
            this.popupOpened = false;
        }
    }
};
</script>
