import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Monthlyproductionreport = ({ isLoggedIn, setIsLoggedIn }) => {
    const [productionData, setProductionData] = useState([]);
    const [records, setRecords] = useState();

    useEffect(() => {
        axios.get('https://www.api.textilediwanji.com/designwisemtr')
            .then(res => {
                // console.log(res.data);
                setProductionData(res.data);
            })
            .catch(err => {
                // console.log(err);
            })
    }, []);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }


    const filter = (e) => {
        const prodata = JSON.parse(productionData.productiontable)
        const number = e.target.value.toLowerCase();
        setRecords(prodata.filter(s => s.setno && s.setno.toString().toLowerCase().includes(number)))
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Sidebar>
                    </div>
                    <div className="col-10">
                        <h4>This is Monthly production report page</h4>
                        <div className='row ms-4 me-4 mt-4 mb-4'>
                            <h4 className='text-start'>Search result uisng Packing slip no </h4>
                            <input type='number' className='form-control' onChange={filter} placeholder='search on Packing slip no'></input>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Set No</th>
                                    <th>Meter</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((o, index) => {
                                    <tr key={index}>
                                          <td>{o.setno}</td>
                                          <td>{o.mtr}</td>
                                    </tr>
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Total</td>
                                    <td>
                                        {productionData.reduce((total, item) => {
                                            const productionTable = JSON.parse(item.productiontable);
                                            const mtrSum = productionTable.reduce((sum, prod) => {
                                                if (prod.setno === '5652') { // Change '5652' to your desired setno
                                                    return sum + parseFloat(prod.mtr);
                                                }
                                                return sum;
                                            }, 0);
                                            return total + mtrSum;
                                        }, 0)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Monthlyproductionreport;
