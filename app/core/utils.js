export default {
    round(v){
        if (!v.toFixed){
            return 0;
        }
        return +v.toFixed(8);
    }
};
