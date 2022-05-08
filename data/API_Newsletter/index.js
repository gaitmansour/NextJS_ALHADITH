import axios from 'axios'

const FetchAPIData = async (url, data) => {
  return await axios
    .post(url, data)
    .then(function (response) {
      // handle success
      // console.log(response);
      if (response.status === 200) {
        const data = {
          data: response?.data,
          success: true,
        }
        return data
      } else {
        const data = {
          data: null,
          success: false,
          message: response.data,
        }
        return data
      }
    })
    .catch(function (error) {
      // handle error
      //console.log(error)
      return {
        data: null,
        success: false,
        message: '',
      }
    })
}
export default FetchAPIData
