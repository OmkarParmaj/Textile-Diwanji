import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Dismis from './Dismis';
import { toast } from 'react-toastify';


function Companyedit({ isLoggedIn, setIsLoggedIn }) {
    const [result, setResult] = useState({});
    const [submit, setSubmit] = useState({});
    const [file, setFile] = useState(null);
    const [alert, setAlert] = useState("");

    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://www.api.textilediwanji.com/companyedit/${id}`)
            .then(res => {
                // console.log(res.data)
                setResult(res.data[0]);
                setSubmit(res.data[0]); // Initialize submit state with fetched data
            })
            .catch(err => {
                // console.log("err in the data fetching", err);
            })
    }, [id])

    const val = (field) => (e) => {
        setSubmit({ ...submit, [field]: e.target.value });
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Form submission logic...
        const formData = new FormData();
        formData.append('companyname', submit.companyname);
        formData.append('personname', submit.personname);
        formData.append('companyaddress', submit.companyaddress);
        formData.append('phoneno', submit.phoneno);
        formData.append('emailid', submit.emailid);
        formData.append('gst', submit.gst);
        formData.append('file', file);

        axios.put(`https://www.api.textilediwanji.com/companyedit/${id}`, formData)
            .then(res => {
                // console.log(res)
                if (res.data.message === "Company details updated successfully") {
                    toast.success("Company details updated successfully", { position: "top-center", autoClose: 2000, closeOnClick: true});
                }
            })
            .catch(err => {
                // console.log("Error updating company details:", err);
            })
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className='col-2'>
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Sidebar>
                    </div>
                    <div className="col-10 ms-0 mt-5 ">
                        <div className='row'>
                            {alert && <Dismis alert={alert}></Dismis>}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row d-flex  ">
                                <div className="col-6 ms-0">
                                    <label className="float-start">Company Name</label>
                                    <input className="form-control" value={submit.companyname || ''} onChange={val("companyname")} id="companyname"></input>
                                    <label className="float-start">Person Name</label>
                                    <input className="form-control" value={submit.personname || ''} onChange={val("personname")} id="personname"></input>
                                    <label className="float-start">Company address</label>
                                    <input className="form-control" value={submit.companyaddress || ''} onChange={val("companyaddress")} id="companyaddress"></input>
                                    <label className="float-start">LOGO</label>
                                    <div className="input-group mb-3">
                                        <input type="file" className="form-control" onChange={handleFileChange} id="inputGroupFile02" />
                                        <label className="input-group-text" htmlFor="inputGroupFile02">{submit.file}</label>
                                    </div>
                                    <button className="btn btn-success float-start" type="submit" >SUBMIT</button>
                                </div>
                                <div className="col-3">
                                    <label className="float-start">Phone No</label>
                                    <input className="form-control" value={submit.phoneno || ''} onChange={val("phoneno")} id="phoneno"></input>
                                    <label className="float-start">Email ID</label>
                                    <input className="form-control" value={submit.emailid || ''} onChange={val("emailid")} id="emailid"></input>
                                    <label className="float-start">GST NO</label>
                                    <input className="form-control" value={submit.gst || ''} onChange={val("gst")} id="gst"></input>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Companyedit;
