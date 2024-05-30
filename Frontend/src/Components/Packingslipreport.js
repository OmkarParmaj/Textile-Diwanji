import React, { useEffect, useState } from 'react';
import { Await, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';


const Packingslipreport = ({ isLoggedIn, setIsLoggedIn }) => {
  const [packing, setPacking] = useState();
  const navigate = useNavigate();
  const [records, setRecords] = useState();
  const [modalId, setModalId] = useState(null); // State to manage dynamic modal IDs
  // const [packno, setPackno] = useState("");
  // const [uid, setUid] = useState("");
  // const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);


  // useEffect(() => {
  //   setUrl(`http:www.textilediwanji.com/packprint/${packno}/${uid}`);
  // }, [packno, uid]);


  const handleLogout = () => {
    // Call the parent component's setIsLoggedIn function to logout
    setIsLoggedIn(false);
    // Navigate to the login page
    navigate("/login");
  };

  useEffect(() => {
    handlefetch();
  }, []);





  const handlefetch = async () => {
    try {
      const response = await axios.get('https://www.api.textilediwanji.com/packingslipreport');
      // console.log(response);
      setPacking(response.data);
      setRecords(response.data)
    } catch (error) {
      // console.log(error);
    }
  }

  // If the user is not logged in, redirect to the login page
  if (isLoggedIn === false) {
    return <Navigate to="/login" replace />;
  }

  const filter = (e) => {
    const number = e.target.value.toLowerCase();
    setRecords(packing.filter(s => s.Packingslipno && s.Packingslipno.toString().toLowerCase().includes(number)))
  }

  // Filter unique entries based on UID
  // Filter unique entries based on UID
  // const uniquePacking = packing.reduce((acc, curr) => {
  //   if (!acc.find(item => item.UID === curr.UID)) {
  //     acc.push(curr);
  //   }
  //   return acc;
  // }, []);


  const handledelete = (id) => {
    axios.delete(`https://www.api.textilediwanji.com/packingdelete/${id}`)
      .then(res => {
        // console.log(res.data);
        if (res.data.message === "deleted") {
          // console.log("deleted row");
          handlefetch();
        }

      })
      .catch(err => {
        // console.log(err);
      })
  }


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }



  const sendPackslip = (packing, ui, ser, ema) => {
    setLoading(true);
    const yesurl = `http://www.textilediwanji.com/packingdata?packingslipno=${packing}&uidno=${ui}&serialno=${ser}&emailid=${ema}`;

    axios.post("https://www.api.textilediwanji.com/mailpackslip", { yesurl })
      .then(() => {

        toast.success("Packing slip sent", { position: "top-center", autoClose: 2000, closeOnClick: true });
        // setEmail("");
      })
      .catch(error => {
        toast.error("Packing slip not sent", { position: "top-center", autoClose: 2000, closeOnClick: true });
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <div className='container-fluid vh-100' style={{ background: "#f6f9ff", height: "1500px " }}>

      <div className={`modal ${loading ? 'show' : ''}`} style={{ display: loading ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered" >
          <div className="modal-content" style={{ background: 'rgba(255, 255, 255, 0.7)' }}>
            <div className="modal-body" style={{ background: 'rgba(255, 255, 255, 0.7)' }}>
              <h4>Sending Packing slip</h4>
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='row vh-100'>
        <div className='col-2'>
          <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
        <div className='col-10 ' style={{ background: "#f6f9ff", height: "1500px " }}>
          <div className="row d-flex justify-content-center " style={{ marginTop: "70px" }}>
            <div className="col-11 bg-white border border-1 shadow-sm rounded-4">

              <div className='row ms-4 me-4 mb-5'>
                <div className='row ms-2  mt-4 mb-4'>
                  <h4 className='text-start'>Search result uisng Packing slip no </h4>
                  <input type='number' className='form-control' onChange={filter} placeholder='search on Packing slip no'></input>
                </div>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Sr no.</th>
                      <th>Packing slip no</th>
                      <th>Date</th>
                      <th>UID</th>
                      <th>Set no</th>
                      <th>Design no</th>
                      <th>Action</th>
                      <th>Action</th>
                      <th>Action</th>
                      <th>Send Mail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records && records.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Packingslipno}</td>
                        <td>{formatDate(item.date)}</td>
                        <td>{item.uid}</td>
                        <td>{item.SetNo}</td>
                        <td>{item.DesignNo}</td>
                        <td><Link to={`/packingprint/${item.Packingslipno}/${item.uid}/${item.serialno}/${item.Email}`} className='btn btn-primary'>Print</Link></td>
                        <td><Link to={`/packingslipedit/${item.Packingslipno}`} className='btn btn-info' >EDIT</Link></td>
                        <td> <button
                          className='btn btn-danger'
                          data-bs-toggle="modal"
                          data-bs-target={`#exampleModal-${item.serialno}`} // Dynamic modal ID
                          onClick={() => setModalId(item.serialno)} // Set modal ID on click
                        >
                          Delete
                        </button>
                          <div
                            className="modal fade"
                            id={`exampleModal-${item.serialno}`} // Dynamic modal ID
                            tabIndex="-1"
                            aria-labelledby={`exampleModalLabel-${item.serialno}`} // Dynamic modal label ID
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id={`exampleModalLabel-${item.serialno}`}>ALERT</h5>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  <p>Are you sure! You want to DELETE this?</p>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => handledelete(item.serialno)}
                                    data-bs-dismiss="modal"
                                  >
                                    DELETE
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div></td>
                        <td>

                          <button className='btn btn-primary' onClick={() => sendPackslip(item.Packingslipno, item.uid, item.serialno, item.Email)}>SEND MAIL</button>



                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>





        </div>
      </div>
    </div>
  );
};

export default Packingslipreport;
