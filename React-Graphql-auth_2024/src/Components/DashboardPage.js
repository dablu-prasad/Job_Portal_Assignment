import React from 'react'
import { removeToken } from '../Authenticates/isAuthenticated'
import { useNavigate } from 'react-router-dom'

const DashboardPage = () => {
  const navigate=useNavigate()
  const handleLogOut=async()=>{
    removeToken()
    navigate('/')
  }
  return (
    <div>
      <h1>This is Home HomePage</h1>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  )
}

export default DashboardPage;
