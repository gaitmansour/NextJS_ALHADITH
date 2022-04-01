import {FetchPostAPI} from "../data/API/questions";
import {searchQuestion} from "../endpoints";

const urlSearchQuestion = searchQuestion()
export const getDataQuestions = async (StartPage) => {
    const data = {
        query: '',
        size: 10,
        start: StartPage < 1 ? 0 : StartPage,
    }
    return FetchPostAPI(urlSearchQuestion, data).then((data) => {
        if (data.success) {
            return {
                data: data?.data?.hits?.hits,
                pagination: data?.data?.hits?.total?.value
            }
        }
    })
}
