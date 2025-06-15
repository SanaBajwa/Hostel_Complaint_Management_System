import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CC_WardenAddRemove.css";

const CCDashboardWarden = () => {
  const [wardens, setWardens] = useState([]);
  const [newWarden, setNewWarden] = useState({
    name: "",
    email: "",
    password: "",
    regno: "",
    campus: "",
    hostel: ""
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedWarden, setSelectedWarden] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchWardens = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/users/wardens`);
        setWardens(response.data);
      } catch (error) {
        console.error("Error fetching wardens:", error);
      }
    };
    fetchWardens();
  }, []);

  const handleView = (warden) => {
    setSelectedWarden(warden);
    setViewModal(true);
  };
  

  return (
    <div className="cc-dashboard-container">
      <div className="main-content Warden_Table-container">
        <h2>Warden List</h2>
        <table>
          <thead className="Warden_Table">
            <tr>
              <th>Name</th>
              <th>Campus</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wardens.map((warden) => (
              <tr key={warden._id}>
                <td>{warden.name}</td>
                <td>{warden.campus}</td>
                <td>
                  <button className="cc-Warden_view-button" onClick={() => handleView(warden)}>View</button>
                  {/* <button className="Warden_remove-button" onClick={() => handleRemove(warden._id)}>Remove</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>



        {/* View Modal */}
        {viewModal && selectedWarden && (
          <div className="cc-war-modal">
            <div className="cc-war-modal-content">
              <h3>Warden Details</h3>
              <p><strong>Name:</strong> {selectedWarden.name}</p>
              <p><strong>Email:</strong> {selectedWarden.email}</p>
              <p><strong>Reg No:</strong> {selectedWarden.regno}</p>
              <p><strong>Hostel:</strong> {selectedWarden.hostel}</p>
              <p><strong>Campus:</strong> {selectedWarden.campus}</p>
              <button className="cc-war-modal-cancel" onClick={() => setViewModal(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CCDashboardWarden;
