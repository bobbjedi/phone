<template>
    <f7-page :page-content="false">
        <f7-navbar title="Trade panel" back-link="Back">
            <f7-nav-right>
                <f7-button raised panel-open="left">Menu</f7-button>
            </f7-nav-right>
        </f7-navbar>
        <br>
        <div id="info-trading-pairs">
            <f7-block-title>Traiding pairs</f7-block-title>
            <f7-block>
                <table>
                    <tr>
                        <td>Pair</td>
                        <td>Last price</td>
                        <td>Volume 24</td>
                        <td>Change</td>
                    </tr>
                    <tr v-for="p in tradePairs" :key="p" class="hovered">
                        <td>{{p.replace('_', '/')}}</td>
                        <td :class="'txt-' + (Math.random() > 0.5 ? 'green' : 'red')">0.2345454</td>
                        <td>323445 {{p.split('_')[0]}}</td>
                        <td :class="'bg-' + (Math.random() > 0.5 ? 'green' : 'red') + ' txt-center'">3.5</td>
                    </tr>
                </table>
            </f7-block>
        </div>
    </f7-page>
</template>

<script>

// import pairTerminal from './pairTerminal.vue';
import config from '../../config';

export default {
    data(){
        return {
            tradePairs: config.tradePairs
        }
    },
    components:{
        // pairTerminal
    }
}
</script>
