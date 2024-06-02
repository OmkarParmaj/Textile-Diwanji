import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';

const Beaminward = ({ isLoggedIn, setIsLoggedIn }) => {
  const [alert, setAlert] = useState("");
  const [company, setCompany] = useState([]);
  const [party, setParty] = useState([]);
  const [selectCompany, setSelectCompany] = useState();
  const [selectParty, setSelectParty] = useState();
  const [uniqueid, setUniqueid] = useState(0);
  const [uid, setUid] = useState("");
  const [values, setValues] = useState({
    Date: "",
   
    SetNo: "",
    DesignNo: "",
    WarpCount: "",
    WeftCount: "",
    Reed: "",
    Pick: "",
    SizingName: "",
    SizingMtr: "",
    Count1: "",
    Count2: "",
    Count3: "",
    Count4: "",
    Count5: "",
    Countwt1: "",
    Countwt2: "",
    Countwt3: "",
    Countwt4: "",
    Countwt5: "",
    width: ""
  });

  const handleCompanySelect = (e) => {
    setSelectCompany(e.target.value);
  };

  const handlePartySelect = (e) => {
    setSelectParty(e.target.value);
  };

  const val = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };

  const navigate = useNavigate();


  useEffect(() => {
axios.get('https://www.api.textilediwanji.com/beaminwarduniqueidno')
.then(res => {

  const data = res.data;
        if (data.length > 0) {
          const lastuidno = data[data.length - 1].UID;
          setUniqueid(lastuidno + 1); // Set uniqueid to the next available UID
          setUid(lastuidno + 1); // Initialize uid with the last UID
        }
        else {
          setUniqueid(uniqueid + 1);
          setUid(uid + 1);
        }
})
.catch(err => {

})
  },[])

  useEffect(() => {
    axios.get('https://www.api.textilediwanji.com/company')
      .then(res => {
        setCompany(res.data);
      })
      .catch(err => {
        // console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get('https://www.api.textilediwanji.com/partyname')
      .then(res => {
        setParty(res.data);
      })
      .catch(err => {
        // console.log(err);
      });
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  const submitData = (e) => {
    e.preventDefault();
    const payload = {
      Date: values.Date, 
      uid,
      SetNo: values.SetNo,
      DesignNo: values.DesignNo,
      WarpCount: values.WarpCount,
      WeftCount: values.WeftCount,
      Reed: values.Reed,
      Pick: values.Pick,
      SizingName: values.SizingName,
      SizingMtr: values.SizingMtr,
      Count1: values.Count1,
      Count2: values.Count2,
      Count3: values.Count3,
      Count4: values.Count4,
      Count5: values.Count5,
      Countwt1: values.Countwt1,
      Countwt2: values.Countwt2,
      Countwt3: values.Countwt3,
      Countwt4: values.Countwt4,
      Countwt5: values.Countwt5,
      selectCompany,
      selectParty,
      width: values.width,
    };
    axios.post('https://www.api.textilediwanji.com/beaminward', payload)
      .then((res) => {
        // console.log(res);
        if (res.data.message === "inserted") {
          toast.success("Data submitted successfully!", { position: "top-center", autoClose: 2000, closeOnClick: true});
        }
      })
      .catch((err) => {
        // console.log("Failed to submit data to database", err);
      });
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className='container-fluid bg-light'>
        <div className='row'>
          <div className='col-2'>
          <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </div>
          <div className='col-9 ms-5'>
            

            <form onSubmit={submitData}>
              <div className='row border rounded-5 mt-4 mb-5 bg-white'>
                <div className='row'>
                  <p className='mt-2 ms-3 mb-2' style={{ fontSize: "30px" }}>BEAM INWARD</p>
                </div>
                <hr></hr>
                <div className='row mb-3 mt-3 ms-1 me-5 ' >
                  <div className='col-3'>
                    <label className='text-danger float-start'>Select company <sup>*</sup></label>
                    <div className="input-group mb-3">
                      <select className="form-select" value={selectCompany} onChange={handleCompanySelect} required>
                        <option value="">Choose company</option>
                        {company.map((comp, index) => (
                          <option key={index} value={comp.companyname}>{comp.companyname}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='col-3'>
                    <label className='text-danger float-start'>Select Party <sup>*</sup></label>
                    <div className="input-group mb-3">
                      <select className="form-select" value={selectParty} onChange={handlePartySelect} required>
                        <option value="">Choose party</option>
                        {party.map((p, index) => (
                          <option key={index} value={p.partyname}>{p.partyname}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='col-3'></div>
                  <div className='col-3'>
                    <label className='float-start mb-2'>Date</label>
                    <input className='form-control' type='date' name="Date" onChange={val("Date")} required></input>
                  </div>
                </div>
                <div className='row  ms-1 me-5'>
                  <div className='col-3'>
                    <label className='text-start float-start ' >UID(Unique Identification Number)</label>
                    <input className='form-control mt-2' type='number' value={uid} onChange={e => setUid(e.target.value)} style={{ height: "32px" }} ></input>
                  </div>
                  <div className='col-3'>
                    <label className='text-start float-start '>Set number</label>
                    <input className='form-control mt-2' type='number' onChange={val("SetNo")} style={{ height: "32px" }} required></input>
                  </div>
                  <div className='col-3'>
                    <label className='text-start float-start '>Design number</label>
                    <input className='form-control mt-2' type='number' onChange={val("DesignNo")} style={{ height: "32px" }} required></input>
                  </div>
                  <div className='col-3'>
                   <label className='text-start float-start'>Width/R.S</label>
                   <input className='form-control mt-2' type="number" onChange={val("width")} style={{ height: "32px"}} required></input>
                  </div>



                </div>

                <div className='row mt-2 ms-1 me-5'>
                  <div className='col-2'>
                    <label className='text-start float-start mt-2'>Warp count</label>
                    <input className='form-control mt-2' type='number' onChange={val("WarpCount")} style={{ height: "32px" }} required></input>
                  </div>
                  <div className='col-2'>
                    <label className='text-start float-start mt-2'>Weft count</label>
                    <input className='form-control mt-2' type='number' onChange={val("WeftCount")} style={{ height: "32px" }} required></input>
                  </div>
                  <div className='col-2'>
                    <label className='text-start float-start mt-2'>Reed</label>
                    <input className='form-control mt-2' type='number' onChange={val("Reed")} style={{ height: "32px" }} required></input>
                  </div>
                  <div className='col-2'>
                    <label className='text-start float-start mt-2'>Pick</label>
                    <input className='form-control mt-2' type='number' onChange={val("Pick")} style={{ height: "32px" }} required></input>
                  </div>
                  <div className='col-2'>
                    <label className='text-start float-start mt-2'>Sizing Name</label>
                    <input className='form-control mt-2' type='text' onChange={val("SizingName")} style={{ height: "32px" }} required></input>
                  </div>
                  <div className='col-2'>
                    <label className='text-start float-start mt-2'>Sizing meter</label>
                    <input className='form-control mt-2' type='number' onChange={val("SizingMtr")} style={{ height: "32px" }} required></input>
                  </div>
                </div>

 
                <div className='row mt-5 ms-1 me-5'>
                  <h6 className='text-start text-danger'>WEFT COUNT DETAILS</h6>
                  <div className='col-2'>
                    <label className='text-start float-start mt-2 '>Count 1</label>
                    <input className='form-control mt-2' type='number' onChange={val("Count1")} style={{ height: "32px" }} required></input>
                  </div>
                  <div className='col-2'>
                    <label className='text-start float-start mt-2'>Count 2</label>
                    <input className='form-control mt-2' type='number' onChange={val("Count2")} style={{ height: "32px" }} ></input>
                  </div>
                  <div className='col-2'>
                    <label className='text-start float-start mt-2'>Count 3</label>
                    <input className='form-control mt-2' type='number' onChange={val("Count3")} style={{ height: "32px" }} ></input>
                  </div>
                  <div className='col-2'>
                    <label className='text-start float-start mt-2'>Count 4</label>
                    <input className='form-control mt-2' type='number' onChange={val("Count4")} style={{ height: "32px" }} ></input>
                  </div>
                  <div className='col-2'>
                    <label className='text-start float-start mt-2'>Count 5</label>
                    <input className='form-control mt-2' type='number' onChange={val("Count5")} style={{ height: "32px" }} ></input>
                  </div>
                </div>

                <div className='row mt-2 ms-1 me-5'>
                  <div className='col-2'>
                    <label className=' float-start mt-2 '>Pick Pattern</label>
                    <input className='form-control mt-2' type='number' onChange={val("Countwt1")} style={{ height: "32px" }} required ></input>
                  </div>
                  <div className='col-2'>
                    <label className=' float-start mt-2'>Pick Pattern</label>
                    <input className='form-control mt-2' type='number' onChange={val("Countwt2")} style={{ height: "32px" }} ></input>
                  </div>
                  <div className='col-2'>
                    <label className=' float-start mt-2'>Pick Pattern</label>
                    <input className='form-control mt-2' type='number' onChange={val("Countwt3")} style={{ height: "32px" }} ></input>
                  </div>
                  <div className='col-2'>
                    <label className=' float-start mt-2'>Pick Pattern</label>
                    <input className='form-control mt-2' type='number' onChange={val("Countwt4")} style={{ height: "32px" }} ></input>
                  </div>
                  <div className='col-2'>
                    <label className=' float-start mt-2'>Pick Pattern</label>
                    <input className='form-control mt-2' type='number' onChange={val("Countwt5")} style={{ height: "32px" }} ></input>
                  </div>
                </div>
                <div className='row d-flex justify-content-end mt-5'>
                  <div className='col-2 mb-3 float-end '>
                    <button className='btn btn-primary' type='button' >Submit</button>
                  </div>
                </div>

              </div>
            </form>








          </div>
        </div>
      </div>

{/* i am changed this */}
    </>
  )
}

export default Beaminward