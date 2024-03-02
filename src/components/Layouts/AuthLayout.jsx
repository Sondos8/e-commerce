import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'

export default function AuthLayout() {
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

                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item ">
                                    <NavLink className="nav-link" to="/Signin">
                                        Sing in
                                    </NavLink>
                                </li>

                                <li className="nav-item ">                                    
                                    <NavLink className="nav-link" to="/Signup">
                                        Sing up
                                    </NavLink>
                                </li>

                            </ul>
                    </div>
            </div>
        </nav>   
        <Outlet />
    </>
  )
}
