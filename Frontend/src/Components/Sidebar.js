import React, { useState, useEffect } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import './sidebar.css';
import { MdDashboardCustomize } from "react-icons/md";
import { CgInternal } from "react-icons/cg";
import { VscServerProcess } from "react-icons/vsc";
import { IoNewspaperOutline } from "react-icons/io5";
// import { PiYarnFill } from "react-icons/pi";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";



const Sidebar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [customerData, setCustomerData] = useState(null);


    useEffect(() => {
        const handlePopState = () => {
            setIsLoggedIn(false);
            navigate("/login");
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);



    useEffect(() => {
        fecthdata();
    }, []);


    axios.defaults.withCredentials = true;


    const fecthdata = () => {
        axios.get('https://www.api.textilediwanji.com/sidebar')
            .then(res => {
                if (res.data) {
                    // console.log(res.data);
                    setCustomerData(res.data[0]);
                }
                else {
                    // console.log("no customer found");
                }
            })
            .catch((err) => {
                // console.log("err in the data fetching", err);
            })
    }






    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate("/login");
    };

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }


    return (
        <>
            <div className="offcanvas offcanvas-start show bg-success" style={{ width: '230px' }} data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header d-flex justify-content-center align-items-center ">
                    {/* <img src="/login-amico.png" alt="logo" style={{ width: 50, height: 50 }} /> */}
                    <h2 className="jersey-15-charted-regular text-white pt-2">Textile Diwanji</h2>
                </div>
                <hr />
                <div className="offcanvas-body">

                    <ul className="mynav nav nav-pills flex-column mb-auto">




                        <li className="nav-item mb-1 rounded-2 mt-1 d-flex align-items-center" >
                            <Link to="/board2" className="text-decoration-none links d-flex ms-3" ><span className="me-2"><MdDashboardCustomize /></span> Dashboard</Link>
                        </li>
                        <li className="nav-item mb-1 rounded-2 mt-1">
                            <Link to="/beamInward" className="text-decoration-none links d-flex ms-3" ><span className="me-2"><CgInternal /></span>Beam Inward</Link>
                        </li>

                        <li className="nav-item mb-1 rounded-2 mt-1">
                            <Link to="/production" className="text-decoration-none links d-flex ms-3" ><span className="me-2"><VscServerProcess /></span>Production</Link>
                        </li>

                        <li className="nav-item mb-1 rounded-2 mt-1">
                            <Link to="/packslip" className="text-decoration-none links d-flex ms-3"><span className="me-2"><IoNewspaperOutline /></span>Pack slip</Link>
                        </li>
                        <li className="nav-item mb-1 rounded-2 mt-1">
                            <Link to="/yarninward" className="text-decoration-none links d-flex ms-3"><span className="me-2"><CgInternal /></span>Yarn inward</Link>
                        </li>

                        <li className="nav-item mb-1 rounded-2 mt-1">
                            <Link to="/billing" className="text-decoration-none links d-flex ms-3"><span className="me-2"><FaFileInvoiceDollar /></span>Billing</Link>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link collapsed " data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                                <i class="bi bi-layout-text-window-reverse float-start ms-2"></i><p className=" text-start text-white mb-0"><span className="me-2"><TbReport /></span>Reports</p><i class="bi bi-chevron-down ms-auto "></i>
                            </a>
                            <ul id="tables-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                                <li className="nav-item mb-1 text-decoration-none ms-0 rounded-2 mt-1 list-unstyled">
                                    <Link to="/beaminwardreport" className="text-decoration-none links d-flex ms-3" >Beam report</Link>
                                </li>
                                <li className="nav-item mb-1 text-decoration-none ms-0 rounded-2 mt-1 list-unstyled">
                                    <Link to="/dailyproductionreport" className="text-decoration-none links d-flex ms-3" >Production report</Link>
                                </li>
                                <li className="nav-item mb-1 text-decoration-none ms-0 rounded-2 mt-1 list-unstyled">
                                    <Link to="/packingslipreport" className="text-decoration-none links d-flex ms-3" >Packslip report</Link>
                                </li>
                                <li className="nav-item mb-1 text-decoration-none ms-0 rounded-2 mt-1 list-unstyled">
                                    <Link to="/yarninwardreport" className="text-decoration-none links d-flex ms-3" >Yarn report</Link>
                                </li>
                                <li className="nav-item mb-1 text-decoration-none ms-0 rounded-2 mt-1 list-unstyled">
                                    <Link to="/billingreport" className="text-decoration-none links d-flex ms-3" >Bill report</Link>
                                </li>
                                <li className="nav-item mb-1 text-decoration-none ms-0 rounded-2 mt-1 list-unstyled">
                                    <Link to="/billpending" className="text-decoration-none links d-flex ms-3" >Bill pending</Link>
                                </li>

                            </ul>
                        </li>

                        <li className="nav-item mb-1 rounded-2 mt-1">
                            <Link to="/profile" className="text-decoration-none links d-flex ms-3"><span className="me-2"><IoMdSettings /></span>Setting</Link>
                        </li>




                    </ul>
                </div>
                <hr />
                <div className="offcanvas-end m-auto mb-2 d-flex flex-column">
                    {customerData && <p className="text-white">{customerData.Email}</p>}
                    <button className="btn btn-danger" onClick={handleLogout}>LOG OUT</button>
                </div>
            </div>

        </>
    );
}

export default Sidebar;







