import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Signup from "./Signup";
import { useDispatch } from "react-redux";
import { hello } from "./store/slice/slices";
import Billingreport from "./Components/Billingreport";
import { toast } from "react-toastify";

const Login = ({ setIsLoggedIn }) => {
    const [values, setValues] = useState({
        Email: "",
        Password: ""
    });

    const [alert, setAlert] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const val = (valu) => (e) => {
        setValues({ ...values, [valu]: e.target.value });
    };

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        axios.post('https://www.api.textilediwanji.com/login', values)
            .then(res => {
                // console.log(res);
                if (res.data.redirectTo) {
                    setIsLoggedIn(true); // Update the state in the parent component
                    // dispatch(hello("true")); // Use checkAction instead of check
                    // Navigate to the dashboard


                    navigate("/board2");
                } else if (res.data.message === "Incorrect password") {
                    // console.log("incorrect password");
                    // setAlert("Incorrect password");
                    toast.error("Incorrect Password!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                }
                else if (res.data.message === "User not found") {
                    // setAlert("Incorrect email id or user not found!");
                    toast.error("Incorrect Email or Password!", { position: "top-center", autoClose: 2000, closeOnClick: true });
                }

            })
            .catch(err => {
                console.error(err);
                setError("Invalid email or password"); // Display error message
            });
    };



    return (
        <>
            <div className="container">
                {/* {alert && (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>{alert}</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></button>
                    </div>
                )} */}
            </div>
            <div className="container vh-100 justify-content-center align-items-center d-flex">
                <div className="card">

                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <div className="card-header m-0 p-0">
                                    <img className="" src="/login-amico.png" alt="img" style={{ height: "390px", width: "520px" }}></img>
                                </div>
                            </div>
                            <div className="col-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="container d-block">
                                        <div className="row text-center ">
                                            <h2>Sign In</h2>
                                        </div>
                                        <div className="row mt-3 ">
                                            <input type="text" className="form-control" placeholder="User name" required onChange={val("Email")} />
                                            <input type="password" className="form-control mt-3 mb-3" placeholder="Password" required onChange={val("Password")} />
                                            <button type="submit" className="btn btn-success">Sign In</button>
                                        </div>
                                        <div className="row " style={{ height: "30px" }}>{alert && <div className="row text-danger">{alert}</div>} {/* Display error message */}</div>

                                        <div className="row ">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row  mt-3 text-end">
                                            <a href="/forgot">Forgot password</a>

                                        </div>

                                    </div>
                                </form>
                                <div className="row  mt-4 text-center">
                                    <p>Not a member?  <Link to="/signup">Signup</Link>   </p>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>


        </>
    );
};

export default Login;
