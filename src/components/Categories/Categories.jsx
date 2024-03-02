import React from 'react'
import Loading from '../Loading/Loading'
import axios from 'axios';
import { useQuery } from 'react-query';

export default function Categories() {
  
  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  let {data, isLoading} = useQuery('getCategories', getCategories)
  // console.log(data);
  if(isLoading) return <Loading />

  return (
    <>
      <div className="container my-5">
        <div className="row">
          {data?.data.data.map(item => {
            return <div key={item._id} className="col-md-4 product my-3">
                    <div>
                        <div className="div">
                          <img src={item.image} className='w-100 img-fluid style' alt="" />
                        </div>
                        <div>
                          <p className='text-success text-center fw-bold h3'>{item.name}</p>
                        </div>
                    </div>
                  </div>
          })}
        </div>
      </div>
    </>
  )
}
