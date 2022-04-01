import FetchAPI from "../API";
import {getArticleById} from "../endpoints";

export const getData = async (contenuArticle) => {
    return FetchAPI(getArticleById(contenuArticle)).then((data) => {
        if (data.success) {
            return {
                DataAPI: data?.data,
                DataTags: data?.data?.included
            }
        }
    })
}
