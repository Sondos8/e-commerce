import React from 'react'
import Home from './components/Home/Home'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import MainLayout from './components/Layouts/MainLayout'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Wishlist from './components/Wishlist/Wishlist'
import AuthLayout from './components/Layouts/AuthLayout'
import Signin from './components/Signin/Signin'
import Signup from './components/Singup/Signup'
import NotFound from './components/NotFound/NotFound'
import { Offline, Online } from "react-detect-offline";
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './components/ProductDetails/ProductDetails'
import StoreContextProvider from './Context/StoreContext'
import { ToastContainer } from 'react-toastify';
import Address from './components/Address/Address'

export default function App() {
  let routes = createBrowserRouter([
    { 
      path:'/',element: <MainLayout /> , children: [
        {index:true,element: <ProtectedRoutes> <Home /> </ProtectedRoutes> },
        {path:'home',element: <ProtectedRoutes> <Home /> </ProtectedRoutes>  },
        {path:'categories',element: <ProtectedRoutes> <Categories /> </ProtectedRoutes>  },
        {path:'products',element: <ProtectedRoutes> <Products /> </ProtectedRoutes>  },
        {path:'brands',element: <ProtectedRoutes> <Brands /> </ProtectedRoutes> },
        {path:'cart',element: <ProtectedRoutes> <Cart /> </ProtectedRoutes> },
        {path:'wishlist',element: <ProtectedRoutes> <Wishlist /> </ProtectedRoutes> },
        {path:'product-details/:id',element: <ProtectedRoutes> <ProductDetails /> </ProtectedRoutes> },
        {path:'address',element: <ProtectedRoutes> <Address /> </ProtectedRoutes> },
        {path:'*',element: <NotFound /> },
      ]
    },
    { 
      path:'/',element: <AuthLayout /> , children: [

        {path:'signin',element: <Signin />},
        {path:'signup',element: <Signup />},

      ]
    },
  ])

  return (
    <>
      <Offline>
        <div className='offline'>You are offline Now !</div> 
      </Offline>   
      <ToastContainer theme='colored' autoClose={200} />   
      <StoreContextProvider>
        <RouterProvider router={routes} />
      </StoreContextProvider>

    </>
  )
}
