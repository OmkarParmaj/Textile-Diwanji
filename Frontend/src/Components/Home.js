import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Home = ({ isLoggedIn, setIsLoggedIn }) => {


const navigatepage = useNavigate();


    return (
        <>
        
        
        <div  className='container-fluid'>
      <div className='row'>
      <div className='col-3'>
      <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
      <div className='col-9'>
        <h1>This is Home page</h1>
        <button className="btn btn-primary " onClick={() => {navigatepage("/login")}}>LOGIN</button>
      </div>
      </div>
    </div>
        
        
        
        
        </>
    );
}

export default Home