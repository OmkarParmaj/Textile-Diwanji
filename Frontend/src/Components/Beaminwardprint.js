import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";



const Beaminwardprint = () => {
    const { id1, id2 } = useParams();

    const [bdata, setBdata] = useState();




    useEffect(() => {
        fetchdata();
    }, [id1, id2])


    const fetchdata = async () => {

        try {
            const res = await axios.get(`https://www.api.textilediwanji.com/beaminwardprintnew/${id1}/${id2}`)
            // console.log(res.data)
            setBdata(res.data[0]);
        } catch (err) {
            // console.log(err);
        }
    }


    // If the user is not logged in, redirect to the login page


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }


    



    return (
        <div className="container-fluid" >
            <div className="row mt-2">

                <div className="col ">
                    <div className="container border border-1 ">

                        <div className="row">
                            <div className="col-2 border border-1 d-flex justify-content-center align-items-center ">

                                {bdata && <img src={`https://www.api.textilediwanji.com/companyimage/${bdata.filenameas}`} style={{ maxWidth: 250, maxHeight: 90 }} alt={`Image ${bdata.filenameas}`} ></img>}
                            </div>
                            <div className="col-10 border border-1">
                                {bdata && <h3 className="m-0">{bdata.companyname}</h3>}
                                {bdata && <p className="m-0">Address: {bdata.companyaddress}</p>}
                                {bdata && <p className="m-0">Email: {bdata.emailid} phone:+91-{bdata.phoneno}</p>}
                                {bdata && <p className="m-0">GST no: {bdata.gst}</p>}
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-6">
                                {bdata && <p className="text-start ">Set no:- {bdata.SetNo}</p>}
                            </div>
                            <div className="col-6">
                                {bdata && <p className="text-end">Date:- {formatDate(bdata.Date)}</p>}
                            </div>
                        </div>
                        <div className="row d-flex">

                            <hr></hr>
                            <h5 className="text-start">Party Details</h5>
                            {bdata && <h4 className="m-0 text-start">{bdata.partyname}</h4>}
                            <div className="col-2 ">
                                <p className="m-0 text-start">Party person</p>
                                <p className="m-0 text-start">Address</p>
                                <p className="m-0 text-start">GST No</p>
                                <p className="m-0 text-start">Phone No</p>
                            </div>
                            <div className="col-8">
                                {bdata && <p className="m-0 text-start">: {bdata.personname}</p>}
                                {bdata && <p className="m-0 text-start">: {bdata.address}</p>}
                                {bdata && <p className="m-0 text-start">: {bdata.gst}</p>}
                                {bdata && <p className="m-0 text-start">: {bdata.phoneno}</p>}
                            </div>
                            <hr></hr>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                {bdata && <p className="text-start ">UID: {bdata.UID}</p>}
                                {bdata && <p className="text-start ">Design no: {bdata.DesignNo}</p>}
                            </div>
                            <div className="col-3">
                                {bdata && <p className="text-start ">Warp count: {bdata.WarpCount}</p>}
                                {bdata && <p className="text-start ">Weft count: {bdata.WeftCount}</p>}
                            </div>
                            <div className="col-3">
                                {bdata && <p className="text-start ">Reed: {bdata.Reed}</p>}
                                {bdata && <p className="text-start ">Pick: {bdata.Pick}</p>}
                            </div>
                            <div className="col-3">
                                {bdata && <p className="text-start ">Sizing Name: {bdata.SizingName}</p>}
                                {bdata && <p className="text-start ">Sizing Meter: {bdata.SizingMtr}</p>}
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-3">
                                {bdata && <p className="text-start m-0">Count 1: {bdata.Count1}</p>}
                                {bdata && <p className="text-start m-0">Count 1: {bdata.Count2}</p>}
                                {bdata && <p className="text-start m-0">Count 1: {bdata.Count3}</p>}
                                {bdata && <p className="text-start m-0">Count 1: {bdata.Count4}</p>}
                                {bdata && <p className="text-start m-0">Count 1: {bdata.Count5}</p>}
                            </div>
                            <div className="col-3">
                                {bdata && <p className="text-start m-0">CountWt 1: <span className="fw-bold">{bdata.Countwt1}</span>  Kg</p>}
                                {bdata && <p className="text-start m-0">Countwt 1: <span className="fw-bold">{bdata.Countwt2}</span>  Kg</p>}
                                {bdata && <p className="text-start m-0">Countwt 1: <span className="fw-bold">{bdata.Countwt3}</span>  Kg</p>}
                                {bdata && <p className="text-start m-0">Countwt 1: <span className="fw-bold">{bdata.Countwt4}</span>  Kg</p>}
                                {bdata && <p className="text-start m-0">Countwt 1: <span className="fw-bold">{bdata.Countwt5}</span>  Kg</p>}
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-8 ">
                                <h5 className="text-start">Statements</h5>
                            </div>
                            <div className="col-4">
                                <p className="">For</p>

                                {bdata && <p className="m-0">{bdata.companyname}</p>}
                            </div>
                        </div>

                    </div>
                    

                </div>
            </div>
        </div>
    );
}

export default Beaminwardprint;
