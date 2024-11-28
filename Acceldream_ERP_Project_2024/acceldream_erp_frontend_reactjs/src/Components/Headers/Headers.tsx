import React, { useState } from 'react'
import "../Headers/Headers.css"
const Headers = () => {
    const [menuOpen,setMenuOpen]=useState(false)

    const toggleMenu=()=>{
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
            <div className={`header-menu-options ${menuOpen?"show":""}`}>
                <a href='#'>Home</a>
                <a href='#'>About</a>
                <a href="#">Services</a>
                <a href='#'>Contact</a>
            </div>
        </div>
    )
}

export default Headers
