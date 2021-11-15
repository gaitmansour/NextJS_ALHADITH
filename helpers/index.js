import FetchAPI from "../API";
import {getDataNewSections, getMenuLinks} from "../endpoints";

export function handleMenu(Menu){
    let groupedMenu=groupArrayOfObjects(Menu,"parent_target_id");
    let MenuHeaders= [];
    MenuHeaders = groupedMenu && groupedMenu[""].map((item, i) => {
        let items =  groupedMenu[item.tid] ? groupedMenu && groupedMenu[item.tid].map((subItem, j) => {
            if (subItem.parent_target_id_1 === 'البرامج الإعلامية'){
                let _subItem = {
                    path:`media/${subItem.name_1}`,
                    label: subItem.name_1,
                    tID:subItem.tid,
                    title: subItem.name_1,
                    parentLabel:item.name_1,
                    parentID:item.tid,
                    items:[]
                }
                return _subItem
            }
            else  if (subItem.name_1 === 'المصحف المحمدي'){
                let _subItem = {
                    path:'المصحف المحمدي',
                    label: subItem.name_1,
                    tID:subItem.tid,
                    title: subItem.name_1,
                    parentLabel:item.name_1,
                    parentID:item.tid,
                    items:[]
                }
                return _subItem
            }
            else {
                let _subItem = {
                    path:`article/${subItem.name_1}`,
                    label: subItem.name_1,
                    title: subItem.name_1,
                    tID:subItem.tid,
                    parentLabel:item.name_1,
                    parentID:item.tid,
                    items:[]
                }
                return _subItem
            }

        }) : [];
        let _item = {
            path:items.length>0 ?items[0].path:`/${item.name_1}`,
            label: item.name_1,
            tID:item.tid,
            items:items
        }
        return _item
    })
    // console.log("groups+++++++++++++++++++++++++",MenuHeaders)
    return MenuHeaders
}
export function groupArrayOfObjects(list, key) {
    return list.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}
const urlLinks = getMenuLinks();

export function getMenuLink () {
    let Menu=[];
    return  FetchAPI(urlLinks).then(data=>{
        if (data.success) {
            Menu=handleMenu(data?.data)
        }
        return Menu
    })
}

export function getNewSectionsData (NameSection) {
    let newData=[];
    return  FetchAPI(getDataNewSections(NameSection)).then(data=>{
        if (data.success) {
            newData=data?.data
        }
        return newData
    })
}
