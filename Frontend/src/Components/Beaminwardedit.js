 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

const Beaminwardedit = ({isLoggedIn, setIsLoggedIn}) => {
  const [alert, setAlert] = useState("");
  const [temp, setTemp] = useState({
    Date: "",
    UID: "",
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
    width: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://www.api.textilediwanji.com/beaminwardeditchange/${id}`);
        const data = response.data;
        if (data && data.length > 0) {
          const firstItem = data[0];
          setTemp({
            Date: firstItem.Date || "",
            UID: firstItem.UID || "",
            SetNo: firstItem.SetNo || "",
            DesignNo: firstItem.DesignNo || "",
            WarpCount: firstItem.WarpCount || "",
            WeftCount: firstItem.WeftCount || "",
            Reed: firstItem.Reed || "",
            Pick: firstItem.Pick || "",
            SizingName: firstItem.SizingName || "",
            SizingMtr: firstItem.SizingMtr || "",
            Count1: firstItem.Count1 || "",
            Count2: firstItem.Count2 || "",
            Count3: firstItem.Count3 || "",
            Count4: firstItem.Count4 || "",
            Count5: firstItem.Count5 || "",
            Countwt1: firstItem.Countwt1 || "",
            Countwt2: firstItem.Countwt2 || "",
            Countwt3: firstItem.Countwt3 || "",
            Countwt4: firstItem.Countwt4 || "",
            Countwt5: firstItem.Countwt5 || "",
            width : firstItem.width || "",
          });
        } else {
          // console.log("No data received from the server.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://www.api.textilediwanji.com/beaminwardedit/${id}`, temp);
      if (response.data.message === "added suss") {
        toast.success("Data added successfully!", { position: "top-center", autoClose: 2000, closeOnClick: true});
        setTimeout(() => {
          navigate("/beaminwardreport");
        }, 2000);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const val = (valu) => (e) => {
    setTemp({ ...temp, [valu]: e.target.value });
  };

  const gotopage = () => {
    setTimeout(() => {
      navigate("/beaminwardreport");
    }, 2000);
   
  };

  const gopage = () => {
    navigate("/beaminwardreport");
  };

  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
        <div className="col-10 border border-2 bg-light" style={{ height: 1200 }}>
          {alert && (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Congratulations!</strong> {alert}
              <button type="button" className="btn-close" onClick={gopage} aria-label="Close"></button>
            </div>
          )}
          <div className="row ms-3 me-3 border border-1 rounded-5 mt-3 bg-white">
            <form onSubmit={handleSubmit}>
              <div className='row mb-3 mt-3 me-3 ms-3' >
                <div className='col-3'></div>
                <div className='col-3'></div>
                <div className='col-3'></div>
                <div className='col-3'>
                  <label className='float-start mb-2'>Date</label>
                  <input className='form-control' type='date' onChange={val("Date")} ></input>
                </div>
              </div>


              <div className='row me-3 ms-3'>
                <div className='col-3 text-start'>
                  <label className='text-start'>UID(Unique Identification Number)</label>
                  <input className='form-control mt-2' type='number' value={temp.UID} onChange={val("UID")}></input>
                  <label className='text-start mt-2'>Set number</label>
                  <input className='form-control mt-2' type='number' value={temp.SetNo} onChange={val("SetNo")}></input>
                  <label className='text-start mt-2'>Design number</label>
                  <input className='form-control mt-2' type='number' value={temp.DesignNo} onChange={val("DesignNo")}></input>
                  <label className='text-start mt-2'>Warp count</label>
                  <input className='form-control mt-2' type='number' value={temp.WarpCount} onChange={val("WarpCount")}></input>
                  <label className='text-start mt-2'>Weft count</label>
                  <input className='form-control mt-2' type='number' value={temp.WeftCount} onChange={val("WeftCount")}></input>
                </div>
                <div className='col-3 text-start'>
                 <label className='text-start'>Width</label>
                  <input className='form-control mt-2' type='number' value={temp.width} onChange={val("width")}></input>
                  <label className='text-start'>Reed</label>
                  <input className='form-control mt-2' type='number' value={temp.Reed} onChange={val("Reed")}></input>
                  <label className='text-start mt-2'>Pick</label>
                  <input className='form-control mt-2' type='number' value={temp.Pick} onChange={val("Pick")}></input>
                  <label className='text-start mt-2'>Sizing meter</label>
                  <input className='form-control mt-2' type='number' value={temp.SizingMtr} onChange={val("SizingMtr")}></input>
                  <label className='text-start mt-2'>Sizing Name</label>
                  <input className='form-control mt-2' type='text' value={temp.SizingName} onChange={val("SizingName")}></input>
                </div>
                <div className='col-3 text-start'>
                  <div className='row'>
                    <div className='col-6'>
                      <label className='text-start '>Count 1</label>
                      <input className='form-control mt-2' type='number' value={temp.Count1} onChange={val("Count1")}></input>
                      <label className='text-start mt-2'>Count 2</label>
                      <input className='form-control mt-2' type='number' value={temp.Count2} onChange={val("Count2")}></input>
                      <label className='text-start mt-2'>Count 3</label>
                      <input className='form-control mt-2' type='number' value={temp.Count3} onChange={val("Count3")}></input>
                      <label className='text-start mt-2'>Count 4</label>
                      <input className='form-control mt-2' type='number' value={temp.Count4} onChange={val("Count4")}></input>
                      <label className='text-start mt-2'>Count 5</label>
                      <input className='form-control mt-2' type='number' value={temp.Count5} onChange={val("Count5")}></input>

                    </div>
                    <div className='col-6'>
                      <label className='text-start '>Count 1 weight</label>
                      <input className='form-control mt-2' type='number' value={temp.Countwt1} onChange={val("Countwt1")} ></input>
                      <label className='text-start mt-2'>Count 2 weight</label>
                      <input className='form-control mt-2' type='number' value={temp.Countwt2} onChange={val("Countwt2")}></input>
                      <label className='text-start mt-2'>Count 3 weight</label>
                      <input className='form-control mt-2' type='number' value={temp.Countwt3} onChange={val("Countwt3")}></input>
                      <label className='text-start mt-2'>Count 4 weight</label>
                      <input className='form-control mt-2' type='number' value={temp.Countwt4} onChange={val("Countwt4")}></input>
                      <label className='text-start mt-2'>Count 5 weight</label>
                      <input className='form-control mt-2' type='number' value={temp.Countwt5} onChange={val("Countwt5")}></input>
                    </div>
                  </div>

                </div>
                

              </div>
              <div className='row mt-4 me-3 ms-3 mb-3'>
                <button className='btn btn-primary mb-4' type="submit" onClick={gotopage} >Submit</button>
                <button className="btn btn-success" onClick={gopage}>Beamreport</button>
              </div>
            </form>
            </div>








          </div>
        </div>
      </div>


    </>
  );
}


export default Beaminwardedit