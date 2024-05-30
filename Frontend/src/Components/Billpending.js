import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Billpending = ({ isLoggedIn, setIsLoggedIn }) => {
    const [billdata, setBilldata] = useState([]);
    const [paid, setPaid] = useState("paid");

    useEffect(() => {
        axios.get('https://www.api.textilediwanji.com/billpending')
            .then(res => {
                setBilldata(res.data);
            })
            .catch(err => {
                // console.log(err);
            })
    }, [billdata])



    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const handlesubmit = (billNo) => {
        axios.post('https://www.api.textilediwanji.com/billpendingupdate', { billNo, status: paid })
            .then(res => {
                if (res.data.message === "updated") {
                    toast.success("Status Updated!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    // Update the billdata state after successful update
                    setBilldata(prevBillData => {
                        // Find the index of the updated bill in the array
                        const updatedIndex = prevBillData.findIndex(bill => bill.billNo === billNo);
                        // Create a copy of the previous state
                        const updatedBillData = [...prevBillData];
                        // Update the status of the bill at the found index
                        updatedBillData[updatedIndex] = { ...updatedBillData[updatedIndex], status: paid };
                        // Return the updated state
                        return updatedBillData;
                    });
                }
            })
            .catch(err => {
                // console.log(err);
            })
    }


    const today = () => {
        const todayDate = new Date();
        const formattedToday = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
        return formattedToday;
    }


    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <div className="container-fluid" style={{ background: "#f6f9ff", height: "1500px " }}>
                <div className="row">
                    <div className="col-2">
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Sidebar>
                    </div>
                    <div className="col-10" style={{ background: "#f6f9ff", height: "1500px " }}>
                        <div className="row d-flex justify-content-center " style={{ marginTop: "70px" }}>
                            <div className="col-11 bg-white border border-1 shadow-sm rounded-4">
                                <h4 className="mt-3 mb-3">PENDING BILL REPORT</h4>
                                <div className="row mt-5 d-flex justify-content-center">
                                    <div className="col-10 mb-5">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Sr no</th>
                                                    <th>Bill no</th>
                                                    <th>Date</th>
                                                    <th>Amount</th>
                                                    <th>Status</th>
                                                    <th>Total days</th>
                                                    <th>Update status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {billdata.map((o, index) => (
                                                    <tr key={index} className="">
                                                        <td className="pt-2">{index + 1}</td>
                                                        <td className="d-flex align-items-center justify-content-center pt-2">{o.billNo}</td>
                                                        <td className="pt-2">{formatDate(o.date)}</td>
                                                        <td className="pt-2">{o.totalmeters}</td>
                                                        <td className="pt-2" style={{ backgroundColor: o.status === 'paid' ? 'green' : 'red', color: "white" }}>{o.status}</td>
                                                        <td style={{ backgroundColor: (Math.floor((today() - new Date(o.date)) / (1000 * 60 * 60 * 24))) >= 45 ? 'red' : 'green', color: "white" }}>{Math.floor((today() - new Date(o.date)) / (1000 * 60 * 60 * 24))}</td>
                                                        <td className=""><button className="btn btn-primary btn-sm" onClick={() => handlesubmit(o.billNo)}>UPDATE</button></td>
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
        </>
    );
}

export default Billpending;
