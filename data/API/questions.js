import axios from "axios"
import React from 'react'

export const FetchPostAPI = async (url,data) => {

    return await axios.post(url,data)
        .then(function (response) {
            if (response.status === 200) {
                const data = {
                    data: response?.data,
                    success: true
                }
                return data
            }
            const data = {
                data: null,
                success: false,
                message: response.data
            }

            return data
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return {
                data: null,
                success: false,
                message: ""
            }
        })

}
