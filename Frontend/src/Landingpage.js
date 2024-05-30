import React from "react";
import { Link } from 'react-router-dom';
import './fonts.css'; // Import the CSS file

const Landingpage = () => {
    return (
        <>
            {/* Transparent Navbar */}

            {/* Landing Page Content */}
            <div className="container-fluid" style={{ height: "695px", backgroundImage: `url(/frequency-wave-7776034_1280.jpg)`, backgroundSize: "cover", position: "relative" }}>
                {/* Transparent Background */}
                <div className="row d-flex justify-content-center align-items-center" style={{ height: "50px", backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                    <div className="col-3">
                        {/* Apply the CSS class to the <h2> tag */}
                        <h2 className="jersey-15-charted-regular text-white pt-2">Textile Diwanji</h2>
                    </div>
                    <div className="col-3"></div>
                    <div className="col-3"></div>
                    <div className="col-3">
                        <Link to="/login" type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-success float-end me-5">LOGIN</Link >
                    </div>
                </div>
                <div className="row d-flex justify-content-center " style={{ marginTop: "200px" }}>
                    <h1 className="text-danger m-0 ">STREAMLINE YOUR WEAVING OPERATION</h1>
                    <h6 className="m-0 text-danger mt-2">All in one platform to manage, monitor and enhance your weaving operation with high efficiency</h6>
                    <div className="col-3 justify-content-center mt-4">
                        <Link to="/login" type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary">Get started here</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Landingpage;
