import React from 'react'
import Slider from "react-slick";
import Slide1 from "../../assets/images/11b7ceba-5f41-475e-ac31-05120154c59c.avif"
import Slide2 from "../../assets/images/eab1e48c-4cb1-4fbc-af02-6497be7cb342.avif"
import Slide3 from "../../assets/images/5a3c6c6a-2dd7-4dcb-8b23-2a560f245b85.avif"

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false
  }; 

  return (
    <>
      <Slider {...settings} className='mt-4'>
        <img src={Slide1} alt="" />
        <img src={Slide2} alt="" />
        <img src={Slide3} alt="" />
      </Slider>
    </>
  )
}
