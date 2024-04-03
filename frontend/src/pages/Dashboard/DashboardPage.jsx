import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { showDashboard } from '../../store/dashboard/dashboardSlice'
import Sidebar from '../../adminComponents/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

// import './DashboardPage.scss';

function DashboardPage() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(showDashboard(true))
  }, [dispatch])
  return (
    <>
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-md-3 p-0">
            <Sidebar />
          </div>
          <div className="col-md-9 p-0">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage