import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ComplaintStatusPage.css';
import { Link } from 'react-router-dom';
import filter from '../assets/images/filter.png';
const ComplaintStatusPage = ({ searchQuery = '' }) => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // ✅ Ensure consistency with 'userRegNo' from Login.js
  const [loggedInRegNo, setLoggedInRegNo] = useState(localStorage.getItem('userRegNo') || '');

  console.log('🚀 Component Rendered');
  console.log('🔍 Logged-in Registration Number:', loggedInRegNo);

  // ✅ Fetch complaints for the logged-in user
  const fetchComplaints = async (regNo) => {
    if (!regNo) {
      console.warn('⚠️ No registration number found. Exiting fetch.');
      setComplaints([]);
      return;
    }

    try {
      console.log('📨 Fetching complaints for:', regNo);
      const response = await axios.get(
        `${backendUrl}/api/users/student-complaints?regNo=${regNo}`
      );

      const fetchedComplaints = response.data?.complaints || [];
      console.log('✅ Complaints Fetched:', fetchedComplaints);

      setComplaints(fetchedComplaints);
      setFilteredComplaints(fetchedComplaints);
    } catch (error) {
      console.error('❌ Error fetching student complaints:', error);
      setComplaints([]);
    }
  };

  // ✅ Ensure the registration number is updated and fetch complaints
  useEffect(() => {
    fetchComplaints(loggedInRegNo);
  }, [loggedInRegNo]);

  // ✅ Sync with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedRegNo = localStorage.getItem('userRegNo') || '';
      console.log('🔔 localStorage Updated:', updatedRegNo);
      if (updatedRegNo !== loggedInRegNo) {
        setLoggedInRegNo(updatedRegNo);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loggedInRegNo]);

  // ✅ Handle sorting logic
  const handleSort = (order) => {
    console.log('🔽 Sorting complaints by:', order);
    const sortedComplaints = [...complaints];

    if (order === 'asc') {
      sortedComplaints.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === 'desc') {
      sortedComplaints.sort((a, b) => b.title.localeCompare(a.title));
    } else if (order === 'time') {
      sortedComplaints.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredComplaints(sortedComplaints);
    setShowFilterMenu(false);
  };


  useEffect(() => {
    console.log('Search Query:', searchQuery);
    if (!searchQuery.trim()) {
      setFilteredComplaints(complaints);
    } else {
      const filtered = complaints.filter(complaint =>
        complaint.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredComplaints(filtered);
    }
  }, [searchQuery, complaints]); // ✅ Run when searchQuery changes
    
  
  

  return (
    <div className="complaint-status-container">
      {/* Filter Section */}
      <div className="complaint-status-filter-section">
        <button
          className="complaint-status-filter-btn"
          onClick={() => setShowFilterMenu(!showFilterMenu)}
        >
          Filter
          <img src={filter} alt="Filter Complaints" />
        </button>

        {showFilterMenu && (
          <div className="complaint-status-filter-dropdown">
            <ul>
              <li onClick={() => handleSort('asc')}>Ascending Order</li>
              <li onClick={() => handleSort('desc')}>Descending Order</li>
              <li onClick={() => handleSort('time')}>By Time</li>
            </ul>
          </div>
        )}
      </div>

      {/* Complaint Table */}
      <div className="complaint-status-table">
        <table className="status-table">
          <thead>
            <tr>
              <th>Complaint List</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint.title}</td>
                  <td>{new Date(complaint.date).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/status-bar/${complaint._id}`}>
                      <button className="complaint-status-check-btn">Check</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  No complaints yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintStatusPage;
