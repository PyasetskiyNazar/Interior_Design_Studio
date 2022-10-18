import React, { useState } from 'react'
import { Formik, Form, Field, getIn } from 'formik'
import emailjs from '@emailjs/browser'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import './Contact.css'

const Contact = () => {

  const [isFormSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const initialFormData = {
    username: '',
    email: '',
    message: ''
  }

  const validationForm = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  })

  const getStyles = (errors, fieldName) => {
    if (getIn(errors, fieldName)) {
      return {
        border: '2px solid red'
      }
    }
  }

  const handleSubmit = (values) => {

    setLoading(true)
    emailjs.send(process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID,
      values,
      process.env.REACT_APP_PUBLIC_KEY)
      .then((result) => {
        setLoading(false)
        setFormSubmitted(true)
      }, (error) => {
        console.log(error.text);
      })
  }


  return (
    <div id="Contact" className="contact_page ">
      <div className="contact_container ">
        <div className="contact_body app_container">
          {!isFormSubmitted ? (
            <>
              <div className="contact_title-content">
                <motion.div
                  initial={{ x: 250, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="contact_title title_contact"
                >
                  Still not clear?
                 <br />  Lets talk About
                             Interior Design
                </motion.div>
              </div>
              <div className="contact_form-container">
                <div className="contact_form-title">
                  Drop us your email & our team will be in touch with you
                    </div>
                <Formik
                  initialValues={initialFormData}
                  validationSchema={validationForm}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form className="contact_form app__flex">
                      <div className="input_form app__flex">
                        <Field
                          style={getStyles(errors, 'username')}
                          className="input-text"
                          type="text"
                          placeholder="Your Name"
                          name="username"
                        />
                      </div>
                      {errors.username && touched.username ? (
                        <div className="input_error input-text">{errors.username}</div>
                      ) : null}

                      <div className="input_form app__flex">
                        <Field
                          style={getStyles(errors, 'email')}
                          className="input-text"
                          type="email"
                          placeholder="Your Email"
                          name="email"
                        />
                      </div>
                      {errors.email && touched.email ? (
                        <div className="input_error input-text">{errors.email}</div>
                      ) : null}
                      <div className="input_form app__flex">
                        <Field as="textarea"
                          className="input-text"
                          type="text"
                          placeholder="Your Message"
                          name="message"
                        />
                      </div>
                      <div className="send_button">
                        <button className="form_button submit_button" type="submit">{!loading ? 'Send' : 'Sending...'}</button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </>
          ) : (
              <div>
                <h3 className="contact_title" onClick={() => setFormSubmitted(false)}>Thank you for getting in touch!</h3>
              </div >
            )}
        </div>
      </div>
    </div>
  )
}

export default Contact
