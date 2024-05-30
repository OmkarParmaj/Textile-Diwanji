import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

const Companyregister = ({ isLoggedIn, setIsLoggedIn }) => {
    const [values, setValues] = useState({
        companyname: "",
        personname: "",
        companyaddress: "",
        phoneno: "",
        emailid: "",
        gst: ""
    });
    const [file, setFile] = useState(null);
    const [comdata, setComdata] = useState([]);
    const [alert, setAlert] = useState("");

    const val = (valu) => (e) => {
        setValues({ ...values, [valu]: e.target.value });
    }

    const handleFileChange = e => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        fetchdata();
    }, [comdata]);


    const fetchdata = async () => {
        try {
            const res = await axios.get('https://www.api.textilediwanji.com/companyreport')
            setComdata(res.data);
            
        } catch (err) {
            // console.log(err);
        }
    }


    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    const handleChange = (value) => (e) => {
        setValues({ ...values, [value]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('companyname', values.companyname);
        formData.append('personname', values.personname);
        formData.append('companyaddress', values.companyaddress);
        formData.append('phoneno', values.phoneno);
        formData.append('emailid', values.emailid);
        formData.append('gst', values.gst);
        formData.append('file', file);

        axios.post('https://www.api.textilediwanji.com/companyregister', formData)
            .then(res => {
                // console.log(res);
                setComdata([...comdata, values]);
                if (res.data.message === "data inserted successfully") {
                    toast.success("Data submitted successfully", { position: "top-center", autoClose: 2000, closeOnClick: true});
                }
            })
            .catch(err => {
                // console.log("Error in sending data:", err);
            });

        axios.post('http://www.textilediwanji.com:4000/companyregister', formData)
        .then(res => {

        })
        .catch(err => {

        })
    };

    const handledelete = (id) => {
        axios.delete(`https://www.api.textilediwanji.com/companydelete/${id}`)
            .then((res) => {
                fetchdata();
            })
            .catch((err) => {
                // console.log("err in the delete", err);
            })
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    </div>
                    <div className="col-10">
                        <div className="row">
                      
                            {alert && (
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    <strong>Congratulations!</strong> {alert}
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            )}
                        </div>
                        <div className="row mt-5">
                            
                            <div className="col-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="row d-flex ">



                                        <div className="col-6">
                                            <label className="float-start">Company Name</label>
                                            <input className="form-control" onChange={val("companyname")} id="companyname"></input>
                                            <label className="float-start">Person Name</label>
                                            <input className="form-control" onChange={val("personname")} id="personname"></input>
                                            <label className="float-start">Company address</label>
                                            <input className="form-control" onChange={val("companyaddress")} id="companyaddress"></input>
                                            <label className="float-start">LOGO</label>
                                            <div class="input-group mb-3">
                                                <input type="file" name="companyimage" class="form-control" id="inputGroupFile02" onChange={handleFileChange} />
                                            </div>
                                            
                                        </div>
                                        <div className="col-6">
                                            <label className="float-start">Phone No</label>
                                            <input className="form-control" onChange={val("phoneno")} id="phoneno"></input>
                                            <label className="float-start">Email ID</label>
                                            <input className="form-control" onChange={val("emailid")} id="emailid"></input>
                                            <label className="float-start">GST NO</label>
                                            <input className="form-control" onChange={val("gst")} id="gst"></input>

                                        </div>
                                    </div>
                                    <div className="row">
                              <div className="col">
                              <button className="btn btn-success float-end" type="submit" >SUBMIT</button>
                              </div>
                                    </div>
                                </form>
                            </div>

                            <div className="col-6 ms-5 bg-light border border-1 rounded-3" style={{height:"1500px"}} >
                                <h4 className="mt-3">Company display</h4>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Company Name</th>
                                            <th>Logo</th>
                                            <th>Proprietor Name</th>
                                            <th>Action</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comdata.map((company, index) => (
                                            <tr key={index}>
                                                <td>{company.companyname}</td>
                                                <td><img src={`https://www.api.textilediwanji.com/companyimage/${company.filenameas}`} style={{ maxWidth: 250, maxHeight: 90 }} alt={`Image ${index}`} /></td>
                                                <td>{company.personname}</td>
                                                <td>
                                                    <Link to={`/companyedit/${company.companyname}`} className="btn btn-primary">EDIT</Link>

                                                </td>
                                                <td> <button className="btn btn-danger" onClick={() => handledelete(company.companyname)}>DELETE</button></td>
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
};

export default Companyregister;
