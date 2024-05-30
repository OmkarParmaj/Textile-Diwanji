import logo from './logo.svg';
import './App.css';
import Sample from './Sample';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Reco from './Components/Reco';


function App2() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/packingdata' element={<Sample></Sample>}></Route>
                    <Route path='/rec' element={<Reco></Reco>}></Route>
                    
                </Routes>
            </BrowserRouter>



        </>
    );
}

export default App2;
