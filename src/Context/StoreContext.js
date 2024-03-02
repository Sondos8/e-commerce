import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { baseURL } from "../utills/baseUrl";

export let storeContext = createContext(0)

async function addToCart(productId) {
    return axios.post(baseURL + 'cart', { productId },{
        headers:{
            token:localStorage.getItem('token'),
        }
    })
    .then(({ data }) => data).catch(err => err)
}

async function addToWishlist(productId) {
    return axios.post(baseURL + 'wishlist', { productId },{
        headers:{
            token:localStorage.getItem('token'),
        }
    })
    .then(({ data }) => data).catch(err => err)
}

async function getWishlist() {
    return axios.get(baseURL + 'wishlist',{
        headers:{
            token:localStorage.getItem('token'),
        }
    })
    .then(({ data }) => data).catch(err => err)
}

async function getCart() {
    return axios.get(baseURL + 'cart',{
        headers:{
            token:localStorage.getItem('token'),
        }
    })
    .then(({ data }) => data).catch(err => err)
}

async function removeItemWish(productId) {
    return axios.delete(baseURL + 'wishlist/' + productId ,{
        headers:{
            token:localStorage.getItem('token'),
        }
    })
    .then(({ data }) => data).catch(err => err)
}

async function removeItem(productId) {
    return axios.delete(baseURL + 'cart/' + productId ,{
        headers:{
            token:localStorage.getItem('token'),
        }
    })
    .then(({ data }) => data).catch(err => err)
}

async function updateQTY(productId, count) {
    return axios.put(baseURL + 'cart/' + productId, { count },{
        headers:{
            token:localStorage.getItem('token'),
        }
    })
    .then(({ data }) => data).catch(err => err)
}

async function pay(cartId, shippingAddress) {
    return axios.post(baseURL + 'orders/checkout-session/' + cartId, { shippingAddress },{
        headers:{
            token:localStorage.getItem('token'),
        }
    })
    .then(({ data }) => data).catch(err => err)
}

export default function StoreContextProvider({ children }) {

    let [counter, setCounter] = useState(0)
    let [cuntWish, setCuntWish] = useState(0)

    return <storeContext.Provider 
        value={{ 
            counter, 
            setCounter,
            addToCart,
            getCart,
            removeItem,
            updateQTY,
            pay,
            cuntWish,
            setCuntWish,
            addToWishlist,
            getWishlist,
            removeItemWish
            }}
    >

        {children}
    </storeContext.Provider>
}