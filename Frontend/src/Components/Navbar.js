import React from 'react'
import { Navigate } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {



    if (isLoggedIn === false) {
        return <Navigate to="/login" replace></Navigate>
    }
    return (

        <div className='container-fluid'>
            <div className='row '>
                <nav className="navbar bg-dark border-bottom border-body m-0" data-bs-theme="dark">
                    <div className="container" style={{marginLeft: "250px"}}>
                        <a className="navbar-brand" href="#">Navbar</a>
                    </div>
                </nav>
                <div className='col-2'>
                    <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                </div>
                <div className='col-10 border border-1'>


                </div>
            </div>
        </div>
    )
}

