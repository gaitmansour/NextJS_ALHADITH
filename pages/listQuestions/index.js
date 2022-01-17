import React, { useEffect, useState, useRef } from 'react'
import styles from './listQuestions.module.css'
import Iicon from '../../components/_UI/QuestionsList/speech-bubblee1.png'
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
import {FetchAPIWthData} from '../../data/API';
import ReCAPTCHA from 'react-google-recaptcha';
import ReactPaginate from 'react-paginate';
import {FetchPostAPI} from '../../data/API/questions';
import {GoogleLogin} from 'react-google-login';
import TemplateArticle from "../../components/TemplateArticle";
import Body from "../../components/Body";
import CustomModal from "../../components/_UI/Modal";
import ScrollButton from "../../components/ScrollButton";
import Loading from "../../components/_UI/Loading";
import Image from 'next/image'
import FacebookLogin from 'react-facebook-login';


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
                            // window.location.reload(false);
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
    const responseFacebook = response => {
        setLogged(true);
        setMail(response.email);
    };
    const onLoginSuccess = res => {
        setLogged(true);
        setMail(res.profileObj.email);
    };
    const onLoginFail = res => {
        console.log('resultFail22', res);
    };

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
            //  window.scrollTo(0, 0);
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
      <div className='d-flex align-items-center justify-content-center py-5'>
        <Loading />
      </div>
    )
  }
  const pageCount = Math.ceil(pagePagination / 10)
  const changePage = (v) => {
    setPAgeNumber(v.selected)
    setStartPage(10 * v.selected)
  }
  const displayQuestions = DataQuestions.map((item, i) => {
    // console.log("TID-----",item)
    return (
      <div key={i} className={` container-flex ${styles.bg1} bg1`}>
        <div className={'p-2 row justify-content-between align-items-center'}>
          <h5 className='px-4 col col-12 col-lg-9 col-md-9 col-sm-1 d-flex card-subtitle'>
            {item?._source?.sujetQuestion}
          </h5>
          <p
            className={`${styles.dateParagraph} dateParagraph col col-12 col-lg-3 col-md-3 col-sm-1 align-self-center pt-3`}
          >
            {'تاريخ النشر: ' +
              Moment(item?._source?.dateHeureQuestion).format('DD-MM-YYYY')}
          </p>
        </div>
        <Link
          passHref={true}
          exact
          href={{
            pathname: '/detailsQuestion',
            search: '',
            hash: '',
            query: {
              itemTitle: item?._source?.sujetQuestion,
              itemQuestion: item?._source?.descriptionQuestion,
              itemReponse: item?._source?.descriptionReponse,
              itemId: item?._id,
            },
          }}
          as={'/detailsQuestion'}
        >
          <a
            id={'linkA'}
            className='descriptionP item d-flex align-items-center  px-1'
            style={{ textDecoration: 'none', paddingBottom: 20 }}
          >
            <Image
              alt={'icon'}
              src={Iicon}
              width='40%'
              height='40%'
              style={{ marginHorizontal: 20 }}
              className='mx-0 ml-5 mr-4'
            />
            <p className={`${styles.descriptionP} flex-fill m-2 `}>
              {item?._source?.descriptionQuestion}
            </p>
          </a>
        </Link>
        <hr />
      </div>
    )
  })

  return (
    <TemplateArticle ListBreadcrumb={data} titlePage='أسئلة'>
      <Body
        className={`${styles.TemplateArticleBody} ${styles.questionList} TemplateArticleBody  d-flex p-4`}
      >
        <ScrollButton />
        <div className='flex-fill'>
          {sendSuccess && (
            <div
              className='mb-3 border-success'
              style={{
                borderColor: '#fff',
                borderRadius: 5,
                backgroundColor: '#44b27c',
              }}
            >
              <div className={`card-body text-white`}>
                لقد تم إرسال سؤالك بنجاح، ستتوصلون بإشعار على بريدكم الإلكتروني
                حين توفر الإجابة
              </div>
            </div>
          )}
          <button
            type='button'
            style={{
              backgroundColor: '#feb400',
              color: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => handleShowHide()}
            className={`${styles.btnquestion} btnquestion`}
          >
            {!showForum ? (
              <div
                className='descriptionP item d-flex align-items-center  px-1'
                style={{ textDecoration: 'none', paddingBottom: 20 }}
              >
                <p className={`flex-fill pb-3 `}>{'اطرح سؤالك'}</p>{' '}
                <Image
                  alt={'icon'}
                  src={Icons.icon_faq}
                  width={'40%'}
                  height={'40%'}
                  style={{ marginHorizontal: 20 }}
                  className='pb-3'
                />
              </div>
            ) : (
              <p>إغلاق</p>
            )}
          </button>
          {showForum ? (
            <div className={`${styles.sideBar1} side-bar1`}>
              <div className={`${styles.SimpleList} SimpleList`}>
                {logged == false ? (
                  <div
                    className={`${styles.searchInp} mb-3 d-flex  align-items-center searchInp`}
                  >
                    <p className='mx-5 mt-2'>تسجيل الدخول</p>
                    <GoogleLogin
                      clientId={clientId}
                      buttonText=''
                      onSuccess={onLoginSuccess}
                      onFailure={onLoginFail}
                      cookiePolicy={'single_host_origin'}
                      className='googleLogin'
                    />
                    <FacebookLogin
                      appId='451461503355998'
                      autoLoad={false}
                      fields='name,email'
                      callback={responseFacebook}
                      icon='fa-facebook'
                      textButton=''
                      cssClass={styles.btnFacebook}
                    />
                  </div>
                ) : (
                  <div>
                    <div
                      className={`${styles.searchInp} mb-3 d-flex justify-content-between align-items-center searchInp`}
                    >
                      <div style={{ width: '90%' }}>
                        <label
                          htmlFor='formGroupExampleInput'
                          className='form-label'
                        >
                          الموضوع
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          id='formGroupExampleInput'
                          placeholder='المرجو كتابة الموضوع هنا'
                          onChange={(v) => setSubject(v.target.value)}
                        />
                      </div>
                      <button
                        type='button'
                        style={{
                          backgroundColor: '#129D59',
                          color: '#fff',
                          height: '39px',
                          width: '8%',
                          marginTop: '28px',
                        }}
                        className={`${styles.searchBtn} btn searchBtn`}
                        onClick={handleSearchQuestion}
                      >
                        بحث
                      </button>
                    </div>

                    {output?.hits?.hits?.length > 0 ? (
                      <div className='card w-100 mb-3'>
                        <div
                          className={`${styles.CardQuestion} card-body Card-question`}
                        >
                          <div className={`${styles.SimpleList} SimpleList`}>
                            {output?.hits?.hits?.map((item, i) => {
                              return (
                                <div
                                  key={i}
                                  className={`${styles.bg1} container-flex bg1`}
                                >
                                  <div
                                    className={
                                      'row justify-content-between align-items-center'
                                    }
                                  >
                                    <h5 className='col col-12 col-lg-9 col-md-9 col-sm-1 d-flex card-subtitle'>
                                      {item?._source?.sujetQuestion}
                                    </h5>
                                    <p
                                      className={`${styles.dateParagraph} col-12 col-lg-3 col-md-3 col-sm-1 dateParagraph align-self-center pt-3`}
                                    >
                                      {'تاريخ النشر: ' +
                                        Moment(
                                          item?.attributes?.created
                                        ).format('DD-MM-YYYY')}
                                    </p>
                                  </div>
                                  <Link
                                    href={{
                                      pathname: '/detailsQuestion',
                                      query: {
                                        itemTitle: item?._source?.sujetQuestion,
                                        itemQuestion:
                                          item?._source?.descriptionQuestion,
                                        itemReponse:
                                          item?._source?.descriptionReponse,
                                        itemId: item?._id,
                                      },
                                    }}
                                    as={'/detailsQuestion'}
                                  >
                                    <a
                                      id={'linkA'}
                                      className=' item d-flex align-items-center py-3 px-1 text-decoration-none text-black'
                                    >
                                      <Image
                                        src={Iicon}
                                        alt={'iconn'}
                                        //style={{marginHorizontal: 10}}
                                        className='px-0'
                                      />
                                      <p className='flex-fill mx-2 my-2 justify-content-center'>
                                        {item?._source?.descriptionQuestion}
                                      </p>
                                    </a>
                                  </Link>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className='mb-3'>
                      <label
                        htmlFor='formGroupExampleInput2'
                        className='form-label'
                      >
                        السؤال
                      </label>
                      <textarea
                        className='form-control'
                        aria-label='With textarea'
                        rows='8'
                        placeholder={'المرجو كتابة السؤال هنا'}
                        style={{ height: '80px !important' }}
                        onChange={(v) => setQuestion(v.target.value)}
                      />
                    </div>
                    <div className='mb-3 '>
                      <label
                        htmlFor='formGroupExampleInput'
                        className='form-label'
                      >
                        البريد الإلكتروني
                      </label>
                      <input
                        type='email'
                        className='form-control'
                        id='formGroupExampleInput'
                        placeholder='المرجو كتابة البريد الإلكتروني  هنا'
                        value={mail ? mail : ''}
                        onChange={(v) => setEmail(v.target.value)}
                      />
                      {message && (
                        <small id='emailHelp' className='form-text text-danger'>
                          {message}
                        </small>
                      )}
                    </div>
                    <ReCAPTCHA
                      sitekey='6LcHYVAdAAAAAHN3UW-4hBh04fWXbxTcERACA0Ts'
                      secretkey='6LcHYVAdAAAAABdIdYVNQ1puIV6V81axykMvjo5sa'
                      className={`${styles.captcha} captcha`}
                      onChange={onChange}
                    />
                    <button
                      type='button'
                      style={{
                        backgroundColor: '#129D59',
                        color: '#fff',
                        width: '100%',
                        height: '50px',
                      }}
                      className='btn my-4'
                      onClick={handleSubmitQuestion}
                      disabled={!checked}
                    >
                      اطرح سؤالك
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : null}
          <div className='card w-75 px-1 '>
            <div className={`${styles.CardQuestion} card-body Card-question`}>
              <div className={`${styles.SimpleList} SimpleList`}>
                {displayQuestions}
              </div>
            </div>
          </div>
          <ReactPaginate
            previousLabel={
              <i id='pagination' className='fa fa-chevron-right' />
            }
            nextLabel={<i id='pagination' className='fa fa-chevron-left' />}
            breakLabel={'...'}
            breakClassName={'break-me'}
            activeClassName={styles.activebtn}
            containerClassName={
              'pagination justify-content-evenly align-content-around w-25 py-2'
            }
            // subContainerClassName={'pages  pagination'}

            // initialPage={currentPage - 1}
            pageCount={pageCount}
            //marginPagesDisplayed={2}
            //pageRangeDisplayed={5}
            onPageChange={changePage}
            forcePage={pageNumber}
          />
        </div>

        <div className='side-bar'>
          <div className={`${styles.SimpleList} SimpleList`} />
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
  )
}

export default ListQuestions;
