import Vue from 'vue';
import $u from './utils';

Vue.filter('capitalize', function (value) {
    if (!value) {
        return '';
    };
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('unix', v => $u.unixToString(v));
Vue.filter('msgtime', v => $u.unixToStringHM(v));
Vue.filter('d_m_y', v => $u.unixToStringDMY(v));
Vue.filter('h_m', v => $u.unixToStringHM(v));
Vue.filter('status', v => $u.parseStatus(v));
Vue.filter('leftTime', v => {
    v += 1200;
    if (v <= 0) {
        return '00м:00с';
    }
    const min = Math.floor(v / 60);
    const sec = Math.ceil(v - min * 60);
    return `${$u.addZero(min)}м:${$u.addZero(sec)}c`;
});
Vue.filter('round', v => {
    if (!v) {
        return 0;
    }
    return +v.toFixed(8);
});

Vue.filter('format', num => {
    const getNum = num;
    try {
        if (!num){
            num = 0;
        }
        let fixed = 2;
        if (num <= 0.00001) {
            fixed = 8;
        } else if (num <= 0.001) {
            fixed = 6;
        } else if (num <= 0.09) {
            fixed = 4;
        }
        if (+num === 0){
            return '0.00';
        }
        var parts = num.toFixed(fixed).split('.'),
            main = parts[0],
            len = main.length,
            output = '',
            i = len - 1;
        while (i >= 0) {
            output = main.charAt(i) + output;
            if ((len - i) % 3 === 0 && i > 0) {
                output = ',' + output;
            }
            --i;
        }
        if (parts.length > 1) {
            output = `${output}.${parts[1]}`;
        }
        return output;
    } catch (error) {
        // console.log('Filter format error', getNum, error);
        return 0;
    }
});

