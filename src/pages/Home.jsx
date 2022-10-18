import React from 'react'
import SliderLabel from '../components/SliderLabel/SliderLabel'
import ImageSlider from '../components/ImageSlider/ImageSlider'
import OurService from '../components/OurService/OurService'
import AboutUs from '../components/AboutUs/AboutUs'
import Testimony from '../components/Testimony/Testimony'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'

const Home = () => {
  return (
    <>
      <SliderLabel />
      <ImageSlider />
      <OurService />
      <AboutUs />
      <Testimony />
      <Contact />
      <Footer />
    </>
  )
}

export default Home
