import {getCommanderieCroyantsData} from "../../endpoints";
import FetchAPI from "../../API";

const url = getCommanderieCroyantsData('ar', encodeURI('عناية أمير المؤمنين'))
console.log(url)
export const getAllCommanderie = async () => {
    return FetchAPI(`https://backend.7adith.ma:8000/en/jsonapi/node/section?fields[node--section]=title,body,field_icone,field_lien,field_code_couleur&filter[langcode]=ar&filter[alqsm][condition][path]=field_alqsm.name&filter[alqsm][condition][value]=${encodeURI('عناية أمير المؤمنين')}&include=field_icone`).then((data) => {
        if (data.success) {
            return (data?.data)
        }
    })
}
