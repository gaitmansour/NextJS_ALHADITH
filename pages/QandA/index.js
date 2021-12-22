import React, {useEffect, useState, useRef} from 'react';
import styles from './QandA.module.css';
import Iicon from '../../components/_UI/QuestionsList/speech-bubblee1.png';
import {
    AllForums,
    getQuestionAPI,
    getTaxonomyForum,
    addQuestions,
    searchQuestion,
} from '../../endpoints';
import Link from 'next/link';
import {Icons} from '../../assets';
import _ from 'lodash';
import Moment from 'moment';
import FetchAPIWthData from './API';
import ReCAPTCHA from 'react-google-recaptcha';
import ReactPaginate from 'react-paginate';
import FetchPostAPI from './API/questions';
// import DataQA from "./API/data";
import {GoogleLogin} from 'react-google-login';
import TemplateArticle from "../../components/TemplateArticle";
import Body from "../../components/Body";
import CustomModal from "../../components/_UI/Modal";
import ScrollButton from "../../components/ScrollButton";
import Loading from "../../components/_UI/Loading";


const ListQuestions = (props) => {
    const title = props?.match?.params?.title
    const [DataQuestions, setDataQuestions] = useState([])
    const [DataQuestions1, setDataQuestions1] = useState([])
    const [question, setQuestion] = useState('')
    const [checked, setChecked] = useState(false)
    const [logged, setLogged] = useState(false)
    const [Subject, setSubject] = useState('')
    const [email, setEmail] = useState('')
    const [Forum, setForum] = useState('')
    const [output, setOutput] = useState([])
    const [message, setMessage] = useState('')
    const [showForum, setShowForum] = useState(false)
    const [show, setShow] = useState(false);
    const [mail, setMail] = useState("");
    const [sendSuccess, setsendSuccess] = useState(false);
    const [pageNumber, setPAgeNumber] = useState(0);
    const [pagePagination, setPagePagination] = useState(1);
    const [StartPage, setStartPage] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const url = AllForums();
    const url1 = getTaxonomyForum();
    const urlSubmit = getQuestionAPI();
    const urlAddQuestion = addQuestions()
    const urlSearchQuestion = searchQuestion()
    const clientId = "293585459501-peieeq4508t355rdtmq6244u2nhnsqqc.apps.googleusercontent.com"

    function handleShowHide() {
        setShowForum(!showForum);
        setChecked(false);
    }

    function onChange() {
        setChecked(true);
    }

    const SubmitQuestion = async () => {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (mailformat.test(email) === false && mailformat.test(mail) === false) {
            console.log('email false')
            setMessage('البريد الإلكتروني غير صحيح!');
            console.log(message)
        } else {
            const data = {
                "sujetQuestion": Subject,
                "descriptionQuestion": question,
                "email": email,
            }
            console.log("forum_______", data)
            return FetchAPIWthData(urlAddQuestion, data).then(data => {
                if (data.success) {
                    setsendSuccess(true)
                    const timer = setTimeout(() => {
                        if (typeof window != "undefined") {
                            window.location.reload(false);
                        }
                    }, 2000);


                }
            })
        }
    }

    const handleSearchQuestion = async () => {
        const data = {
            "query": Subject,
            "size": 10,
            "start": 0
        }
        FetchPostAPI(urlSearchQuestion, data).then(data => {
            // console.log("testtttttt",data)
            if (Subject !== '' && data.success) {
                return setOutput(data?.data)
            } else {
                setOutput([])
            }
        });
    };

    const getDataQuestions = async () => {
        const data = {
            "query": "",
            "size": 10,
            "start": StartPage < 1 ? 0 : StartPage,
        }
        FetchPostAPI(urlSearchQuestion, data).then(data => {
            if (data.success) {
                setDataQuestions(data?.data?.hits?.hits);
                setPagePagination(data?.data?.hits?.total?.value);
                return data?.data?.hits?.hits;
            }
        })
    }
    const responseFacebook = (response) => {
        console.log(response);
    }
    const onLoginSuccess = (res) => {
        console.log("result", res.profileObj)
        setLogged(true)
        setMail(res.profileObj.email)
    }
    const onLoginFail = (res) => {
        console.log("result", res)
    }

    function handleSubmitQuestion() {
        if (!question || !Subject) {
            handleShow();
        } else {
            SubmitQuestion();
        }
    }

    useEffect(() => {
        handleSearchQuestion();
        getDataQuestions();
        // getDataQuestions1()
        if (typeof window != "undefined") {
            window.scrollTo(0, 0);
        }
    }, [StartPage, pageNumber]);

    const questionPerPage = 5;
    const pagesVisited = pageNumber * questionPerPage;

    const data = [
        {
            title: 'الرئيسية',
            path: '',
        },
        {
            title: 'سؤال و جواب',
            path: '/listQuestions',
        },
    ];

    if (_.isEmpty(DataQuestions)) {
        return (
            <div className="d-flex align-items-center justify-content-center py-5">
                <Loading/>
            </div>
        );
    }
    const pageCount = Math.ceil(pagePagination / 10);
    const changePage = v => {
        setPAgeNumber(v.selected);
        setStartPage(10 * v.selected);
    };
    const displayQuestions = DataQuestions.sort(
        (a, b) =>
            new Date(a._source?.dateHeureQuestion) -
            new Date(b._source?.dateHeureQuestion),
    ).map((item, i) => {
        // console.log("TID-----",item)
        return (
            <div key={i} className="bg1">
                <div className={'row justify-content-between align-items-center'}>
                    <h5 className="col col-12 col-lg-9 col-md-9 col-sm-1 d-flex card-subtitle">
                        {item?._source?.sujetQuestion}
                    </h5>
                    <p
                        className={
                            'dateParagraph col col-12 col-lg-3 col-md-3 col-sm-1 align-self-center pt-3'
                        }>
                        {'تاريخ النشر: ' +
                        Moment(item?._source?.dateHeureQuestion).format('DD-MM-YYYY')}
                    </p>
                </div>
                <NavLink
                    exact
                    className="item d-flex align-items-center py-3 px-1"
                    to={{
                        pathname: '/questions',
                        search: '',
                        hash: '',
                        state: {
                            itemTitle: item?._source?.sujetQuestion,
                            itemQuestion: item?._source?.descriptionQuestion,
                            itemReponse: item?._source?.descriptionReponse,
                            itemId: item?._id,
                        },
                    }}>
                    <img
                        src={Iicon}
                        style={{backgroundColor: 'red'}}
                        className="mx-3"
                    />
                    <p className="flex-fill m-0">
                        {item?._source?.descriptionQuestion}
                    </p>
                </NavLink>
            </div>
        );
    });

    return (
        <TemplateArticle ListBreadcrumb={data} titlePage="أسئلة">
            <Body className={`${styles.TemplateArticleBody}TemplateArticleBody Media d-flex p-4`}>
            <ScrollButton/>
            <div className="flex-fill">

                {sendSuccess && (<div className="mb-3 border-success"
                                      style={{borderColor: '#fff', borderRadius: 5, backgroundColor: '#44b27c'}}>
                    <div className="card-body text-white">
                        لقد تم إرسال سؤالك بنجاح، ستتوصلون بإشعار على بريدكم الإلكتروني حين توفر الإجابة
                    </div>
                </div>)}
                <button type="button" style={{backgroundColor: '#feb400', color: '#fff'}}
                        onClick={() => handleShowHide()} className={`${styles.btnquestion} btnquestion`}>{!showForum ?
                    <p>اطرح سؤالك<img className={`${styles.logo} logo`} style={{width: '30px'}}
                                      src={Icons.icon_faq.default}
                                      alt="icon faq"/></p> : <p>إغلاق</p>}</button>
                {showForum ?
                    <div className={`side-bar1`}>
                        <div className={`${styles.SimpleList} SimpleList`}>

                            {logged == false ?
                                <div className={`${styles.searchInp} mb-3 d-flex  align-items-center searchInp`}>
                                    <p className="mx-5 mt-2">تسجيل الدخول</p>
                                    <GoogleLogin
                                        clientId={clientId}
                                        buttonText=""
                                        onSuccess={onLoginSuccess}
                                        onFailure={onLoginFail}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                                : <div>
                                    <div
                                        className={`${styles.searchInp} mb-3 d-flex justify-content-between align-items-center searchInp`}>
                                        <div style={{width: '90%',}}>
                                            <label htmlFor="formGroupExampleInput"
                                                   className="form-label">الموضوع</label>
                                            <input type="text" className="form-control" id="formGroupExampleInput"
                                                   placeholder="المرجو كتابة الموضوع هنا"
                                                   onChange={(v) => setSubject(v.target.value)}/>
                                        </div>
                                        <button type="button" style={{
                                            backgroundColor: '#129D59',
                                            color: '#fff',
                                            height: '39px',
                                            width: '8%',
                                            marginTop: '28px'
                                        }} className={`${styles.searchBtn} btn searchBtn`}
                                                onClick={handleSearchQuestion}>بحث
                                        </button>
                                    </div>

                                    {output?.hits?.hits?.length > 0 ?
                                        <div className="card w-100 mb-3">
                                            <div className="card-body Card-question">
                                                <div className={`${styles.SimpleList} SimpleList`}>
                                                    {output?.hits?.hits?.map((item, i) => {
                                                        return (
                                                            <div key={i} className="bg1">
                                                                <div
                                                                    className={'row justify-content-between align-items-center'}>
                                                                    <h5 className="col col-12 col-lg-9 col-md-9 col-sm-1 d-flex card-subtitle">{item?._source?.sujetQuestion}</h5>
                                                                    <p className={'col col-12 col-lg-3 col-md-3 col-sm-1 dateParagraph align-self-center pt-3'}>
                                                                        {'تاريخ النشر: ' + Moment(item?.attributes?.created).format('DD-MM-YYYY')}</p>
                                                                </div>
                                                                <Link
                                                                    href={{
                                                                        pathname: '/questions',
                                                                        query: {
                                                                            itemTitle: item?._source?.sujetQuestion,
                                                                            itemQuestion: item?._source?.descriptionQuestion,
                                                                            itemReponse: item?._source?.descriptionReponse,
                                                                            itemId: item?._id,
                                                                        }
                                                                    }}
                                                                    as={'/questions'}
                                                                >
                                                                    <a className="item d-flex align-items-center py-3 px-1">
                                                                        <img src={Iicon}
                                                                             style={{backgroundColor: 'red'}}
                                                                             className="mx-3"/>
                                                                        <p className="flex-fill m-0">{item?._source?.descriptionQuestion}</p>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div> : <div></div>
                                    }
                                    <div className="mb-3">
                                        <label htmlFor="formGroupExampleInput2" className="form-label">السؤال</label>
                                        <textarea className="form-control" aria-label="With textarea" rows="8"
                                                  placeholder={"المرجو كتابة السؤال هنا"}
                                                  style={{height: "80px !important"}}
                                                  onChange={(v) => setQuestion(v.target.value)}/>

                                    </div>
                                    <div className="mb-3 ">
                                        <label htmlFor="formGroupExampleInput"
                                               className="form-label">البريد الإلكتروني</label>
                                        <input type="email" className="form-control" id="formGroupExampleInput"
                                               placeholder="المرجو كتابة البريد الإلكتروني  هنا"
                                               value={mail ? mail : ""} onChange={(v) => setEmail(v.target.value)}/>
                                        {message &&
                                        <small id="emailHelp" class="form-text text-danger">{message}</small>
                                        }
                                    </div>
                                    <ReCAPTCHA
                                        sitekey="6LcHYVAdAAAAAHN3UW-4hBh04fWXbxTcERACA0Ts"
                                        secretkey="6LcHYVAdAAAAABdIdYVNQ1puIV6V81axykMvjo5sa"
                                        className="captcha"
                                        onChange={onChange}
                                    />
                                    <button
                                        type="button"
                                        style={{
                                            backgroundColor: '#129D59',
                                            color: '#fff',
                                            width: '100%',
                                            height: '50px',
                                        }}
                                        className="btn my-4"
                                        onClick={handleSubmitQuestion}
                                        disabled={!checked}>
                                        اطرح سؤالك
                                    </button>
                                </div>
                            }</div>
                    </div> : null}
                <div className="card w-100 ">
                    <div className="card-body Card-question">
                        <div className={`${styles.SimpleList} SimpleList`}>
                            {displayQuestions}

                        </div>
                    </div>
                </div>
                <ReactPaginate
                    previousLabel={
                        <i id="paginationn" className="fa fa-chevron-right"/>
                    }
                    nextLabel={<i id="paginationn" className="fa fa-chevron-left"/>}
                    pageCount={pageCount}
                    forcePage={pageNumber}
                    onPageChange={changePage}
                    containerClassName={`${styles.paginationButtons} paginationButtons`}
                    previousLinkClassName={'prevbtn'}
                    nextLinkClassName={'nextbtn'}
                    activeClassName={`${styles.activebtn} activebtn`}
                />
            </div>

            <div className="side-bar">
                <div className={`${styles.SimpleList} SimpleList`}/>
            </div>
            <CustomModal
                title={'تنبيه'}
                body={'يرجى ملءإستمارة طرح السؤال '}
                show={show}
                onHide={handleClose}
                onClick={handleClose}
            />
            </Body>
        </TemplateArticle>
    );
};

export default ListQuestions;
