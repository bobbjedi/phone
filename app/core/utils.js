export default {
    round(v, exponent) {
        if (!v.toFixed) {
            return 0;
        }
        let fixed = 2;
        if (v <= 0.00001) {
            fixed = 8;
        } else if (v <= 0.001) {
            fixed = 6;
        } else if (v <= 0.09) {
            fixed = 4;
        }
        return +v.toFixed(exponent || fixed);
    },
    // Нормализуем от [] и "123"
    normalizeAfterXML(json){
        if (!json) {
            return json;
        }
        const normalJson = {};
        Object.keys(this.clone(json)).forEach(k => {
            let v = json[k];
            if (+v === +(v + '')) {
                v = +v;
            } else {
                v = v[0];
            }
            normalJson[k] = v;
        });
        return normalJson;
    },
    unixToStringDMY(u) {
        const time = new Date(u);
        // return time.getDate() + '/' + (time.getMonth() + 1) + ' ' + time.getHours() + ':' + time.getHours() + time.getSeconds();
        return addZero(time.getDate()) + '/' + addZero(time.getMonth() + 1) + '/' + time.getFullYear();
    },
    clone(obj){
        return JSON.parse(JSON.stringify(obj));
    },
    // Определяем по статусу что ордер закрыт
    ordersIsNeedClose(order){
        return [8, 9, 16, 17, 18, 23].includes(order.status);
    },
    parseStatus(status){
        switch (status) {
        case 0:
            return 'Формирование заказа';
        case 1:
            return 'Поиск номера для приема оплаты';
        case 2:
            return 'Не удалось найти номер';
        case 3:
            return 'Ожидание прихода оплаты';
        case 4:
            return 'Оплата клиентом просрочена';
        case 5:
            return 'Оплачено во время (оплата пришла)';
        case 6:
            return 'Не удалось выплатить клиенту ';
        case 7:
            return 'Выплачено успешно';
        case 8:
            return 'Отменен клиентом ';
        case 9:
            return 'Отменен операторм';
        case 10:
            return 'Ожидание от клиента реквизитов для проверки';
        case 11:
            return 'Ожидание проверки и подтверждения реквизитов операторм';
        case 12:
            return 'Клиент нажал оплатил или отправил код';
        case 13:
            return 'Не достаточно средств переведено клиентом';
        case 14:
            return 'Платеж клиента не прошел';
        case 15:
            return 'СТАРТ транзакции, 0 подтверждений';
        case 16:
            return 'Реквизиты заблокированы';
        case 17:
            return 'Email заблокирован';
        case 18:
            return 'Не верная операция';
        case 19:
            return 'Реквизиты отклонены';
        case 21:
            return 'Расчет прибыли от заказа';
        case 22:
            return 'Расчет рефералки';
        case 23:
            return 'Заказ завершен';
        default:
            return 'Неопределен';
        }
    }
};



function addZero(num) {
    if (num < 10) {
        return '0' + num;
    }
    return num;
}
