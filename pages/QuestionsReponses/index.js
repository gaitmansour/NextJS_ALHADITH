import React, { useEffect, useState, useRef } from 'react'
import styles from './listQuestions.module.css'
import Iicon from '../../components/_UI/QuestionsList/speech-bubblee1.png'
import {
  AllForums,
  getQuestionAPI,
  getTaxonomyForum,
  addQuestions,
  searchQuestion,
} from '../../endpoints'
import Link from 'next/link'
import { Icons } from '../../assets'
import _ from 'lodash'
import Moment from 'moment'
import { FetchAPIWthData } from '../../data/API'
import ReCAPTCHA from 'react-google-recaptcha'
import ReactPaginate from 'react-paginate'
import { FetchPostAPI } from '../../data/API/questions'
import { GoogleLogin } from 'react-google-login'
import TemplateArticle from '../../components/TemplateArticle'
import Body from '../../components/Body'
import CustomModal from '../../components/_UI/Modal'
import ScrollButton from '../../components/ScrollButton'
import Loading from '../../components/_UI/Loading'
import Image from 'next/image'
import FacebookLogin from 'react-facebook-login'
import KeyboardedInput from 'react-touch-screen-keyboard/lib/KeyboardedInput'
import ModalQuestionForm from '../../components/_UI/ModalQuestionForm'

