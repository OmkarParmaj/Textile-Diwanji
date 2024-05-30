import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';

const Beaminwardreport = ({ isLoggedIn, setIsLoggedIn }) => {

  const [data, setData] = useState();
  const [records, setRecords] = useState();
  const [modalId, setModalId] = useState(null); // State to manage dynamic modal IDs
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchdata();
  }, [])

  const navigate = useNavigate();


  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  // If the user is not logged in, redirect to the login page
  if (isLoggedIn === false) {
    return <Navigate to="/login" replace />;
  }

  const fetchdata = () => {
    axios.get('https://www.api.textilediwanji.com/beaminwardreport')
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((err) => {
        // console.log("error to fetch the data", err);
      })
  }

  const handledelete = (DesignNo) => {
    axios.delete(`https://www.api.textilediwanji.com/delete/${DesignNo}`)
      .then((res) => {
        fetchdata();
        setModalId(null); // Reset modal ID after deletion
      })
      .catch((err) => {
        // console.log("err in the delete", err);
      })
  }

  const Filter = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setRecords(data.filter(s => s.DesignNo && s.DesignNo.toString().toLowerCase().includes(inputValue)));
  }


  const sendReconsile = (Designno, setno, remail) => {
    setLoading(true);
    const heyurl = `http://www.textilediwanji.com/rec?setno=${setno}&designno=${Designno}&recoemail=${remail}`;

    axios.post("https://www.api.textilediwanji.com/mailreconsile", { heyurl })
      .then(() => {

        toast.success("Reconsilation slip sent", { position: "top-center", autoClose: 2000, closeOnClick: true });
        // setEmail("");
      })
      .catch(error => {
        toast.error("Reconsilation slip not sent! Please check Internet connection?", { position: "top-center", autoClose: 2000, closeOnClick: true });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className='container-fluid' style={{ background: "#f6f9ff", height: "1500px " }}>
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
      <div className='row'>
        <div className='col-2'>
          <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
        <div className='col-10' style={{ background: "#f6f9ff", height: "1500px " }}>
          <div className="row d-flex justify-content-center mt-5 ">
            <div className="col-11 bg-white border border-1 shadow-sm rounded-4">
              <div className='row mt-3 mb-3'>
                <h1>Beam Inward Report</h1>
              </div>
              <div className='row ms-4 me-4 mt-4 mb-4'>
                <h4 className='text-start'>Search result using Design no</h4>
                <input type='number' className="form-control" onChange={Filter} placeholder="search on Design no"></input>
              </div>
              <div className='row me-4 ms-4 mb-5'>

                <table className='table mt-4 table-bordered datatable '   >
                  <thead className='border border-1 '>
                    <tr>
                      <th>UID</th>
                      <th>Date</th>
                      <th>Set no</th>
                      <th>Design no</th>
                      <th>Warp count</th>
                      <th>Weft count</th>
                      <th>Reed</th>
                      <th>Pick</th>
                      <th>Action</th>
                      <th>Action</th>
                      <th>Action</th>
                      <th>Reconsile</th>
                      <th>Send Mail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records && records.map((report, index) => (
                      <tr key={index}>
                        <td>{report.UID}</td>
                        <td>{formatDate(report.Date)}</td>
                        <td>{report.SetNo}</td>
                        <td>{report.DesignNo}</td>
                        <td>{report.WarpCount}</td>
                        <td>{report.WeftCount}</td>
                        <td>{report.Reed}</td>
                        <td>{report.Pick}</td>
                        <td><Link to={`/beaminwardprint/${report.DesignNo}/${report.srno}`} className='btn btn-primary'>Print</Link></td>
                        <td><Link to={`/beaminwardedit/${report.DesignNo}`} className='btn btn-secondary'>Edit</Link></td>
                        <td>
                          <button
                            className='btn btn-danger'
                            data-bs-toggle="modal"
                            data-bs-target={`#exampleModal-${report.DesignNo}`} // Dynamic modal ID
                            onClick={() => setModalId(report.DesignNo)} // Set modal ID on click
                          >
                            Delete
                          </button>
                          <div
                            className="modal fade"
                            id={`exampleModal-${report.DesignNo}`} // Dynamic modal ID
                            tabIndex="-1"
                            aria-labelledby={`exampleModalLabel-${report.DesignNo}`} // Dynamic modal label ID
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id={`exampleModalLabel-${report.DesignNo}`}>ALERT</h5>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  <p>Are you sure! You want to DELETE this?</p>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => handledelete(report.DesignNo)}
                                    data-bs-dismiss="modal"
                                  >
                                    DELETE
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td><Link to={`/reconsilation/${report.SetNo}/${report.DesignNo}`} className='btn btn-primary' >Reconsil</Link></td>
                        <td><button className='btn btn-primary' onClick={() => sendReconsile(report.DesignNo, report.SetNo, report.Email)}>MAIL</button></td>
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
  )
}

export default Beaminwardreport;
