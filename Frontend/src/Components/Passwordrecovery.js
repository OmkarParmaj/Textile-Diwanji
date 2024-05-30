import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";



const Passwordrecovery = ({ isLoggedIn, setIsLoggedIn }) => {
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [pass, setPass] = useState([]);





    useEffect(() => {
        axios.get('https://www.api.textilediwanji.com/getpassword')
            .then(res => {
                setPass(res.data[0].Password);
            })
            .catch(err => {
                // console.log(err);
            })
    }, [password])

    const handlesubmit = (e) => {
        e.preventDefault();
        if (password === confirmpassword) {

            if (pass === password) {
                toast.error("Password you have entered is old password! Please choose another password", { position: "top-center", autoClose: 2000, closeOnClick: true });
            }

            else {
                axios.put('https://www.api.textilediwanji.com/recoverpassword', {password})
                    .then(res => {
                        if(res.data.message === "Password changed") {
                            setPassword("");
                            setConfirmpassword("");
                            toast.success("Password changed", { position: "top-center", autoClose: 2000, closeOnClick: true });
                            
                        }
                    })
                    .catch(err => {
                        // console.log(err);
                    })
            }
            // toast.success("Password matched", { position: "top-center", autoClose: 2000, closeOnClick: true });

        }
        else {
            toast.error("Password mismatched", { position: "top-center", autoClose: 2000, closeOnClick: true });
        }

    }

    if (isLoggedIn === false) {
        <Navigate to="/login" replace></Navigate>
    }

    return (
        <>

            <div className="container-fluid" style={{ background: "#f6f9ff", height: "1500px " }}>
                <div className="row">
                    <div className="col-2">
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Sidebar>
                    </div>
                    <div className="col-10  d-flex justify-content-center  align-items-center" style={{ height: "694px" }}>
                        <form onSubmit={handlesubmit}>
                            <div className="card   rounded-4" style={{ height: "400px", width: "800px" }}>
                                <h4 className="mt-3">Password recovery</h4>

                                <div className="row  mt-5 d-flex justify-content-center  align-items-center">

                                    <div className="col-5 ">
                                        <label className="float-start">New Password</label>
                                        <input className="form-control" type="password" onChange={e => setPassword(e.target.value)}></input>
                                        <label className="float-start mt-3">Confirm Password</label>
                                        <input className="form-control mb-5" type="password" onChange={e => setConfirmpassword(e.target.value)}></input>
                                        <button className="btn btn-primary mb-5" type="submit">SUBMIT</button>
                                    </div>

                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>





        </>
    );


}



export default Passwordrecovery;