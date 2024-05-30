import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";



const Partyedit = ({ isLoggedIn, setIsLoggedIn }) => {


    const { id } = useParams();

    const [values, setValues] = useState({
        partyname: "",
        personname: "",
        address: "",
        gst: "",
        phoneno: ""

    });


    const [company, setCompany] = useState([]);

    const [alert, setAlert] = useState("");

    // const handlesubmit = (e) => {
    //     e.preventDefault();
    //     axios.post('https://www.api.textilediwanji.com/party', values)
    //         .then(res => {
    //             console.log(res.data);
    //             if (res.data.message === "Data inserted") {
    //                 setAlert("data submitted successfully");
    //             }
    //         })
    //         .catch(err => {
    //             console.log("err in the submitting database", err);
    //         })

    // }

    useEffect(() => {
        axios.get(`https://www.api.textilediwanji.com/partyedit/${id}`)
            .then(res => {
                // console.log(res.data);
                setValues({
                    partyname: res.data[0].partyname,
                    personname: res.data[0].personname,
                    address: res.data[0].address,
                    gst: res.data[0].gst,
                    phoneno: res.data[0].phoneno
                })
            })
            .catch(err => {
                // console.log("err in the fetching data", err);
            })
    }, [])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };



    const handlesubmit = (e) => {
        e.preventDefault();

        axios.put(`https://www.api.textilediwanji.com/partyedit/${id}`, values)
            .then(res => {
                if (res.data.message === "party updated") {
                    setAlert("Party updated successfully!");
                    setValues({
                        partyname: "",
                        personname: "",
                        address: "",
                        gst: "",
                        phoneno: ""
                    })
                }
            })
            .catch(err => {
                // console.log(err);
            })
    }


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
                    <div className="col-10 d-flex justify-content-center align-items-center ">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col  d-flex justify-content-center mt-5">
                               
                                <div className="row" style={{ height: "30px" }}>
                                    {alert && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong></strong> {alert}
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>}
                                </div>
                                <form onSubmit={handlesubmit}>
                                    <div className="row">


                                        <div className="col">
                                            <label className="float-start mt-2">Party Name/Firm name</label>
                                            <input type="text" className="form-control" name="partyname" value={values.partyname} onChange={handleInputChange}></input>
                                            <label className="float-start mt-2">Person name</label>
                                            <input type="text" className="form-control" name='personname' value={values.personname} onChange={handleInputChange}></input>
                                            <label className="float-start mt-2">Address</label>
                                            <input type="text" className="form-control" name="address" value={values.address} onChange={handleInputChange}></input>

                                        </div>
                                        <div className="col">
                                            <label className="float-start mt-2">GST NO</label>
                                            <input type="text" className="form-control" name="gst" value={values.gst} onChange={handleInputChange}></input>
                                            <label className="float-start mt-2">Phone no</label>
                                            <input type="number" className="form-control" name="phoneno" value={values.phoneno} onChange={handleInputChange}></input>
                                        </div>


                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-3">
                                            <button className="btn btn-primary" >SUBMIT</button>
                                        </div>
                                        <div className="col-3">
                                            <Link to="/party" className="btn btn-success">GO BACK</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>
    );
}


export default Partyedit;