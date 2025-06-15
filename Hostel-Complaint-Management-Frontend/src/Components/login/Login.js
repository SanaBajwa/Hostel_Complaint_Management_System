import complaint_Login from '../assets/images/Computer login-amico.png';
import showIcon from '../assets/images/show.png';
import hideIcon from '../assets/images/hide.png';
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle login logic
  const handleLogin = async (event) => {
    event.preventDefault();
    setEmailError('');
    setError('');
    setIsLoading(true);

    if (!email) {
      setEmailError('Please enter your email first.');
      setIsLoading(false);
      return;
    }

    try {
      // Send login request
      const response = await axios.post(`${backendUrl}/api/users/login`, {
        email,
        password,
      });
      console.log(response.data); // or handle success



      const { role, regno, complaints } = response.data;
      // Store necessary data in localStorage
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userRegNo', regno);
      localStorage.setItem('userComplaints', JSON.stringify(complaints));
      localStorage.setItem('hostel', response.data.hostel);
      console.log('🗂️ Registration Number Stored:', regno);

      setSuccessMessage(`Logged in successfully! Role: ${role}`);

      // Redirect based on user role
      setTimeout(() => {
        switch (role) {
          case 'Student':
            navigate('/student-dashboard');
            break;
          case 'RT':
            navigate('/rt-dashboard');
            break;
          case 'Warden':
            navigate('/warden-dashboard');
            break;
          case 'EndUser':
            navigate('/enduser-dashboard');
            break;
          case 'CC':
            navigate('/CC-dashboard');
            break;
          case 'Munshi':
            navigate('/Munshi-dashboard');
            break;
          case 'SuperAdmin':
            navigate('/SuperAdmin-dashboard');
            break;
          default:
            navigate('/');
        }
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  // Handle forgot password navigation
  const handleForgotPassword = () => {
    if (!email) {
      setEmailError('Please enter your email first.');
      return;
    }

    localStorage.setItem('email', email);
    setIsLoading(true);

    setTimeout(() => {
      navigate('/verify-otp', { state: { email } });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="Login_Wrapper">
      <div className="login-container">
        {isLoading && <div className="progress-bar"></div>}

        {/* Left Section - Image */}
        <div className="login-left">
          <img src={complaint_Login} alt="Complaint Illustration" className="complaint_login" />
        </div>

        {/* Right Section - Form */}
        <div className="login-right">
          <div className="login-form">
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className="error-message">{emailError}</p>}
              </div>

              {/* Password Input */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img
                    src={showPassword ? hideIcon : showIcon}
                    alt={showPassword ? 'Hide password' : 'Show password'}
                    className="toggle-icon"
                    onClick={togglePasswordVisibility}
                  />
                </div>
              </div>

              {/* Error and Success Messages */}
              {error && <p className="error-message">{error}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}

              {/* Forgot Password */}
              <div className="forgot-password">
                <span
                  onClick={handleForgotPassword}
                  style={{ cursor: 'pointer', color: 'black' }}
                >
                  Forgot password?
                </span>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
