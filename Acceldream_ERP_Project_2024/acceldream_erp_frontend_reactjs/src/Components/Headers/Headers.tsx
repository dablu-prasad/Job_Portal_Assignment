import React, { useState } from 'react'
import "../Headers/Headers.css"
import { IsAuthenticated } from '../../Authenticates/isAuthenticated'
import RegisrationPage from '../RegistrationPage/RegistrationPage'
import LoginPage from '../LoginPage/LoginPage'

const Headers = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [openRegistorForm, setOpenRegistorForm] = useState(false)
    const [openRegModal, setRegOpenModal] = useState(false)
    const [openLogModal, setLogOpenModal] = useState(false)

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

    return (
        <div className='header-container'>
            <div className='header-logo'>
                <img alt="" src="ERP-logo.png" />
            </div>
            {/* Hamburger Icon */}
            <button className="hamburger-menu" onClick={toggleMenu}>
                ☰
            </button>
            {
                !IsAuthenticated()
                    ?
                    <div className='header-register-btn'>
                        <button className='register-btn' onClick={onRegisterButton}>Register</button>
                        <button className='login-btn' onClick={onLoginButton}>Login</button>
                    </div>
                    :
                    <div className={`header-menu-options ${menuOpen ? "show" : ""}`}>
                        <a href='#'>Home</a>
                        <a href='#'>About</a>
                        <a href="#">Services</a>
                        <a href='#'>Contact</a>
                    </div>
            }
            
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
