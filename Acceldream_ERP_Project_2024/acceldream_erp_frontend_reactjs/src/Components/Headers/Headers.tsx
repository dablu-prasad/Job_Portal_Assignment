import React, { useState } from "react";
import "../Headers/Headers.css";
import { getAuthHeaders, IsAuthenticated, removeToken } from "../../Authenticates/isAuthenticated";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import LoginPage from "../LoginPage/LoginPage";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER_QUERY } from "../../Graphql/querys";
import LogoutPage from "../LogoutPage/LogoutPage";
import EditProfilePage from "../EditProfilePage/EditProfilePage";
import { EditFormError } from "../../types/types";
import ResetPasswordPage from "../ResetPasswordPage/ResetPasswordPage";

const Headers = () => {
    const { data, } = useQuery(USER_QUERY, getAuthHeaders());
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);
    const [openRegistorForm, setOpenRegistorForm] = useState(false);
    const [openRegModal, setRegOpenModal] = useState(false);
    const [openLogModal, setLogOpenModal] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isResetPassPopupOpen,setIsResetPassPopupOpen]=useState(false)
    const navigate = useNavigate();
    const handleLogout = () => {
        setShowPopup(true);
    };
    const confirmLogout = () => {
        removeToken();
        setShowPopup(false);
        navigate("/");
    };
    const cancelLogout = () => {
        setShowPopup(false);
    };
    const onRegisterButton = () => {
        setRegOpenModal(true);
        setOpenRegistorForm(true);
        setLogOpenModal(false);
    };

    const onLoginButton = () => {
        setRegOpenModal(false);
        setOpenRegistorForm(true);
        setLogOpenModal(true);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleProfileMenu = () => {
        setProfileMenu(!profileMenu);
    };
const onClickEditProfile=()=>{
setIsPopupOpen(true)
setProfileMenu(!profileMenu)
}
    const onClickResetPassword = () => {
        setIsResetPassPopupOpen(true)
        setProfileMenu(!profileMenu)
    }

    return (
        <div className="header-container">
            <div className="header-left">
                <div className="header-logo">
                    <img alt="ERP Logo" src="ERP-logo.png" />
                </div>

                <div className="header-left-hamburger" onClick={toggleMenu}>
                    <button className="header-hamburger-btn">
                        <img src="/hamburger.png" alt="Menu" />
                    </button>
                </div>

                <div className={`header-menu-options ${menuOpen ? "show" : ""}`}>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </div>

            {!IsAuthenticated() ? (
                <div className="header-register-btn">
                    <button className="register-btn1" onClick={onRegisterButton}>
                        Register
                    </button>
                    <button className="login-btn1" onClick={onLoginButton}>
                        Login
                    </button>
                </div>
            ) : (
                <div className="header-right">
                    <div className="header-username">
                        <h3>{data?.userDetails?.userName || "Guest"}</h3>
                    </div>
                    <div className="header-profile-option">
                        <button className="header-profile-option-btn" onClick={toggleProfileMenu}>
                            <img src="/avatar.png" alt="Profile" style={{ borderRadius: "50%" }} />
                        </button>
                        <div className={`header-name-image ${profileMenu ? "show" : ""}`}>
                            <div className="header-edit-profile">
                                <button onClick={onClickEditProfile}>Edit Profile</button>
                                <EditProfilePage
                                    isOpen={isPopupOpen}
                                    onClose={() => setIsPopupOpen(false)}
                                />
                            </div>
                            <div className="header-reset-password">
                                <button onClick={onClickResetPassword}>Reset Password</button>
                                <ResetPasswordPage
                                    ID={data?.userDetails?._id}
                                    isOpen={isResetPassPopupOpen}
                                    onClose={() => setIsResetPassPopupOpen(false)}
                                />
                            </div>
                            <div className="logout-div">
                                <button onClick={handleLogout}>
                                    Logout
                                </button>

                                {showPopup && (
                                    <LogoutPage onConfirm={confirmLogout} onCancel={cancelLogout} />
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {/* Registration and Login Modals */}
            {openRegModal && (
                <RegistrationPage openRegistorForm={openRegistorForm} setOpenRegistorForm={setOpenRegistorForm} />
            )}
            {openLogModal && (
                <LoginPage openRegistorForm={openRegistorForm} setOpenRegistorForm={setOpenRegistorForm} />
            )}
        </div>
    );
};

export default Headers;
