import React from 'react'
import error from '../../assets/images/error.svg'

export default function NotFound() {
  return (
    <div className='d-flex align-items-center mt-5 justify-content-center'>
        <img src={error} alt="" />
    </div>
  )
}
