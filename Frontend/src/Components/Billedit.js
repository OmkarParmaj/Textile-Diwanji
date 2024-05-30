import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";




const Billedit = ({ isLoggedIn, setIsLoggedIn }) => {

    const [rowNum, setRowNum] = useState(2);
    const [totalmtr, setTotalmtr] = useState(0);
    const [rows, setRows] = useState([]);
    const [alert, setAlert] = useState("");
    const [billno, setBillno] = useState("");
    const [selectedOption, setSelectedOption] = useState('');
    const [partydata, setPartydata] = useState([]);
    const [totalquantity, setTotalquantity] = useState("");
    const [cgst, setCgst] = useState(0);
    const [sgst, setSgst] = useState(0);
    const [date, setDate] = useState("");
    const [billdata, setBilldata] = useState([]);
    const [billtabledata, setBilltabledata] = useState([]);
    const [date1, setDate1] = useState("");
    const [billno1, setBillno1] = useState("");
    const [setno1, setSetno1] = useState("");
    const [designno1, setDesignno1] = useState("");
    const [uid1, setUid1] = useState("");
    const [packslipno1, setPackslipno1] = useState("");
    const [tabledata, setTabledata] = useState([]);
    const [partynamedata, setPartynamedata] = useState("");



    const [othergst, setOthergst] = useState(0);

    const { id } = useParams();

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    useEffect(() => {
        calculateTotals();
    }, [tabledata]);

    function calculateTotals() {
        let totalMtr = 0;
        tabledata.forEach(row => {
            totalMtr += parseFloat(row.Amount) || 0;
        });
        setTotalmtr(totalMtr);

        let tquantity = 0;

        tabledata.forEach(ro => {
            tquantity += parseFloat(ro.Quantity) || 0;
        });

        setTotalquantity(tquantity);

        let cgst = 0;

        tabledata.forEach(roo => {
            cgst += parseFloat(roo.CGST) || 0;
        });
        setCgst(cgst);

        let sgst = 0;

        tabledata.forEach(roraw => {
            sgst += parseFloat(roraw.SGST) || 0;
        });
        setSgst(sgst);


        let othgs = 0;

        tabledata.forEach(row => {
            othgs += parseFloat(row.IGST) || 0;
        });

        setOthergst(othgs);


    }

    useEffect(() => {
        axios.get('https://www.api.textilediwanji.com/party')
            .then(res => {
                setPartydata(res.data);
            })
            .catch(err => {
                // console.log("err in the fetching data", err);
            });
    }, []);

    const addRow = () => {
        setRowNum(prevRowNum => prevRowNum + 1);
        const newRow = {
            Designno: "",
            Description: "",
            Quantity: "",
            Price: "",
            Totalprice: "",
            CGST: "",
            SGST: "",
            IGST: "",
            Amount: ""
        };
        setTabledata(prevRows => [...prevRows, newRow]);
    };

    const deleteRow = index => {
        const updatedRows = [...tabledata];
        updatedRows.splice(index, 1);
        setTabledata(updatedRows);
    };

    const handleInputChange = (index, name, value) => {
        const updatedRows = [...tabledata];
        updatedRows[index][name] = value;

        // Calculate Totalprice when Quantity or Price is changed
        if (name === 'Quantity' || name === 'Price' || name === 'CGST' || name === 'SGST' || name === 'IGST') {
            const quantity = parseFloat(updatedRows[index]['Quantity']) || 0;
            const price = parseFloat(updatedRows[index]['Price']) || 0;
            const cgst = parseFloat(updatedRows[index]['CGST']) || 0;
            const sgst = parseFloat(updatedRows[index]['SGST']) || 0;
            const IGST = parseFloat(updatedRows[index]['IGST']) || 0;

            updatedRows[index]['Totalprice'] = (quantity * price).toFixed(2); // Calculate total and round to 2 decimal places
            updatedRows[index]['Amount'] = ((quantity * price) + cgst + sgst + IGST).toFixed(2);
        }

        setTabledata(updatedRows);
    };


    useEffect(() => {
        axios.get(`https://www.api.textilediwanji.com/billedit/${id}`)
            .then(res => {
                // console.log(res.data)
                setBilldata(res.data);
                // setBilltabledata(res.data[0]);
                const day = new Date(res.data[0].date).toISOString().slice(0, 10)
                setDate1(day);
                setSetno1(res.data[0].SetNo);
                setDesignno1(res.data[0].DesignNo);
                setPackslipno1(res.data[0].billpackingslipno);
                setBillno1(res.data[0].billNo);
                setPartynamedata(res.data[0].partyname);
                setUid1(res.data[0].UID);


                const bdata = JSON.parse(res.data[0].tableData);

                setTabledata(bdata);

            })
            .catch(err => {
                // console.log("err fetching data", err);
            });
    }, []);





    const handleSubmit = (e) => {
        e.preventDefault();
        const date = document.getElementById("datenumber").value;
        const billNo = document.getElementById("billNo").value;
        const setNo = document.getElementById("setNo").value;
        // const designNo = document.getElementById("designNo").value;
        const Uid = document.getElementById("uidnumber").value;
        const billpackingslipno = document.getElementById("billpackingslipno").value
        const payload = {
            date,
            billNo,
            setNo,

            tabledata,
            Uid,
            selectedOption,
            totalmtr,
            totalquantity,
            billpackingslipno,
            cgst,
            sgst,
            othergst
        };




        axios.put(`https://www.api.textilediwanji.com/billingedit/${id}`, payload)
            .then(res => {
                // console.log("Data has been submitted successfully!");

                if (res.data.message === "bill updated") {
                    toast.success("Bill updated succefully!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                }
            })
            .catch(err => {
                // console.log("Error in inserting data:", err);
            });
    };



    if (isLoggedIn === false) {
        <Navigate to="/login" replace></Navigate>
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-2">
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    </div>
                    <div className="col-10 border border-1">
                        <h1>BILLING </h1>
                        {alert && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>Congractulation!</strong> {alert}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>}
                        <div className="row mt-3 mb-3 d-flex justify-content-between ">
                            <div className="col-2">
                                <label className="float-start">Bill no</label>
                                <input id="billNo" className="form-control" type="number" value={billno1} ></input>
                            </div>
                            <div className="col-2">
                                <label className="float-start">Date</label>
                                <input className="form-control" type="date" id="datenumber" value={date1}></input>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-start">
                            <div className="col-2 mb-3">
                                <label className="float-start">Set No</label>
                                <input id="setNo" className="form-control" type="number" value={setno1}></input>

                                <label className="mt-3 float-start">Packing slip No</label>
                                <input id="billpackingslipno" className="form-control" type="number" value={billno1}></input>

                                <label className="mt-3 float-start">UID</label>
                                <input id="uidnumber" className="form-control" type="number" value={uid1} ></input>

                                <label className="float-start mt-3">Comapany Name</label>
                                <select className="form-select" value={selectedOption} onChange={handleSelectChange}>



                                    <option value="">--Please choose an option--</option>
                                    {partydata.map((option, index) => (
                                        <option key={index} value={option.partyname}>{option.partyname}</option>
                                    ))}
                                </select>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <span>Your selected party is : {selectedOption}</span>
                            </div>
                            {/* <div className="col-3"><span>Person Name: {abc.personname}</span></div>
                            <div className="col-3">Address: {abc.address}</div>
                            <div className="col-3">GST: {abc.gst}</div>
                            <div className="col-3">Phone no: {abc.phoneno}</div> */}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row pt-3 justify-content-end mb-4">
                                <div className="col-3 ">
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
                                <table className="table text-center table-bordered">
                                    <thead>
                                        <tr>

                                            <th>Design No</th>
                                            <th scope="col">Discription</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Total Price</th>
                                            <th>CGST</th>
                                            <th>SGST</th>
                                            <th>IGST</th>
                                            <th>Amount</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tabledata.map((row, index) => (
                                            <tr key={index}>

                                                <td>
                                                    <input
                                                        name="Designno"
                                                        type="number"
                                                        className="form-control"
                                                        value={row.Designno}
                                                        onChange={e => handleInputChange(index, "Designno", e.target.value)}
                                                    />
                                                </td>




                                                <td>
                                                    <input
                                                        name="Description"
                                                        type="text"
                                                        className="form-control"
                                                        value={row.Description}
                                                        onChange={e => handleInputChange(index, "Description", e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        name="Quantity"
                                                        type="number"
                                                        className="form-control"
                                                        value={row.Quantity}
                                                        onChange={e => handleInputChange(index, "Quantity", e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        name="Price"
                                                        type="number"
                                                        className="form-control"
                                                        value={row.Price}
                                                        onChange={e => handleInputChange(index, "Price", e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        name="Totalprice"
                                                        type="number"
                                                        className="form-control"
                                                        value={row.Totalprice}
                                                        onChange={e => handleInputChange(index, "Totalprice", e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        name="CGST"
                                                        type="number"
                                                        className="form-control"
                                                        value={row.CGST}
                                                        onChange={e => handleInputChange(index, "CGST", e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        name="SGST"
                                                        type="number"
                                                        className="form-control"
                                                        value={row.SGST}
                                                        onChange={e => handleInputChange(index, "SGST", e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        name="IGST"
                                                        type="number"
                                                        className="form-control"
                                                        value={row.IGST}
                                                        onChange={e => handleInputChange(index, "IGST", e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        name="Amount"
                                                        type="number"
                                                        className="form-control"
                                                        value={row.Amount}
                                                        onChange={e => handleInputChange(index, "Amount", e.target.value)}
                                                    />
                                                </td>
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
                                    <tfoot>
                                        <tr>
                                            <td colSpan={2}>Total</td>
                                            <td>{totalquantity}</td>
                                            <td></td>
                                            <td></td>
                                            <td colSpan="1">{cgst}</td>
                                            <td>{sgst}</td>
                                            <td>{othergst}</td>
                                            <td>{totalmtr.toFixed(2)}</td>
                                            {/* <td>{totalwt.toFixed(2)}</td> */}
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="row justify-content-center">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    );
}



export default Billedit;