import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

import Sidebar from "./Sidebar";

const Billingreport = ({ isLoggedIn, setIsLoggedIn }) => {

    const [totalamount, setTotalamount] = useState();
    const [billdata, setBilldata] = useState([]);


    const [modalId, setModalId] = useState(null);
    const [records, setRecords] = useState([]);



    useEffect(() => {
        fetchdata();
    }, []);


    const fetchdata = () => {
        axios.get('https://www.api.textilediwanji.com/billingreport')
            .then(res => {
                // console.log(res.data);
                setBilldata(res.data);
                setRecords(res.data);

            })
            .catch(err => {
                // console.log("err in the fetching data", err);
            })
    }


    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />;
    }

    const filter = (e) => {
        const number = e.target.value.toLowerCase();
        setRecords(billdata.filter(s => s.billNo && s.billNo.toString().toLowerCase().includes(number)))
    }





    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const handledelete = (id) => {
        axios.delete(`https://www.api.textilediwanji.com/billdelete/${id}`)
            .then(res => {
                // console.log(res.data);
                if (res.data.message === "bill deleted") {

                    fetchdata();
                }

            })
            .catch(err => {
                // console.log(err);
            })
    }




    return (
        <div className="container-fluid" style={{ background: "#f6f9ff", height: "1500px " }}>
            <div className="row">
                <div className="col-2">
                    <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                </div>
                <div className="col-10" style={{ background: "#f6f9ff", height: "1500px " }}>

                    <div className="row d-flex justify-content-center " style={{ marginTop: "70px" }}>
                        <div className="col-11 bg-white border border-1 shadow-sm rounded-4">
                            <h1 className="mt-3 mb-3">This is billing report page</h1>
                            <div className='row ms-4 me-4 mt-4 mb-4'>
                                <h4 className='text-start'>Search result uisng  Bill no </h4>
                                <input type='number' className='form-control' onChange={filter} placeholder='search on Bill no'></input>
                            </div>
                            <div className="row me-3 ms-3 mb-5">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>sr no</th>
                                            <th>Bill no</th>
                                            <th>Date</th>
                                            <th>Set No</th>
                                            <th>Design No</th>
                                            <th>Fabric meter</th>


                                            <th>Total price</th>
                                            <th>Action</th>
                                            <th>Action</th>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {records && records.map((o, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{o.billNo}</td>
                                                <td>{formatDate(o.date)}</td>
                                                <td>{o.SetNo}</td>
                                                <td>{o.DesignNo}</td>


                                                <td>{o.totalquantity}</td>
                                                <td>{o.totalmeters}</td>
                                                <td><Link to={`http://www.textilediwanji.com/billprint/${o.billNo}`} className="btn btn-primary">PRINT</Link></td>
                                                <td> <button
                                                    className='btn btn-danger'
                                                    data-bs-toggle="modal"
                                                    data-bs-target={`#exampleModal-${o.srno}`} // Dynamic modal ID
                                                    onClick={() => setModalId(o.srno)} // Set modal ID on click
                                                >
                                                    Delete
                                                </button>
                                                    <div
                                                        className="modal fade"
                                                        id={`exampleModal-${o.srno}`} // Dynamic modal ID
                                                        tabIndex="-1"
                                                        aria-labelledby={`exampleModalLabel-${o.srno}`} // Dynamic modal label ID
                                                        aria-hidden="true"
                                                    >
                                                        <div className="modal-dialog modal-dialog-centered">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id={`exampleModalLabel-${o.srno}`}>ALERT</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <p>Are you sure! You want to DELETE this?</p>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                    <button
                                                                        className="btn btn-primary"
                                                                        onClick={() => handledelete(o.srno)}
                                                                        data-bs-dismiss="modal"
                                                                    >
                                                                        DELETE
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div></td>
                                                <td><Link to={`http://www.textilediwanji.com/billedit/${o.srno}`} className="btn btn-success">EDIT</Link></td>
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
    );
};

export default Billingreport;
