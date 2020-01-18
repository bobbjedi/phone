export default {
    round(v) {
        if (!v.toFixed) {
            return 0;
        }
        return +v.toFixed(8);
    },
    unixToString(u) {
        const time = new Date(u);
        // return time.getDate() + '/' + (time.getMonth() + 1) + ' ' + time.getHours() + ':' + time.getHours() + time.getSeconds();
        return addZero(time.getHours()) + ':' + addZero(time.getHours()) + ':' + addZero(time.getSeconds());
    }
};


function addZero(num) {
    if (num < 10) {
        return '0' + num;
    }
    return num;
}