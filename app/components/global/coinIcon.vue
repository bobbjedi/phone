<template>
    <img :src="'./assets/svgicon/' + code + '.svg'" :width="width" />
</template>

<script>
import Vue from 'vue';

export default Vue.component('coin-icon', {
    props: ['code', 'width']
});
</script>
