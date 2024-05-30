import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FcFactoryBreakdown } from "react-icons/fc";
import axios from "axios";
import { FcLibrary } from "react-icons/fc";
import { FcConferenceCall } from "react-icons/fc";
import { FcLock, FcManager } from "react-icons/fc";
import { FcClock } from "react-icons/fc";


const Profile = ({ isLoggedIn, setIsLoggedIn }) => {

    const [totalcompany, setTotalcompany] = useState([]);
    const [totalparty, setTotalparty] = useState([]);
    const [shiftcount, setShiftcount] = useState([]);

    useEffect(() => {
        axios.get('https://www.api.textilediwanji.com/totalparty')
            .then(res => {
                setTotalparty(res.data[0].totalparty)
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])


    useEffect(() => {
        axios.get('https://www.api.textilediwanji.com/totalcompany')
            .then(res => {
                setTotalcompany(res.data[0].totalcompany);
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])


    useEffect(() => {
        axios.get('https://www.api.textilediwanji.com/shiftnumber')
            .then(res => {
                setShiftcount(res.data[0].totalshift)
            })
            .catch(err => {
                // console.log(err);
            })
    }, [])







    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />
    }
    return (
        <>

            <div className="container-fluid" style={{ background: "#f6f9ff" }}>
                <div className="row">
                    <div className="col-2">
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    </div>
                    <div className="col-10" style={{ background: "#f6f9ff", height: "1500px " }}>
                        <div className="row d-flex justify-content-center mt-4">
                            <div className="col-11 bg-white border border-1 shadow-sm rounded-4">
                                <div className="row">

                                    <h5 className="text-start mt-4">Settings</h5>
                                    <hr></hr>


                                </div>
                                <div className="row mt-3 ms-2 mb-3"><p className="text-start">Company settings</p></div>
                                <div className="row mb-5 ms-4 me-4">
                                    <div className="col-3">
                                        <Link to='/companyregister' style={{ cursor: "pointer" }} className="text-decoration-none">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-title">
                                                        <h5>COMPANY REGISTRATION</h5>
                                                    </div>
                                                    <div className="row mt-2">
                                                        <div className="col-6 ">
                                                            <FcFactoryBreakdown className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                        </div>
                                                        <div className="col-6 m-0 border-start border-2">
                                                            <h6 className="mt-3" style={{ fontSize: "14px" }}>Total company</h6>
                                                            <h4>{totalcompany}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-3">
                                        <Link to='/companybankdetails' style={{ cursor: "pointer" }} className="text-decoration-none">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-title">
                                                        <h5>BANK REGISTRATION</h5>
                                                    </div>
                                                    <div className="row " style={{ marginTop: "32px" }}>
                                                        <div className="col-6 ">
                                                            <FcLibrary className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                        </div>
                                                        <div className="col-6 m-0 border-start border-2">
                                                            <h6 className="mt-3" style={{ fontSize: "14px" }}>Total Acc</h6>
                                                            <h4>{totalcompany}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-3">
                                        <Link to='/party' style={{ cursor: "pointer" }} className="text-decoration-none">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-title">
                                                        <h5>PARTY REGISTRATION</h5>
                                                    </div>
                                                    <div className="row " style={{ marginTop: "32px" }}>
                                                        <div className="col-6 ">
                                                            <FcConferenceCall className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                        </div>
                                                        <div className="col-6 m-0 border-start border-2">
                                                            <h6 className="mt-3" style={{ fontSize: "14px" }}>Total Party</h6>
                                                            <h4>{totalparty}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-3">
                                        <Link to='/shiftsetting' style={{ cursor: "pointer" }} className="text-decoration-none">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-title">
                                                        <h5>SHIFT SETTING</h5>
                                                    </div>
                                                    <div className="row " style={{ marginTop: "32px" }}>
                                                        <div className="col-6 ">
                                                            <FcClock className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                        </div>
                                                        <div className="col-6 m-0 border-start border-2">
                                                            <h6 className="mt-3" style={{ fontSize: "14px" }}>Total Shifts</h6>
                                                            <h4>{shiftcount}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>


                                </div>
                                <hr></hr>
                                <div className="row ms-2 mt-3 mb-3"><h6 className="text-start">Account Settings</h6></div>
                                <div className="row mb-5 ms-4 me-4">
                                    <div className="col-3">
                                        <Link to='/passwordrecovery' style={{ cursor: "pointer" }} className="text-decoration-none">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-title">
                                                        <h5>PASSWORD RECOVERY</h5>
                                                    </div>
                                                    <div className="row" style={{ marginTop: "10px" }}>
                                                        <div className="col">
                                                            <FcLock className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-3">
                                        <Link to='/passwordrecovery' style={{ cursor: "pointer" }} className="text-decoration-none">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-title">
                                                        <h5>PROFILE SETTING</h5>
                                                    </div>
                                                    <div className="row" style={{ marginTop: "34px" }}>
                                                        <div className="col">
                                                            <FcManager className="mt-2" style={{ height: "70px", width: "70px" }} />
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>
    );
}

export default Profile;