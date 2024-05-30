import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useParams, Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Companybankedit = ({ isLoggedIn, setIsLoggedIn }) => {
    const [bankDetails, setBankDetails] = useState({
        bankname: "",
        accountno: "",
        branch: "",
        ifsccode: "",
        bankaddress: ""
    });
    const [alert, setAlert] = useState("");
    const { id } = useParams();

    useEffect(() => {
        if (!isLoggedIn) {
            return;  // Early return if not logged in
        }
        fetchdata();
    }, [id, isLoggedIn]);  // Added isLoggedIn to dependency array

    const fetchdata = async () => {
        try {
            const res = await axios.get(`https://www.api.textilediwanji.com/companybankedit/${id}`);
            if (res.data.length > 0) {
                setBankDetails({
                    bankname: res.data[0].bankname,
                    accountno: res.data[0].accountno,
                    branch: res.data[0].branch,
                    ifsccode: res.data[0].ifsccode,
                    bankaddress: res.data[0].bankaddress
                });
            } else {
                toast.success("No bank details found.", { position: "top-center", autoClose: 2000, closeOnClick: true});
            }
        } catch (err) {
            console.error("Error fetching bank details:", err);
            toast.success("Failed to fetch bank details.", { position: "top-center", autoClose: 2000, closeOnClick: true});
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBankDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.put(`https://www.api.textilediwanji.com/companybanked/${id}`, bankDetails)
            .then(res => {
                toast.success("Bank details updated successfully.", { position: "top-center", autoClose: 2000, closeOnClick: true});
            })
            .catch(err => {
                console.error("Error submitting bank details:", err);
                toast.success("Error updating bank details.", { position: "top-center", autoClose: 2000, closeOnClick: true});
            });
    };

    if (!isLoggedIn) {
        return <Navigate to='/login' replace />;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                </div>
                <div className="col-10">
                    <h4>Company Bank Details</h4>
                    {alert && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Alert:</strong> {alert}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>}
                   <div className="row">
                 <div className="col-6">
                 <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label float-start">Bank Name</label>
                            <input className="form-control" type="text" name="bankname" value={bankDetails.bankname} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label float-start">Account Number</label>
                            <input className="form-control" type="text" name="accountno" value={bankDetails.accountno} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label float-start">Branch Name</label>
                            <input className="form-control" type="text" name="branch" value={bankDetails.branch} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label float-start">Bank Address</label>
                            <input className="form-control" type="text" name="bankaddress" value={bankDetails.bankaddress} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label float-start">IFS Code</label>
                            <input className="form-control" type="text" name="ifsccode" value={bankDetails.ifsccode} onChange={handleInputChange} />
                        </div>
                        <button className="btn btn-primary">Update</button>
                        <Link className="btn btn-success ms-4" to="/companybankdetails">Company Details</Link>
                    </form>
                 </div>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default Companybankedit;
