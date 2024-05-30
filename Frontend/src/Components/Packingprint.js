import React, { useEffect, useState } from "react";
import axios from "axios";
import QRCode from 'qrcode.react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Packingprint = () => {
    const [packingslipData, setPackingslipData] = useState({});
    const [finaldata, setFinaldata] = useState([]);
    const [totalmtr, setTotalmtr] = useState(0);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const {id1, id2 , id3, id4} = useParams();

    useEffect(() => {
        // Get the URL parameters directly from the window location
      

        if (id1 && id2) {
            fetchdata(id1, id2);
        }
        setUrl(`http://www.textilediwanji.com:3000/packingdata?packingslipno=${id1}&uidno=${id2}&serialno=${id3}&emailid=${id4}`);
    }, [id1, id2]);

   

    const fetchdata = async (id1, id2) => {
        try {
            const res = await axios.get(`https://www.api.textilediwanji.com/packingprint/${id1}/${id2}`);
            setPackingslipData(res.data[0]);
            setTotalmtr(res.data[0].toalmtr);
            const safedata = JSON.parse(res.data[0].packingdata);
            setFinaldata(safedata);
            
        } catch (err) {
            // console.log(err);
            // Handle error
            toast.error("Failed to fetch data", { position: "top-center", autoClose: 2000, closeOnClick: true });
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const sendPackslip = () => {
        setLoading(true);
        axios.post("https://www.api.textilediwanji.com/mailpackslip", { url })
            .then(() => {
                toast.success("Packing slip sent", { position: "top-center", autoClose: 2000, closeOnClick: true });
            })
            .catch(error => {
                toast.error("Packing slip not sent", { position: "top-center", autoClose: 2000, closeOnClick: true });
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <>
            <div className="container-fluid" >
                <div className={`modal ${loading ? 'show' : ''}`} style={{ display: loading ? 'block' : 'none' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered" >
                        <div className="modal-content" style={{ background: 'rgba(255, 255, 255, 0.7)' }}>
                            <div className="modal-body" style={{ background: 'rgba(255, 255, 255, 0.7)' }}>
                                <h4>Sending Packing slip</h4>
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 d-flex justify-content-end">
                    <div className="col-3">
                        <button className="btn btn-primary" onClick={sendPackslip}>SEND MAIL</button>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="container border border-1" >
                            <div className="row">
                                <div className="col-2 border border-1 d-flex justify-content-center align-items-center ">
                                    {<img src={`https://www.api.textilediwanji.com/companyimage/${packingslipData.filenameas}`} style={{ maxWidth: 250, maxHeight: 90 }} alt={`Image ${packingslipData.filenameas}`} ></img> || <Skeleton></Skeleton>}
                                </div>
                                <div className="col-10 border border-1" >
                                    <h3 className="m-0">{packingslipData.company || <Skeleton />}</h3>
                                    <p className="m-0">Address:- {packingslipData.companyaddress || <Skeleton />}</p>
                                    <p className="m-0">Email Id:- {packingslipData.emailid} Phone No:- {packingslipData.phoneno || <Skeleton />}</p>
                                    <p className="m-0">GST No:- {packingslipData.gst || <Skeleton />}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 text-start mt-3">
                                    {packingslipData && <h6>Packing slip No:- {packingslipData.Packingslipno}</h6>}
                                </div>
                            </div>
                            <div className="row m-1">
                                <div className="col-6">
                                    {packingslipData && <p className="text-start">Set no:- {packingslipData.SetNo}</p>}
                                </div>
                                <div className="col-6">
                                    {packingslipData && <p className="text-end">Date:- {formatDate(packingslipData.Date)}</p>}
                                </div>
                            </div>
                            <hr className="m-0"></hr>
                            <div className="row m-0">
                                <div className="col-6">
                                    <p className="m-0 text-start">Party Details</p>
                                    {packingslipData && <p className="m-0 text-start">{packingslipData.partyname}</p>}
                                    {packingslipData && <p className="m-0 text-start">Person Name:- {packingslipData.personname}</p>}
                                    {packingslipData && <p className="m-0 text-start">Address:- {packingslipData.address}</p>}
                                    {packingslipData && <p className="m-0 text-start">GST No:- {packingslipData.gst}</p>}
                                    {packingslipData && <p className="m-0 text-start">Phone No:- {packingslipData.phoneno}</p>}
                                </div>
                                <div className="col-6 d-flex justify-content-end align-items-center">
                                    <QRCode className="me-5" style={{ height: "90px", width: "90px" }} value={url} />
                                </div>
                            </div>
                            <hr className="m-0"></hr>
                            <div className="row mt-2">
                                <div className="col-3">
                                    {packingslipData && <p className="text-start m-0">UID: {packingslipData.UID}</p>}
                                    {packingslipData && <p className="text-start mt-3 ">Design no: {packingslipData.DesignNo}</p>}
                                </div>
                                <div className="col-3">
                                    {packingslipData && <p className="text-start m-0 ">Warp count: {packingslipData.WarpCount}</p>}
                                    {packingslipData && <p className="text-start mt-3 ">Weft count: {packingslipData.WeftCount}</p>}
                                </div>
                                <div className="col-3">
                                    {packingslipData && <p className="text-start m-0 ">Reed: {packingslipData.Reed}</p>}
                                    {packingslipData && <p className="text-start mt-3 ">Pick: {packingslipData.Pick}</p>}
                                </div>
                                <div className="col-3">
                                    {packingslipData && <p className="text-start m-0 ">Sizing Name: {packingslipData.SizingName}</p>}
                                    {packingslipData && <p className="text-start mt-3 ">Sizing Meter: {packingslipData.SizingMtr}</p>}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <table className="table table-bordered table-responsive-sm">
                                    <thead>
                                        <tr>
                                            <th>Sr no</th>
                                            <th>Roll no</th>
                                            <th>Meter</th>
                                            <th>Fabric weight</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {finaldata.map((o, index) => (
                                            <tr key={index} >
                                                <td style={{ fontSize: "14px" }} >{index + 1}</td>
                                                <td style={{ fontSize: "14px" }} >{o.rollNo}</td>
                                                <td style={{ fontSize: "14px" }} >{o.mtr}</td>
                                                <td style={{ fontSize: "14px" }} >{o.weight}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td style={{ fontSize: "14px" }} colSpan={1}>Total</td>
                                            <td style={{ fontSize: "14px" }} >{packingslipData.totalrolls}</td>
                                            <td style={{ fontSize: "14px" }} >{totalmtr.toFixed(2)}</td>
                                            <td style={{ fontSize: "14px" }} >{packingslipData.totalwt}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="row mt-5">
                                <div className="col-8 ">
                                    <h5 className="text-start">Statements</h5>
                                </div>
                                <div className="col-2">
                                </div>
                                <div className="col-2">
                                    <p className="">For</p>
                                    <p className="mt-5">{packingslipData && packingslipData.companyname}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Packingprint;
