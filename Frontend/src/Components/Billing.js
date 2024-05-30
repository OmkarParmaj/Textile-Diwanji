import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

const Billing = ({ isLoggedIn, setIsLoggedIn }) => {
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
    const [billdatadate, setBilldatadate] = useState("");
    // const [dno, setDno] = useState([]);
    // const [designNo, setDesignNo] = useState("");
    const [setNo, setSetNo] = useState("");

    const [othergst, setOthergst] = useState(0);


    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    useEffect(() => {
        calculateTotals();
    }, [rows]);

    function calculateTotals() {
        let totalMtr = 0;
        rows.forEach(row => {
            totalMtr += parseFloat(row.Amount) || 0;
        });
        setTotalmtr(totalMtr);

        let tquantity = 0;

        rows.forEach(ro => {
            tquantity += parseFloat(ro.Quantity) || 0;
        });

        setTotalquantity(tquantity);

        let cgst = 0;

        rows.forEach(roo => {
            cgst += parseFloat(roo.CGST) || 0;
        });
        setCgst(cgst);

        let sgst = 0;

        rows.forEach(roraw => {
            sgst += parseFloat(roraw.SGST) || 0;
        });
        setSgst(sgst);


        let othgs = 0;

        rows.forEach(row => {
            othgs += parseFloat(row.IGST) || 0;
        });

        setOthergst(othgs);


    }

    // useEffect(() => {
    //     axios.post('https://www.api.textilediwanji.com/billingdesignnofetch', { designNo })
    //         .then(res => {
    //             setDno(res.data[0].yes);
    //         })
    //         .catch(err => {
    //             // console.log(err);
    //         })

    // }, [designNo])

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
        setRows(prevRows => [...prevRows, newRow]);
    };

    const deleteRow = index => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    const handleInputChange = (index, name, value) => {
        const updatedRows = [...rows];
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

        setRows(updatedRows);
    };


    useEffect(() => {
        axios.get('https://www.api.textilediwanji.com/billing')
            .then(res => {

                setBilldata(res.data);

                const bidata = res.data
                const data = res.data;
                if (data.length > 0) {
                    const lastBill = data[data.length - 1].billNo;
                    setBillno(lastBill + 1);
                } else {
                    setBillno(billno + 1);
                }
            })
            .catch(err => {
                // console.log("err fetching data", err);
            });
    }, []);





    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!date) {
            toast.error("Please fill Date", { position: "top-center", autoClose: 2000, closeOnClick: true });
            return;
        }
    
        if (!setNo) {
            toast.error("Please fill set no", { position: "top-center", autoClose: 2000, closeOnClick: true });
            return;
        }

        else {

    
       
            // const bilno = document.getElementById("bilno").value;
            const Uid = document.getElementById("Uid").value;
            const billpackingslipno = document.getElementById("billpackingslipno").value
            const payload = {
                date,
                billno,
                setNo,
            
                rows,
                Uid,
                selectedOption,
                totalmtr,
                totalquantity,
                billpackingslipno,
                cgst,
                sgst,
                othergst
            };
    
            axios.post('https://www.api.textilediwanji.com/billingpost', payload)
                .then(res => {
                    // console.log("Data has been submitted successfully!");
    
                    if (res.data.message === "Date cannot be earlier than or equal to existing record dates") {
                        toast.success("Date can not be less than Today", { position: "top-center", autoClose: 2000, closeOnClick: true });
                    }
    
                    if (res.data.message === 'Data inserted successfully') {
                        toast.success("Data submitted successfully", { position: "top-center", autoClose: 2000, closeOnClick: true });
    
                        // Update packingslip table status to 'yes' for the provided billpackingslipno
                        axios.post('https://www.api.textilediwanji.com/updatePackingslipStatus', { billpackingslipno })
                            .then(response => {
                                // console.log("Packingslip status updated successfully!");
                            })
                            .catch(error => {
                                console.error("Error updating packingslip status:", error);
                            });
                    }
                })
                .catch(err => {
                    console.log("Error in inserting data:", err);
                });

        }
       
    };
    




    return (
        <>
            <div className="container-fluid" style={{ background: "#f6f9ff", height: "1500px " }}>
                <div className="row ">
                    <div className="col-2">
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    </div>
                    <div className="col-10 " style={{ background: "#f6f9ff", height: "1500px " }}>
                        <div className="row d-flex justify-content-center mt-4">
                            <div className="col-11 bg-white border border-1 shadow-sm rounded-4">
                                <h1 className="mt-3 mb-3">BILLING </h1>
                                {alert && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                    <strong>Congractulation!</strong> {alert}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>}
                                <div className="row mt-3 mb-3 d-flex justify-content-between ms-3 me-3">
                                    <div className="col-2">
                                        <label className="float-start">Bill no</label>
                                        <input id="bilno" className="form-control" type="number" value={billno} onChange={e => setBillno(e.target.value)} ></input>
                                    </div>
                                    <div className="col-2">
                                        <label className="float-start">Date</label>
                                        <input className="form-control" type="date" onChange={e => setDate(e.target.value)} required ></input>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-start ms-3 me-3">
                                    <div className="col-2 mb-3">
                                        <label className="float-start">Set No</label>
                                        <input id="setNo" className="form-control" type="number" required onChange={e => setSetNo(e.target.value)}  ></input>
                                       
                                        <label className="mt-3 float-start">Packing slip No</label>
                                        <input id="billpackingslipno" className="form-control" type="number" required ></input>

                                        <label className="float-start mt-3">Comapany Name</label>
                                        <select className="form-select" value={selectedOption} onChange={handleSelectChange} required>
                                            <option value="">--Please choose an option--</option>
                                            {partydata.map((option, index) => (
                                                <option key={index} value={option.partyname}>{option.partyname}</option>
                                            ))}
                                        </select>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-2">
                                        <span>You have selected option is : {selectedOption}</span>
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
                                    <div className="row ms-3 me-3">
                                        <table className="table text-center table-bordered">
                                            <thead>
                                                <tr>

                                                    <th scope="col">UID</th>
                                                    <th scope="col">Design No</th>
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
                                                {rows.map((row, index) => (
                                                    <tr key={index}>



                                                        <td>
                                                            <input
                                                                name="Uid"
                                                                type="number"
                                                                className="form-control"
                                                                id="Uid"
                                                                required
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                name="Designno"
                                                                type="text"
                                                                className="form-control"
                                                                value={row.Designno}
                                                                onChange={e => handleInputChange(index, "Designno", e.target.value)}
                                                                required
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                name="Description"
                                                                type="text"
                                                                className="form-control"
                                                                value={row.Description}
                                                                onChange={e => handleInputChange(index, "Description", e.target.value)}
                                                                required
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
                                                    <td colSpan="3">Total</td>
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
                                    <div className="row justify-content-end  mt-3 mb-5">
                                        <div className="col-3 float-end">
                                        <button
                                            type="submit"
                                            className="btn btn-success float-end"
                                        >
                                            Submit
                                        </button>
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


export default Billing