import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { storeContext } from '../../Context/StoreContext'

export default function ProductDetails() {

    let {counter, setCounter} = useContext(storeContext)

    let x = useParams() 
    let [product, setProduct] = useState({})
    let [loading, setLoading] = useState(true)

    async function getProduct() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.id}`)
        setProduct(data.data)
        setLoading(false)
    }

    useEffect(() => {
        getProduct()
    }, [])
    
    if(loading) return <Loading />

  return (
    <>
    <div className="container my-5">
        <div className="row">
            <div className="col-md-3">
                <img src={product.imageCover} className='w-100' alt="" />
            </div>
            <div className="col-md-9 my-5 py-5">
                <h4>{product.title}</h4>
                <p className='my-3'>{product.description}</p>
                <span className='mt-2'>{product.category.name}</span>
                <div className='d-flex justify-content-between my-1'>
                    <div>
                        <p>{product.price} EGP</p>
                    </div>
                    <div>
                        <i className="fa-solid fa-star rating-color"></i>
                        {product.ratingsAverage}
                    </div>
                </div>
                <button onClick={() => setCounter(counter + 1)} className='btn bg-main text-white w-100'>Add To Cart</button>
            </div>
        </div>
    </div>
    </>
  )
}
