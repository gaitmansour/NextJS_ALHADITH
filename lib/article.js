import FetchAPI from '../API'
import { getArticleById, getMenuByName } from '../endpoints'

export const getData = async (contenuArticle) => {
  return FetchAPI(getArticleById(encodeURI(contenuArticle))).then((data) => {
    if (data.success) {
      return {
        DataAPI: data?.data,
        DataTags: data?.data?.included,
      }
    }
  })
}

export const getDataMenu = async (x) => {
  return FetchAPI(getMenuByName(encodeURI(x))).then((data) => {
    // console.log('data?.data ======', data)
    if (data.success) {
      return {
        dataMA: data?.data[0],
      }
    }
  })
}
