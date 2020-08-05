<template>
    <img :src="'./assets/svgicon/' + getEnCode(code) + '.svg'" :width="width" />
</template>

<script>
import Vue from 'vue';

export default Vue.component('coin-icon', {
    props: ['code', 'width'],
    methods: {
        getEnCode(v) {
            return assoc[v] || v;
        }
    }
});

const assoc = {
    'АльфаБанк(RUB)': 'Alfabank(RUB)',
    'АльфаБанк(RUB)_cash-in': 'Alfabank(RUB)_cash-in',
    'ВТБ(RUB)': 'VTB(RUB)',
    'Открытие(RUB)': 'Otkrytie(RUB)',
    'Сбербанк(RUB)': 'Sberbank(RUB)',
    'Тинькофф(RUB)': 'Tinkoff(RUB)',
    'Яндекс.Деньги': 'Yandex.Dengi',
    'Наличные(RUB)': 'Nalichnye(RUB)',
};
</script>
