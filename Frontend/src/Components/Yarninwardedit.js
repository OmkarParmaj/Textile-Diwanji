import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
import { toast } from "react-toastify";




const Yarninwardedit = ({ isLoggedIn, setIsLoggedIn }) => {

    const [values, setValues] = useState({
        date: "",
        setno: "",
        designno: "",
        yarnparty: "",
        count: "",
        party: "",
        yarnwt: ""
    })

    const [alert, setAlert] = useState("");

    const { id } = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        fetchdata();
    }, [id])

    const fetchdata = async () => {
        try {
            const res = await axios.get(`https://www.api.textilediwanji.com/yarninwardedit/${id}`)
            // console.log(res.data);
            setValues({
                date: res.data[0].date,
                setno: res.data[0].setNo,
                designno: res.data[0].Designno,
                yarnparty: res.data[0].yarnParty,
                count: res.data[0].count,
                party: res.data[0].party,
                yarnwt: res.data[0].weight
            });
        } catch (err) {
            // console.log(err);
        }


    }


    const handleInputChange = (name, value) => {
        setValues(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


   


    const handlesubmit = (e) => {
        e.preventDefault();
        axios.put(`https://www.api.textilediwanji.com/yarninwardedit/${id}`, values)
            .then(res => {
                if (res.data.message === "Updated") {
                    setValues({
                        date: "",
                        setno: "",
                        designno: "",
                        yarnparty: "",
                        count: "",
                        party: "",
                        yarnwt: ""
                    })
                    toast.success("Updated Yarn data!", { position: "top-center", autoClose: 2000, closeOnClick: true});
                }
            })
            .catch(err => {
                // console.log(err);
            })
    }


    const gotopage = (e) => {
        setTimeout(() => {
         navigate("/yarninwardreport");
        }, 2000);
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
                    <div className="col-10">
                        <h3>This is Yarninward Edit page</h3>
                        <div className="row">
                            <h1>Yarn inward </h1>
                        </div>
                        <div className="row">
                            {alert && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>{alert}</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>}
                        </div>
                        <form onSubmit={handlesubmit}>
                            <div className="row d-flex justify-content-center align-items-center ms-5 me-5 border border-1 rounded-5 mt-5 mb-5 bg-white">
                                <div className="row mt-5">
                                    <div className="col-3 float-end">
                                        <label className="float-start">Date</label>
                                        <input name="date"
                                            type="date"
                                            className="form-control"
                                            value={values.date}
                                            onChange={e => handleInputChange("date", e.target.value)}></input>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-3">
                                        <label className="float-start">Set No</label>
                                        <input
                                            name="setNo"
                                            type="number"
                                            className="form-control"
                                            value={values.setno}
                                            onChange={e => handleInputChange("setNo", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label className="float-start">Design No</label>
                                        <input name="Designno" type="number" className="form-control" value={values.designno} onChange={e => handleInputChange("Designno", e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-3">
                                        <label className="float-start">Yarn party</label>
                                        <input
                                            name="yarnParty"
                                            type="text"
                                            className="form-control"
                                            value={values.yarnparty}
                                            onChange={e => handleInputChange("yarnParty", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label className="float-start">Count</label>
                                        <input
                                            name="count"
                                            type="number"
                                            className="form-control"
                                            value={values.count}
                                            onChange={e => handleInputChange("count", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label className="float-start">Party</label>
                                        <input
                                            name="party"
                                            type="text"
                                            className="form-control"
                                            value={values.party}
                                            onChange={e => handleInputChange("party", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label className="float-start">Yarn Weight</label>
                                        <input
                                            name="weight"
                                            type="number"
                                            className="form-control"
                                            value={values.yarnwt}
                                            onChange={e => handleInputChange("weight", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-end mb-5">
                                    <div className="col-2 ">
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                            onClick={e => gotopage()}
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





        </>
    );
}


export default Yarninwardedit;