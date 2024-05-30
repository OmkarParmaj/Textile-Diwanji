// Layout.js
import React from "react";
import Sidebar from "./Components/Sidebar";
import { Routes } from "react-router-dom";

const Layout = ({ children, isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
        <div className="col-9">
          {children} {/* This will render the content of the current route */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
