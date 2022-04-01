import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import HomeScreen from "./home";
import loadNamespaces from "next-translate/loadNamespaces";
import {getMenuList} from "../lib/menu";
import {getAllCommanderie} from "../lib/home/commanderieCroyants";
import {getDataAhadith} from "../lib/ahadith";
import {data} from "../data/tabData";

export default function Home(props) {
    const {t} = useTranslation()
    const description = t('description')
    const linkName = t('more-examples')
    return (
        <>
            <HomeScreen {...props}/>
        </>
    )
}
export const getServerSideProps = async ({query, params}) => {
    const MenuGlobal = await getMenuList()
    const dataAPI = await getAllCommanderie()
    const dataALhadith = await getDataAhadith()

    return {
        props: JSON.parse(JSON.stringify({MenuGlobal: MenuGlobal, dataAPI: dataAPI, dataAhadith: dataALhadith}))

    }
}
/*export async function getStaticProps(ctx) {
    const props = await loadNamespaces({
        ...ctx,
        pathname: '/',
    })

    return {props:JSON.parse(JSON.stringify(props))}
}*/
