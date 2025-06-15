import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // For navigation and passed state
import attachIcon from '../assets/images/AttachIcon.png';
import submittedImage from '../assets/images/submitted.png'; // Add the submitted image
import axios from 'axios';
import './ComplaintForm.css';
import { toast } from 'react-toastify';

const ComplaintForm = () => {
  const [title, setTitle] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [complaintType, setComplaintType] = useState('');
  const [hostel, setHostel] = useState(''); // Store hostel dynamically
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const location = useLocation();
  const navigate = useNavigate(); // For navigation

  // Get the complaint type passed from the previous page
  useEffect(() => {
    if (location.state && location.state.complaintType) {
      setComplaintType(location.state.complaintType);
      if (location.state.complaintType !== 'Others') {
        setTitle(location.state.complaintType);
      } else {
        setTitle('');
      }
    }
  }, [location]);

  // Fetch user details dynamically based on the logged-in user's email
  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem('userEmail');

      if (!email) {
        console.log('No user email found');
        return;
      }

      try {
        const response = await axios.get(`${backendUrl}/api/users/user-details`, {
          params: { email },
        });

        localStorage.setItem('registrationNo', response.data.regno);
        localStorage.setItem('hostel', response.data.hostel); // Store hostel in localStorage
        setRegistrationNo(response.data.regno);
        setHostel(response.data.hostel); // Set the hostel dynamically

      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();

    // Set the current date automatically in the correct format
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-CA'); // Format: yyyy-mm-dd
    setDate(formattedDate); // Set date to current date in yyyy-mm-dd format
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const complaintData = {
      title,
      registrationNo,
      roomNo,
      date,
      description,
      hostel, // Use dynamically fetched hostel
    };
  
    try {
      // Submit the complaint
      const response = await axios.post(
        `${backendUrl}/api/users/submit-complaint`,
        complaintData
      );
  
      // Update localStorage with the new status
      localStorage.setItem('complaintStatus', 'RT'); // Set status to "RT"
  
      setIsSubmitting(false);
      setShowPopup(true);
    } catch (error) {
      console.error('Error:', error.message);
      toast('Failed to submit complaint.', { type: 'error' });
      setIsSubmitting(false);
    }
  };

  // Handle navigation back to ComplaintTypeMenu
  const handleBack = () => {
    setShowPopup(false);
    navigate('/complaints'); // Navigate to ComplaintTypeMenu
  };

  return (
    <div className="complaint-form-container">
      <div className='complaint-form'>
        <h2>Complaint Form</h2>
        <form onSubmit={handleSubmit} className={isSubmitting ? 'submitting' : ''}>
          <label>
            Complaint Title
            <input
              type="text"
              placeholder="Enter complaint title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              readOnly={complaintType !== 'Others'}
            />
          </label>
          <label>
            Registration No.
            <input type="text" value={registrationNo} readOnly />
          </label>
          <label>
            Room No.
            <input
              type="text"
              placeholder="Enter room number"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
              required
            />
          </label>
          <label>
            Hostel
            <input type="text" value={hostel} readOnly /> {/* Display dynamic hostel */}
          </label>
          <label>
            Date
            <input type="date" value={date} readOnly />
          </label>
          <label>
            Description
            <textarea
              placeholder="Describe your complaint..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <div className="file-attachment">
            <label htmlFor="file-upload" className="file-upload-label">
              <img src={attachIcon} alt="Attach File" />
            </label>
             <label>
              Attach File <span className="optional">(optional)</span>
            </label>
            <div className="file-input-container">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                id="file-upload"
                className="file-upload-input"
                style={{ display: 'none' }}
              />
              <span className="file-name">{file ? file.name : ''}</span>
            </div> 
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {/* Popup */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <img src={submittedImage} alt="Submitted" className="popup-image" />
              <h3>Submitted</h3>
              <button onClick={handleBack} className="back-button">
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintForm;
