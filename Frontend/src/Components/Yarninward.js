import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Bounce, cssTransition, toast } from 'react-toastify';

const Yarninward = ({ isLoggedIn, setIsLoggedIn }) => {
    const [rowData, setRowData] = useState({
        setNo: "",
        Designno: "",
        date: "",
        yarnParty: "",
        count: "",
        party: "",
        weight: ""
    });
   
    const [totalwt, setTotalwt] = useState(0);
    const [alert, setAlert] = useState("");
  



    



    useEffect(() => {
        calculateTotalWeight();
    }, [rowData]);

    function calculateTotalWeight() {
        const totalWeight = parseFloat(rowData.weight) || 0;
        setTotalwt(totalWeight);
    }

    const handleInputChange = (name, value) => {
        setRowData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://www.api.textilediwanji.com/yarninward', rowData)
            .then(res => {
                // console.log("Data inserted successfully");
                toast.success("data has submmitted", { position: "top-center", autoClose: 2000, closeOnClick: true });
                setRowData({
                    setNo: "",
                    Designno: "",
                    date: "",
                    yarnParty: "",
                    count: "",
                    party: "",
                    weight: ""
                })

            })
            .catch(err => {
                // console.log("Error in submitting data:", err);
            });
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="container-fluid" style={{ background: "#f6f9ff", height: "1500px " }}>
            <div className="row">
                <div className="col-2">
                    <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                </div>
                <div className="col-10 bg-light mt-4">
                    <div className="row">
                        <h1>YARN INWARD</h1>
                    </div>
                    {/* <div className="row">
                        {alert && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>{alert}</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>}
                    </div> */}
                    <form onSubmit={handleSubmit}>
                        <div className="row d-flex justify-content-center align-items-center ms-5 me-5 border border-1 rounded-5 mt-2 mb-5 bg-white">
                            <div className="row mt-5">
                                <div className="col-3 float-end">
                                    <label className="float-start">Date</label>
                                    <input name="date"
                                        type="date"
                                        className="form-control"
                                        value={rowData.date}
                                        onChange={e => handleInputChange("date", e.target.value)} required></input>
                                </div>

                            </div>
                            <div className="row mt-3">
                                <div className="col-3">
                                    <label className="float-start">Set No</label>
                                    <input
                                        name="setNo"
                                        type="number"
                                        className="form-control"
                                        value={rowData.setNo}
                                        onChange={e => handleInputChange("setNo", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-3">
                                    <label className="float-start">Design No</label>
                                    <input name="Designno" type="number" className="form-control" value={rowData.Designno} onChange={e => handleInputChange("Designno", e.target.value)} required></input>
                                </div>
                            </div>
                            <div className="row mb-5 mt-3">
                                <div className="col-3">
                                    <label className="float-start">Yarn party</label>
                                    <input
                                        name="yarnParty"
                                        type="text"
                                        className="form-control"
                                        value={rowData.yarnParty}
                                        onChange={e => handleInputChange("yarnParty", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-3">
                                    <label className="float-start">Count</label>
                                    <input
                                        name="count"
                                        type="number"
                                        className="form-control"
                                        value={rowData.count}
                                        onChange={e => handleInputChange("count", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-3">
                                    <label className="float-start">Party</label>
                                    <input
                                        name="party"
                                        type="text"
                                        className="form-control"
                                        value={rowData.party}
                                        onChange={e => handleInputChange("party", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-3">
                                    <label className="float-start">Yarn Weight</label>
                                    <input
                                        name="weight"
                                        type="number"
                                        className="form-control"
                                        value={rowData.weight}
                                        onChange={e => handleInputChange("weight", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row d-flex justify-content-end mb-5">
                                <div className="col-2 ">
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center">

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Yarninward;
