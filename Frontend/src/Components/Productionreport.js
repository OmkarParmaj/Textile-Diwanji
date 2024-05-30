import React from "react";
import Sidebar from "./Sidebar";
import { Link, Navigate } from "react-router-dom";



const Productionreport = ({ isLoggedIn, setIsLoggedIn }) => {



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
                    <div className="col-10" style={{ background: "#f6f9ff", height: "1500px " }}>
                        <div className="row d-flex justify-content-center mt-5 ">
                            <div className="col-11 bg-white border border-1 shadow-sm rounded-4">
                                <div className="row d-flex justify-content-around mt-5">
                                    <Link to="/dailyproductionreport" style={{ cursor: "pointer", textDecoration: "none", width: "340px" }}>
                                        <div className="card" style={{ width: "340px", height: "120px" }}>
                                            <div className="card-body d-flex align-items-center justify-content-center">
                                                <h5>Daily production report</h5>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="/monthlyproductionreport" style={{ curser: "pointer", textDecoration: "none", width: "340px" }}>
                                        <div className="card" style={{ width: "340px", height: "120px" }}>
                                            <div className="card-body d-flex align-items-center justify-content-center">
                                                <h5>Monthly production report</h5>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="/yearlyproreport" style={{ curser: "pointer", textDecoration: "none", width: "340px" }}>
                                        <div className="card" style={{ width: "340px", height: "120px" }}>
                                            <div className="card-body d-flex align-items-center justify-content-center">
                                                <h5>Yearly production report</h5>
                                            </div>
                                        </div>
                                    </Link>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>




        </>

    );
}


export default Productionreport;