<template>
    <div class="open-orders">
        <p>Open orders {{pairName}}</p>
        <table>
            <tr>
                <td>Price</td>
                <td>Amount</td>
                <td></td>
            </tr>
            <tr class="txt-red">
                <td>0.101289</td>
                <td>2.234</td>
                <td class="txt-red hovered">&#10006;</td>
            </tr>
            <tr class="txt-red">
                <td>0.324101</td>
                <td>2.235674</td>
                <td class="txt-red hovered">&#10006;</td>
            </tr>
            <tr class="txt-green">
                <td>0.34401</td>
                <td>2.2455434</td>
                <td class="txt-red hovered">&#10006;</td>
            </tr>
            <tr class="txt-red">
                <td>0.234101</td>
                <td>2.8566525</td>
                <td class="txt-red hovered">&#10006;</td>
            </tr>
            <tr class="txt-green">
                <td>0.34401</td>
                <td>2.234</td>
                <td class="txt-red hovered ">&#10006;</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props: ['pairName'],
        // data:{}
    }
</script>
