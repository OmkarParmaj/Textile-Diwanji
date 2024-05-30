import React, { useEffect, useState } from "react";
import { Navigate, json } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

const Packslip = ({ isLoggedIn, setIsLoggedIn }) => {
  const [rowNum, setRowNum] = useState(2);
  const [totalmtr, setTotalmtr] = useState(0);
  const [totalwt, setTotalwt] = useState(0);
  const [rows, setRows] = useState([]);
  const [alert, setAlert] = useState("");
  const [packingslipno, setPackingslipno] = useState("");
  const [uid, setUid] = useState("");
  const [date, setDate] = useState("");
  const [setno, setSetno] = useState("");
  const [designno, setDesignno] = useState("");
  const [totalrolls, setTotalrolls] = useState("");
  const [packno, setPackno] = useState("");
  const [dno, setDno] = useState([]);
  const [beamdesignno, setBeamdesignno] = useState([]);
  const [url, setUrl] = useState("");


  useEffect(() => {
    setUrl(`http:www.textilediwanji.com/packprint/${packno}/${uid}`);
  }, [packno, uid]);

  useEffect(() => {
    axios.get('https://www.api.textilediwanji.com/packslipnofetch')
      .then(res => {
        const data = res.data;
        if (data.length > 0) {
          const lastpackslipno = data[data.length - 1].Packingslipno;
          setPackno(lastpackslipno + 1);
        } else {
          setPackno(packno + 1);
        }
      })
      .catch(err => {
        // console.log(err);
      })
  }, [])


  useEffect(() => {
    axios.post('https://www.api.textilediwanji.com/packislipbeam', { designno })
      .then(res => {
        // console.log(res.data);
        setDno(res.data[0].yes);
      })
      .catch(err => {
        // console.log(err);
      })
  }, [designno])



  useEffect(() => {
    calculateTotals();
    setTotalrolls(rows.length);
  }, [rows]);

  function calculateTotals() {
    let totalMtr = 0;
    let totalWeight = 0;

    rows.forEach(row => {
      totalMtr += parseFloat(row.mtr) || 0;
      totalWeight += parseFloat(row.weight) || 0;
    });

    setTotalmtr(totalMtr);
    setTotalwt(totalWeight);

  }

  const addRow = () => {
    setRowNum(rowNum + 1);
    const newRow = {
      rollNo: "",
      mtr: "",
      weight: ""
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

  // const handleSubmit = async () => {
  //   try {
  //     await axios.post("https://www.api.textilediwanji.com/packslip", rows);
  //     alert("Data submitted successfully!");
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //     alert("An error occurred while submitting data.");
  //   }
  // };






  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }





  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      date,
      packno,
      setno,
      designno,
      uid,
      rows,
      totalmtr,
      totalwt,
      totalrolls
    }

    if (dno === 1) {
      axios.post('https://www.api.textilediwanji.com/packslip', payload)
        .then(res => {
          //  alert("Data has submitted");
          // console.log("data has submiited");
          if (res.data.message === "Data inserted successfully") {
            toast.success("Data has been subimmited successfully!", { position: "top-center", autoClose: 2000, closeOnClick: true });
          }

        })
        .catch(err => {
          // console.log("err in the inserting data", err);
        })
    }
    else {
      toast.error("Design no is not present", { position: "top-center", autoClose: 2000, closeOnClick: true });
    }



  }






  // const sendPackslip = () => {
  //   // setLoading(true);
  //   axios.post("https://www.api.textilediwanji.com/mailpackslip", { url })
  //     .then(() => {
        
  //       toast.success("Packing slip sent", { position: "top-center", autoClose: 2000, closeOnClick: true });
  //       // setEmail("");
  //     })
  //     .catch(error => {
  //       toast.error("Packing slip not sent", { position: "top-center", autoClose: 2000, closeOnClick: true });
  //     })
  //     .finally(() => {
  //       // setLoading(false);
  //     });
  // };





  return (
    <div className="container-fluid" style={{ background: "#f6f9ff", height: "1500px " }}>
      <div className="row">
        <div className="col-2">
          <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> 
        </div>
        <div className="col-10 m-0 " style={{height: "1000px"}}>
          <div className="row d-flex justify-content-center mt-5">
            <div className="col-11 bg-white border border-1 rounded-3">
              <div className="row mt-3">
                <h3>PACKING SLIP</h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row d-flex justify-content-end me-2">
                  <div className="col-2">
                    <label className="float-start">Date <sup className="text-danger">*</sup></label>
                    <input type="date" className="form-control" onChange={e => setDate(e.target.value)} required></input>
                  </div>
                </div>
                <div className="row ms-3 me-3"> 
                  <div className="col-2">
                    <label className="float-start">Packing slip no</label>
                    <input className="form-control" value={packno} type="number" required onChange={e => setPackno(e.target.value)}></input>
                  </div>


                </div>

                <div className="row mt-3 ms-3 me-3" >
                  <div className="col-2">
                    <label className="float-start">UID</label>
                    <input className="form-control" type="number" required onChange={e => setUid(e.target.value)}></input>
                  </div>
                  <div className="col-2">
                    <label className="float-start">Set No</label>
                    <input className="form-control" type="number" required onChange={e => setSetno(e.target.value)}></input>
                  </div>
                  <div className="col-2">
                    <label className="float-start">Design No</label>
                    <input className="form-control" type="number" required onChange={e => setDesignno(e.target.value)}></input>
                  </div>
                </div>

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
                <p className="text-start">Note:- <span className="text-danger">You can add development fabric sample''s meter to packing slip at last row</span></p>
                <div className="row ms-2 me-2">
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
                      {rows.map((row, index) => (
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
                        <td colSpan="2">Total</td>
                        <td>{totalmtr.toFixed(2)}</td>
                        <td>{totalwt.toFixed(2)}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="row justify-content-end mb-4">
                  <div className="col-3 ">
                    <button
                      type="submit"
                      className="btn btn-success float-end"
                      // onClick={sendPackslip}
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
  );
};

export default Packslip;
