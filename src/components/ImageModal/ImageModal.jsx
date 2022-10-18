
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { wrap } from "popmotion"
import { urlFor } from "../../client"
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
import './ImageModal.css'

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 0,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 1,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    }
  }
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}

const ImageModal = ({ images, setModal, image, displayArrows }) => {

  const [[page, direction], setPage] = useState([0, 0])
  const imageIndex = wrap(0, images.length, page)
  const [disable, setDisable] = useState(false)
  const [show, setShow] = useState(displayArrows)

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection])
  };

  const rightClick = () => {
    setDisable(true)
    paginate(1)
    setTimeout(() => {
      setDisable(false)
    }, 500);
  }

  const leftClick = () => {
    setDisable(true)
    paginate(-1)
    setTimeout(() => {
      setDisable(false)
    }, 500);
  }

  return (
    <div className="modal">
      {show && <button className="arrow left_arrow"
        onClick={() => leftClick()}
        disabled={disable}>
        <MdOutlineArrowBackIosNew />
      </button>}
      <span className="close" onClick={() => setModal(false)}>&times;</span>
      <div className="img-box">
        <AnimatePresence initial={false} custom={direction}>
          {(images[imageIndex] || image) && <motion.img
            className="modal-content"
            key={page}
            src={image ? urlFor(image.imgUrl) : urlFor(images[imageIndex])}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            onClick={() => setModal(false)}
            transition={{
              delay: 0.2,
              x: { duration: 0.2 },
              default: { ease: "linear" }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={3}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />}
        </AnimatePresence>
      </div>
      {show && <button
        className="arrow right_arrow"
        disabled={disable}
        onClick={() => rightClick()}>
        <MdOutlineArrowForwardIos />
      </button>}
    </div>
  )
};

export default ImageModal