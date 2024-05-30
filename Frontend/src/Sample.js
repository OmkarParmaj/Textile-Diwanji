import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import Skeleton from "react-loading-skeleton";
import QRCode from "qrcode.react";

const Sample = () => {
    const [packingslipData, setPackingslipData] = useState({});
    const [finaldata, setFinaldata] = useState([]);
    const [totalmtr, setTotalmtr] = useState(0);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const location = useLocation();
    const [mailid, setMailid] = useState([]);
    const [mid, setMid] = useState([]);
    const [hey, setHey] = useState([]);

    const query = new URLSearchParams(location.search);
    const packingslipno = query.get('packingslipno');
    const uidno = query.get('uidno');
    const serialno = query.get('serialno');
    const emailid = query.get('emailid');


    useEffect(() => {
     
   
            axios.get(`https://www.api.textilediwanji.com/packingdata?packingslipno=${encodeURIComponent(packingslipno)}&uidno=${encodeURIComponent(uidno)}&serialno=${encodeURIComponent(serialno)}&emailid=${encodeURIComponent(emailid)}`)
                // setData(response.data);
            .then(res => {
                // console.log(res.data);
                setData(res.data[0]);
                setPackingslipData(res.data[0]);
                setTotalmtr(res.data[0].toalmtr);
                const safedata = JSON.parse(res.data[0].packingdata);
                setFinaldata(safedata);
                const yesidyes = res.data[0].emailid;
                setHey(yesidyes);

                setUrl(`http://www.textilediwanji.com/packingdata?packingslipno=${encodeURIComponent(packingslipno)}&uidno=${encodeURIComponent(uidno)}&serialno=${encodeURIComponent(serialno)}&emailid=${encodeURIComponent(emailid)}`)
                
            })
            .catch(err => {

            })
                
                // const response2 = await axios.post(`https://www.api.textilediwanji.com/packinfo`, { hey })
                // console.log(response2.data);
                // setMid(response2.data[0].companyna);
        
        

    }, []);


    useEffect(() => {

        axios.post(`https://www.api.textilediwanji.com/packinfo`, { hey })
        .then(res => {
            const yesgot = res.data[0].companyna;
            setMid(yesgot);
        })
        .catch(err => {

        })

    },[hey])


    


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
                                 {mid && <img src={`https://www.api.textilediwanji.com/omkarparmaj/${mid}`} style={{ maxWidth: 250, maxHeight: 90 }} alt={`Image ${mid}`} />
}
                                    
                                    
                                </div>
                                <div className="col-10 border border-1" >
                                    <h3 className="m-0 text-center">{packingslipData.company || <Skeleton />}</h3>
                                    <p className="m-0 text-center">Address:- {packingslipData.companyaddress || <Skeleton />}</p>
                                    <p className="m-0 text-center">Email Id:- {packingslipData.emailid} Phone No:- {packingslipData.phoneno || <Skeleton />}</p>
                                    <p className="m-0 text-center">GST No:- {packingslipData.gst || <Skeleton />}</p>
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
                                <table className="table table-bordered text-center table-responsive-sm">
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

export default Sample;