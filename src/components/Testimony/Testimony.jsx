import React, { useState, useEffect } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import './Testimony.css'
import { motion } from 'framer-motion'
import { client, urlFor } from '../../client'

const customersPerRow = 3

const Testimony = () => {

  const [testimonials, setTestimonials] = useState([])
  const [next, setNext] = useState(customersPerRow)

  useEffect(() => {
    const query = '*[_type == "testimonials"]'

    client.fetch(query).then((data) => {
      if (data.length)
        setTestimonials(data)
    })
  }, [])



  const handleMoreCustomers = () => {
    setNext(testimonials.length)
  }

  return (
    <motion.div className="testimony_page app_container">
      <motion.div className="testimony_box ">

        <motion.div
          initial={{ x: 150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="testimony_label"
        >
          <div className="testimony_label-text">
            Testimony
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="testimony_body"
        >
          {testimonials.length && testimonials.slice(0, next).map((customer, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="testimony_column"
              key={index}
            >
              <div className="testimony_item">
                <div className="testimony_item-avatar">
                  <img src={urlFor(customer.imageurl)} alt="avatar" className="testimony_image" />
                </div>
                <div className="testimony_item-content">
                  <div className="testimony_item-user_name">
                    {customer.name}
                  </div>
                  <div className="testimony_item-stars">
                    <div>
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiOutlineStar />
                    </div>
                  </div>
                  <div className="testimony_item-text">
                    {customer.feedback}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {next < testimonials.length && (
          <div className="testimony_load-more">
            <motion.button
              initial={{ opacity: 0, scale: 0.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
              viewport={{ once: true }}
              className="testimony_button submit_button"
              onClick={() => handleMoreCustomers()}
            >
              View All
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Testimony
