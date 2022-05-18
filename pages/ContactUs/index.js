import React, { useState } from 'react'
import Body from '../../components/Body'
import TemplateArticle from '../../components/TemplateArticle'
import styles from './ContactUs.module.css'
import CustomModal from '../../components/_UI/Modal'

const ContactUs = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = (e) => {
    e.preventDefault()
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
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGQL2RC"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
        <>
          <form
            onSubmit={handleShow}
            className={`${styles.formBody} col col-12 col-lg-6 col-md-6 col-sm-1`}
          >
            <div className='form-group'>
              <label className='mb-2' for='exampleInputEmail1'>
                {'الاسم العائلي و الشخصي'}
              </label>
              <input
                type='text'
                className='form-control shadow-sm p-3 mb-3 bg-body rounded border-0'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
              />
            </div>
            <div className='form-group'>
              <label className='mb-2' for='exampleInputPassword1'>
                {'البريد الالكتروني'}
              </label>
              <input
                type='text'
                className='form-control shadow-sm p-3 mb-3 bg-body rounded border-0'
                id='exampleInputPassword1'
              />
            </div>
            <div className='form-group'>
              <label className='mb-2' for='exampleInputPassword1'>
                {'موضوع اللإستفسار'}
              </label>
              <input
                type='text'
                className='form-control shadow-sm p-3 mb-3 bg-body rounded border-0'
                id='exampleInputPassword1'
              />
            </div>
            <div className='form-group'>
              <label className='mb-2' for='exampleFormControlTextarea1'>
                {'اللإستفسار'}
              </label>
              <textarea
                className='form-control shadow-sm p-3 mb-3 bg-body rounded border-0'
                id='exampleFormControlTextarea1'
                rows='5'
              ></textarea>
            </div>
            <button type='submit' className='btn btn-success mt-4'>
              {'إرسال'}
            </button>
          </form>
        </>
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
