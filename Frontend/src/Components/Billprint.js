import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const BIllprint = () => {
    const [yesprint, setYesprint] = useState([]);
    const [bnprint, setBnprint] = useState({});
    const [hello, setHello] = useState([])
    const [companyprint, setCompanyprint] = useState({});
    const [firm, setFirm] = useState({});
    const [bankdetails, setBankdetails] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://www.api.textilediwanji.com/billprint/${id}`)
            .then(res => {
                // console.log(res.data);
                setYesprint(res.data);
                setBnprint(res.data[0]);
                setHello(res.data[0]);
            })
            .catch(err => {
                // console.log("Error fetching data:", err);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`https://www.api.textilediwanji.com/companyregister/${id}`)
            .then(res => {
                // console.log(res.data);
                setFirm(res.data[0]);
            })
            .catch(err => {
                // console.log("Error fetching company data:", err);
            });
    }, [id]);

    useEffect(() => {
        if (bnprint.partyname) {
            axios.get(`https://www.api.textilediwanji.com/billprint?partyname=${bnprint.partyname}`)
                .then(res => {
                    // console.log(res.data);
                    setCompanyprint(res.data[0]);
                })
                .catch(err => {
                    // console.log("Error fetching company print data:", err);
                });
        }
    }, [bnprint.partyname]);

    useEffect(() => {
        axios.get('https://www.api.textilediwanji.com/bankdetails')
            .then(res => {
                setBankdetails(res.data[0]);
            })
            .catch(err => {
                // console.log(err);
            })
    })

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row mt-3">
                 
                    <div className="col">
                        <div className="container border border-1">
                            <div className="row">
                                <div className="col-2 border border-1 d-flex justify-content-center align-items-center">
                                {<img src={`https://www.api.textilediwanji.com/companyimage/${firm.filenameas}`} style={{maxWidth: 250, maxHeight: 90}} alt={`Image ${firm.filenameas}`} ></img> || <Skeleton></Skeleton>}
                                </div>
                                <div className="col-10 border border-1">
                                    <h3 className="m-0">{firm.companyname}</h3>
                                    <p className="m-0">Address: {firm.companyaddress}</p>
                                    <p className="m-0">Email: {firm.emailid} phone: {firm.phoneno}</p>
                                    <p className="m-0">GST no: {firm.gst}</p>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-between  mt-3">
                                <div className="col-2">
                                   
                                    <h6>Bill No: {bnprint && bnprint.billNo}</h6>
                                </div>
                                <div className="col-4 ">
                                    
                                    <h6 className="text-end">Date: {formatDate(bnprint.date)}</h6>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-6 border border-1">
                                    <p className="m-0 text-start" style={{fontSize: "15px"}} >Consignee (Ship to)</p>
                                    <h4 className="m-0 text-start" style={{fontSize: "20px"}} >{companyprint.partyname}</h4>
                                    <p className="m-0 text-start" style={{fontSize: "15px"}} >{companyprint.address}</p>
                                    <p className="m-0 text-start" style={{fontSize: "15px"}} >Phone no: {companyprint.phoneno}</p>
                                    <p className="m-0 text-start" style={{fontSize: "15px"}} >GSTIN/UIN : {companyprint.gst}</p>
                                    <p className="m-0 text-start" style={{fontSize: "15px"}} >State Name: Maharashtra, Code:27</p>
                                </div>
                                <div className="col-6 border border-1">
                                    <p className="m-0 text-start" style={{fontSize: "15px"}} >Buyer (Bill to)</p>
                                    <h4 className="m-0 text-start" style={{fontSize: "20px"}} >{companyprint.partyname}</h4>
                                    <p className="m-0 text-start" style={{fontSize: "15px"}} >{companyprint.address}</p>
                                    <p className="m-0 text-start" style={{fontSize: "15px"}} >Phone no: {companyprint.phoneno}</p>
                                    <p className="m-0 text-start" style={{fontSize: "15px"}} >GSTIN/UIN : {companyprint.gst}</p>
                                    <p className="m-0 text-start" style={{fontSize: "15px"}} >State Name: Maharashtra, Code:27</p>
                                </div>
                            </div>
                            <div className="container" style={{ height: 400 }}>
                                <div className="row mt-2">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Sr no</th>
                                                <th>Design No</th>
                                                <th>Description of goods/Services</th>
                                                <th>HSN/SAC code</th>
                                                <th>Quantity</th>
                                                <th>Rate</th>
                                                <th>CGST</th>
                                                <th>SGST</th>
                                                <th>IGST</th>

                                                <th>Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {yesprint.map((item, index) => {
                                                const tableData = JSON.parse(item.tableData);
                                                return tableData.map((yess, idi) => (
                                                    <tr key={idi}>
                                                        <td>{idi + 1}</td>
                                                        <td>{yess.Designno}</td>
                                                        <td>{yess.Description}</td>
                                                        <td>43432</td>
                                                        <td>{yess.Quantity}</td>
                                                        <td>{yess.Price}</td>
                                                        <td>{yess.CGST}</td>
                                                        <td>{yess.SGST}</td>
                                                        <td>{yess.IGST}</td>

                                                        <td>{yess.Totalprice}</td>
                                                    </tr>
                                                ));
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={4}>Total</td>
                                                <td>{bnprint.totalquantity}</td>
                                                <td></td>
                                                <td>{bnprint.Totalcgst}</td>
                                                <td>{bnprint.Totalsgst}</td>
                                                <td>{bnprint.Totaligst}</td>
                                                <td>{bnprint.totalmeters}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            <div className="row d-flex mb-0">
                                <h5 className="text-start">Bank details</h5>
                                <div className="col-2">
                                  
                                    <p className="m-0 text-start">Bank Name: </p>
                                    <p className="m-0 text-start">Account Number: </p>
                                    <p className="m-0 text-start">Branch & IFS Code:</p>
                                </div>
                                <div className="col-5 ">
                              
                                <p className="m-0 text-start">: {bankdetails.bankname}</p>
                                <p className="m-0 text-start">: {bankdetails.accountno}</p>
                                <p className="m-0 text-start">: {bankdetails.branch}, {bankdetails.ifsccode}</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-8">
                                    <h6 className="text-start">Declaration</h6>
                                    <p className="text-start m-0">We declare that this invoice shows the actual</p>
                                    <p className="text-start m-0">price of the goods describe and that all </p>
                                    <p className="text-start m-0">particulars are true and correct.</p>
                                </div>
                                <div className="col-3">
                                    <p className="">For</p>
                                    <p className="mt-5">{firm.companyname}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BIllprint;
