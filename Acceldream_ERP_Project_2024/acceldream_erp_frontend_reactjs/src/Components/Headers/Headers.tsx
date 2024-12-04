import React, { useState } from 'react';
import "../Headers/Headers.css";
import { getAuthHeaders, IsAuthenticated, removeToken } from '../../Authenticates/isAuthenticated';
import RegisrationPage from '../RegistrationPage/RegistrationPage';
import LoginPage from '../LoginPage/LoginPage';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER_QUERY } from '../../Graphql/querys';

const Headers = () => {
    const { data, loading, error } = useQuery(USER_QUERY, getAuthHeaders());
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false)
    const [openRegistorForm, setOpenRegistorForm] = useState(false);
    const [openRegModal, setRegOpenModal] = useState(false);
    const [openLogModal, setLogOpenModal] = useState(false);
    const navigate = useNavigate();

    const onRegisterButton = () => {
        setRegOpenModal(true);
        setOpenRegistorForm(true);
        setLogOpenModal(false);
    };
    console.log("userDetails", data)
    const onLoginButton = () => {
        setRegOpenModal(false);
        setOpenRegistorForm(true);
        setLogOpenModal(true);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleProfileMenu = () => {
        setProfileMenu(!profileMenu)
    }

    const logOut = () => {
        removeToken();
        navigate("/");
    };

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="header-container">
            <div className='header-left'>
                <div className="header-logo">
                    <img alt="ERP Logo" src="ERP-logo.png" />
                </div>

                <div className='header-left-humberger' onClick={toggleMenu}>
                    <button className='header-humberger-btn'><img src="/humberger.png" alt="" /></button>
                </div>

                <div className={`header-menu-options ${menuOpen ? "show" : ""}`}>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </div>
            {!IsAuthenticated() ? (
             <>
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

            <div className='header-right'>
                <div className='header-profile-option' onClick={toggleProfileMenu}>
                    <button className='header-profile-option-btn'><img src="/avatar.png" alt="" /></button>
                </div>
                <div className={`header-name-image ${profileMenu ? "show" : ""}`}>
                    <div className='header-profile-img' onClick={toggleProfileMenu}>
                        <img alt="" src="/avatar.png" style={{borderRadius:"50%"}}/>
                    </div>
                    <div className='header-username'>
                        {/* <h3 >{data.userDetails?.userName}</h3> */}
                        <h3>dablu-prasad</h3>
                    </div>
                    <div className='logout-div'>
                        <button onClick={logOut} className="logout-btn">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            )}
            {/* Registration and Login Modals */}
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
    );
};

export default Headers;
