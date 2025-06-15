import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CC_RTAddRemove.css";

const CCDashboardRT = () => {
  const [rts, setRts] = useState([]);
  const [selectedRT, setSelectedRT] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchRTs = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/users/rts`);
        setRts(response.data);
      } catch (error) {
        console.error("Error fetching RTs:", error);
      }
    };
    fetchRTs();
  }, []);

  const handleView = (rt) => {
    setSelectedRT(rt);
    setViewModal(true);
  };

  return (
    <div className="cc-dashboard-container">
      <div className="main-content">
        <h2>RT List</h2>
        <table>
          <thead className="RT_Table">
            <tr>
              <th>Name</th>
              <th>Hostel</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rts.map((rt) => (
              <tr key={rt._id}>
                <td>{rt.name}</td>
                <td>{rt.hostel}</td>
                <td>
                  <button className="cc-RT_view-button" onClick={() => handleView(rt)}>View</button>
                  {/* Future: Add remove or edit buttons here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* View Modal */}
        {viewModal && selectedRT && (
          <div className="cc-rt-modal">
            <div className="cc-rt-modal-content">
              <h3>RT Details</h3>
              <p><strong>Name:</strong> {selectedRT.name}</p>
              <p><strong>Email:</strong> {selectedRT.email}</p>
              <p><strong>Reg No:</strong> {selectedRT.regno}</p>
              <p><strong>Hostel:</strong> {selectedRT.hostel}</p>
              <p><strong>Campus:</strong> {selectedRT.campus}</p>
              <button className="cc-rt-modal-cancel" onClick={() => setViewModal(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CCDashboardRT;
