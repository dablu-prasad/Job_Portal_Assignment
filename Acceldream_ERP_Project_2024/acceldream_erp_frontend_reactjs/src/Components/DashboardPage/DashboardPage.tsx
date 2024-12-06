import React from 'react'
import Headers from '../Headers/Headers'
import ModuleList from '../ModuleList/ModuleList'
import ModuleListArea from '../ModuleListArea/ModuleListArea'
import "./DashboardPage.css"
const DashboardPage = () => {
  return (
    <>
      <div className='dashboard-container-main'>
        <div className='dashboard-header'>
          <Headers />
        </div>

        <div className='dashboard-container'>
          <ModuleList />
          <ModuleListArea />
        </div>
      </div>

    </>
  )
}

export default DashboardPage
