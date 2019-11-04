<template>
    <f7-page :page-content="false">
        <f7-navbar title="Trade panel" back-link="Back">
            <f7-nav-right>
                <f7-button raised panel-open="left">Menu</f7-button>
            </f7-nav-right>
        </f7-navbar>
        <f7-toolbar tabbar bottom>
            <f7-link tab-link="#tab-1" tab-link-active>BTC/BIP</f7-link>
            <f7-link tab-link="#tab-2">ETH/BIP</f7-link>
            <f7-link tab-link="#tab-3">USDT/BIP</f7-link>
        </f7-toolbar>
        <f7-tabs swipeable animated>
            <f7-tab id="tab-1" class="page-content" tab-active>
                <f7-block>
                   <pair-terminal pair-name="BTC_BIP"></pair-terminal>
                </f7-block>
            </f7-tab>
            <f7-tab id="tab-2" class="page-content">
                <f7-block>
                   <pair-terminal pair-name="ETH_BIP"></pair-terminal>
                </f7-block>
            </f7-tab>
            <f7-tab id="tab-3" class="page-content">
                <f7-block>
                     <pair-terminal pair-name="USDT_BIP"></pair-terminal>
                </f7-block>
            </f7-tab>
        </f7-tabs>
    </f7-page>
</template>

<script>

import pairTerminal from './pairTerminal.vue';
export default {
    components:{
        pairTerminal
    }
}
</script>
