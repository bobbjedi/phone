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
            <div class="small txt-blue" v-show="user['address_' + coinName]">{{user['address_' + coinName]}}</div>
            <f7-row>
                <f7-col width="80">
                    <span class="big txt-white">{{coinName}}</span>
                    <span v-if="user['address_' + coinName]">
                        &nbsp;Balance:&nbsp; <span class="txt-yellow">{{user.deposits[coinName].free | format}}
                            &nbsp;/&nbsp;
                            {{user.deposits[coinName].pending | format}}
                        </span>
                    </span>
                </f7-col>
                <f7-col width="20">
                    <span v-if="user['address_' + coinName]" class="big">
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

            <span v-if="popupMethod === 'deposit'">
                <f7-block strong>
                    Будте внимательны! Убедитесь, что средства будут переведены с Вашего кошелька <span class="txt-yellow">{{user['address_' + activeCoinName]}}</span>! Иначе средства могут быть утеряны!
                </f7-block>
                <f7-block>
                    <p>Для пополнения Вашего счета {{activeCoinName}} необходимо отправить необходимое количество {{activeCoinName}} на
                        <span class="txt-green small">{{addresses[activeCoinName]}}</span>
                        <i @click="copy(addresses[activeCoinName])" class="fa fa-clone txt-blue" aria-hidden="true"></i>
                        .</p>
                </f7-block>
            </span>
            <f7-block v-if="popupMethod === 'withdraw'">
                <f7-block strong>
                    <p>Будьте внимательны! Вывод будет осуществлен на Ваш адрес <span class="small txt-green">{{user['address_' + activeCoinName]}}</span></p>
                    <p>Комиссия на вывод составляет {{config.withdrawComission}}%</p>
                </f7-block>
                <f7-list no-hairlines-md>
                    <f7-list-input @input="withdrawAmunt = +$event.target.value" :label="'Вывести ' + activeCoinName" type="text" placeholder="Количество" :info="'Доступно: ' + user.deposits[activeCoinName].free" error-message="Только цыфры!" required validate pattern="^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$" clear-button>
                    </f7-list-input>
                </f7-list>
                <f7-button large fill @click="withdraw">Вывести</f7-button>
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
                        <f7-list-input class="small" @input="addedAddress = $event.target.value" :label="activeCoinName + ' address'" floating-label type="text" placeholder="0x..." clear-button>
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
import config from '../../config';
import Vue from 'vue';

export default {
    data() {
        return {
            config,
            popupOpened: false,
            popupMethod: '',
            activeCoinName: '',
            popupTitle: '',
            addedAddress: '',
            withdrawAmunt: 0
        };
    },

    computed: {
        user: () => Store.user,
        addresses: () => Store.public.addresses
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
            const {
                addedAddress,
                activeCoinName
            } = this;
            let isValid = true;
            if (!addedAddress.startsWith('Mx') && activeCoinName === 'BIP') {
                isValid = false;
            }

            if (activeCoinName === 'BTC' && !addedAddress.startsWith('1')) {
                isValid = false;
            }

            if (['ETH', 'USDT'].includes(activeCoinName) && !addedAddress.startsWith('0x')) {
                isValid = false;
            }

            if (!isValid) {
                Store.notify({
                    type: 'error',
                    text: 'Невалидный адрес!'
                });
                return;
            }
            this.$f7.preloader.show();
            setTimeout(() => this.$f7.preloader.hide(), 2000);
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
                    this.popupOpened = false;
                    this.addedAddress = '';
                    this.$f7.preloader.hide();
                    Store.updateUser();
                }, 1000);
            });
        },

        withdraw() {
            const {
                withdrawAmunt,
                user,
                activeCoinName
            } = this;
            if (withdrawAmunt > user.deposits[activeCoinName].free) {
                Store.notify({
                    type: 'error',
                    text: 'Превышено доступное количество!'
                });
                return;
            }
            this.$f7.preloader.show();
            setTimeout(() => this.$f7.preloader.hide(), 2000);
            api({
                action: 'withdraw',
                data: {
                    coinName: activeCoinName,
                    amount: withdrawAmunt
                }
            }, () => {
                Store.notify({
                    type: 'success',
                    text: `Вывод ${withdrawAmunt} ${activeCoinName} успешно осуществлен!`
                });
                this.withdrawAmunt = 0;
                this.popupOpened = false;
                this.$f7.preloader.hide();
                Store.updateUser();
            });
        }
    }
};
</script>
