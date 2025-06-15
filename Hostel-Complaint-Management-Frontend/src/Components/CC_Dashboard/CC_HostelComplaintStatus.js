import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CC_HostelComplaintStatus.css";

const CCDashboard = () => {
  const [hostels, setHostels] = useState([]);
  const [selectedStats, setSelectedStats] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/users/hostels`);
        setHostels(response.data);
      } catch (error) {
        console.error("Error fetching hostels:", error.message);
      }
    };

    fetchHostels();
  }, []);

  const handleView = async (hostelName) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/users/hostel-stats/${hostelName}`
      );
      setSelectedStats(response.data);
    } catch (error) {
      console.error("Error fetching hostel stats:", error.message);
    }
  };

  return (
    <div className="cc-hostel-container">
      <div className="CC_hostel_main-content">
        <table className="CC_hostel_table">
          <thead>
            <tr>
              <th>Hostel Name</th>
              <th>Rooms</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hostels.map((hostel, index) => (
              <tr key={index}>
                <td>{index + 1}. {hostel.name}</td>
                <td>{hostel.rooms || "N/A"}</td>
                <td>
                  <button
                    className="CC-action-btn CC-view-btn"
                    onClick={() => handleView(hostel.name)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Stats Section */}
        {selectedStats && (
  <>
    <div className="cc-modal-overlay" onClick={() => setSelectedStats(null)}></div>
    <div className="cc-hostel-stats">
      <button className="cc-close-btn" onClick={() => setSelectedStats(null)}>&times;</button>
      <h3>Details for {selectedStats.hostelName}</h3>
      <p><strong>Number of Students:</strong> {selectedStats.students}</p>
      <p><strong>Number of Rooms:</strong> {selectedStats.rooms}</p>
      <p><strong>Total Complaints:</strong> {selectedStats.complaints}</p>
    </div>
  </>
)}

      </div>
    </div>
  );
};

export default CCDashboard;
