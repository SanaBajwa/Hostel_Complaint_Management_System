import React, { useState, useEffect } from 'react';
import axios from 'axios';
import showIcon from '../assets/images/show.png';
import hideIcon from '../assets/images/hide.png';
import uet from '../assets/images/Computer login-amico.png';
import './ChangePassword.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function ChangePassword() {
  const [email, setEmail] = useState('');  // Initially empty
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Fetch email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setMessage('');
    setError('');
  
    // Retrieve the email from localStorage
    const storedEmail = localStorage.getItem('email');
    if (!storedEmail) {
      setError('Email is required');
      return;
    }
  
    if (!newPassword || !confirmPassword) {
      setError('Both fields are required');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
  
    try {
      // Now use the stored email from localStorage
      const response = await axios.put(`${backendUrl}/api/users/update-password`, {
        email: storedEmail,  // Send email from localStorage
        newPassword
      });
  
      if (response.status === 200) {
        setMessage(response.data.message || 'Password updated successfully');
        setNewPassword('');
        setConfirmPassword('');
        localStorage.removeItem('email'); // Optionally remove email from localStorage after update
  
        navigate('/'); // Adjust the route as per your routing setup
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };
  

  return (
    <div className="change-password-container">
      <div className="change-password-left">
        <img src={uet} alt="University Logo" className="logo" />
        <h1>Handling Complaints</h1>
      </div>

      <div className="change-password-right">
        <form className="change-password-form" onSubmit={handleSubmit}>
          <h2>Change Password</h2>

          {/* New Password Field */}
          <div className="form-group password-group">
            <label htmlFor="new-password">New password</label>
            <div className="password-input-container">
              <input
                type={newPasswordVisible ? 'text' : 'password'}
                id="new-password"
                placeholder="Create a password"
                className="form-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <img
                src={newPasswordVisible ? hideIcon : showIcon}
                alt="Toggle visibility"
                className="password-toggle-icon"
                onClick={toggleNewPasswordVisibility}
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="form-group password-group">
            <label htmlFor="confirm-password">Confirm password</label>
            <div className="password-input-container">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="confirm-password"
                placeholder="Enter password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <img
                src={confirmPasswordVisible ? hideIcon : showIcon}
                alt="Toggle visibility"
                className="password-toggle-icon"
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </div>

          {/* Display Error or Success Messages */}
          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}

          {/* Submit Button */}
          <button type="submit" className="btn-primary">Confirm</button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
