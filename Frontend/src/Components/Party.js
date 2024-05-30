import React, { useEffect, useState } from "react";
import axios from 'axios';
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Party = ({ isLoggedIn, setIsLoggedIn }) => {

    const [values, setValues] = useState({
        partyname: "",
        personname: "",
        address: "",
        gst: "",
        phoneno: ""

    });

    const [company, setCompany] = useState([]);

    const [alert, setAlert] = useState("");

    const handlesubmit = (e) => {
        e.preventDefault();
        axios.post('https://www.api.textilediwanji.com/party', values)
            .then(res => {
                // console.log(res.data);
                if (res.data.message === "Data inserted") {
                    toast.success("data submitted successfully", { position: "top-center", autoClose: 2000, closeOnClick: true});
                }
            })
            .catch(err => {
                // console.log("err in the submitting database", err);
            })

    }

    useEffect(() => {
        fetchdata();
    }, [handlesubmit])


    const fetchdata = () => {
        axios.get('https://www.api.textilediwanji.com/party')
            .then(res => {
                // console.log(res.data);
                setCompany(res.data);
            })
            .catch(err => {
                // console.log("err in the fetching data", err);
            })
    }

    const handledelete = (id) => {
        axios.delete(`https://www.api.textilediwanji.com/partydelete/${id}`)
            .then(res => {
                fetchdata();
            })
            .catch(err => {
                // console.log(err);
            })
    }

    const val = (valu) => (e) => {
        setValues({ ...values, [valu]: e.target.value })
    }

    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    </div>
                    <div className="col-10 ">
                        <div className="row" style={{height: "30px"}}>
                        {alert && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                    <strong>Congractulation!</strong> {alert}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>}
                        </div>

                        <div className="row me-3 mt-5"> 

                            <div className="col-6">


                                

                                <form onSubmit={handlesubmit}>
                                   <div className="row">
                                    <div className="col-5">
                                        <label className="float-start mt-2">Party Name/Firm name</label>
                                        <input type="text" className="form-control" onChange={val("partyname")}></input>
                                        <label className="float-start mt-2">Person name</label>
                                        <input type="text" className="form-control" onChange={val("personname")}></input>
                                        <label className="float-start mt-2">Address</label>
                                        <input type="text" className="form-control" onChange={val("address")}></input>

                                    </div>
                                    <div className="col-5 mt-2">
                                        <label className="float-start ">GST NO</label>
                                        <input type="text" className="form-control" onChange={val("gst")}></input>
                                        <label className="float-start mt-2">Phone no</label>
                                        <input type="number" className="form-control" onChange={val("phoneno")}></input>
                                    </div>
                                    <div className="col-10 mt-4">
                                    <button className="btn btn-success float-end" type="submit">SUBMIT</button>
                                    </div>
                                   
                                      
                                          
                                      </div>
                                 
                                </form>

                            </div>

                            <div className="col-6 border border-1">
                                <h4 className="mt-1">PARTY INFORMATION</h4>
                                <table className="table table-bordered ">
                                    <thead>
                                        <tr>
                                            <th>Sr no</th>
                                            <th>Party Name</th>
                                         
                                            <th>Address</th>
                                           
                                            <th>Phone no</th>
                                            <th>Action</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {company.map((data, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{data.partyname}</td>
                                            
                                                <td>{data.address}</td>
                                               
                                                <td>{data.phoneno}</td>
                                                <td><Link className="btn btn-primary" to={`http://www.textilediwanji.com:3000/partyedit/${data.srno}`}>EDIT</Link></td>
                                                <td><button className="btn btn-danger" onClick={() => handledelete(data.srno)}>DELETE</button></td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                            </div>
                        </div>






                    </div>


                </div>
            </div>


        </>
    );
}



export default Party;