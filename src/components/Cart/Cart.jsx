import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../../Context/StoreContext'
import Loading from '../Loading/Loading'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function Cart() {
    let {getCart, removeItem, setCounter, updateQTY } = useContext(storeContext)
    const [loading, setLoading] = useState(true)
    const [cartItems, setCartItems] = useState( [] ) 

    async function deleteProduct(id) {
      let data = await removeItem(id)
      // console.log(data);
      setCartItems(data)
      setCounter(data.numOfCartItems)
      toast.error('Product deleted successfully')
    }

    async function updateProductQTY(id, count) {
      let data = await updateQTY(id, count)
      // console.log(data);
      setCartItems(data)
      setCounter(data.numOfCartItems)
      toast.success('Product updated successfully')
    }

    useEffect(() => {
      (async () => {
        let data = await getCart()
        if(data?.response?.data.statusMsg == 'fail') {
          setCartItems(null)
        } else {
          setCartItems(data)
          setLoading(false)
        }
        // console.log(data);
        // if(data.status=='success'){
        //   setCartItems(data)
        //   setLoading(false)
        // }
      })()
    }, [])

    if(loading) return <Loading />
    if(cartItems.numOfCartItems == 0 ) return <h3 className='text-main my-5 text-center'>Your cart is Empty</h3>


  return (
    <>
      <div className="container bg-main-light my-3 p-3">
        <h2>Shop Cart:</h2>
        <p className='text-main'>Total Cart Price: {cartItems?.data?.totalCartPrice} EGP </p>
        {cartItems?.data?.products.map(item => {
          return <div key={item._id} className="row border-bottom py-2">
                  <div className="col-md-1">
                    <img src={item.product.imageCover} className='w-100' alt="" />
                  </div>
                  <div className="col-md-11 p-1 d-flex justify-content-between">
                    <div>
                      <h6>{item.product.title}</h6>
                      <p className='text-main m-0'>price: {item.price}</p>
                      <button onClick={() => deleteProduct(item.product._id)} className='btn m-0 mt-2 p-0'><i className="fa-solid fa-trash-can text-main"></i> Remove</button>
                    </div>
                    <div>
                      <button onClick={() => updateProductQTY(item.product._id, item.count + 1 )} className='btn brdr'>+</button>
                      <span className='mx-2'>{item.count}</span>
                      <button disabled={item.count <=1} onClick={() => updateProductQTY(item.product._id, item.count - 1 )} className='btn brdr'>-</button>
                    </div>
                  </div>
        </div>
        })}
        <Link to={"/address"} className='btn bg-main text-white my-3'>Place Order</Link>
      </div>
    </>
  )
}
