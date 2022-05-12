import React, { useState } from 'react'
import Body from '../../components/Body'
import TemplateArticle from '../../components/TemplateArticle'
import styles from './ContactUs.module.css'
import CustomModal from '../../components/_UI/Modal'
import { Formik, Form } from 'formik'
import InputField from './InputField'
import TextareaField from './TextareaField'
import * as Yup from 'yup'

const ContactUs = () => {
  const validate = Yup.object({
    fullName: Yup.string()
      .min(3, 'يرجى كتابة اسم يتكون من ثلاثة حروف فما فوق')
      .required('المرجو ملأ الخانة الخاصة بالإسم'),
    email: Yup.string()
      .email('البريد الإلكتروني غير صحيح')
      .required('المرجو ملأ الخانة الخاصة بالبريد الإلكتروني'),
    subject: Yup.string()
      .min(2, 'يرجى كتابة كلمة تتكون من حرفين فما فوق')
      .required('المرجو ملأ الخانة الخاصة بموضوع اللإستفسار'),
    description: Yup.string()
      .min(2, 'يرجى كتابة كلمة تتكون من حرفين فما فوق')
      .required('المرجو ملأ الخانة الخاصة باللإستفسار'),
  })
  const [show, setShow] = useState(false)
  const [infosUser, setInfosUser] = useState({
    fullName: '',
    email: '',
    subject: '',
    description: '',
  })
  const handleClose = () => setShow(false)
  const handleShow = (e) => {
    // e.preventDefault()
    setShow(true)
  }
  const data = [
    {
      title: 'الرئيسية',
      path: '',
    },
    {
      title: 'التواصل',
      path: '/التواصل',
    },
  ]
  return (
    <TemplateArticle ListBreadcrumb={data} titlePage='التواصل'>
      <Body className='TemplateArticleBody Media d-flex p-4'>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGQL2RC"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        ></noscript>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            subject: '',
            description: '',
          }}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            handleShow()
            // console.log(values, 'values')
            resetForm({ values: '' })
          }}
        >
          {(formik) => (
            <div className={` col col-12 col-lg-6 col-md-6 col-sm-1`}>
              <h2 className='mb-3'>
                {'من أجل إرسال أي إستفسار المرجو ملأ الإستمارة'}
              </h2>
              <Form className={`${styles.formBody}`}>
                <InputField
                  label='الاسم العائلي و الشخصي'
                  name='fullName'
                  type='text'
                />
                <InputField
                  label='البريد الالكتروني'
                  name='email'
                  type='email'
                />
                <InputField
                  label='موضوع اللإستفسار'
                  name='subject'
                  type='text'
                />
                <TextareaField label='اللإستفسار' name='description' />
                <div className='d-flex justify-content-end'>
                  <button
                    className='btn btn-success rounded-pill px-5 py-2 btn-md mt-3'
                    type='submit'
                  >
                    {'إرسال'}
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
        <CustomModal
          title={'إشعار'}
          body={
            'لقد تم إرسال سؤالك بنجاح، ستتوصلون بإشعار على بريدكم الإلكتروني حين توفر الإجابة'
          }
          show={show}
          onHide={handleClose}
          onClick={handleClose}
        />
      </Body>
    </TemplateArticle>
  )
}

export default ContactUs
