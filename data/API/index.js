import axios from "axios";
import React from 'react'

export const FetchAPIWthData = async (url, data) => {
    return await axios.post(url, data, {
        headers: {
            "Content-Type": "application/vnd.api+json",
            "Authorization": "Basic ZGlhbHk6ZGlhbHk="
        }
    }).then(function (response) {
        // handle success
        // console.log(response);
        if (response.status === 201) {
            const data = {
                data: response?.data,
                success: true
            }
            return data
        }
        if (response.status === 500) {
            const data = {
                data: null,
                success:false,
                status: response.status,
                message: "bla bla bla"
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
