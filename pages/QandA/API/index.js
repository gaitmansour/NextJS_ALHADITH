import axios from "axios";

export const FetchAPIWthData = async (url,data) => {
    return await axios.post(url ,data,{
        headers:{
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
