import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OTPVerification.css';
import uet from '../assets/images/otp.png';

function OTPVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // Get email passed from the previous page
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false); // Flag to track OTP sent status
  const [isSending, setIsSending] = useState(false); // Track whether OTP is being sent
  const [isVerifying, setIsVerifying] = useState(false); // Track OTP verification status
  const [otpVerified, setOtpVerified] = useState(false); // Flag to track OTP verification success
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  // Function to send OTP (called once on button click)
  const sendOTP = async () => {
    setLoading(true);
    setError('');
    setIsSending(true); // Set sending state
    try {
      await axios.post(`${backendUrl}/api/users/send-otp`, { email });
      setOtpSent(true); // OTP has been successfully sent
      setCountdown(30); // Reset countdown after sending OTP
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP. Please check your email address and try again.');
    } finally {
      setLoading(false);
      setIsSending(false); // Reset sending state after process
    }
  };

  // Function to verify OTP
  const handleVerifyOTP = async () => {
    if (otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP.');
      return;
    }

    setLoading(true);
    setError('');
    setIsVerifying(true); // Set verifying state
    try {
      const response = await axios.post(`${backendUrl}/api/users/verify-otp`, { email, otp });
      setOtpVerified(true); // Set OTP verified to true
      setError(''); // Clear any previous errors
      navigate('/change-password', { state: { email } }); // Redirect to change password page with email
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Invalid OTP or an error occurred. Please try again.');
    } finally {
      setLoading(false);
      setIsVerifying(false); // Reset verifying state after process
    }
  };

  // Start the countdown when OTP is sent
  useEffect(() => {
    if (otpSent) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendEnabled(true); // Enable resend after countdown finishes
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [otpSent]); // Depend on otpSent to start countdown after OTP is sent

  // Handle OTP input changes
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
  
    // Ensure only numbers are entered
    if (!/^[0-9]*$/.test(value)) return;
  
    const newOtp = otp.split('');
    newOtp[index] = value; // Update OTP value
    setOtp(newOtp.join(''));
  
    // Move focus to the next input field
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };
  
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      // Clear the current input and focus on the previous input
      const newOtp = otp.split('');
      newOtp[index] = ''; // Clear the current input value
      setOtp(newOtp.join(''));
  
      if (index > 0) {
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        if (prevInput) prevInput.focus();
      }
    }
  };

  return (
    <div className="otp-verification-container">
      <div className="otp-left">
        <img src={uet} alt="University Logo" className="logo-otp" />
        <h1>Handling Complaints</h1>
      </div>
      <div className="otp-right">
        <div className="otp-form">
          <h2>OTP Verification</h2>
          <div className='otp_para'>
          {otpSent && email ? (
            <p >
              We have sent a 4-digit verification code to <span className="email">{email}</span>
            </p>
          ) : (
            !otpSent && <p>Please click the button below to send the OTP to your email.</p>
          )}
          </div>
          <div className="otp-input-container">
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                type="text"
                value={otp[index] || ''}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                className="otp-input"
                id={`otp-input-${index}`}
              />
            ))}
          </div>
          {error && <p className="error-message">{error}</p>}
          
          {/* Unified Button to send OTP and Verify */}
          <button
            onClick={otpSent ? handleVerifyOTP : sendOTP}
            disabled={loading || (!otpSent && !email)}
            className="send-verify-button"
          >
            {loading
              ? otpSent
                ? 'Verifying...'
                : 'Sending...'
              : otpSent
              ? 'Verify Code'
              : 'Send Code'}
          </button>
          
          <p className="countdown-text">
            {countdown > 0 ? `Resend code in ${countdown} seconds` : 'Didn\'t receive code?'}
          </p>
          
          {/* Resend button */}
          <button 
            onClick={() => otpSent && resendEnabled && sendOTP()} 
            disabled={!resendEnabled || loading}
            className="resend-button"
          >
            {loading ? 'Resending...' : 'Resend Code'}
          </button>

          {/* Display OTP verified message if OTP is correct */}
          {otpVerified && <p className="success-message">OTP verified successfully!</p>}
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
