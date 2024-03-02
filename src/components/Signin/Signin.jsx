import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate, useSubmit } from 'react-router-dom';
import * as Yup from 'yup';

export default function Signin() {

  let navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(true)

  function sendDataToApi(values) {
    setLoading(false)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then(({data}) => {
        // console.log(data);
        if(data.message == 'success') {
          localStorage.setItem('token', data.token )
          navigate('/home')
        }
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message)
        setLoading(true)
    })
  }

  function validate(values) {
    const myError = {} 
    if (!values.email){
      myError.email = "email is required"
    } 
    if (!/^[A-Z][a-z0-9]{5,}$/.test(values.password)){
      myError.password = "password is required"
    }  
    return myError
  }

  let login = useFormik({
    initialValues:{
      email: '',
      password: '',
    },
    validate
    ,
    onSubmit: (values) => {
      sendDataToApi(values)
    }
  })
  
  return (
    <>
      <div className="w-75 m-auto my-4">
        <h2>Login Now:</h2>
        <form onSubmit={login.handleSubmit}>

          <label htmlFor="email">Email:</label>
          <input onBlur={login.handleBlur} onChange={login.handleChange} placeholder='type your email...' type="email" name='email' className='form-control mb-3' id='email' />
          {login.errors.email && login.touched.email ? <div className="alert alert-danger">{login.errors.email}</div> : '' }

          <label htmlFor="password">Password:</label>
          <input onBlur={login.handleBlur} onChange={login.handleChange} placeholder='type your password...' type="password" name='password' className='form-control mb-3' id='password' />
          {login.errors.password && login.touched.password ? <div className="alert alert-danger">{login.errors.password}</div> : '' }

          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
          <button disabled={!(login.dirty && login.isValid)} type="submit" className='btn bg-main text-white'>
            {loading ? 'Sign in' : <i className='fa fa-spinner fa-spin' ></i>}
          </button>
        </form>
      </div>
    </>
  )
}
