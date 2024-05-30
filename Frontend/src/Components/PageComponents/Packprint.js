import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const Packprint = ({ bdata }) => {

   









    return (
        <>
            <div className="container border border-1 ">
                <div className="row">
                    <div className="col-2 border border-1 d-flex justify-content-center align-items-center ">
                        <h2 className="">LOGO</h2>
                    </div>
                    <div className="col-10 border border-1">
                        <h3 className="m-0">SOURABH TEXTILE</h3>
                        <p className="m-0">Address: 8/251/1,Vikram nagar near Bishops english school, Ichalkaranji, MH, India-416 115</p>
                        <p className="m-0">Email: sourabhtextile1@gmaill.com phone:+91-9822528471</p>
                        <p className="m-0">GST no: 27CGVPP7811D1ZY</p>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                        {bdata && <p className="text-start ">Set no:- {bdata.SetNo}</p>}
                    </div>
                    <div className="col-6">
                        {bdata && <p className="text-end">{bdata.Date}</p>}
                    </div>
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
                        {bdata && <p className="text-start">Count 1: {bdata.Count1}</p>}
                        {bdata && <p className="text-start">Count 1: {bdata.Count2}</p>}
                        {bdata && <p className="text-start">Count 1: {bdata.Count3}</p>}
                        {bdata && <p className="text-start">Count 1: {bdata.Count4}</p>}
                        {bdata && <p className="text-start">Count 1: {bdata.Count5}</p>}
                    </div>
                    <div className="col-3">
                        {bdata && <p className="text-start">CountWt 1: <span className="fw-bold">{bdata.Countwt1}</span>  Kg</p>}
                        {bdata && <p className="text-start">Countwt 1: <span className="fw-bold">{bdata.Countwt2}</span>  Kg</p>}
                        {bdata && <p className="text-start">Countwt 1: <span className="fw-bold">{bdata.Countwt3}</span>  Kg</p>}
                        {bdata && <p className="text-start">Countwt 1: <span className="fw-bold">{bdata.Countwt4}</span>  Kg</p>}
                        {bdata && <p className="text-start">Countwt 1: <span className="fw-bold">{bdata.Countwt5}</span>  Kg</p>}
                    </div>
                </div>
                <div className="row mt-5">
                <div className="col-8 ">
                    <h5 className="text-start">Statements</h5>
                </div>
                <div className="col-4">
                 <p className="">For</p>
                 
                 <p className="mt-5">SOURABH TEXTILE</p>
                </div>
                </div>
            </div>


        </>
    );
}


export default Packprint