import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext'
import { toast } from 'react-toastify'
import Loading from '../Loading/Loading'

export default function Product({ item }) {

  let {counter, setCounter, addToCart, cuntWish, setCuntWish } = useContext(storeContext)
  let [btnLoading, setBtnLoading] = useState(true)

  async function addProductToCart(productId) {
    setBtnLoading(false)
    let data = await addToCart(productId)
    // console.log(data);
    if(data.status == 'success') {
      setBtnLoading(true)
      setCounter(data.numOfCartItems)
      toast.success("Product added successfully.")
    }
  }

  return (
    <>
        <div className="col-md-3">
            <div className="product cursor-pointer rounded-3 p-3">
                <Link to={'/product-details/' + item._id}>
                <img src={item.imageCover} className='w-100' alt="" />
                <div className='d-flex justify-content-between'>
                  <div>
                  <span className='text-main'>{item.category.name}</span>
                  <h6 className='my-2 fw-bold'>{item.title.split(' ').slice(0, 2).join(" ")}</h6>
                  </div>
                  <div>
                    <button onClick={() => setCuntWish(cuntWish + 1) } className='btn'><i className="fa-solid fa-heart text-main iconWish"></i></button>
                  </div>
                </div>

                    <div className='d-flex justify-content-between my-3'>
                        <div>
                          {item.price} EGP
                        </div>
                        <div>
                          <i className="fa-solid fa-star rating-color"></i>
                          {item.ratingsAverage}
                        </div>
                    </div>
                </Link>        
                <button disabled={!btnLoading} onClick={() => addProductToCart( item._id)} className='btn bg-main w-100 text-white'>
                  {btnLoading? 'Add To Cart' : 'Loading...'}
                  </button>
            </div>
        </div>
    </>
  )
}
