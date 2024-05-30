import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Production.css";
import axios from "axios";
import { toast } from "react-toastify";





const Production = ({ isLoggedIn, setIsLoggedIn }) => {

    const [rows, setRows] = useState([]);
    const [rowNum, setRowNum] = useState(2);
    const [avpick, setAvpick] = useState(0);
    const [avgwarpbr, setAvgwarpbt] = useState(0);
    const [avgweftbr, setAvgweftbr] = useState(0);
    const [avrageeff, setAvrageeff] = useState(0);
    const [avragejobrate, setAvragejobrate] = useState(0);
    const [totalprice, setTotalprice] = useState(0);
    const [avragemtr, setAvragemtr] = useState(0);
    const [date, setDate] = useState("");
    const [alert, setAlert] = useState("");
    const [shiftdata, setShiftdata] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");


    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };


    useEffect(() => {
        calculateTotals();
    }, [rows])





    const calculateTotals = () => {
        let pickav = 0;


        rows.forEach(row => {
            pickav += parseFloat(row.pick) || 0;
        });


        const avg = rows.length > 0 ? pickav / rows.length : 0;
        setAvpick(avg);

        let warpav = 0;

        rows.forEach(row => {
            warpav += parseFloat(row.wpbr) || 0;
        });

        const wpavg = rows.length > 0 ? warpav / rows.length : 0;
        setAvgwarpbt(wpavg);

        let weftav = 0;

        rows.forEach(row => {
            weftav += parseFloat(row.wfbr) || 0;
        });

        const wfavg = rows.length > 0 ? weftav / rows.length : 0;
        setAvgweftbr(wfavg);

        let avgeff = 0;

        rows.forEach(row => {
            avgeff += parseFloat(row.eff) || 0;
        });

        const avef = rows.length > 0 ? avgeff / rows.length : 0;

        setAvrageeff(avef);

        let avgjobrate = 0;

        rows.forEach(row => {
            avgjobrate += parseFloat(row.jobrate) || 0;

        });

        const avjob = rows.length > 0 ? avgjobrate / rows.length : 0;
        setAvragejobrate(avjob);


        let totalpr = 0;

        rows.forEach(row => {
            totalpr += parseFloat(row.totalprice) || 0;

        })

        setTotalprice(totalpr);

        let avmtr = 0;

        rows.forEach(row => {
            avmtr += parseFloat(row.mtr) || 0;
        });


        setAvragemtr(avmtr)
    }



















    const addRow = () => {
        setRowNum(rowNum + 1);
        const newRow = {
            shift: "",
            loomno: "",
            setno: "",
            designno: "",
            pick: "",
            wpbr: "",
            wfbr: "",
            eff: "",
            jobrat: "",
            price: "",
            mtr: "",
            totalprice: "",
        };
        setRows([...rows, newRow]);
    };


    const handleInputChange = (index, name, value) => {
        const updatedRows = [...rows];
        updatedRows[index][name] = value;

        if (name === 'pick' || name === 'jobrate' || name === 'mtr') {
            // Calculate price and total price
            const pick1 = parseFloat(updatedRows[index]['pick']) || 0;
            const jobrate1 = parseFloat(updatedRows[index]['jobrate']) || 0;
            const mtr1 = parseFloat(updatedRows[index]['mtr']) || 0;

            updatedRows[index]['price'] = (pick1 * (jobrate1 / 100)).toFixed(2);
            updatedRows[index]['totalprice'] = ((pick1 * (jobrate1 / 100)) * mtr1).toFixed(2);
        } else if (name === 'shift') {
            // Update the shift property with the selected option value for the specific row
            updatedRows[index]['shift'] = value;
        }

        setRows(updatedRows);
    };


    const deleteRow = index => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };




    const handlesubmit = (e) => {
        e.preventDefault();

        const payload = {
            date,
            rows,
            avpick,
            avgwarpbr,
            avgweftbr,
            avrageeff,
            avragejobrate,
            avragemtr,
            totalprice
        }

        axios.post('https://www.api.textilediwanji.com/production', payload)
            .then(res => {
                if (res.data.message === "production inserted") {
                    toast.success("Production is upladed", { position: "top-center", autoClose: 2000, closeOnClick: true });
                }
            })
            .catch(err => {
                // console.log(err);
            })


    }


    const fetchShiftData = () => {
        axios.get('https://www.api.textilediwanji.com/getshiftdata')
            .then(res => {
                // console.log(res.data);
                setShiftdata(res.data);
            })
            .catch(err => {
                // console.log(err);
            });
    };


    useEffect(() => {
        fetchShiftData();
    }, [])













    return (
        <>

            <div className="container-fluid" style={{ background: "#f6f9ff", height: "1500px " }}>


                <div className="row " style={{ height: "1500px" }}>


                    <div className="col-2">
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Sidebar>
                    </div>
                    <div className="col-10 m-0 " style={{ background: "#f6f9ff", height: "1500px " }}>
                        <div className="row d-flex justify-content-center">
                            <div className="row mt-4 mb-3">
                                <h3>PRODUCTION</h3>
                            </div>
                            <div className="col-11 bg-white border border-1 rounded-3">


                                <div className="row" style={{ height: "25px" }}>
                                    {alert && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <strong>Congratulation!</strong> {alert}
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>}
                                </div>

                                <form onSubmit={handlesubmit}>
                                    <div className="row d-flex justify-content-end">
                                        <div className="col-4">
                                            <label className="float-start">Date</label>
                                            <input className="form-control" type="date" onChange={e => setDate(e.target.value)} required></input>
                                        </div>
                                    </div>

                                    <div className="row d-flex justify-content-end mt-5">
                                        <p className="text-start text-danger">Note:- Please note that Pick, warp breakage, weft brakage, eff % and jobrate are total to average at the bottom of table</p>
                                        <div className="col-2">
                                            <button
                                                type="button"
                                                className="btn btn-primary float-end"
                                                onClick={addRow}
                                            >
                                                ADD ROW
                                            </button>
                                        </div>
                                    </div>
                                    <table className="table table-bordered mt-4">
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
                                                <th>Delete</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((row, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <select
                                                            className="form-select"
                                                            value={row.shift} // Use shift property for value
                                                            onChange={(e) => handleInputChange(index, "shift", e.target.value)} // Pass index and value
                                                        >
                                                            <option value="">--Please choose an option--</option>
                                                            {shiftdata.map((option, index) => (
                                                                <option key={index} value={option.sname}>{option.sname}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td><input className="form-control" name="loomno" value={row.loomno} onChange={e => handleInputChange(index, "loomno", e.target.value)} type="number" required></input></td>
                                                    <td><input className="form-control" name="setno" value={row.setno} onChange={e => handleInputChange(index, "setno", e.target.value)} type="number" required></input></td>
                                                    <td><input className="form-control" name="designno" value={row.designno} onChange={e => handleInputChange(index, "designno", e.target.value)} type="number" required></input></td>
                                                    <td><input className="form-control" name="pick" value={row.pick} onChange={e => handleInputChange(index, "pick", e.target.value)} type="number" required></input></td>
                                                    <td><input className="form-control" name="wpbr" value={row.wpbr} onChange={e => handleInputChange(index, "wpbr", e.target.value)} type="number" required></input></td>
                                                    <td><input className="form-control" name="wfbr" value={row.wfbr} onChange={e => handleInputChange(index, "wfbr", e.target.value)} type="number" required></input></td>
                                                    <td><input className="form-control" name="eff" value={row.eff} onChange={e => handleInputChange(index, "eff", e.target.value)} type="number" required></input></td>
                                                    <td><input className="form-control" name="jobrate" value={row.jobrate} onChange={e => handleInputChange(index, "jobrate", e.target.value)} type="number" required></input></td>
                                                    <td><input className="form-control" name='price' value={row.price} onChange={e => handleInputChange(index, "price", e.target.value)} type="number" required></input></td>
                                                    <td><input className="form-control" name="mtr" value={row.mtr} onChange={e => handleInputChange(index, "mtr", e.target.value)} type="number" required></input></td>
                                                    <td><input className="form-control" name='totalprice' value={row.totalprice} onChange={e => handleInputChange(index, "totalprice", e.target.value)} type="number" required></input></td>
                                                    <td><button className="btn btn-danger" type="button" onClick={() => deleteRow(index)}>DELETE</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={5}>Total</td>
                                                <td>{avpick.toFixed(2)}</td>
                                                <td>{avgwarpbr.toFixed(2)}</td>
                                                <td>{avgweftbr.toFixed(2)}</td>
                                                <td>{avrageeff.toFixed(2)}</td>
                                                <td>{avragejobrate.toFixed(2)}</td>
                                                <td></td>
                                                <td>{avragemtr.toFixed(2)}</td>
                                                <td>{totalprice.toFixed(2)}</td>
                                                <td></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <div className="row mt-3 d-flex justify-content-end">
                                        <div className="col-2">
                                            <button className="btn btn-primary float-end mb-4" type="submit">SUBMIT</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}


export default Production;