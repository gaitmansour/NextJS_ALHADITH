import React, {useEffect, useRef, useState} from "react"
import {useTranslation} from 'react-i18next';
import styles from "./searchHome.module.css"
//import {useLocation, useHistory} from "next/";
import {useRouter} from "next/router";

import {getCategory, getDegree, getNarrator, getSource, getTopic, Search} from "../../../endpoints";
import FetchAPI from "../../../API";
import {FetchPostAPI} from "../../../data/APiSectionSearch/API";
import SectionTitle from "../../../components/_UI/SectionTitle";
import SearchInput from "../../../components/Forms/SearchInput";
import Cards from "../../../components/_UI/Cards";
import Input from "../../../components/Forms/Input";
import CustomSelect from "../../../components/Forms/CustomSelect";
import CustomModal from "../../../components/_UI/Modal";

const SearchSection = (props) => {
    //const {state} = useLocation();
    let router = useRouter();
    const {state} = useRouter().query;
    const [showForm, setShowForm] = useState(true)
    const [dataDegree, setdataDegree] = useState([])
    const [ChoiceDegree, setChoiceDegree] = useState("")
    const [dataSource, setdataSource] = useState([])
    const [ChoiceSource, setChoiceSource] = useState('')
    const [dataTopic, setdataTopic] = useState([])
    const [ChoiceTopic, setChoiceTopic] = useState('')
    const [dataNarrator, setdataNarrator] = useState([])
    const [dataCategory, setdataCategory] = useState([])
    const [ChoiceCategory, setChoiceCategory] = useState('')
    const [ChoiceNarrator, setChoiceNarrator] = useState('')
    const [EvaluationSource, setEvaluationSource] = useState('')
    const [input, setInput] = useState('')
    const [show, setShow] = useState(false);
    const {t} = useTranslation();
    let resultsRef = useRef();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const urlDegree = getDegree();
    const urlSource = getSource();
    const urlTopic = getTopic();
    const urlNarrator = getNarrator();
    const urlCategory = getCategory();

    const getDataDegree = async () => {
        return FetchAPI(urlDegree).then(data => {
            if (data.success) {
                const newDegree = data?.data.map(item => {
                    return item = {
                        label: item.label,
                        value: item.id
                    }
                })
                setdataDegree(newDegree)
                return newDegree
            }
        })
    }
    const getDataSource = async () => {
        FetchAPI(urlSource).then(data => {
            if (data.success) {
                const newSource = data?.data.map(item => {
                    return item = {
                        label: item.label,
                        value: item.id
                    }
                })
                setdataSource(newSource)
            }
        })
    }
    const getDataTopic = async () => {
        return FetchAPI(urlTopic).then(data => {
            if (data.success) {
                const newTopic = data?.data.map(item => {
                    return item = {
                        label: item.label,
                        value: item.id
                    }
                })
                setdataTopic(newTopic)
                return newTopic
            }
        })
    }
    const getDataNarrator = async () => {
        await FetchAPI(urlNarrator).then(data => {
            if (data.success) {
                const newNarrator = data?.data.map(item => {
                    return item = {
                        label: item.label,
                        value: item.id
                    }
                })
                setdataNarrator(newNarrator)
            }
        })
    }

    const getDataCategory = async () => {
        return await FetchAPI(urlCategory).then(data => {
            if (data.success) {
                // console.log('dataNarrator-------------',data?.data)
                const newCategory = data?.data.map(item => {
                    return item = {
                        label: item.label,
                        value: item.id
                    }
                })
                setdataCategory(newCategory)
                return newCategory
            }
        })
    }

    //const history = useHistory()
    let history = useRouter();

    function handleInput(v) {
        if (typeof v == "string") {
            setInput(v)
        } else {
            setInput(v.target.value)
        }
    }

    const goToSearchPage = () => {

        if (!input && !ChoiceTopic && !ChoiceSource && !ChoiceNarrator && !ChoiceDegree && !ChoiceCategory) {
            handleShow()
        } else {
            // console.log("go to")
            router && router.push({
                pathname: '/search',
                search: '',
                query: {
                    from: 'section',
                    topic: ChoiceCategory.label,
                    content: ChoiceDegree.label,
                    source: ChoiceSource.label,
                    sourceHokm: EvaluationSource,
                    narrator: ChoiceNarrator.label,
                    word: input
                }
            })
        }
    }
    const handleKeyDown = (event, location) => {
        // console.log('A key was pressed', event.keyCode);
        if (event.keyCode === 13) {
            goToSearchPage()
        }
    };

    useEffect(() => {
        if (typeof window !== undefined) {
            window.addEventListener('keydown', handleKeyDown);
        }
        // cleanup this component
        return () => {
            if (typeof window !== undefined) {

                window.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [input, ChoiceTopic, ChoiceSource, ChoiceNarrator, ChoiceDegree, ChoiceCategory]);

    function handleClickSearch() {
        goToSearchPage()
    }

    useEffect(() => {
        getDataDegree()
        getDataSource()
        getDataNarrator()
        getDataTopic()
        getDataCategory()
    }, [])

    return (
        <div className={`${styles.secSearch} container flex-fill secSearch`}>
            <div className={`container ${styles.SearchSection} `}>
                <SectionTitle title='البحث' className=''/>
            </div>
            <div
                ref={resultsRef}
                className={`${styles.searchElement} d-flex flex-row align-items-center justify-content-between mt-4`}
            >
                <SearchInput
                    styleSerachIcon={{backgroundColor: '#656e7e'}}
                    styleIcon={{color: '#656e7e', width: 20}}
                    styleDiv={{position: 'absolute', right: "78%"}}
                    styleFilter={{backgroundColor: '#656e7e', width: 50}}
                    onClickSettings={() => setShowForm(!showForm)}
                    input={input}
                    onChange={(v) => handleInput(v)}
                    placeholder='البحث في منصة محمد السادس للحديث النبوي الشريف'
                    className='bg-white mx-0'
                    clickSearch={() => handleClickSearch()}
                />

                <div
                    className='box-icon-setting d-flex align-items-center align-self-center btn mx-2 mb-2 p-0'
                    onClick={() => handleClickSearch()}
                >
                    <i
                        className='fas fa-search p-3 text-light'
                        style={{backgroundColor: '#157646', borderRadius: 8}}
                    />
                </div>
            </div>
            {showForm && (
                <Cards
                    className={`${styles.formSearch} form-search p-2`}
                    style={{backgroundColor: '#e9fbf1'}}
                >
                    <div className='d-flex flex-wrap flex-column'>
                        <div className={`${styles.alignsec} d-flex alignIte`}>
                            {/*<Input className="col-md-4" label="نص الحديث" placeholder="ابحث نص الحديث"/>
               */}
                            <CustomSelect
                                className='col-md-4'
                                options={dataCategory && dataCategory}
                                defaultInputValue={ChoiceCategory ? ChoiceCategory : ''}
                                label='موضوع'
                                placeholder='اكتب الموضوع'
                                onChange={(v) => setChoiceCategory(v)}
                            />

                            <Input
                                className='col-md-4'
                                label='مصدر الحكم'
                                placeholder='ابحث بمصدر الحكم'
                                value={EvaluationSource && EvaluationSource}
                                onChange={(v) => setEvaluationSource(v.target.value)}
                            />
                        </div>
                        <div className={`${styles.alignsec} d-flex alignIte`}>
                            <CustomSelect
                                className='col-md-4'
                                options={dataSource && dataSource}
                                defaultInputValue={ChoiceSource ? ChoiceSource : ''}
                                label='المصدر'
                                placeholder='اكتب اسم المصدر'
                                onChange={(v) => {
                                    setChoiceSource(v)
                                }}
                            />

                            <CustomSelect
                                className='col-md-4'
                                options={dataDegree && dataDegree}
                                label='الحكم'
                                defaultInputValue={ChoiceDegree ? ChoiceDegree : ''}
                                placeholder='اكتب الحكم'
                                onChange={(v) => setChoiceDegree(v)}
                            />

                            <CustomSelect className="col-md-4"
                                          options={dataNarrator && dataNarrator}
                                          label="الراوي"
                                          defaultInputValue={ChoiceNarrator ? ChoiceNarrator : ""}
                                          placeholder="اكتب اسم الراوي"
                                          onChange={v => setChoiceNarrator(v)}/>
                        </div>
                    </div>
                </Cards>)}
            <CustomModal title={'تنبيه'}
                         body={'يرجى ملء كلمة البحث '}
                         show={show}
                         onHide={handleClose}
                         onClick={handleClose}/>
        </div>
    );
}

export default SearchSection;
