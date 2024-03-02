import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function Category() {

  const [category, setCategory] = useState([]);

  async function getCategory() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    setCategory(data.data)
  }
  useEffect(() => {
    getCategory()
  }, [])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false
  }; 

  return (
    <div className='my-4'>
      <h3>Shop Popular Categories</h3>
      <Slider {...settings} className='mt-4'>
      {
      category.map((item) => (
        <div className='p-1'>
          <img src={item.image} height={200} className='w-100' alt="" />
          <p className='fw-bold'>{item.name}</p>
        </div>
      ))
      }
      </Slider>
    </div>
  )
}
