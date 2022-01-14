import axios from "axios"
import React from 'react'

export const FetchPostAPI = async (url,data) => {

    return await axios.post(url,data/*,{
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials':true,
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            "Access-Control-Allow-Headers" : "X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization, Origin, Accept"
        },
    }*/)
        .then(function (response) {
            // handle success
          //  console.log(response?.data);
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

