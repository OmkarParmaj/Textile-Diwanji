import  { useEffect, useState } from 'react'
import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Signup = () => {

    const [values, setValues] = useState({
        Name: "",
        Email: "",
        Password: ""
    });


    const [alert , setAlert] = useState(null);



    const handleSubmit = (e) => {
        e.preventDefault();
      axios.post('https://www.api.textilediwanji.com/customer', values, {
        withCredentials: true
    })
      .then(result => {
        // console.log(result);
        if(result.data.message === "Duplicate data"){
            // console.log("duplicate entry");
  
           toast.error("Email id already exist, Please try another emailid!", { position: "top-center", autoClose: 2000, closeOnClick: true });

        }
        else if(result.data.message === "Data inserted successfully")
        {
            // console.log("data is inserted successfuly");
            // setAlert("Data has been added successfuly");
            toast.success("Account created successfully!", { position: "top-center", autoClose: 2000, closeOnClick: true });

        }
        

      })
      .catch(err => {
        // console.log("API call failed with error:", err);
        // Handle API call failure
      });
       
    }

  
    const val = (valu) => (e) => {

        setValues({...values, [valu]: e.target.value});
    }


    useEffect(() => {   
        // console.log("Alert message state before effect:", alert);
        
    }, [setAlert]);
    
    
const navigate = useNavigate();

const handlehome = () => {
    navigate('/login');
}

    return (

        <>
       
            <div className='container d-flex justify-content-center align-item-center'>

                <div className='card'>
                
                    <form onSubmit={handleSubmit}>
                        <div className='card-body'>
                            <div className='row'>
                                <h2>Sign Up</h2>
                            </div>
                            <div className='row'>
                                <input type='text' className='form-control mt-3' placeholder="User Name" onChange={val("Name")} required></input>
                                <input type='email' className='form-control mt-3' placeholder="Enter your email"  onChange={val("Email")} required></input>
                                <input type="password" className='form-control mt-3' placeholder="Enter password" onChange={val("Password")} required></input>
                            </div>
                            <div className='row'>
                                <button className='btn btn-primary mt-3'>Submit</button>
                            </div>
                            <div className='row'>
                                <button className='btn btn-success mt-3' onClick={handlehome}>login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>




        </>
    );
}


export default Signup


