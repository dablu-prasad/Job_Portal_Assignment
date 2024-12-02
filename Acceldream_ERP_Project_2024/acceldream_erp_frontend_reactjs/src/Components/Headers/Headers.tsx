import React, { useState } from 'react'
import "../Headers/Headers.css"
import { IsAuthenticated, removeToken } from '../../Authenticates/isAuthenticated'
import RegisrationPage from '../RegistrationPage/RegistrationPage'
import LoginPage from '../LoginPage/LoginPage'
import { useNavigate } from 'react-router-dom'

const Headers = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [openRegistorForm, setOpenRegistorForm] = useState(false)
    const [openRegModal, setRegOpenModal] = useState(false)
    const [openLogModal, setLogOpenModal] = useState(false)
const navigate=useNavigate()
    const onRegisterButton = () => {
        setRegOpenModal(true)
        setOpenRegistorForm(true)
        setLogOpenModal(false)
    }

    const onLoginButton = () => {
        setRegOpenModal(false)
        setOpenRegistorForm(true)
        setLogOpenModal(true)
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }
const logOut=()=>{
    removeToken()
    navigate("/")
}
    return (
        <div className='header-container'>
            <div className='header-logo'>
                <img alt="" src="ERP-logo.png" />
            </div>
            <div className={`header-menu-options ${menuOpen ? "show" : ""}`}>
                <a href='/'>Home</a>
                <a href='/'>About</a>
                <a href="/">Services</a>
                <a href='/'>Contact</a>
            </div>
            {!IsAuthenticated() ? (
    <>
        {/* Hamburger Icon */}
        <button className="hamburger-menu" onClick={toggleMenu}>
            ☰
        </button>
        <div className="header-register-btn">
            <button className="register-btn" onClick={onRegisterButton}>
                Register
            </button>
            <button className="login-btn" onClick={onLoginButton}>
                Login
            </button>
        </div>
    </>
) : (
    <button onClick={logOut} className="logout-btn">
        Logout
    </button>
)}


            {/* Conditionally render the registration and login modals */}
            {openRegModal && (
                <RegisrationPage
                    openRegistorForm={openRegistorForm}
                    setOpenRegistorForm={setOpenRegistorForm}
                />
            )}
            {openLogModal && (
                <LoginPage
                    openRegistorForm={openRegistorForm}
                    setOpenRegistorForm={setOpenRegistorForm}
                />
            )}
        </div>
    )
}

export default Headers
