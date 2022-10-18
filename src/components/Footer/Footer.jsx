import React, { useEffect, useState } from 'react'
import './Footer.css'
import instagram from '../../assets/footer/01.svg'
import facebook from '../../assets/footer/02.svg'
import telegram from '../../assets/footer/03.svg'
import { client } from '../../client'
import { motion } from 'framer-motion'

const Footer = () => {

  const [contact, setContact] = useState([])

  useEffect(() => {
    const query = '*[_type == "contact"]'

    client.fetch(query).then((data) => {
      setContact(data[0])
    })
  }, [])

  return (
    <div className="footer_page">
      <div className="footer_container app_container">
        <div className="footer_body">
          <div className="footer_contact">
            <div className="footer_contact-label">Contact</div>
            <div className="contact_office-items">
              <motion.div
                className="contact_office"
                whileHover={{ scale: 1.1, x: 30 }}
              >
                <a href="/#Contact" className="contact_office-link">Office <span>{contact.office}</span></a>
              </motion.div>
              <motion.div
                className="contact_office"
                whileHover={{ scale: 1.1, x: 30 }}
              >
                <a href={"tel:" + contact.telephone} className="contact_office-link">Tel. No <span>{contact.telephone}</span></a>
              </motion.div>
              <motion.div
                className="contact_office"
                whileHover={{ scale: 1.1, x: 30 }}
              >
                <a href={"mailto:" + contact.email} className="contact_office-link">Email <span>{contact.email}</span></a>
              </motion.div>
            </div>
          </div>
          <div className="footer_social-media">
            <div className="footer_contact-label">Social Media Handel</div>
            <div className="social_icons">
              <a href="/#Contact" className="icon">
                <motion.img
                  src={instagram}
                  alt="instagram"
                  whileHover={{ scale: 1.3 }}
                />
              </a>
              <a href="/#Contact" className="icon">
                <motion.img
                  src={facebook}
                  alt="facebook"
                  whileHover={{ scale: 1.3 }}
                />
              </a>
              <a href="https://t.me/SDesign2022" target="_blank" rel="noreferrer" className="icon">
                <motion.img
                  src={telegram}
                  alt="telegram"
                  whileHover={{ scale: 1.3 }}
                />
              </a>
            </div>
          </div>

        </div>
        <div className="all_rigts-reserved">
          <a href="https://portfolio-pyasetskiy-nazar.netlify.app" target="_blank" rel="noreferrer">Made by PNR Solutions 2022. All rigts reserved ©</a>
        </div>
      </div>
    </div >

  )
}

export default Footer
