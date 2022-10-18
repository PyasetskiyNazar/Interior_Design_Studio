import React, { useEffect, useState } from 'react'
import './Product.css'
import Contact from '../../components/Contact/Contact'
import Footer from '../../components/Footer/Footer'
import { useLocation } from 'react-router-dom'
import { urlFor, client } from '../../client'
import ImageModal from '../../components/ImageModal/ImageModal'
import { motion, AnimatePresence } from 'framer-motion'


const Product = () => {
  const [index, setIndex] = useState(0)
  const [product, setProduct] = useState([])
  const location = useLocation().pathname.split('/')[2]
  const [images, setImages] = useState([])
  const [modal, setModal] = useState(false)
  const [show, setShow] = useState(true)

  useEffect(() => {

    const query = `*[_type == "${decodeURI(location)}"]`

    client.fetch(query).then((data) => {
      if (data[0].images) {
        setProduct(data[0])
        setImages(data[0].images)
      }
    })
  }, [location])


  const handleChange = async (i) => {
    await setShow(false)
    await setShow(true)
    await setIndex(i)
  }

  return (
    <>
      <div className="product_page">
        <div className="product_container app_container">
          <div className="product_box">
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="product_label">
              <div className="product_label-text">
                {product.title}
              </div>
            </motion.div>
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="product_description">
              {product.description}
            </motion.div>
            <div className="product_body">
              <AnimatePresence initial={false} >
                <div className="product_image-container">
                  {images[index] && show && <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0 }}
                    src={urlFor(product.images[index])}
                    alt="product_detail-image"
                    className="product_detail-image"
                    onClick={() => setModal(true)}
                  />}
                  {modal ? <ImageModal
                    images={images}
                    setModal={setModal}
                    displayArrows={true} /> : null}
                </div>
              </AnimatePresence>
              <div className="product_small-images_container">
                {product.images && product.images.map((item, i) => (
                  <motion.img
                    key={i}
                    src={urlFor(item)}
                    className={i === index ? 'small-image selected-image' : 'small-image'}
                    onClick={() => handleChange(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </>
  )
}

export default Product
