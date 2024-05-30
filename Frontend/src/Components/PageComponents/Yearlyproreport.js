import React from "react";
import Sidebar from "../Sidebar";
import { Navigate } from "react-router-dom";



const Yearlyproreport = ({ isLoggedIn, setIsLoggedIn }) => {


    if (isLoggedIn === false) {
        <Navigate to="/login" replace></Navigate>
    }


    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Sidebar>
                    </div>
                    <div className="col-10">
                        <h5>This is Yearly production report page</h5>
                    </div>
                </div>

            </div>





        </>
    );
}


export default Yearlyproreport;