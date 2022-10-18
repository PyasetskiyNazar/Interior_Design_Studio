import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './OurService.css'
import { client, urlFor } from '../../client'
import { Link } from 'react-scroll'

const OurService = () => {

  const [services, setServices] = useState([])
  const [packages, setPackages] = useState([])

  useEffect(() => {
    const query = '*[_type == "ourservice"]'
    const packages = '*[_type == "packages"]'

    client.fetch(query).then((data) => {
      if (data) {
        data.sort((a, b) => new Date(a._createdAt) - new Date(b._createdAt))
        setServices(data)
      }
    })

    client.fetch(packages).then((dataPackges) => {
      if (dataPackges) {
        dataPackges.sort((a, b) => new Date(a._createdAt) - new Date(b._createdAt))
        setPackages(dataPackges)
      }
    })
  }, [])

  return (

    <div className="our_servise_container app_container" id="Services">
      <motion.div className="our_service-block ">
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="our_service-label"
        >
          <div className="our_service-label-text">
            <h1>Our Service</h1>
          </div>
        </motion.div>

        <div className="our_service-body">
          {services.map((service, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="our_service-column"
              key={index}
            >
              <div className="our_service-item">
                <div className="our_service-icon">
                  <img src={urlFor(service.imageurl)} alt="our_service-icon" />
                </div>
                <div className="our_service-title">
                  {service.title}
                </div>
                <div className="our_service-text">
                  {service.text}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ x: 250, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="package_label our_service-label"
        >
          <div className="our_service-label-text">
            <h1>Our Package Options</h1>
          </div>
        </motion.div>

        <div className="package_body our_service-body">
          {packages.map((package_item, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="package_column " key={index}
            >
              <div className="package_item our_service-item">
                <div className="package_title our_service-title ">
                  {package_item.title}
                </div>
                <div className="our_service-packaje-list">
                  <ul className="packaje-list-items">
                    {package_item.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="packge_button">
                  <Link to={'Contact'} spy={true} smooth={true} offset={0} duration={800}
                    className="packge_button-link submit_button"
                  >
                    Get Calculation
                </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default OurService
