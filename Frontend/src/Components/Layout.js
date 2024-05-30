import React from "react";
import Sidebar from "./Sidebar";



const Layout = ({isLoggedIn, setIsLoggedIn}) => {
    return (
        <>
        <div className="container-fluid" style={{ background: "#f6f9ff" }}>
                <div className="row">
                    <div className="col-2">
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    </div>
                    <div className="col-10" style={{ background: "#f6f9ff", height: "1500px " }}>
                        <div className="row d-flex justify-content-center mt-4">
                            <div className="col-11 bg-white border border-1 shadow-sm rounded-4">
                                
                               






                            </div>
                        </div>


                    </div>
                </div>
            </div>
                
        </>
    );

}


export default Layout;