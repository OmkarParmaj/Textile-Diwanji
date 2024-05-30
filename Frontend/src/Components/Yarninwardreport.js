import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Yarninwardreport = ({ isLoggedIn, setIsLoggedIn }) => {
    const [fetchdata, setFetchdata] = useState([]);
    const [modalId, setModalId] = useState(null);
    const [alert, setAlert] = useState("");
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetchyarndata();
    }, []);

    const fetchyarndata = () => {
        axios.get("https://www.api.textilediwanji.com/yarninwardreport")
            .then(res => {
                // console.log(res.data);
                setFetchdata(res.data);
                setRecords(res.data);
            })
            .catch(err => {
                // console.log("Error in data fetching", err);
            })
    }

    const handledelete = (sryarn) => {
        axios.delete(`https://www.api.textilediwanji.com/yarninwarddelete/${sryarn}`)
            .then((res) => {
                fetchyarndata();
                setModalId(null);
                toast.success("Data deleted successfully", { position: "top-center", autoClose: 2000, closeOnClick: true });
            })
            .catch((err) => {
                // console.log("Error in delete operation", err);
            })
    }

    const filter = (e) => {
        const number = e.target.value.toLowerCase();
        const filteredData = fetchdata.filter(s => s.Designno && s.Designno.toString().toLowerCase().includes(number));
        setRecords(filteredData);
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }


    return (
        <>
            <div className="container-fluid" style={{ background: "#f6f9ff", height: "1500px " }}>
                <div className="row">
                    <div className="col-2">
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    </div>
                    <div className="col-10" style={{ background: "#f6f9ff", height: "1500px " }}>

                        <div className="row d-flex justify-content-center " style={{ marginTop: "70px" }}>
                            <div className="col-11 bg-white border border-1 shadow-sm rounded-4">

                                <h1 className="mt-3 mb-3">Yarn Inward Report</h1>

                                <div className="row mt-4 mb-4 ms-5 me-5">
                                    <h5 className="text-start">Search using Design no</h5>
                                    <input type='number' className='form-control' onChange={filter} placeholder='Search on Design no'></input>
                                </div>
                                <div className="row ms-4 me-4 mb-5">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Sr no</th>
                                                <th>Date</th>
                                                <th>Set no</th>
                                                <th>Design no</th>

                                                <th>Yarn party</th>
                                                <th>Count</th>
                                                <td>Party</td>
                                                <th>weight</th>
                                                <th>Action</th>
                                                <th>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {records.map((result, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{formatDate(result.date)}</td>
                                                    <td>{result.setNo}</td>
                                                    <td>{result.Designno}</td>

                                                    <td>{result.yarnParty}</td>
                                                    <td>{result.count}</td>
                                                    <td>{result.party}</td>
                                                    <td>{result.weight}</td>
                                                    <td><Link to={`http://www.textilediwanji.com/yarninwardedit/${result.srnoyarn}`} className="btn btn-primary" >EDIT</Link></td>
                                                    <td>
                                                        <button
                                                            className='btn btn-danger'
                                                            data-bs-toggle="modal"
                                                            data-bs-target={`#exampleModal-${result.srnoyarn}`} // Dynamic modal ID
                                                            onClick={() => setModalId(result.srnoyarn)} // Set modal ID on click
                                                        >
                                                            Delete
                                                        </button>
                                                        <div
                                                            className="modal fade"
                                                            id={`exampleModal-${result.srnoyarn}`} // Dynamic modal ID
                                                            tabIndex="-1"
                                                            aria-labelledby={`exampleModalLabel-${result.srnoyarn}`} // Dynamic modal label ID
                                                            aria-hidden="true"
                                                        >
                                                            <div className="modal-dialog modal-dialog-centered">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title" id={`exampleModalLabel-${result.srnoyarn}`}>ALERT</h5>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <p>Are you sure! You want to DELETE this?</p>
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                        <button
                                                                            className="btn btn-primary"
                                                                            onClick={() => handledelete(result.srnoyarn)}
                                                                            data-bs-dismiss="modal"
                                                                        >
                                                                            DELETE
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
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

        </>
    );
}



export default Yarninwardreport;