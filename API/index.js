import axios from "axios"

const FetchAPI = async (url) => {

  return await axios.get(url/*, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      //'Content-Type': 'application/json',
      //'Access-Control-Request-Method':'GET,HEAD,PUT,PATCH,POST,DELETE',
     // 'Access-Control-Allow-Headers': '*'
    },
  }*/)
  .then(function (response) {
    // handle success
    // console.log(response);
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

export default FetchAPI
