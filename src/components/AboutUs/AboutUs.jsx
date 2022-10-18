import React, { useState, useEffect } from 'react'
import aboutImage from '../../assets/about/05.png'
import aboutImageCover from '../../assets/about/01.jpg'
import { client } from '../../client'
import { Link } from 'react-scroll'
import './AboutUs.css'
import { motion } from 'framer-motion';


const AboutUs = () => {

  const [about, setAbout] = useState('')

  useEffect(() => {
    const query = '*[_type == "about"]'

    client.fetch(query).then((data) => {
      if (data[0].about) {
        setAbout(data[0].about)
      }
    })
  }, [])

  return (
    <div id="About Us" className="aboutus_container app_container">
      <div className="aboutus_box">
        <motion.div
          initial={{ x: 250, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="aboutus_title"
        >
          <h1>About Us</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="aboutus_body"
        >
          <div className="aboutus_image-cover" >
            <img src={aboutImageCover} alt="about us" />
          </div>
          <div className="about_image">
            <img src={aboutImage} alt="about us" />
          </div>
          <div className="aboutus_content">
            <div className="aboutus_text">
              {about}
            </div>
            <div className="aboutus_button">
              <Link to={'Contact'} spy={true} smooth={true} offset={0} duration={800}
                className="about_button submit_button"
              >
                Get -25%
            </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutUs
