import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

const Shiftsetting = ({ isLoggedIn, setIsLoggedIn }) => {
    const [shiftname, setShiftname] = useState("");
    const [shiftdata, setShiftdata] = useState([]);
   


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://www.api.textilediwanji.com/addshift', { shiftname })
            .then(res => {
                if (res.data.message === "shift added") {
                    toast.success("Shift added", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    // After successful addition, fetch updated data
                    fetchShiftData();
                }
            })
            .catch(err => {
                // console.log(err);
            });
    };

    const fetchShiftData = () => {
        axios.get('https://www.api.textilediwanji.com/getshiftdata')
            .then(res => {
                // console.log(res.data);
                setShiftdata(res.data);
            })
            .catch(err => {
                // console.log(err);
            });
    };

    useEffect(() => {
        fetchShiftData();
    }, []);


    const handleDelete = (srno) => {
        axios.delete('https://www.api.textilediwanji.com/shiftdelete', { data: { srno } })
            .then(res => {
                if (res.data.message === "shift deleted") {
                    toast.success("Shift deleted", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    // After successful deletion, fetch updated data
                    fetchShiftData();
                }
            })
            .catch(err => {
                // console.log(err);
            });
    };

    
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="container-fluid" style={{ background: "#f6f9ff" }}>
            <div className="row">
                <div className="col-2">
                    <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                </div>
                <div className="col-10" style={{ background: "#f6f9ff", height: "1500px" }}>
                    <div className="row d-flex justify-content-center mt-4">
                        <div className="col-11 bg-white border border-1 shadow-sm rounded-4" style={{ height: "450px", marginTop: "70px" }}>
                            <h5 className="text-start mt-4">Settings</h5>
                            <hr />
                            <div className="row mt-3">
                                <div className="col-6 mt-4">
                                    <form onSubmit={handleSubmit}>
                                        <div className="col-9 ms-4 me-4">
                                            <label className="float-start mb-3">Shift Name</label>
                                            <input className="form-control" type="text" onChange={e => setShiftname(e.target.value)} />
                                            <button className="btn btn-primary mt-3">SUBMIT</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-6 border-start" style={{ height: "350px" }}>
                                    <div className="row ms-4 me-4 mt-5">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Sr no</th>
                                                    <th>Shift Name</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {shiftdata && shiftdata.map((o, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{o.sname}</td>
                                                        <td><button className="btn btn-danger" onClick={() => handleDelete(o.srno)}>DELETE</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shiftsetting;
