export default {
    round(v) {
        if (!v.toFixed) {
            return 0;
        }
        return +v.toFixed(8);
    },
    unix: () => new Date().getTime(),
    unixToString(u) {
        const time = new Date(u);
        // return time.getDate() + '/' + (time.getMonth() + 1) + ' ' + time.getHours() + ':' + time.getHours() + time.getSeconds();
        return addZero(time.getHours()) + ':' + addZero(time.getHours()) + ':' + addZero(time.getSeconds());
    },
    unixToStringDMY(u) {
        const time = new Date(u);
        // return time.getDate() + '/' + (time.getMonth() + 1) + ' ' + time.getHours() + ':' + time.getHours() + time.getSeconds();
        return addZero(time.getDate) + '/' + addZero(time.getMonth()) + '/' + time.getFullYear();
    },
    unixToStringHM(u) {
        const time = new Date(u);
        return addZero(time.getHours()) + ':' + addZero(time.getMinutes());
    },
    normalTx(m) {
        const { tx } = m;
        if (tx) {
            m.text = `<i class="fa fa-exchange txt-blue" aria-hidden="true"></i> Success ${m.type} <a onclick="window.open('https://explorer.minter.network/transactions/${tx.hash}', '_blank')">${tx.value} ${tx.coin}</a>`;
        }
    },
    createNameByAddress(address){
        return address.slice(0, 10);
    },
    generateAvatar(address) {
        const liter = address.replace(/[^a-zA-ZА-Яа-яЁё]/gi, '').replace(/\s+/gi, ', ');
        const num = liter.toLowerCase().charCodeAt(3) - 96;
        return '/avatars/default_' + num + '.jpg';
    },
    clone(obj){
        return JSON.parse(JSON.stringify(obj));
    },
};

function addZero(num) {
    if (num < 10) {
        return '0' + num;
    }
    return num;
}
