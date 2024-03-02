import React, { useContext, useEffect } from 'react'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext'

export default function () {

    let { counter, getCart,setCounter, cuntWish } = useContext(storeContext)

    useEffect(() => {
        (async () => {
           let data = await getCart()
        //    console.log(data);
        //    if(data.status=='success'){
        //         setCounter(data.numOfCartItems)
        //    }
        })()
    }, [])

  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary p-2">
            <div className="container-fluid mx-3">
                <NavLink className="navbar-brand" to="/">
                    <img src={logo} alt=""/>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="Home">Home</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="Products">Products</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="Categories">Categories</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="Brands">Brands</NavLink>
                                </li>

                            </ul>

                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                                <li className="nav-item ">
                                    <NavLink className="nav-link position-relative" to="Wishlist">
                                        Wishlist 
                                        <i className="fa-regular fa-heart cartIcon mx-1 text-main"></i>
                                        <span className="position-absolute top-1 start-100 icon translate-middle badge rounded-pill bg-main">
                                            {cuntWish}
                                            <span className="visually-hidden">unread messages</span>
                                        </span>
                                    </NavLink>
            
                                </li>

                                <li className="nav-item ">
                                    <NavLink className="nav-link position-relative" aria-current="page" to="Cart">
                                        Cart 
                                        <i className="fa-solid fa-cart-shopping cartIcon mx-1 text-main"></i>
                                        {counter ? <span className="position-absolute top-1 start-100 icon translate-middle badge rounded-pill bg-main">
                                            {counter}
                                            <span className="visually-hidden">unread messages</span>
                                        </span> : ''}
                                    </NavLink>
                                </li>

                                <li className="nav-item ">
                                    <NavLink className="nav-link" to="Signin">
                                        Sing in
                                    </NavLink>
                                </li>

                            </ul>
                    </div>
            </div>
        </nav>           
    </>
  )
}
