import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

const Packingslipedit = ({ isLoggedIn, setIsLoggedIn }) => {
    const { id } = useParams(); // Extract packingslipno from URL
    const [rowNum, setRowNum] = useState(2);
    const [totalmtr, setTotalmtr] = useState(0);
    const [totalwt, setTotalwt] = useState(0);
    const [rows, setRows] = useState([]);
    const [alert, setAlert] = useState("");
    const [uid, setUid] = useState("");
    const [date, setDate] = useState("");
    const [setno, setSetno] = useState("");
    const [designno, setDesignno] = useState("");
    const [totalrolls, setTotalrolls] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [packno, setPackno] = useState("");
    const [packdata, setPackdata] = useState({
        date: "",
        packingslipno: "",
        uid: "",
        SetNo: "",
        DesignNo: ""
    });
    
    const [packingrowdata, setPackingrowdata] = useState([]);

    // Function to calculate total meters and total weight
    const calculateTotals = () => {
        let totalMtr = 0;
        let totalWeight = 0;

        packingrowdata.forEach(row => {
            totalMtr += parseFloat(row.mtr) || 0;
            totalWeight += parseFloat(row.weight) || 0;
        });

        setTotalmtr(totalMtr);
        setTotalwt(totalWeight);
    };

    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []);

    useEffect(() => {
        calculateTotals(); // Calculate totals when packing row data changes
        setTotalrolls(packingrowdata.length)
    }, [packingrowdata]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://www.api.textilediwanji.com/packingslipedit/${id}`);

            // console.log(response.data);
            setPackdata(response.data[0]);
            setDate(response.data[0].date);
            setPackno(response.data[0].Packingslipno);
            setUid(response.data[0].uid);
            setSetno(response.data[0].SetNo);
            setDesignno(response.data[0].DesignNo);

            const innerdataarray = JSON.parse(response.data[0].packingdata);
          
          


            setPackingrowdata(innerdataarray);
            
            // const sumMtr = innerdataarray.data.reduce((acc, packdata) => acc + packdata.toalmtr, 0);
            
            // setTotalmtr(sumMtr);
            

        } catch (error) {
            // console.log(error);
        }
    };

    const addRow = () => {
        setRowNum(prevRowNum => prevRowNum + 1);
        const newRow = {
            rollNo: "",
            mtr: "",
            weight: ""
        };
        setPackingrowdata(prevRows => [...prevRows, newRow]);
    };

    const deleteRow = index => {
        const updatedRows = [...packingrowdata];
        updatedRows.splice(index, 1);
        setPackingrowdata(updatedRows);
    };

    const handleInputChange = (index, name, value) => {
        const updatedRows = [...packingrowdata];
        updatedRows[index][name] = value;
        setPackingrowdata(updatedRows);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            date: date,
            packingslipno: packno,
            SetNo: setno,
            DesignNo: designno,
            uid: uid,
            packingrowdata,
            totalmtr,
            totalwt,
            totalrolls
        };

        try {
            if (id) {
                const res = await axios.put(`https://www.api.textilediwanji.com/packingslipedit/${id}`, payload);
                // console.log(res.data);
                if(res.data.message === "data updated") {
                    toast.success("Data has been Updated!", { position: "top-center", autoClose: 2000, closeOnClick: true});
                }
            } else {
                const res = await axios.post("https://www.api.textilediwanji.com/packslip", payload);
                // console.log(res.data);
                toast.success("Data submitted successfully!", { position: "top-center", autoClose: 2000, closeOnClick: true});
            }
        } catch (err) {
            // console.log(err);
        }
    };

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                </div>
                <div className="col-10 border border-1">
                    <div className="row">
                        <h1>Packing slip </h1>
                    </div>
                    {alert && (
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>Congratulations!</strong> {alert}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="row d-flex justify-content-end">
                            <div className="col-2">
                                <label className="float-start">Date</label>
                                <input type="date" name="date" className="form-control" onChange={e => setDate(e.target.value)} value={date} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label className="float-start">Packing slip no </label>
                                <input className="form-control" name="packingslipno" type="number" required onChange={e => setPackno(e.target.value)} value={packno} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-2">
                                <label className="float-start">UID</label>
                                <input className="form-control" name="uid" type="number" required onChange={e => setUid(e.target.value)} value={uid} />
                            </div>
                            <div className="col-2">
                                <label className="float-start">Set No</label>
                                <input className="form-control" type="number" name="SetNo" required onChange={e => setSetno(e.target.value)} value={setno} />
                            </div>
                            <div className="col-2">
                                <label className="float-start">Design No</label>
                                <input className="form-control" type="number" name="DesignNo" required onChange={e => setDesignno(e.target.value)} value={designno} />
                            </div>
                        </div>
                        <div className="row pt-3 justify-content-end mb-4">
                            <div className="col-3 border">
                                <button type="button" className="btn btn-primary float-end" onClick={addRow}>ADD ROW</button>
                            </div>
                        </div>
                        <div className="row">
                            <table className="table text-center table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr no</th>
                                        <th scope="col">Roll No</th>
                                        <th scope="col">Mtr</th>
                                        <th scope="col">Weight</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {packingrowdata.map((row, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <input
                                                    name="rollNo"
                                                    type="text"
                                                    className="form-control"
                                                    value={row.rollNo}
                                                    onChange={e => handleInputChange(index, "rollNo", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    name="mtr"
                                                    type="text"
                                                    className="form-control"
                                                    value={row.mtr}
                                                    onChange={e => handleInputChange(index, "mtr", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    name="weight"
                                                    type="text"
                                                    className="form-control"
                                                    value={row.weight}
                                                    onChange={e => handleInputChange(index, "weight", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-danger" onClick={() => deleteRow(index)}>DELETE</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="2">Total</td>
                                        <td>{totalmtr.toFixed(2)}</td>
                                        <td>{totalwt.toFixed(2)}</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="row justify-content-center">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Packingslipedit;
