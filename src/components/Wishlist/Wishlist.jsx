import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../../Context/StoreContext'
import Loading from '../Loading/Loading'
import { toast } from 'react-toastify'

export default function Wishlist() {
    let {addToWishlist, getWishlist, setCuntWish, removeItemWish } = useContext(storeContext)
    const [loading, setLoading] = useState(true)
    const [cartItems, setCartItems] = useState( [] ) 

    async function deleteProduct(id) {
      let data = await removeItemWish(id)
      // console.log(data);
      setCartItems(data)
      setCuntWish(data.numOfCartItems)
      toast.error('Product deleted successfully')
    }

    // async function updateProductQTY(id, count) {
    //   let data = await updateQTY(id, count)
    //   console.log(data);
    //   setCartItems(data)
    //   setCounter(data.numOfCartItems)
    //   toast.success('Product updated successfully')
    // }

    useEffect(() => {
      (async () => {
        let data = await getWishlist()
        if(data?.response?.data.statusMsg == 'fail') {
          setCartItems(null)
        } else {
          setCartItems(data)
          setLoading(false)
        }
        console.log(data);
        // if(data.status=='success'){
        //   setCartItems(data)
        //   setLoading(false)
        // }
      })()
    }, [])

    if(loading) return <Loading />
    if(cartItems.numOfCartItems == 0 ) return <h3 className='text-main my-5 text-center'>Your Wishlist is Empty</h3>


  return (
    <>
      <div className="container bg-main-light my-3 p-3">
        <h2>My Wish List:</h2>
        {cartItems?.data?.map(item => {
          return <div key={item._id} className="row border-bottom py-2">
                  <div className="col-md-1">
                    <img src={item.imageCover} className='w-100' alt="" />
                  </div>
                  <div className="col-md-11 p-1 d-flex justify-content-between">
                    <div>
                      <h6>{item.title}</h6>
                      <p className='text-main m-0'>price: {item.price}</p>
                      <button onClick={() => deleteProduct(item._id , item.count - 1)} className='btn m-0 mt-2 p-0'><i className="fa-solid fa-trash-can text-main"></i> Remove</button>
                    </div>
                  </div>
        </div>
        })}
      </div>
    </>
  )
}
