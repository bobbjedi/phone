<template>
<div class="buttons-row">
    <div class="bottom-menu-item">
        <i class="fa fa-connectdevelop bigbig" aria-hidden="true"></i>
        <span class="small">Кошелек</span>
    </div>
    <div class="bottom-menu-item">
        <i class="fa fa-credit-card bigbig" aria-hidden="true"></i>
        <span class="small">Платежи</span>
    </div>
    <div class="bottom-menu-item active">
        <i class="fa fa-exchange bigbig" aria-hidden="true"></i>
        <span class="small">Обмен</span>
    </div>
    <div class="bottom-menu-item">
        <i class="fa fa-commenting-o bigbig" aria-hidden="true"></i>
        <span class="small">Поддержка</span>
    </div>
    <div class="bottom-menu-item" @click="openLoginForm">
        <i class="fa fa-user bigbig" aria-hidden="true"></i>
        <span class="small">Профиль</span>
    </div>
</div>
</template>

<script>
import Store from "../core/Store";
export default {
    methods: {
        openLoginForm() {
            Store.$emit('openLoginForm');
        }
    }
};
</script>

<style scoped>
.buttons-row {
    z-index: 2;
    background: white;
    margin-top: auto;
    margin-bottom: 0;
    padding: 0 5px;
    color: #7e8396;
    display: flex;
    justify-content: space-around;
    align-items: center;
    -webkit-box-shadow: 0px -2px 7px 0px rgba(50, 50, 50, 0.75);
    -moz-box-shadow: 0px -2px 7px 0px rgba(50, 50, 50, 0.75);
    box-shadow: 0px -2px 7px 0px rgba(50, 50, 50, 0.75);
}

.bottom-menu-item {
    padding: 10px 0 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.bottom-menu-item.active {
    color: #3b3b56;
}
</style>