const ListQuestions = (props) => {
  const title = props?.match?.params?.title
  const [DataQuestions, setDataQuestions] = useState([])
  const [question, setQuestion] = useState('')
  const [checked, setChecked] = useState(false)
  const [logged, setLogged] = useState(false)
  const [Subject, setSubject] = useState('')
  // const [email, setEmail] = useState('');
  const [inputs, setInputs] = useState({})
  const [layoutName, setLayoutName] = useState('default')
  const [inputName, setInputName] = useState('default')
  const Myinputsubject = useRef()
  const textInput = useRef('')
  const subjectInput = useRef('')
  const [Forum, setForum] = useState('')
  const [output, setOutput] = useState([])
  const [message, setMessage] = useState('')
  const [showForum, setShowForum] = useState(false)
  const [show, setShow] = useState(false)
  const [hide, setHide] = useState(true)
  const [mail, setMail] = useState('')
  const [sendSuccess, setsendSuccess] = useState(false)
  const [pageNumber, setPAgeNumber] = useState(0)
  const [pagePagination, setPagePagination] = useState(1)
  const [StartPage, setStartPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [enableButton, setEnableButton] = useState(true)
  const [sendFailed, setsendFailed] = useState(false)
  const [showModalQuestions, setShowModalQuestion] = useState(false)
  const [InputShow, setInputShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleCloseModalQuestions = () => {
    setShowModalQuestion(false)
    // setMail('')
  }
  const handleShow = () => setShow(true)
  const handleShowModalQuestions = () => setShowModalQuestion(true)
  // const url = AllForums();
  // const url1 = getTaxonomyForum();
  // const urlSubmit = getQuestionAPI();
  const urlAddQuestion = addQuestions()
  const urlSearchQuestion = searchQuestion()
  //const clientId = "293585459501-peieeq4508t355rdtmq6244u2nhnsqqc.apps.googleusercontent.com"
  const clientId =
    '620243608251-nip6s9d18bu0nvgr3hpfv8rf1i880vme.apps.googleusercontent.com'

  function handleShowHide() {
    setShowForum(!showForum)
    setChecked(false)
    setEnableButton(true)
  }

  function onChange() {
    setChecked(true)
    if (question !== '' && SubmitQuestion !== '') {
      setEnableButton(false)
    }
  }

  const SubmitQuestion = async () => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (mailformat.test(mail) === false) {
      console.log('email false')
      setMessage('البريد الإلكتروني غير صحيح!')
      console.log(message)
    } else {
      const data = {
        sujetQuestion: Subject,
        descriptionQuestion: question,
        email: mail,
      }
      setIsLoading(true)
      console.log('forum_______', data)
      return FetchAPIWthData(urlAddQuestion, data).then((data) => {
        if (data.success) {
          setsendSuccess(true)
          setIsLoading(false)
          // setMail('')
          // setSubject('')
          // setQuestion('')
        } else {
          setsendFailed(true)
        }
      })
    }
  }

  const handleSearchQuestion = async () => {
    // setSubject(subjectInput.current.value)
    const data = {
      query: Subject,
      size: 10,
      start: 0,
    }

    FetchPostAPI(urlSearchQuestion, data).then((data) => {
      if (Subject !== '' && data.success) {
        localStorage.setItem('outputData', JSON.stringify(data?.data))
        localStorage.setItem('Subject', JSON.stringify(Subject))
        return setOutput(data?.data)
      } else {
        setOutput([])
        localStorage.setItem('outputData', JSON.stringify([]))
        localStorage.setItem('Subject', JSON.stringify(Subject))
      }
    })
  }

  const getDataQuestions = async () => {
    const data = {
      query: '',
      size: 10,
      start: StartPage < 1 ? 0 : StartPage,
    }
    FetchPostAPI(urlSearchQuestion, data).then((data) => {
      if (data.success) {
        setDataQuestions(data?.data?.hits?.hits)
        setPagePagination(data?.data?.hits?.total?.value)
        return data?.data?.hits?.hits
      }
    })
  }
  //facebook
  const responseFacebook = (response) => {
    setLogged(true)
    setMail(response.email)
    //console.log('response.email ----------------------------- FB')
    //console.log(response)
    sessionStorage.setItem('UserInfos', JSON.stringify(response.email))
  }

  //Gooogle
  const onLoginSuccess = (res) => {
    setLogged(true)
    setMail(res.profileObj.email)
    sessionStorage.setItem('UserInfos', JSON.stringify(res.profileObj.email))
  }
  const onLoginFail = (res) => {
    console.log('resultFail22', res)
  }

  function handleSubmitQuestion() {
    handleCloseModalQuestions()
    console.log('question------------', question)
    if (question !== '' && Subject !== '' && mail !== '') {
      SubmitQuestion()
      setHide(true)
      setOutput([])
      localStorage.removeItem('Subject')
      localStorage.removeItem('outputData')
      localStorage.removeItem('Subject')
    } else {
      handleShow()
    }
  }

  useEffect(() => {
    //handleSearchQuestion();
    getDataQuestions()
    //window.scrollTo(0, 0);
    var session = sessionStorage.getItem('UserInfos')
    var outputData = localStorage.getItem('outputData')
    var subjectWord = localStorage.getItem('Subject')
    console.log('subjectWord', subjectWord)
    if (session && outputData && subjectWord) {
      setLogged(true)
      setShowForum(true)
      var UserInfos = JSON.parse(session)
      var output = JSON.parse(outputData)
      console.log('output-----------------------------------')
      console.log(output)
      var subject = JSON.parse(subjectWord)
      setMail(UserInfos)
      setSubject(subject)
      setOutput(output)
    }
    if (Subject && checked && question) {
      setEnableButton(false)
    } else {
      setEnableButton(true)
    }
  }, [StartPage, pageNumber, enableButton, question])

  const questionPerPage = 5
  const pagesVisited = pageNumber * questionPerPage

  /* const onChangeAll = inputs => {
             setInputs({...inputs});
             console.log("Inputs changed", inputs);
             // setQuestion(inputs)
         };*/

  //console.log('subject---', Subject)

  const data = [
    {
      title: 'الرئيسية',
      path: '',
    },
    {
      title: 'سؤال و جواب',
      path: '/QuestionsReponses',
    },
  ]

  /*if (_.isEmpty(DataQuestions)) {
        return (
            <div className='d-flex align-items-center justify-content-center py-5'>
                <Loading/>
            </div>
        )
    }*/
  const pageCount = Math.ceil(pagePagination / 10)
  const changePage = (v) => {
    setPAgeNumber(v.selected)
    setStartPage(10 * v.selected)
  }
  const displayQuestions = DataQuestions.map((item, i) => {
    console.log('TID-----', item)
    return (
      <div key={i} className={` container-flex ${styles.bg1} bg1`}>
        <div className={'p-2 row justify-content-between align-items-center'}>
          <h5 className='px-4 col col-12 col-lg-9 col-md-6 col-sm-1 d-flex card-subtitle'>
            {item?._source?.sujetQuestion}
          </h5>
          <p
            className={`${styles.dateParagraph} dateParagraph col col-12 col-lg-3 col-md-6 col-sm-1 align-self-center pt-3`}
          >
            {'تاريخ السؤال: ' +
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
            className={`${styles.questionDesc} item d-flex align-items-center  px-1`}
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
            <p
              className={`${styles.descriptionP} flex-fill m-2`}
              style={{ width: '100%' }}
            >
              {item?._source?.descriptionQuestion}
            </p>
          </a>
        </Link>
        {item?._source?.descriptionReponse && (
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
            <a style={{ textDecoration: 'none' }}>
              <p
                className={`${styles.dateParagraph} dateParagraph text-black`}
                style={{ marginLeft: 10 }}
              >
                {'تاريخ الاجابة: ' +
                  Moment(item?._source?.dateHeureReponse).format('DD-MM-YYYY')}
              </p>
              <div>
                <p className={`${styles.descQuestion}`}>
                  {item?._source?.descriptionReponse >
                  item?._source?.descriptionReponse
                    ?.split(' ')
                    .slice(0, 28)
                    .join(' ')
                    ? item?._source?.descriptionReponse
                        ?.split(' ')
                        .slice(0, 28)
                        .join(' ')
                        .concat('...')
                    : item?._source?.descriptionReponse
                        ?.split(' ')
                        .slice(0, 28)
                        .join(' ')}
                </p>
                <span
                  className={`${styles.readMore} text-success text-decoration-underline`}
                >
                  لمعرفة المزيد
                </span>
              </div>
            </a>
          </Link>
        )}

        <hr />
      </div>
    )
  })

  // check size window
  useEffect(() => {
    checkSizeWindow()
    if (typeof window !== undefined) {
      window.addEventListener('resize', checkSizeWindow)
      // Remove event listener on cleanup
      return () => {
        if (typeof window !== undefined) {
          window.removeEventListener('resize', checkSizeWindow)
        }
      }
    }
  }, [])

  const checkSizeWindow = () => {
    if (typeof window !== undefined && window.innerWidth <= 850) {
      setInputShow(true)
    } else {
      setInputShow(false)
    }
    //var x = document.getElementById("inputdiv");
  }
  const CustomMapping = [
    ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض'],
    ['ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'],
    ['؟', '!', '-', '،', '.', 'ء', 'ؤ', 'ى', 'ة', 'أ', 'إ', 'ٱ', 'آ', 'ئ'],
  ]
  console.log('setSubject', Subject)
  return (
    <TemplateArticle ListBreadcrumb={data} titlePage='أسئلة'>
      <Body
        className={`${styles.TemplateArticleBody} ${styles.questionList} TemplateArticleBody  d-flex p-4`}
      >
        <ScrollButton />
        <div className='flex-fill'>
          <button
            type='button'
            style={{
              backgroundColor: '#feb400',
              color: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => handleShowHide()}
            className={`${styles.btnquestion} btnquestion mb-3`}
          >
            {!showForum ? (
              <div
                className={`${styles.paragraph} item d-flex align-items-center justify-content-evenly`}
                style={{ textDecoration: 'none' }}
              >
                <p className={`fw-bold pt-2 ${styles.question}`}>
                  {'اطرح سؤالك'}
                </p>{' '}
                <Image
                  alt={'icon'}
                  src={Icons.icon_faq}
                  width={'40%'}
                  height={'40%'}
                  style={{ marginHorizontal: 20 }}
                  className=''
                />
              </div>
            ) : (
              <p className={`fw-bold pt-2 ${styles.question}`}>إغلاق</p>
            )}
          </button>
          {showForum ? (
            <div className={`${styles.sideBar1} side-bar1`}>
              <div className={`${styles.SimpleList} SimpleList`}>
                {logged == false ? (
                  <div
                    className={` ${styles.btnLogin} mb-3 d-flex  align-items-center searchInp`}
                  >
                    <p className='mx-5 mt-2'>تسجيل الدخول</p>
                    <div
                      className={`${styles.btnIcon} d-flex align-content-center justify-content-start w-75`}
                    >
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
                      <button
                        type='button'
                        style={{ backgroundColor: '#29a669', width: '20%' }}
                        className={`${styles.btnForm} btn searchBtn`}
                        onClick={handleShowModalQuestions}
                      >
                        ملء الاستمارة
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.sectionQuestion}>
                    <div
                      className={`${styles.searchInp} mb-3 d-flex justify-content-between align-items-center searchInp`}
                    >
                      {InputShow ? (
                        <div
                          className='d-flex flex-column'
                          style={{ width: '85%' }}
                        >
                          <label
                            htmlFor='formGroupExampleInput'
                            className='form-label'
                          >
                            الموضوع
                          </label>
                          <input
                            className={styles.inputSubject}
                            ref={Myinputsubject}
                            type='text'
                            value={Subject}
                            onChange={(e) => {
                              setSubject(e.target.value)
                              if (
                                question !== '' ||
                                checked == false ||
                                e !== ''
                              ) {
                                setEnableButton(true)
                              }
                            }}
                            onFocus={() => localStorage.removeItem('Subject')}
                          />
                        </div>
                      ) : (
                        <div style={{ width: '90%' }}>
                          <label
                            htmlFor='formGroupExampleInput'
                            className='form-label'
                          >
                            الموضوع
                          </label>
                          <div style={{ flexDirection: 'row' }}>
                            <KeyboardedInput
                              value={Subject}
                              onChange={(value) => {
                                setSubject(value)
                                if (
                                  question !== '' ||
                                  checked == false ||
                                  value !== ''
                                ) {
                                  setEnableButton(true)
                                }
                              }}
                              onFocus={() => localStorage.removeItem('Subject')}
                              ref={Myinputsubject}
                              opacity={0.8}
                              inputClassName={'inputName'}
                              id={'inputNAle'}
                              // showSpacebar={false}
                              isFirstLetterUppercase={false}
                              defaultKeyboard={CustomMapping}
                              placeholder='المرجو كتابة الموضوع هنا'
                              keyboardClassName={`testme  p-2`}
                              containerClassName={`conatiner `}
                              required
                              enabled
                            />
                          </div>
                        </div>
                      )}
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
                        onClick={() => handleSearchQuestion()}
                      >
                        بحث
                      </button>
                    </div>

                    {output && output?.hits?.hits?.length > 0 && (
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
                                      className={`${styles.questionDesc} item d-flex align-items-center  px-1`}
                                      style={{
                                        textDecoration: 'none',
                                        paddingBottom: 20,
                                      }}
                                    >
                                      <Image
                                        alt={'icon'}
                                        src={Iicon}
                                        width='40%'
                                        height='40%'
                                        style={{ marginHorizontal: 20 }}
                                        className='mx-0 ml-5 mr-4'
                                      />
                                      <p
                                        className={`${styles.descriptionP} flex-fill m-2`}
                                        style={{ width: '100%' }}
                                      >
                                        {item?._source?.descriptionQuestion}
                                      </p>
                                    </a>
                                  </Link>
                                  {item?._source?.descriptionReponse && (
                                    <Link
                                      passHref={true}
                                      exact
                                      href={{
                                        pathname: '/detailsQuestion',
                                        search: '',
                                        hash: '',
                                        query: {
                                          itemTitle:
                                            item?._source?.sujetQuestion,
                                          itemQuestion:
                                            item?._source?.descriptionQuestion,
                                          itemReponse:
                                            item?._source?.descriptionReponse,
                                          itemId: item?._id,
                                        },
                                      }}
                                      as={'/detailsQuestion'}
                                    >
                                      <a style={{ textDecoration: 'none' }}>
                                        <p
                                          className={`${styles.dateParagraph} dateParagraph text-black`}
                                          style={{ marginLeft: 10 }}
                                        >
                                          {'تاريخ الاجابة: ' +
                                            Moment(
                                              item?._source?.dateHeureReponse
                                            ).format('DD-MM-YYYY')}
                                        </p>
                                        <div>
                                          <p
                                            className={`${styles.descQuestion}`}
                                          >
                                            {item?._source?.descriptionReponse >
                                            item?._source?.descriptionReponse
                                              ?.split(' ')
                                              .slice(0, 28)
                                              .join(' ')
                                              ? item?._source?.descriptionReponse
                                                  ?.split(' ')
                                                  .slice(0, 28)
                                                  .join(' ')
                                                  .concat('...')
                                              : item?._source?.descriptionReponse
                                                  ?.split(' ')
                                                  .slice(0, 28)
                                                  .join(' ')}
                                          </p>
                                          <span
                                            className={`${styles.readMore} text-success text-decoration-underline`}
                                          >
                                            لمعرفة المزيد
                                          </span>
                                        </div>
                                      </a>
                                    </Link>
                                  )}
                                  <hr />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
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
                      // sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
                      // secretkey='6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'
                      className={`${styles.reCaptcha} captcha`}
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
                      disabled={enableButton}
                    >
                      اطرح سؤالك
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : null}
          {displayQuestions && displayQuestions.length > 0 ? (
            <div className={`${styles.cardListAnswer} card w-75 px-1`}>
              <div className={`${styles.CardQuestion} card-body Card-question`}>
                <div className={`${styles.SimpleList} SimpleList`}>
                  {displayQuestions}
                </div>
              </div>
            </div>
          ) : (
            <div className={`${styles.cardListAnswer} card w-75 px-1`}>
              <div className={`${styles.CardQuestion} card-body Card-question`}>
                <div className={`${styles.SimpleList} SimpleList`}>
                  <br />
                  <h4>{'لا توجد نتائج'}</h4>
                </div>
              </div>
            </div>
          )}{' '}
          <br />
          {displayQuestions && displayQuestions.length > 0 && (
            <ReactPaginate
              previousLabel={
                <i id='pagination' className='fa fa-chevron-right' />
              }
              nextLabel={<i id='pagination' className='fa fa-chevron-left' />}
              breakLabel={'...'}
              breakClassName={'break-me'}
              activeClassName={styles.activebtn}
              containerClassName={`pagination justify-content-evenly align-content-around w-25 py-2 ${styles.paginationButtons}`}
              // subContainerClassName={'pages  pagination'}

              // initialPage={currentPage - 1}
              pageCount={pageCount}
              //marginPagesDisplayed={2}
              //pageRangeDisplayed={5}
              onPageChange={changePage}
              forcePage={pageNumber}
            />
          )}
        </div>

        <div className='side-bar'>
          <div className={`${styles.SimpleList} SimpleList`} />
        </div>
        <CustomModal
          title={'إشعار'}
          body={
            'لقد تم إرسال سؤالك بنجاح، ستتوصلون بإشعار على بريدكم الإلكتروني حين توفر الإجابة'
          }
          show={sendSuccess}
          onHide={() => {
            setShowForum(false)
            setsendSuccess(false)
            setQuestion('')
            setSubject('')
          }}
          onClick={() => {
            setShowForum(false)
            setsendSuccess(false)
            setQuestion('')
            setSubject('')
          }}
        />
        <CustomModal
          title={'إشعار'}
          body={'المرجو اعادة المحاولة'}
          show={sendFailed}
          onHide={() => {
            setsendFailed(false)
          }}
          onClick={() => {
            setsendFailed(false)
          }}
        />
        <CustomModal
          title={'تنبيه'}
          body={'يرجى ملءإستمارة طرح السؤال '}
          show={show}
          onHide={handleClose}
          onClick={handleClose}
        />

        <ModalQuestionForm
          onClick={handleCloseModalQuestions}
          show={showModalQuestions}
          title={'المرجو ملء الاستمارة'}
        >
          <div>
            <div
              className={`${styles.searchInp} mb-3 d-flex flex-row-reverse justify-content-between align-items-center searchInp`}
            >
              <div style={{ width: '90%' }}>
                <label
                  htmlFor='formGroupExampleInput'
                  className='form-label flex-row-reverse'
                >
                  الموضوع
                </label>
                <div style={{ flexDirection: 'row' }}>
                  <KeyboardedInput
                    value={Subject}
                    onChange={(value) => {
                      setSubject(value)
                      if (question !== '' || checked == false || value !== '') {
                        setEnableButton(true)
                      }
                    }}
                    onFocus={() => localStorage.removeItem('Subject')}
                    ref={Myinputsubject}
                    opacity={0.8}
                    inputClassName={'inputName'}
                    id={'inputNAle'}
                    // showSpacebar={false}
                    isFirstLetterUppercase={false}
                    defaultKeyboard={[
                      [
                        'ا',
                        'ب',
                        'ت',
                        'ث',
                        'ج',
                        'ح',
                        'خ',
                        'د',
                        'ذ',
                        'ر',
                        'ز',
                        'س',
                        'ش',
                        'ص',
                        'ض',
                      ],
                      [
                        'ط',
                        'ظ',
                        'ع',
                        'غ',
                        'ف',
                        'ق',
                        'ك',
                        'ل',
                        'م',
                        'ن',
                        'ه',
                        'و',
                        'ي',
                      ],
                      [
                        '؟',
                        '!',
                        '-',
                        '،',
                        '.',
                        'ء',
                        'ؤ',
                        'ى',
                        'ة',
                        'أ',
                        'إ',
                        'ٱ',
                        'آ',
                        'ئ',
                      ],
                    ]}
                    placeholder='المرجو كتابة الموضوع هنا'
                    keyboardClassName={`testme  p-2`}
                    containerClassName={`conatiner `}
                    required
                    enabled
                  />
                </div>
              </div>
              <button
                type='button'
                style={{
                  backgroundColor: '#129D59',
                  color: '#fff',
                  height: '39px',
                  width: '15%',
                  marginTop: '28px',
                }}
                className={`${styles.searchBtn} btn searchBtn`}
                onClick={handleSearchQuestion}
              >
                بحث
              </button>
            </div>

            {output && output?.hits?.hits?.length > 0 && (
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
                                Moment(item?.attributes?.created).format(
                                  'DD-MM-YYYY'
                                )}
                            </p>
                          </div>
                          <Link
                            href={{
                              pathname: '/detailsQuestion',
                              query: {
                                itemTitle: item?._source?.sujetQuestion,
                                itemQuestion:
                                  item?._source?.descriptionQuestion,
                                itemReponse: item?._source?.descriptionReponse,
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
            )}
            {output && output?.hits?.hits?.length == 0 && (
              <div className='d-flex align-items-center justify-content-center'>
                <div className='NotFound404 d-flex flex-column align-items-center justify-content-center mt-lg-11'>
                  <br />
                  <h4>{'لا توجد نتائج توافق معايير البحث'}</h4>
                  <p className='fw-100 link-primary'>
                    {'يرجى طرح سؤالك أو محاولة البحث في الموقع'}
                  </p>
                </div>
              </div>
            )}
            <div className='mb-3'>
              <label htmlFor='formGroupExampleInput2' className='form-label'>
                السؤال
              </label>
              <textarea
                className='form-control'
                aria-label='With textarea'
                rows='8'
                placeholder={'المرجو كتابة السؤال هنا'}
                style={{ height: '80px !important', textAlign: 'right' }}
                onChange={(v) => setQuestion(v.target.value)}
              />
            </div>
            <div className='mb-3 '>
              <label htmlFor='formGroupExampleInput' className='form-label'>
                البريد الإلكتروني
              </label>
              <input
                type='email'
                className='form-control'
                id='formGroupExampleInput'
                style={{ textAlign: 'right' }}
                placeholder='المرجو كتابة البريد الإلكتروني  هنا'
                value={mail ? mail : ''}
                onChange={(v) => setMail(v.target.value)}
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
              /*sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                secretkey="6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"*/

              className='captcha'
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
              disabled={enableButton}
            >
              اطرح سؤالك
            </button>
          </div>
        </ModalQuestionForm>
      </Body>
    </TemplateArticle>
  )
}

export default ListQuestions
