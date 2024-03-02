import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams, useSubmit } from 'react-router-dom';
import * as Yup from 'yup';
import { storeContext } from '../../Context/StoreContext';

export default function Address() {

  let { id } = useParams()
  const [loading, setLoading] = useState(true)
  let { pay } = useContext(storeContext)

   async function sendDataToApi(values) {
    let data =  await pay(id, values)
    setLoading(false)
    // console.log(data);
    if(data.status == 'success') {
        window.location.href=data.session.url
    }
    }


  let address = useFormik({
    initialValues: {
        Phone: '',
      password: '',
      City: '',
    },
    onSubmit: (values) => {
      sendDataToApi(values)
    }
  })
  
  return (
    <>
      <div className="w-75 m-auto my-4">
        <h2>address Now:</h2>
        <form onSubmit={address.handleSubmit}>

          <label htmlFor="details">details:</label>
          <textarea onBlur={address.handleBlur} onChange={address.handleChange} placeholder='type your details...' type="text" name='details' className='form-control mb-3' id='details' ></textarea>

          <label htmlFor="Phone">Phone:</label>
          <input onBlur={address.handleBlur} onChange={address.handleChange} placeholder='type your Phone...' type="text" name='phone' className='form-control mb-3' id='phone' />

          
          <label htmlFor="City">City:</label>
          <input onBlur={address.handleBlur} onChange={address.handleChange} placeholder='type your City...' type="text" name='City' className='form-control mb-3' id='City' />
  
          <button disabled={!(address.dirty && address.isValid)} type="submit" className='btn bg-main text-white'>
            {loading ? 'pay' : <i className='fa fa-spinner fa-spin' ></i>}
          </button>
        </form>
      </div>
    </>
  )
}
