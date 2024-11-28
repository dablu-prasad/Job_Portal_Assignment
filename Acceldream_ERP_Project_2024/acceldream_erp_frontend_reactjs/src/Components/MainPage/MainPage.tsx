import React, { useState } from 'react'
import "./MainPage.css"
import RegistrationPage from '../RegistrationPage/RegistrationPage'
import LoginPage from '../LoginPage/LoginPage'
const MainPage = () => {
    const [selectButton,setSelectButton]=useState(true)
    const handleChangeRegister=(e:any)=>{
e.preventDefault()
setSelectButton(true)
    }
    const handleChangeLogin=(e:any)=>{
        e.preventDefault()
        setSelectButton(false)
            }
  return (
    <div className='main-container'>
      <form className='login-register-form'>
<div className='login-register-btn'>
    <button onClick={handleChangeRegister}>Register</button>
    <button onClick={handleChangeLogin}>Login</button>
</div>
<div className='login-register-area'>
{selectButton?<RegistrationPage/>:<LoginPage/>}
</div>
      </form>
    </div>
  )
}

export default MainPage
