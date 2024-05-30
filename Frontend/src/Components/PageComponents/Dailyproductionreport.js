import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";



const Dailyproductionreport = ({ isLoggedIn, setIsLoggedIn }) => {

    const [date, setDate] = useState("");
    const [alert, setAlert] = useState("");
    const [tabledata, setTabledata] = useState([]);

    const [pdata, setPdata] = useState([]);


    const [warpbr, setWarpbr] = useState(0);
    const [weftbr, setWeftbr] = useState(0);
    const [eff, setEff] = useState(0);
    const [pick, setPick] = useState(0);
    const [jobrate, setJobrate] = useState(0);
    const [mtr, setmtr] = useState(0);
    const [price, setPrice] = useState(0);











    if (isLoggedIn === false) {
        <Navigate to="/login" replace></Navigate>
    }


    const handlesearch = () => {

        if (!date) {
            toast.success("please select date", { position: "top-center", autoClose: 2000, closeOnClick: true })
            return;
        }

        const url = `https://www.api.textilediwanji.com/api/production/reports?date=${date}`;
        axios.get(url)
            .then(res => {


                if (res.data.length === 0) {
                    setTabledata([]);
                    toast.success("No data found for selected date.", { position: "top-center", autoClose: 2000, closeOnClick: true });
                } else {

                    const tdata = JSON.parse(res.data[0].productiontable);
                    setTabledata(tdata);
                    setPdata(res.data[0]);

                    setWarpbr(res.data[0].avragewarpbreak)
                    setWeftbr(res.data[0].avrageweftbreak);
                    setEff(res.data[0].avrageeff);
                    setPick(res.data[0].avragepick);
                    setJobrate(res.data[0].avragejobrate);
                    setmtr(res.data[0].avragemtr);
                    setPrice(res.data[0].totalprice);


                }











            })
            .catch(err => {
                // console.log(err);
            })

    }



    return (
        <>
            <div className="container-fluid" style={{ background: "#f6f9ff", height: "1500px " }}>
                <div className="row">
                    <div className="col-2">
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Sidebar>
                    </div>
                    <div className="col-10" style={{ background: "#f6f9ff", height: "1500px " }}>
                        <div className="row d-flex justify-content-center mt-5 ">
                            <div className="col-11 bg-white border border-1 shadow-sm rounded-4">

                               
                                <div className="row ms-4 mt-4">
                                    <div className="col-3">
                                        <label className="float-start mb-2">Select Date</label>
                                        <input className="form-control" name="date" type="date" onChange={e => setDate(e.target.value)}></input>
                                    </div>
                                    <div className="col-3 mt-4">
                                        <button className="btn btn-primary" onClick={() => handlesearch()} type="submit">SUBMIT</button>
                                    </div>
                                </div>

                                <div className="row d-flex justify-content-around mt-5 ms-4 me-4">
                                    <div className="card" style={{ width: "150px", height: "150px", background: 'linear-gradient(to right top, #ff7e5f, #feb47b)' }}>
                                        <div className="card-body">
                                            <div className="row ">
                                                <h5 className="text-white">Avg. Pick</h5>
                                            </div>
                                            <div className="row  mt-5">
                                                {!pick ? <p>no data</p> : <h5>{pick.toFixed(2)}</h5> }
                                            </div>


                                        </div>
                                    </div>
                                    <div className="card" style={{ width: "150px", height: "150px", background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
                                        <div className="card-body">
                                            <div className="row">
                                                <h5 className="text-white">Avg warp break</h5>
                                            </div>
                                            <div className="row mt-4">
                                                <h5>{warpbr.toFixed(2)}</h5>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="card" style={{ width: "150px", height: "150px", background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
                                        <div className="card-body">
                                            <div className="row">
                                                <h5 className="text-white">Avg weft break</h5>
                                            </div>
                                            <div className="row mt-4">
                                                <h5>{weftbr.toFixed(2)}</h5>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="card" style={{ width: "150px", height: "150px", background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
                                        <div className="card-body">
                                            <div className="row">
                                                <h5 className="text-white">Avg Eff</h5>
                                            </div>
                                            <div className="row mt-5 ">
                                                {eff ? <h5>{eff.toFixed(2)}</h5> : <p>no data</p>}
                                            </div>


                                        </div>
                                    </div>
                                    <div className="card" style={{ width: "150px", height: "150px", background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
                                        <div className="card-body">
                                            <div className="row">

                                                <h5 className="text-white">Avg job rate</h5>

                                            </div>
                                            <div className="row mt-4 ">
                                                <h5>{jobrate.toFixed(2)}</h5>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="card" style={{ width: "150px", height: "150px", background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
                                        <div className="card-body">
                                            <div className="row">
                                                <h5 className="text-white">Total mtr</h5>
                                            </div>
                                            <div className="row mt-5 ">
                                                <h5>{mtr.toFixed(2)}</h5>
                                            </div>



                                        </div>
                                    </div>
                                    <div className="card" style={{ width: "150px", height: "150px", background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
                                        <div className="card-body">
                                            <div className="row">
                                                <h5 className="text-white">Total Amount</h5>


                                            </div>
                                            <div className="row mt-4 ">
                                                <h5>{price.toFixed(2)}</h5>
                                            </div>


                                        </div>
                                    </div>
                                </div>



                                <div className="row mt-5 ms-4 me-4 mb-5">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Sr no</th>
                                                <th>Shift</th>
                                                <th>Loom no</th>
                                                <th>Set No</th>
                                                <th>Design no</th>
                                                <th>Pick</th>
                                                <th>wp br</th>
                                                <th>wf br</th>
                                                <th>eff %</th>
                                                <th>Job rate</th>
                                                <th>Price</th>
                                                <th>Mtr</th>
                                                <th>Total price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tabledata.length > 0 ? (
                                                tabledata.map((o, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{o.shift}</td>
                                                        <td>{o.loomno}</td>
                                                        <td>{o.setno}</td>
                                                        <td>{o.designno}</td>
                                                        <td>{o.pick}</td>
                                                        <td>{o.wpbr}</td>
                                                        <td>{o.wfbr}</td>
                                                        <td>{o.eff}</td>
                                                        <td>{o.jobrate}</td>
                                                        <td>{o.price}</td>
                                                        <td>{o.mtr}</td>
                                                        <td>{o.totalprice}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="13">No data found</td>
                                                </tr>
                                            )}
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


export default Dailyproductionreport;