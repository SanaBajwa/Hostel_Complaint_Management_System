import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ProfileMenu.css';
import profile1 from '../assets/images/profile2.png';
import logout from '../assets/images/logout.png';

const ProfileMenu = ({ isOpen, onClose }) => {
  const [userDetails, setUserDetails] = useState(null);
  const profileMenuRef = useRef(null); // Reference to the profile menu container
  const navigate = useNavigate(); // Initialize useNavigate
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Close the profile menu if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the profile menu container
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        onClose(); // Close the profile menu
      }
    };

    const handleKeyDown = (event) => {
      // Prevent the backspace key from triggering the profile menu when on other pages
      if (event.key === 'Backspace') {
        event.preventDefault(); // Disable backspace key behavior
      }
    };

    const handlePopState = () => {
      onClose(); // Close the profile menu when browser history changes (back/forward)
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside); // Listen for click events
      document.addEventListener('keydown', handleKeyDown); // Listen for keydown events to disable backspace
      window.addEventListener('popstate', handlePopState); // Listen for browser history changes (back button)
    } else {
      document.removeEventListener('mousedown', handleClickOutside); // Remove the event listener when the menu is closed
      document.removeEventListener('keydown', handleKeyDown); // Remove the event listener for backspace when the menu is closed
      window.removeEventListener('popstate', handlePopState); // Remove the popstate event listener
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup click listener
      document.removeEventListener('keydown', handleKeyDown); // Cleanup keydown listener
      window.removeEventListener('popstate', handlePopState); // Cleanup popstate event listener
    };
  }, [isOpen, onClose]);

  const fetchUserDetails = async () => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      console.error('No email found in localStorage');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/users/user-details?email=${email}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUserDetails();
    }
  }, [isOpen]);

  const handleProfileMenuClick = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up to document
  };

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('userEmail');
    sessionStorage.clear();
  
    // Prevent browser from keeping cached content
    window.history.replaceState(null, null, '/');
  
    // Redirect to login
    navigate('/login');
  };
  
  if (!isOpen) return null; // Don't render if not open

  return (
    <div
      className={`profile-menu-container ${isOpen ? 'open' : ''}`}
      ref={profileMenuRef}
      onClick={handleProfileMenuClick} // Prevents closing when clicking inside
    >
      <div className="profile-menu-content">
        <ul>
          <li>
            <h3>
              {userDetails ? userDetails.name : 'Loading...'}
              <img src={profile1} alt="Profile" />
            </h3>
          </li>
          <hr />
          <li>{userDetails ? userDetails.regno : 'Loading...'}</li>
        </ul>
        <hr />
        <button onClick={handleLogout}>
          Logout <img src={logout} alt="Logout" />
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
