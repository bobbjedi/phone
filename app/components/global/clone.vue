<template>
    <i class="fa fa-clone" aria-hidden="true" @click="clone"></i>
</template>

<script>
import Vue from 'vue';
import Store from '../../core/Store';

export default Vue.component('clone', {
    props: ['value'],
    methods: {
        clone() {
            console.log(this.value);
            const copytext = document.createElement('input');
            copytext.value = this.value;
            document.body.appendChild(copytext);
            copytext.select();
            document.execCommand('copy');
            document.body.removeChild(copytext);
            Store.toast('Успешно скопировано!');
        }
    }
});
</script>
