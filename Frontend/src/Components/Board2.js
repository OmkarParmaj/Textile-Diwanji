import React, { useEffect, useState, PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';

import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { FcRules } from "react-icons/fc";
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { SiCountingworkspro } from "react-icons/si";
import './Board2.css';
import { FcAcceptDatabase } from "react-icons/fc";
import { FcComboChart } from "react-icons/fc";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import {


  CCardGroup,


  CLink,

  CWidgetStatsB,
  CWidgetStatsC,
  CWidgetStatsE,
  CWidgetStatsF,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cilArrowRight,
  cilBasket,
  cilBell,
  cilChartPie,
  cilMoon,
  cilLaptop,
  cilPeople,
  cilSettings,
  cilSpeech,
  cilSpeedometer,
  cilUser,
  cilUserFollow,
} from '@coreui/icons'


const Board2 = ({ isLoggedIn, setIsLoggedIn }) => {

  const [chart, setChart] = useState([]);
  const [amo, setAmo] = useState();
  const [production, setProduction] = useState([]);
  const [mtr, setMtr] = useState([]);
  const [price, setPrice] = useState(0);
  const [smeter, setSmeter] = useState([]);
  const [totalbeams, setTotalbeams] = useState([]);
  const [linech, setLinech] = useState([]);
  const [prosrno, setProsrno] = useState([]);
  const [pending, setPending] = useState([]);
  const [eff, setEff] = useState([]);


  const navigate = useNavigate();

  const amount = useSelector((select) => select.value.value);

  const designno = useSelector((sele) => sele.value.packing.DesignNo)





  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }



  useEffect(() => {
    const handlePopState = () => {
      setIsLoggedIn(false);
      navigate('/login');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {

    axios.get('https://www.api.textilediwanji.com/billreport2')
      .then(res => {
        // console.log(res.data)
        setAmo(res.data[0].total_amount);
      })
      .catch(err => {
        // console.log(err);
      })
  }, [])

  useEffect(() => {
    axios.get('https://www.api.textilediwanji.com/bill2')
      .then(res => {
        // console.log(res.data[0])
        setPending(res.data[0].pending);
      })
      .catch(err => {
        // console.log(err);
      })
  }, [])



  useEffect(() => {

    axios.get('https://www.api.textilediwanji.com/productiondashboard')
      .then(res => {
        // console.log(res.data);

        const mtrarray = res.data;
        const mtrproarray = mtrarray.map(item => item.avragemtr);

        const aveff = mtrarray.map(item => item.avrageeff);

        const prosr = res.data;
        const prosrmapped = prosr.map(items => formatDate(items.date));

        setProduction(mtrproarray);
        setEff(aveff);
        setProsrno(prosrmapped);
        setLinech(res.data);
      })
      .catch(err => {
        // console.log(err);
      })

  }, [])






  useEffect(() => {

    axios.get('https://www.api.textilediwanji.com/board2')
      .then(res => {
        // console.log(res.data);
        setChart(res.data);
      })
      .catch(err => {
        // console.log("err in the database", err);
      })

  }, [])

  useEffect(() => {
    axios.get('https://www.api.textilediwanji.com/sizingmtr')
      .then(res => {
        // console.log(res.data);
        const size = res.data[0].sizingmeter;
        setSmeter(size);
        setTotalbeams(res.data[0].designno);
      })
      .catch(err => {
        // console.log(err);
      })
  }, [])

  useEffect(() => {

    axios.get('https://www.api.textilediwanji.com/totalmtrinproduction')
      .then(res => {
        // console.log(res.data);
        setMtr(res.data[0].Totalmeter);
        setPrice(res.data[0].Totalprice);


      })
      .catch(err => {
        // console.log(err);
      })

  }, [])



  if (isLoggedIn === false) {
    return <Navigate to="/login" replace></Navigate>
  }






  return (
    <div className='container-fluid' style={{ background: "#f6f9ff", height: "1500px " }}>
      <div className='row'>
        <div className='col-2'>
          <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
        <div className='col-10 mt-4'>


          <div className='row mb-4 '>
            <div className='col-3'>
              <div className='card glass  shadow shadow-lg  rounded-4'>
                <div className='row  glasscon  ms-2 mt-2'>
                  <h6 className='text-start  '><span className='mt-0 ' style={{ fontSize: "23px" }}>Beams</span> | in month</h6>
                </div>
                <div className='row mt-3 glassconn  mb-3 ms-3 me-3'>
                  <div className='col-8 m-0 '>
                    <h4 className=' mt-2 text-start '>{totalbeams}<span className='ms-2 ' style={{ fontSize: "18px" }}>no's</span></h4>
                  </div>
                  <div className='col-4 m-0   d-flex justify-content-center align-items-center'>
                    <div className='row  d-flex justify-content-center align-items-center'><div className='rounded-3' style={{ height: "60px", background: "pink", width: "60px", position: "relative" }}></div><SiCountingworkspro style={{ fontSize: "35px", position: "absolute" }} /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <div className='card border-0 shadow rounded-4' >
                <div className='row  ms-2 mt-2'>
                  <h6 className='text-start '><span className='mt-0' style={{ fontSize: "23px" }}>Beam meter</span > | in month</h6>
                </div>
                <div className='row mt-3  mb-3 ms-3 me-3'>
                  <div className='col-8 m-0 '>
                    <h4 className=' mt-2 text-start'>{smeter}<span className='ms-2' style={{ fontSize: "18px" }}>mtr</span></h4>
                  </div>
                  <div className='col-4 m-0   d-flex justify-content-center align-items-center'>
                    <div className='row  d-flex justify-content-center align-items-center'><div className='rounded-3' style={{ height: "60px", background: "red", width: "60px", position: "relative" }}></div><FcAcceptDatabase style={{ fontSize: "35px", position: "absolute" }} /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <div className='card border-0 shadow rounded-4' >
                <div className='row  ms-2 mt-2'>
                  <h6 className='text-start '><span className='mt-0' style={{ fontSize: "23px" }}>Total meter</span > | in month</h6>
                </div>
                <div className='row mt-3  mb-3 ms-3 me-3'>
                  <div className='col-8 m-0 '>
                    <h4 className=' mt-2 text-start'>{mtr ? (mtr) : (<span>no data</span>)}<span className='ms-2' style={{ fontSize: "18px" }}>mtr</span></h4>
                  </div>
                  <div className='col-4 m-0   d-flex justify-content-center align-items-center'>
                    <div className='row  d-flex justify-content-center align-items-center'><div className='rounded-3' style={{ height: "60px", background: "yellow", width: "60px", position: "relative" }}></div><FcComboChart style={{ fontSize: "35px", position: "absolute" }} /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <div className='card border-0 shadow rounded-4'>
                <div className='row  ms-2 mt-2'>
                  <h6 className='text-start '><span className='mt-0' style={{ fontSize: "23px" }}>Billing</span > | in month</h6>
                </div>
                <div className='row mt-3  mb-3 ms-3 me-3'>
                  <div className='col-8 m-0 '>
                    <h4 className=' mt-2 text-start'>Rs. {price}</h4>
                  </div>
                  <div className='col-4 m-0   d-flex justify-content-center align-items-center'>
                    <div className='row  d-flex justify-content-center align-items-center'><div className='rounded-3' style={{ border: "none", height: "60px", background: "#198754", width: "60px", position: "relative" }}></div><FaMoneyBillTrendUp style={{ fontSize: "35px", position: "absolute" }} /></div>
                  </div>
                </div>
              </div>
            </div>






          </div>
          <div className='row '>
            <div className='col-8  ' style={{ height: "300px" }}>
              <div className='row mt-3   d-flex justify-content-around align-items-center '>
                <div className='col-11 shadow-sm  rounded-4 bg-white ' style={{ height: "470px" }}>
                  {production.length > 0 && prosrno.length > 0 ? (
                    <CCard className="mb-4 mt-2 border-0">
                      <CCardBody>
                        <CChartBar
                          data={{
                            labels: prosrno,
                            datasets: [
                              {
                                label: 'Daily Production',
                                backgroundColor: '#f87979',
                                data: production,
                              },
                            ],
                          }}
                          labels="months"
                        />
                      </CCardBody>
                    </CCard>
                  ) : (
                    <span>No data found! Please add production</span>
                  )}


                </div>
                {/* <div className='col-5  rounded-4 bg-white ' style={{ height: "270px", }}></div> */}
              </div>
              <div className='row  d-flex justify-content-center align-items-center mt-3'>
                <div className='col-11 shadow-sm   rounded-4 bg-white' style={{ height: "470px" }}>
                  <CCard className="mb-4 border-0" style={{ height: "210px" }}>
                    {/* <CCardHeader>Line Chart</CCardHeader> */}
                    <CCardBody>
                      <CChartLine
                        data={{
                          labels: prosrno,
                          datasets: [
                            {
                              label: 'Avrage eff',
                              backgroundColor: 'rgba(220, 220, 220, 0.2)',
                              borderColor: 'rgba(220, 220, 220, 1)',
                              pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                              pointBorderColor: '#fff',
                              data: eff,
                            },

                          ],

                        }}
                      // style={{ height : "210px"}}
                      />
                    </CCardBody>
                  </CCard>

                </div>

              </div>
            </div>
            <div className='col-4  ' style={{ height: "540px" }}>
              <div className='row  mt-3 d-flex justify-content-center'>
                <div className='col-11 shadow-sm  bg-white rounded-4' style={{ height: "472px" }}>

                  <div className='row mt-3'>
                    <div className='col-6'>
                      <CWidgetStatsC
                        icon={ <FcRules style={{height: "36px", width: "36px"}}  />}
                        value={pending}
                        title="Pending bills"
                      // progress={{ color: 'warning', value: 75 }}
                      />
                    </div>
                    <div className='col-6'>
                      <CWidgetStatsC
                        icon={<CIcon icon={cilBasket} height={36} />}
                        value="1238"
                        title="Fabric stock"
                      // progress={{ color: 'warning', value: 75 }}
                      />
                    </div>
                  </div>
                  <div className='row mt-4'>
                    <CCol sm={4} md={3} xl={12}>
                      <CWidgetStatsE
                       className='bg-primary text-white'
                        chart={
                          <CChartLine
                            className="mx-auto text-white"
                            style={{ height: '40px', width: '80px' }}
                            data={{
                              labels: [
                                'M',
                                'T',
                                'W',
                                'T',
                                'F',
                                'S',
                                'S',
                                'M',
                                'T',
                                'W',
                                'T',
                                'F',
                                'S',
                                'S',
                                'M',
                              ],
                              datasets: [
                                {
                                  backgroundColor: 'transparent',
                                  borderColor: getStyle('--cui-success'),
                                  borderWidth: 2,
                                  data: [
                                   12,
                                   23,
                                   42,
                                   12,
                                   43,
                                   24,
                                   34,
                                   12,
                                   34,
                                   12,
                                   34,
                                   34,
                                   56,
                                   76,
                                   78,


                                  ],
                                },
                              ],
                            }}
                            options={{
                              maintainAspectRatio: false,
                              elements: {
                                line: {
                                  tension: 0.4,
                                },
                                point: {
                                  radius: 0,
                                },
                              },
                              plugins: {
                                legend: {
                                  display: false,
                                },
                              },
                              scales: {
                                x: {
                                  display: false,
                                },
                                y: {
                                  display: false,
                                },
                              },
                            }}
                          />
                        }
                        title="title"
                        value="1,123"
                      />
                    </CCol>
                  </div>

                </div>
              </div>
              <div className='row  mt-3 d-flex justify-content-center'>
                <div className='col-11 shadow-sm  bg-white rounded-4' style={{ height: "290px" }}>
                  <CCard className="mb-4 border-0" style={{ height: "200px" }}>
                    {/* <CCardHeader>Pie Chart</CCardHeader> */}
                    <CCardBody className='d-flex justify-content-center' style={{ height: "200px" }}>
                      <CChartPie
                        data={{
                          labels: ['Red', 'Green', 'Yellow'],
                          datasets: [
                            {
                              data: [300, 50, 100],
                              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                            },
                          ],
                        }}
                        style={{ height: "200px" }}
                      />
                    </CCardBody>
                  </CCard>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-3 '>

            </div>
          </div>

          <div className='row'>
            <div className='col-3 '>

            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Board2;
