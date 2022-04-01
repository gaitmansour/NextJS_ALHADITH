import FetchAPI from "../API";
import {getTopic} from "../endpoints";
import {data} from "../data/tabData";

const url = getTopic()
var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: item,
        };
    }, initialValue);
};
export const getDataAhadith = async () => {
    return Promise.all(data.map(async (t, key) => {
        return await FetchAPI(`${url}/${t.CodeTopic}`).then((data) => {
            if (data.success) {
                console.log('--data.success------------------------------------------', data?.data)
                return {[t.CodeTopic]: data?.data}
                // return {[t.CodeTopic]: data?.data}
            }
        })
    })).then(data => {
        return data
    });
}
//console.log(groupBy(getDataAhadith(),''))
