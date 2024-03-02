import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate, useSubmit } from 'react-router-dom';
import * as Yup from 'yup';

export default function Signup() {

  let navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(true)

  function sendDataToApi(values) {
    setLoading(false)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .then(({data}) => {
        // console.log(data);
        if(data.message == 'success') {
          navigate('/signin')
        }
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message)
        setLoading(true)
    })
  }

  function validate(values) {
    const myError = {} 
    if (!values.name){
      myError.name = "name is required"
    } 
    if (!values.email){
      myError.email = "email is required"
    } 
    if (!/^[A-Z][a-z0-9]{5,}$/.test(values.password)){
      myError.password = "password is required"
    } 
    if (values.rePassword != values.password){
      myError.rePassword = "Password and rePassword not match"
    } 
    return myError
  }

  let register = useFormik({
    initialValues:{
      name: '',
      email: '',
      password: '',
      rePassword: '',
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
        <h2>Register Now:</h2>
        <form onSubmit={register.handleSubmit}>

          <label htmlFor="name">Name:</label>
          <input onBlur={register.handleBlur} onChange={register.handleChange} placeholder='type your name...' type="text" name='name' className='form-control mb-3' id='name' />
          {register.errors.name && register.touched.name ? <div className="alert alert-danger">{register.errors.name}</div> : '' }
  
          <label htmlFor="email">Email:</label>
          <input onBlur={register.handleBlur} onChange={register.handleChange} placeholder='type your email...' type="email" name='email' className='form-control mb-3' id='email' />
          {register.errors.email && register.touched.email ? <div className="alert alert-danger">{register.errors.email}</div> : '' }

          <label htmlFor="password">Password:</label>
          <input onBlur={register.handleBlur} onChange={register.handleChange} placeholder='type your password...' type="password" name='password' className='form-control mb-3' id='password' />
          {register.errors.password && register.touched.password ? <div className="alert alert-danger">{register.errors.password}</div> : '' }

          <label htmlFor="rePassword">rePassword:</label>
          <input onBlur={register.handleBlur} onChange={register.handleChange} placeholder='type your rePassword...' type="password" name='rePassword' className='form-control mb-3' id='rePassword' />
          {register.errors.rePassword && register.touched.rePassword ? <div className="alert alert-danger">{register.errors.rePassword}</div> : '' }


          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
          <button disabled={!(register.dirty && register.isValid)} type="submit" className='btn bg-main text-white'>
            {loading ? 'Sign up' : <i className='fa fa-spinner fa-spin' ></i>}
          </button>
        </form>
      </div>
    </>
  )
}
