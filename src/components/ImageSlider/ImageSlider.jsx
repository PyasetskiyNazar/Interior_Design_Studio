import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import ImageModal from '../ImageModal/ImageModal'
import './ImageSlider.css'
import { client, urlFor } from '../../client'

const ImageSlider = () => {

  const [images, setImages] = useState([])
  const [modal, setModal] = useState(false)
  const [clickedImage, setClickedImage] = useState()

  useEffect(() => {
    const query = '*[_type == "slider_images"]'

    client.fetch(query).then((data) => {
      if (data) {
        let sortedImages = data.sort((a, b) => a._updatedAt > b._updatedAt ? 1 : -1)
        setImages(sortedImages)
      }
    })
  }, [])

  const settings = {
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    dots: false,
    initialSlide: 0,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      },
    ]
  };

  const handleZoom = (image) => {
    setClickedImage(image)
    setModal(true)
  }

  return (
    <div className="image_slider app_container">
      <div className="image_slider-body">
        <div className="image_slider-box">
          <Slider {...settings}>
            {images && images.map((image, index) => (
              <div className="slider_item" key={index}>
                <img
                  src={urlFor(image.imgUrl)}
                  alt={image.imgUrl.asset._ref}
                  onDoubleClick={() => handleZoom(image)}
                />
              </div>
            ))}
          </Slider>
          {modal ? <ImageModal
            images={images}
            setModal={setModal}
            image={clickedImage}
            displayArrows={false}
          /> : null}
        </div>
      </div>
    </div>
  )
}

export default React.memo(ImageSlider)
