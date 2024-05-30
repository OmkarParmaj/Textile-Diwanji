import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Beaminward from "./Components/Beaminward";
import Beaminwardreport from "./Components/Beaminwardreport";

import Packingslipreport from "./Components/Packingslipreport";
import Board2 from "./Components/Board2";
import Login from "./Login";
import Test from "./Test";
import Signup from "./Signup";
import Forgot from "./Components/Forgot";

const Dashboard = ({ isLoggedIn, setIsLoggedIn }) => {


  // const navigate = useNavigate();



  // const handleLogout = () => {
  //   // Call the parent component's setIsLoggedIn1 function to logout
  //   setIsLoggedIn1(false);
  //   // Navigate to the login page
  //   navigate("/login");
  // };

  // If the user is not logged in, redirect to the login page
  if (isLoggedIn === false) {
    return <Navigate to="/login" replace />;
  }

  // Render the dashboard content if the user is logged in
  return (
    <div>


      <div className="container-fluid">
        <div className="row">
       
          
          <div className="col-auto">
          <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Sidebar>
          
          
            
          </div>
          


        </div>
      </div>



































    </div>
  );
};

export default Dashboard;
