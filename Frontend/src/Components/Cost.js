import axios from "axios";
import React, { useState } from "react";
import Sidebar from "./Sidebar";





const Cost = ({isLoggedIn, setIsLoggedIn}) => {
    const [rowNum, setRowNum] = useState(2);
    const [rows, setRows] = useState([]);
    const [reed, setReed] = useState();
    const [width, setWidth] = useState();
    const [result, setResult] = useState(0);










    const addRow = () => {
        setRowNum(rowNum + 1);
        const newRow = {
            warCount: "",
            warpColor: "",
            warpPattern: "",
            warpRate: "",
            weftCount: "",
            weftColor: "",
            weftPattern: "",
            weftRate: "",

        };
        setRows([...rows, newRow]);
    };

    const deleteRow = index => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    const handleInputChange = (index, name, value) => {
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);
    };


    const handlesubmit = (e) => {
        e.preventDefault();

        const number = document.getElementById("number").value;
        const Description = document.getElementById("Description").value;
        const date = document.getElementById("date").value;
        const reed = document.getElementById("reed").value;
        const pick = document.getElementById("pick").value;
        const width = document.getElementById("width").value;
        const totalmtr = document.getElementById("totalmtr").value;
        const sizingprice = document.getElementById("sizingPrice").value;
        const weavingjob = document.getElementById("weavingJob").value;
        const profit = document.getElementById("profit").value;
        const gst = document.getElementById("GST").value;

        const payload = {
            number,
            Description,
            date,
            reed,
            pick,
            width,
            totalmtr,
            sizingprice,
            weavingjob,
            profit,
            gst,
            rows
        };

        axios.post('https://www.api.textilediwanji.com/cost', payload)
            .then(res => {
                // console.log(res.data);
                if (res.data.message === "Data inserted successfully") {
                    console.log("data submitted got data")
                }

            })
            .catch(err => {
                // console.log(err);
            })



    }



    ///////////













    ///////

    const handlemulchange = (e) => {
        const { name, value } = e.target;
        if (name === "reed") {
            setReed(value);
        } else if (name === "width") {
            setWidth(value);
        }
    
        if (!value || !width || !reed) {
            setResult(0);
        } else {
            const reedVal = parseFloat(name === "reed" ? value : reed);
            const widthVal = parseFloat(name === "width" ? value : width);
    
            if (!isNaN(reedVal) && !isNaN(widthVal)) {
                const resultValue = reedVal * widthVal;
                setResult(resultValue);
            }
        }
    };
    

    return (
        <>

            <div className="container-fluid">
                <div className="row d-flex">
                    <div className="col-2">
                    <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    </div>

                    <div className="col-10">
                        <form onSubmit={handlesubmit}>
                            <h3>This is Fabic costing page</h3>

                            <div className="row">
                                <div className="col-3">
                                    <label className="float-start">Number</label>
                                    <input id="number" className="form-control" type="number"></input>
                                    <label className="float-start">Description</label>
                                    <input id="Description" className="form-control" type="text"></input>
                                </div>
                                <div className="col-3"></div>
                                <div className="col-3"></div>
                                <div className="col-3 text-start">
                                    <label>Date</label>
                                    <input id="date" className="form-control" type="date"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <label>Reed</label>
                                    <input id="reed" className="form-control" name="reed" value={reed} onChange={handlemulchange}></input>
                                    <label>Pick</label>
                                    <input id="pick" className="form-control"></input>

                                </div>
                                <div className="col-3">
                                    <label>Width</label>
                                    <input id="width" className="form-control" name="width" value={width} onChange={handlemulchange}></input>
                                    <label>Total Mtr</label>
                                    <input id="totalmtr" className="form-control"></input>

                                </div>
                                <div className="col-3">
                                    <label>Sizing Price</label>
                                    <input id="sizingPrice" className="form-control"></input>
                                    <label>Weaving Job rate</label>
                                    <input id="weavingJob" className="form-control"></input>

                                </div>
                                <div className="col-3">
                                    <label>Profit</label>
                                    <input id="profit" className="form-control"></input>
                                    <label>GST</label>
                                    <input id="GST" className="form-control"></input>

                                </div>

                            </div>

                           <div className="row">
                           <p>Number is:- {result}</p>
                           </div>







                            <div className="row d-flex  justify-content-end mt-4 mb-3">
                                <div className="col-2 ">
                                    <button
                                        type="button"
                                        className="btn btn-primary float-end"
                                        onClick={addRow}
                                    >
                                        ADD ROW
                                    </button>
                                </div>
                            </div>
                            <div className="row">

                                <table className="table table-bordered">
                                    <thead>

                                        <tr>
                                            <th colSpan={2}>Warp count</th>
                                            <th>Color</th>
                                            <th>Pattern</th>
                                            <th>%</th>
                                            <th>Rate</th>
                                            <th colSpan={2}>Weft count</th>
                                            <th>Color</th>
                                            <th>Pattern</th>
                                            <th>%</th>
                                            <th>Rate</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, index) => (
                                            <tr>
                                                <td><input className="form-control" value={index + 1} ></input></td>
                                                <td><input className="form-control" name="warCount" value={row.warpCount} onChange={e => handleInputChange(index, "warpCount", e.target.value)} ></input></td>

                                                <td><input className="form-control" name="warpColor" value={row.warpColor} onChange={e => handleInputChange(index, "warpColor", e.target.value)}></input></td>
                                                <td><input className="form-control" name="warpPattern" value={row.warpPattern} onChange={e => handleInputChange(index, "warpPattern", e.target.value)}></input></td>
                                                <td><input className="form-control" ></input></td>
                                                <td><input className="form-control" name="warpRate" value={row.warpRate} onChange={e => handleInputChange(index, "warpRate", e.target.value)}></input></td>
                                                <td><input className="form-control" value={index + 1}></input></td>
                                                <td><input className="form-control" name="weftCount" value={row.weftCount} onChange={e => handleInputChange(index, "weftCount", e.target.value)}></input></td>
                                                <td><input className="form-control" name="weftColor" value={row.weftColor} onChange={e => handleInputChange(index, "weftColor", e.target.value)}></input></td>
                                                <td><input className="form-control" name="weftPattern" value={row.weftPattern} onChange={e => handleInputChange(index, "weftPattern", e.target.value)}></input></td>
                                                <td><input className="form-control" ></input></td>
                                                <td><input className="form-control" name="weftRate" value={row.weftRate} onChange={e => handleInputChange(index, "weftRate", e.target.value)}></input></td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() => deleteRow(index)}
                                                    >
                                                        DELETE
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                                <button className="btn btn-success " type="submit">SUBMIT</button>
                            </div>
                        </form>
                    </div>


                </div>
            </div>



        </>
    );
}

export default Cost;