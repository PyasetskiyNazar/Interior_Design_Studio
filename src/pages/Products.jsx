import React, { useState, useEffect } from 'react'
import './Products.css'
import { NavLink } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Contact from '../components/Contact/Contact'
import { client, urlFor } from '../client'
import { motion } from 'framer-motion'

const Products = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const query = '*[_type == "products"]'

    client.fetch(query).then((data) => {
      if (data) {
        data.sort((a, b) => new Date(a._createdAt) - new Date(b._createdAt))
        setProducts(data)
      }
    })
  }, [])

  return (
    <>
      <div className="products_page " id="Products">
        <div className="products_container app_container ">
          <div className="products_box">
            <motion.div
              initial={{ x: 250, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="products_label"
            >
              <div className="products_label-text">
                Some Basic Interior Styles
              </div>
            </motion.div>
            <div className="products_body">
              {products.length > 0 && products.map((style_item, index) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 1, ease: 'easeIn' }}
                  className="products_column"
                  key={index}
                >
                  <div className="products_item">
                    <div className="products_item-image">
                      <img src={urlFor(style_item.imageurl)} alt={style_item.path} />
                    </div>
                    <div className="products_item-title">
                      {style_item.title}
                    </div>
                    <div className="products_item-text">
                      {style_item.text}
                    </div>
                    <NavLink to={style_item.path}
                      className="products_button submit_button"
                    >
                      Details
                    </NavLink>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </>
  )
}

export default Products
