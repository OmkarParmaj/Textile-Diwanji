import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";



const Companybankdetails = ({ isLoggedIn, setIsLoggedIn }) => {

    const [bankname, setBankname] = useState("");
    const [accountno, setAccountno] = useState("");
    const [branch, setBranch] = useState("");
    const [ifsccode, setIfsccode] = useState("");
    const [bankaddress, setBankaddress] = useState("");
    const [alert, setAlert] = useState("");
    const [bankdetails, setBankdetails] = useState("");



    useEffect(() => {
        fetchdata();
    }, [])

    const fetchdata = async () => {
        try {
            const res = await axios.get('https://www.api.textilediwanji.com/companybankdetails')
            // console.log(res.data);
            setBankdetails(res.data);
        } catch (err) {
            // console.log(err);
        }

    }




    const handlesubmit = (e) => {
        e.preventDefault();

        const payload = {
            bankname,
            accountno,
            branch,
            ifsccode,
            bankaddress
        }

        axios.post('https://www.api.textilediwanji.com/companybankdetails', payload)
            .then(res => {
                if (res.data.message === "data submmited") {
                    toast.success("Bank details are submmited", { position: "top-center", autoClose: 2000, closeOnClick: true});
                    fetchdata();
                }
            })
            .catch(err => {
                // console.log(err);
            })
    }








    if (isLoggedIn === false) {
        <Navigate to='/login' replace></Navigate>
    }




    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Sidebar>
                    </div>
                    <div className="col-10">
                        <h4>This is company bank details</h4>
                        <div className="row" style={{ height: "100px" }}>
                            {alert && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>{alert}</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>}
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <form onSubmit={handlesubmit}>
                                    <div className="row">
                                        <div className="col-8">
                                            <label className="float-start mt-2">Bank Name</label>
                                            <input className="form-control" type="text" onChange={e => setBankname(e.target.value)}></input>
                                            <label className="float-start mt-2">Account Number</label>
                                            <input className="form-control" type="text" onChange={e => setAccountno(e.target.value)} ></input>
                                            <label className="float-start mt-2">Branch name</label>
                                            <input className="form-control" type="text" onChange={e => setBranch(e.target.value)}></input>
                                            <label className="float-start mt-2">Bank Address</label>
                                            <input className="form-control" type="type" onChange={e => setBankaddress(e.target.value)}></input>
                                            <label className="float-start mt-2">IFS Code</label>
                                            <input className="form-control" type="text" onChange={e => setIfsccode(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-8">
                                        <button className="btn btn-primary float-end">SUBMIT</button>
                                        </div>
                                    
                                    </div>
                                    

                                </form>
                            </div>
                            <div className="col-6">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>sr no</th>
                                            <th>Bank Name</th>
                                            <th>Account number</th>
                                            <th>Branch</th>
                                            <th>IFS code</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bankdetails && bankdetails.map((o, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{o.bankname}</td>
                                                <td>{o.accountno}</td>
                                                <td>{o.branch}</td>
                                                <td>{o.ifsccode}</td>
                                                <td><Link to={`http://www.textilediwanji.com:3000/companybankedit/${o.srno}`} className="btn btn-success">EDIT</Link></td>
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


export default Companybankdetails;