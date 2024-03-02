import React from 'react'
import Loading from '../Loading/Loading'
import axios from 'axios';
import { useQuery } from 'react-query';

export default function Brands() {

  
  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  let {data, isLoading} = useQuery('getBrands', getBrands)
  console.log(data);
  if(isLoading) return <Loading />

  return (
    <>
      <div className="container my-5">
        <h1 class="text-main fw-bold text-center  mb-5">All Brands</h1>
        <div className="row">
          {data?.data.data.map(item => {
            return <div key={item._id} className="col-md-3 product my-3">
                    <div>
                        <div className="div">
                          <img src={item.image} className='img-fluid' alt="" />
                        </div>
                        <div>
                          <p className='text-center'>{item.name}</p>
                        </div>
                    </div>
                  </div>
          })}
        </div>
      </div>
    </>
  )
}
