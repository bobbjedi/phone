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
    clone(obj){
        return JSON.parse(JSON.stringify(obj));
    },
    parseStatus(status){
        switch (status) {
        case 0:
            return 'Формирование заказа';
        case 1:
            return 'поиск номера для приема оплаты';
        case 2:
            return 'не удалось найти номер';
        case 3:
            return 'ожидание прихода оплаты';
        case 4:
            return 'оплата клиентом просрочена';
        case 5:
            return 'оплачено во время (оплата пришла)';
        case 6:
            return 'не удалось выплатить клиенту ';
        case 7:
            return 'выплачено успешно';
        case 8:
            return 'отменен клиентом ';
        case 9:
            return 'отмен операторм';
        case 10:
            return 'ожидание от клиента реквизитов для проверки';
        case 11:
            return 'ожидание проверки и подтверждения реквизитов операторм';
        case 12:
            return 'клиент нажал оплатил или отправил код';
        case 13:
            return 'не достаточно средств переведено клиентом';
        case 14:
            return 'платеж клиента не прошел';
        case 15:
            return 'СТАРТ транзакции, 0 подтверждений';
        case 16:
            return 'реквизиты заблокированы';
        case 17:
            return 'email заблокирован';
        case 18:
            return 'не верная операция';
        case 19:
            return 'реквизиты отклонены';
        case 21:
            return 'расчет прибыли от заказа';
        case 22:
            return 'расчет рефералки';
        case 23:
            return 'заказ завершен';
        default:
            return 'Неопределен';
        }
    }
};
