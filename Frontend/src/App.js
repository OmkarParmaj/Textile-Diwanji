import React, { useState } from "react";
import './App.css';
import { BrowserRouter, Route, Router, Routes, Switch } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Beaminward from "./Components/Beaminward";
import Beaminwardreport from "./Components/Beaminwardreport";

import Packingslipreport from "./Components/Packingslipreport";
import Home from "./Components/Home";
import Sidebar from "./Components/Sidebar";
import Board2 from "./Components/Board2";
import Forgot from "./Components/Forgot";
import Test from "./Test";
import Beaminwardprint from "./Components/Beaminwardprint";


import Beaminwardedit from "./Components/Beaminwardedit";
import Landingpage from "./Landingpage";
import Packslip from "./Components/Packslip";
import Packingprint from "./Components/Packingprint";
import Reconsilation from "./Components/Reconsilation";
import Yarninward from "./Components/Yarninward";
import Billing from "./Components/Billing";
import Billingreport from "./Components/Billingreport";
import BIllprint from "./Components/Billprint";
import Companyregister from "./Components/Companyregister";
import Profile from "./Components/Profile";
import Companyedit from "./Components/Companyedit";
import Companyreport from "./Components/Companyreport";
import Navbar from "./Components/Navbar";
import Party from "./Components/Party";
import Yarninwardreport from "./Components/Yarninwardreport";
import Cost from "./Components/Cost";
import { useDispatch } from 'react-redux';
import { check } from "./store/slice/slices";

import Dismis from "./Components/Dismis";
import Packingslipedit from "./Components/Packingslipedit";
import Yarninwardedit from "./Components/Yarninwardedit";
import Billedit from "./Components/Billedit";
import Companybankdetails from "./Components/Companybankdetails";
import Companybankedit from "./Components/Companybankedit";
import Partyedit from "./Components/Partyedit";
import Production from "./Components/Production";
import Productionreport from "./Components/Productionreport";
import Dailyproductionreport from "./Components/PageComponents/Dailyproductionreport";
import Monthlyproductionreport from "./Components/PageComponents/Monthlyproductionreport";
import Yearlyproreport from "./Components/PageComponents/Yearlyproreport";
import Passwordrecovery from "./Components/Passwordrecovery";
import Billpending from "./Components/Billpending";
import Shiftsetting from "./Components/Shiftsetting";
import Layout from "./Components/Layout";
import See from "./See";









function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // const dispatch = useDispatch();

  // dispatch(check(change));

  return (

    <BrowserRouter >
  

      <div className="App">


        {/* {isLoggedIn && <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} */}
        {/* {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Navbar>} */}

        <div className="content">
      

          <Routes>
         
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/sidebar" element={<Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Sidebar>}></Route>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/beaminward" element={<Beaminward isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/beaminwardreport" element={<Beaminwardreport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />

            <Route path="/packingslipreport" element={<Packingslipreport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/board2" element={<Board2 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/test" element={<Test />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/beaminwardprint/:id1/:id2" element={<Beaminwardprint ></Beaminwardprint>}></Route>

            <Route path="/beaminwardedit/:id" element={<Beaminwardedit isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Beaminwardedit>}></Route>
            <Route path="/" element={<Landingpage></Landingpage>}></Route>
            <Route path="/packslip" element={<Packslip isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Packslip>}></Route>
            <Route path="/packingprint/:id1/:id2/:id3/:id4" element={<Packingprint/>} />

            <Route path="/packprint/:id" element={<Packingprint></Packingprint>}></Route>
            <Route path="/reconsilation/:id/:id1" element={<Reconsilation></Reconsilation>}></Route>
            <Route path="/yarninward" element={<Yarninward isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} ></Yarninward>}></Route>
            <Route path="/billing" element={<Billing isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Billing>}></Route>
            <Route path="/billingreport" element={<Billingreport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Billingreport>}></Route>
            <Route path="/billprint/:id" element={<BIllprint></BIllprint>}></Route>
            <Route path="/companyregister" element={<Companyregister isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
              <Route path="companyreport" element={<Companyreport />} />

            </Route>
            <Route path="/companyedit/:id" element={<Companyedit isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Companyedit>}></Route>

            <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Profile>}></Route>
            <Route path="/navbar" element={<Navbar></Navbar>}></Route>
            <Route path="/party" element={<Party isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Party>}></Route>
            <Route path="/yarninwardreport" element={<Yarninwardreport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Yarninwardreport>}></Route>
            <Route path="/cost" element={<Cost isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Cost>}></Route>
            <Route path="/dismis" element={<Dismis></Dismis>}></Route>
            <Route path="/packingslipedit/:id" element={<Packingslipedit isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Packingslipedit>}></Route>
            <Route path="/yarninwardedit/:id" element={<Yarninwardedit isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Yarninwardedit>}></Route>
            <Route path="/billedit/:id" element={<Billedit isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Billedit>}></Route>
            <Route path="/companybankdetails" element={<Companybankdetails isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Companybankdetails>}></Route>
            <Route path="companybankedit/:id" element={<Companybankedit isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Companybankedit>}></Route>
            <Route path="/partyedit/:id" element={<Partyedit isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Partyedit>}></Route>
            <Route path="/production" element={<Production isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Production>}></Route>
            <Route path="/productionreport" element={<Productionreport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Productionreport>}></Route>
            <Route path="/dailyproductionreport" element={<Dailyproductionreport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Dailyproductionreport>}></Route>
            <Route path="/monthlyproductionreport" element={<Monthlyproductionreport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Monthlyproductionreport>}></Route>
            <Route path="/yearlyproreport" element={<Yearlyproreport isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Yearlyproreport>}></Route>
            <Route path="/passwordrecovery" element={<Passwordrecovery isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Passwordrecovery>}></Route>
            <Route path="/billpending" element={<Billpending isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Billpending>}></Route>
            <Route path="/shiftsetting" element={<Shiftsetting isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Shiftsetting>}></Route>
            <Route path="/layout" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Layout>}></Route>
         
      
  <Route path="/packdatafetch" element={<See></See>}></Route>

      
            
          
           


          </Routes>

        </div>

        
      </div>

    </BrowserRouter>
  );
}

export default App;
