import FetchAPI from "../API";
import {getLive, getSideItems} from "../endpoints";

const urlLive = getLive()

export const getItemsMenu = async (tid) => {
    return FetchAPI(getSideItems(tid)).then((data) => {
        if (data.success) {
            /*if (tid == 50) {*/
                function move(from, to, arr) {
                    const newArr = [...arr]

                    const item = newArr.splice(from, 1)[0]
                    newArr.splice(to, 0, item)

                    return newArr
                }
/*
                return {CategoryMedia: move(1, 0, data?.data)}
            }
            if (tid == 51) {
                return {SousCategorie: data?.data}
            }*/
            return {
                CategoryMedia: move(1, 0, data?.data),
                SousCategorie: data?.data
            }
        }
    })
}
/*export const getDataAPI = async () => {
    return FetchAPI(url).then((data) => {
        if (data.success) {
            return (data?.data)
        }
    })
}


export const getDataAPIDh = async () => {
    return FetchAPI(urlDh).then((data) => {
        if (data.success) {
            return(data?.data)
        }
    })
}

export const getDataAPIBt = async () => {
    return FetchAPI(urlBt).then((data) => {
        if (data.success) {
            return(data?.data)
        }
    })
}

export const getDataAPIBi = async () => {
    return FetchAPI(urlBi).then((data) => {
        if (data.success) {
            return(data?.data)
        }
    })
}

export const getDataAPIKi = async () => {
    return  FetchAPI(urlKi).then((data) => {
        if (data.success) {
            return(data?.data)
        }
    })
}
*/

export const getDataLive = async () => {
    return FetchAPI(urlLive).then((data) => {
        if (data.success) {
            return (data?.data)
        }
    })
}
