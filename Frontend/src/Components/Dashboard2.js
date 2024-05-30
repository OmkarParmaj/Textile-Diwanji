import React from 'react'

const Dashboard2 = ({ isLoggedIn, setIsLoggedIn }) =>  {
  return (
    <div className='container-fluid vh-100'>
      <div className='row vh-100'>
        <div className='col-2'></div>
        <div className='col-10 border border-1'>
          <h1 className='ps-2'>This is Dashboard page</h1>
        </div>
      </div>
    </div>
  )
}

export default Dashboard2