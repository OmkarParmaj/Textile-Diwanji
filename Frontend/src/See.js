import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useLocation } from 'react-router-dom';

const See = () => {
    const [packingslipData, setPackingslipData] = useState({});
    const [finaldata, setFinaldata] = useState([]);
    const [totalmtr, setTotalmtr] = useState(0);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const query1 = query.get('query1');
    const query2 = query.get('query2');

    // console.log(query1);

    useEffect(() => {
        if (query1 && query2) {
            axios.get(`https://www.api.textilediwanji.com/packdatafetch?query1=${query1}&query2=${query2}`)
                .then(response => {
                    setLoading(false);
                    const data = response.data[0];
                    // console.log(data);
                    setPackingslipData(data);
                    setTotalmtr(data.totalmtr);
                    const safedata = JSON.parse(data.packingdata);
                    setFinaldata(safedata);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [query1, query2]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
        <>
            <div className="container-fluid" >
                
                

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
                                    {/* <QRCode className="me-5" style={{ height: "90px", width: "90px" }} value={url} /> */}
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


export default See;
