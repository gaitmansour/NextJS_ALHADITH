import React, {useEffect, useRef, useState} from "react"
import {useTranslation} from 'react-i18next';
import styles from "./search.module.css"
import Link from "next/link";
import {useRouter} from "next/router";

import ReactPaginate from 'react-paginate'
import {getCategory, getDegree, getNarrator, getSource, getTopic, Search} from "../../endpoints";
import FetchAPI from "../../API";
import {FetchPostAPI} from "../../data/API_Search/API";
import ItemList from "../../components/ItemList";
import TemplateArticle from "../../components/TemplateArticle";
import Body from "../../components/Body";
import SearchInput from "../../components/Forms/SearchInput";
import Cards from "../../components/_UI/Cards";
import Input from "../../components/Forms/Input";
import CustomSelect from "../../components/Forms/CustomSelect";
import PageTitleSecond from "../../components/_UI/PageTitleSecond";
import CustomModal from "../../components/_UI/Modal";
import _ from "lodash";

const SearchPage = (props) => {
    let router = ''
    if (typeof window !== "undefined") {
        var params = JSON.parse(localStorage.getItem('searchData'))
    }

    let varRouter = useRouter()?.query

    router = params ? params?.query : varRouter;
    console.log("router-----------------------")
    console.log(router)
    const state = router;
    const content = state?.content;
    const topic = state?.topic;
    console.log("topic-------------------",topic)

    const degree = state?.degree
    const door = state?.door
    const source = state?.source
    const narrator = state?.narrator

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
    const [dataSearch, setdataSearch] = useState([])
    const [input, setInput] = useState('')
    const [pageNum, setPageNum] = useState(0)
    const [pagePagination, setPagePagination] = useState(1)
    const [StartPage, setStartPage] = useState(0)
    const dataPerPage = dataSearch?.hits?.hits?.length
    const pagevisited = pageNum * dataPerPage
    const [show, setShow] = useState(false);
    const {t} = useTranslation();
    const data = [
        {
            "title": "الرئيسية",
            "path": "",
        },
        {
            "title": "البحث",
            "path": "/search",
        },
    ]
    const searchSpacific = dataSearch?.hits?.total?.value;
    const searchNotSpacific = 336
    let resultsRef = useRef();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const urlDegree = getDegree();
    const urlSource = getSource();
    const urlTopic = getTopic();
    const urlNarrator = getNarrator();
    const urlCategory = getCategory();
    const urlSearch = Search();


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
                });
                setdataSource(newSource)
            }
        })
    };

    const getDataTopic = async () => {
        return FetchAPI(urlTopic).then(data => {
            if (data.success) {
                const newTopic = data?.data.map(item => {
                    return item = {
                        label: item.label,
                        value: item.id
                    }
                });
                setdataTopic(newTopic);
                return newTopic
            }
        })
    };

    const getDataNarrator = async () => {
        await FetchAPI(urlNarrator).then(data => {
            if (data.success) {
                // console.log('dataNarrator-------------',data?.data)
                const newNarrator = data?.data.map(item => {
                    return item = {
                        label: item.label,
                        value: item.id
                    }
                });
                setdataNarrator(newNarrator)
            }
        })
    };

    const getDataCategory = async () => {
        return await FetchAPI(urlCategory).then(data => {
            if (data.success) {
                // console.log('dataNarrator-------------',data?.data)
                const newCategory = data?.data.map(item => {
                    return item = {
                        label: item.label,
                        value: item.id
                    }
                });
                setdataCategory(newCategory);
                return newCategory
            }
        })
    };

    const handleSearch = async (word, topic, degree) => {

        const data = {
            "content": word,
            "evaluationSource": EvaluationSource ? EvaluationSource : '',
            "idDegree": degree ? degree.value : ChoiceDegree ? ChoiceDegree.value : '',
            "idNarrator": narrator ? narrator.value : ChoiceNarrator ? JSON.stringify(ChoiceNarrator.value) : '',
            "idSource": source ? source.value : ChoiceSource ? JSON.stringify(ChoiceSource.value) : '',
            "idTopic": door ? door.value : ChoiceTopic ? JSON.stringify(ChoiceTopic.value) : '',
            "idCategorie": topic ? JSON.stringify(topic.value) : ChoiceCategory ? ChoiceCategory.value : '',
            "numeroHadith": "",
            "size": 10,
            "start": StartPage < 1 ? 0 : StartPage,
            "tags": ""
        };
        console.log("data---------------------------")
        console.log(data)
        FetchPostAPI(urlSearch, data).then(data => {
            if (data.success) {
                setdataSearch(data?.data);
                setPagePagination(data?.data?.hits?.total?.value)
            }
        })
    };

    const handleTopicFrom = async (res, r, router) => {
        const word = router?.word;
        const from = router?.from;
        console.log("from ----------------", from)
        if (from === 'home') {
            const ArrayCategory = res && res.length > 0 && res?.filter((item) => item.label === topic)
            const ArrayDegree = r && r.length > 0 && r?.filter((item) => item.label === content)
            setChoiceCategory(ArrayCategory[0]);
            setChoiceDegree(ArrayDegree[0]);
            await handleSearch(word, ArrayCategory[0], ArrayDegree[0])
            setShowForm(false)
        }
        if (from === 'topBar') {
            setInput(word)
            setShowForm(false);
            handleSearch(word)
        }
        if (from === 'section') {
            setInput(word)
            handleSearch(word, topic, degree);
            setChoiceCategory(topic);
            setChoiceTopic(door);
            setChoiceDegree(degree);
            setChoiceSource(source);
            setChoiceNarrator(narrator)
        }
    };


    const displayData = dataSearch?.hits?.hits?.map((item, index) => {
        console.log(item?.highlight)
        return <ItemList key={index}
                         topic={item?._source?.topic?.label}
                         category={item?._source?.categorie?.label}
                         content={item?._source?.content}
                         highlight={!!item.highlight}
                         text={item?.highlight ? item?.highlight['content.multi_words'].join(' ') : item?._source?.content}
                         narrator={item?._source?.narrator?.label}
                         source={item?._source?.source?.label}
                         degree={item?._source?.degree?.label}
                         sourceGlobal={item?._source?.evaluationSource}
                         description={_.head(item?._source?.refsStatutHadith)?.description}

        />
    });

    const pageCount = Math.ceil(dataSearch?.hits?.total?.value / 10)
    const changePage = (v) => {
        setPageNum(v.selected);
        setStartPage(10 * v.selected)
    };

    function handleInput(v) {
        if (typeof v == "string") {
            setInput(v)
        } else {
            setInput(v.target.value)
        }
    }

    function handleClickSearch() {
        if (!input && !ChoiceTopic && !ChoiceSource && !ChoiceNarrator && !ChoiceDegree && !ChoiceCategory) {
            handleShow()
        } else {
            setShowForm(false)
            setPageNum(0)
            setStartPage(0)
            handleSearch(input)
        }

    }

    let route = useRouter()


    useEffect(() => {
        if (StartPage === 0) {
            getDataDegree().then((r) =>
                getDataCategory().then((res) =>
                    handleTopicFrom(res, r, router)
                ));
            getDataSource();
            getDataNarrator();
            getDataTopic();
        }

        if (input || ChoiceTopic || ChoiceSource || ChoiceNarrator || ChoiceDegree || ChoiceCategory) {
            handleSearch(input);
            console.log('handle')
        }
        if (typeof window != "undefined") {
            window.scrollTo({
                behavior: "smooth",
                top: resultsRef.current.offsetTop
            });
        }
        route.isReady && console.log("route----------------------------------", route);

    }, [pageNum, StartPage]);


  return (
    <TemplateArticle {...props} ListBreadcrumb={data} titlePage='البحث'>
      <Body
        className={`${styles.SearchPage} TemplateArticleBody SearchPage  p-4`}
      >
        <div className={`${styles.SearchBox} `}>
          <div
            ref={resultsRef}
            className={`${styles.searchElement} search-element d-flex flex-row align-items-center justify-content-between mt-4`}
          >
            <SearchInput
              styleIcon={{ color: '#656e7e', width: 20 }}
              styleFilter={{ backgroundColor: '#656e7e', width: 50 }}
             // styleDiv={{position:'absolute',right:"55%"}}
              styleSerachIcon={{ backgroundColor: '#656e7e' }}
              onClickSettings={() => setShowForm(!showForm)}
              input={input}
              onChange={(v) => handleInput(v)}
              placeholder='البحث في منصة الحديث النبوي الشريف'
              className='bg-white mx-0 shadow-card'
              clickSearch={() => handleClickSearch()}
            />

                        <div
                            className={`${styles.boxIconSetting}box-icon-setting d-flex align-items-center align-self-center btn m-2 p-0`}
                            onClick={() => handleClickSearch()} style={{backgroundColor: '#157646'}}>
                            <i className="fas fa-search p-3" style={{color: "#fff"}}/>
                        </div>
                    </div>
                    {showForm &&
                        <Cards className={`${styles.formSearch} form-search p-2`}>
                        <div className="d-flex flex-wrap flex-column">

                            <div className={`d-flex alignIte${styles.alignIte}`}>
                                <CustomSelect className="col-md-4"
                                              options={dataCategory && dataCategory}
                                              defaultInputValue={ChoiceCategory ? ChoiceCategory : ""}
                                              label="موضوع"
                                              placeholder="اكتب الموضوع"
                                              onChange={v => setChoiceCategory(v)}/>


                                <Input className="col-md-4" label="مصدر الحكم" placeholder="ابحث بمصدر الحكم"
                                       onChange={(v) => setEvaluationSource(v.target.value)}/>
                            </div>
                            <div className={`d-flex alignIte${styles.alignIte}`}>
                                <CustomSelect className="col-md-4" options={dataSource && dataSource}
                                              defaultInputValue={source ? source : ChoiceSource ? ChoiceSource : ""}
                                              label="المصدر"
                                              placeholder="اكتب اسم المصدر"
                                              onChange={v => {
                                                  setChoiceSource(v);
                                              }}/>
                                <CustomSelect className="col-md-4" options={dataDegree && dataDegree} label="درجة الصحة"
                                              defaultInputValue={degree ? degree : ChoiceDegree ? ChoiceDegree : ""}
                                              placeholder="اكتب درجة الصحة" onChange={v => setChoiceDegree(v)}/>
                                <CustomSelect className="col-md-4" options={dataNarrator && dataNarrator} label="الراوي"
                                              defaultInputValue={narrator ? narrator : ChoiceNarrator ? ChoiceNarrator : ""}
                                              placeholder="اكتب اسم الراوي" onChange={v => setChoiceNarrator(v)}/>
                            </div>


                        </div>
                    </Cards>}
                    {dataSearch && dataSearch?.hits?.hits?.length > 0 &&
                        <div><PageTitleSecond className={`${styles.pageTitleSecond} page-title-second pb-2 mt-5`}
                                              title={`نتائج البحث (${searchSpacific ? searchSpacific : "0"}).`}/>
                            {displayData}
                            <ReactPaginate
                                previousLabel={<i id="paginationn" className={`fa fa-chevron-right`}/>}
                                nextLabel={<i id="paginationn" className="fa fa-chevron-left"/>}
                                pageCount={pageCount}
                                forcePage={pageNum}
                                onPageChange={changePage}
                                // containerClassName={styles.paginationButtons}
                                containerClassName={`pagination justify-content-evenly align-content-around w-50 py-2 ${styles.paginationButtons}`}

                                //previousLinkClassName={"prevbtn"}
                                //nextLinkClassName={"nextbtn"}
                                activeClassName={styles.activebtn}
                            />
                        </div>}
                    {dataSearch?.hits?.hits?.length === 0 && (
                        <div className="d-flex align-items-center justify-content-center">
                            <div
                                className="NotFound404 d-flex flex-column align-items-center justify-content-center mt-lg-11">
                                <br/>
                                <h4>{"لا توجد نتائج توافق معايير البحث"}</h4>
                                <Link role="button" href={'/listQuestions'} as={'/listQuestions'}
                                      style={{color: 'black'}}>
                                    <p className="fw-100 link-primary">{"يرجي طرح سؤالك أو محاولة البحث في الموقع"}</p>
                                </Link>
                            </div>
                        </div>)}

                </div>
                <div className="side-bar"/>
                <CustomModal title={'تنبيه'} body={'يرجى ملء كلمة البحث '} show={show} onHide={handleClose}
                             onClick={handleClose}/>
            </Body>
        </TemplateArticle>
    );
}

export default SearchPage;
