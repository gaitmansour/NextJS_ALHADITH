import FetchAPI from "../API";
import {getLive, getVideo1, getVideoBi, getVideoBt, getVideoDh, getVideoKi} from "../endpoints";
const url = getVideo1()
const urlDh = getVideoDh()
const urlBi = getVideoBi()
const urlKi = getVideoKi()
const urlBt = getVideoBt()
const urlLive = getLive()
export const getDataAPI = async () => {
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

export const getDataLive = async () => {
    return FetchAPI(urlLive).then((data) => {
        if (data.success) {
            return (data?.data)
        }
    })
}
