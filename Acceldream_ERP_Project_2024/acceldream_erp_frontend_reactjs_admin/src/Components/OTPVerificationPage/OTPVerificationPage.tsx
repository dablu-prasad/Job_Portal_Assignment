import React, { useState, useRef } from 'react';
import "./OTPVerificationPage.css"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { OTP_VERIFIY } from '../../Graphql/mutations';
import { setUserToken } from '../../Authenticates/isAuthenticated';
import ErrorPopupPage from '../ErrorPopupPage/ErrorPopupPage';
import SuccessPopupPage from '../SuccessPopupPage/SuccessPopupPage';

const OTPVerificationPage = () => {
  const [verifyOTP, {loading}] = useMutation(OTP_VERIFIY)
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  console.log("OTP Email", email)
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return; // Ensure only numbers are entered
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only keep the last digit
    setOtp(newOtp);
    // Move focus to the next input field if a value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move focus to the previous input field on Backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      verifyOTP({
        variables: {
          email: email,
          mobile: "0000000000",
          otp: otpValue
        },
      }).then((response)=>{
        if (response.data.verifyOTP.success) {
          setUserToken(response.data.verifyOTP.token)
          navigate("/dashboard")
        }
       else {
        setErrorMessage('Please enter a 6-digit OTP');
      }  
      }).catch((error)=>{
        const message = error.response?.data?.message || error.message || "An unknown error occurred.";
        setErrorMessage(message);
      })
    }
  };
  const closeErrorPopup = () => {
    setErrorMessage("");
  };

  const closeSuccessPopup = () => {
    setSuccessMessage("");
  };

  return (
    <div className='container'>
      <div className="otp-container">
        <h2>Enter OTP</h2>
        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-inputGroup">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)} // Correctly assign refs
                className="otp-input"
                style={{
                  width: '50px',
                  height: '50px',
                  textAlign: 'center',
                  fontSize: '20px',
                  margin: '0 5px',
                }}
              />
            ))}
          </div>
          <button type="submit" className='otp-btn' disabled={loading}>
          {loading ? <div className="loader"></div> : "Verify OTP"}         
          </button>
          {errorMessage && <ErrorPopupPage message={errorMessage} onClose={closeErrorPopup} />}
          {successMessage && <SuccessPopupPage message={successMessage} onClose={closeSuccessPopup} />}
        </form>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
