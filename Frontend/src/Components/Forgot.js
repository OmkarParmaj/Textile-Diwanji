import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Forgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = () => {
    setLoading(true);
    axios.post("https://www.api.textilediwanji.com/", { email })
      .then(() => {
        toast.success("Password sent to your email address!", { position: "top-center", autoClose: 2000, closeOnClick: true });
        setEmail("");
      })
      .catch(error => {
        toast.error("Please give correct Email id!", { position: "top-center", autoClose: 2000, closeOnClick: true });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className='container-fluid d-flex justify-content-center align-items-center' style={{ height: "695px" }}>
        <div className='row'>
          <div className='card rounded-4 d-flex justify-content-center align-items-center' style={{ width: "1000px", height: "350px" }}>
            <div className='row w-100 m-0 d-flex justify-content-center align-items-center'>
              <div className='col-6'>
                <img src="/passrecovery.jpg" alt="logo" style={{ width: 280, height: 280 }} />
              </div>
              <div className='col-6'>
                <div className='row'>
                  <div className='col-8'>
                    <label className='float-start mb-2'>Please enter your Email</label>
                    <input className='form-control' type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <button className='btn btn-primary mt-5' onClick={sendEmail}>SUBMIT</button>
                    {loading && <p>Sending email...</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forgot;
