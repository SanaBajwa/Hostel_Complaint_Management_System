import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SA_WardenAddRemove.css";

const SA_DashboardWarden = () => {
  const [wardens, setWardens] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCampus, setEditCampus] = useState("");
  const [newWarden, setNewWarden] = useState({ name: "", email: "", campus: "", password: "", regno: "", hostel: "" });
  const [error, setError] = useState("");
  const [selectedWar, setSelectedWar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [emailError, setEmailError] = useState("");
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

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/users/wardens/${id}`);
      setWardens(wardens.filter((warden) => warden._id !== id));
    } catch (error) {
      console.error("Error removing warden:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const WarData = { ...newWarden, role: "Warden", hostel: "none" }; // Merging both properties
      console.log("Adding new warden:", newWarden); // Debugging line
      const response = await axios.post(`${backendUrl}/api/users/wardens`, WarData);
      console.log("Response:", response.data); // Debugging line

      if (response.status === 201) { // Ensure success response
        setWardens([...wardens, response.data]);
        setShowModal(false);
        setNewWarden({ name: "", email: "", campus: "", password: "", regno: "", hostel: "" });
        setError(""); // Reset error
      }
    } catch (error) {
      console.error("Error adding new warden:", error.response ? error.response.data : error.message);

      if (error.response && error.response.status === 400) {
        setError("Email already exists.");
      } else {
        setError("Something went wrong, please try again.");
      }
    }
  };


  const handleEdit = (id, name, campus) => {
    setEditingId(id);
    setEditName(name);
    setEditCampus(campus);
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`${backendUrl}/api/users/wardens/${id}`, { name: editName, campus: editCampus });
      setWardens(wardens.map((warden) => (warden._id === id ? { ...warden, name: editName, campus: editCampus } : warden)));
      setEditingId(null);
    } catch (error) {
      console.error("Error editing warden:", error);
    }
  };

  return (
    <div className="sa-war-dashboard-container">
      <div className="sa-war-main-content">
        <table>
          <thead>
            <tr>
              <th>Warden List</th>
              <th>Campus</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {wardens.map((warden) => (
              <tr key={warden._id}>
                <td>
                  {editingId === warden._id ? (
                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                  ) : (
                    warden.name
                  )}
                </td>
                <td>
                  {editingId === warden._id ? (
                    <input type="text" value={editCampus} onChange={(e) => setEditCampus(e.target.value)} />
                  ) : (
                    warden.campus
                  )}
                </td>
                <td>
                  {editingId === warden._id ? (
                    <button className="cc-war-save-button" onClick={() => handleSaveEdit(warden._id)}>Save</button>
                  ) : (
                    <button className="cc-war-edit-button" onClick={() => handleEdit(warden._id, warden.name, warden.campus)}>Edit</button>
                  )}
                  <button className="cc-war-remove-button" onClick={() => handleRemove(warden._id)}>Delete</button>
                  <button className="cc-war-view-button" onClick={() => {
                    setSelectedWar(warden);
                    setShowViewModal(true);
                  }}>View</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="cc-war-add-button" onClick={() => setShowModal(true)}>Add New Warden</button>
      </div>

      {/* Add Warden Modal */}
      {showModal && (
        <div className="sa-war-modal">
          <div className="sa-war-modal-content">
            <h3>Add New Warden</h3>
            <input
              type="text"
              placeholder="Name"
              value={newWarden.name}
              onChange={(e) => setNewWarden({ ...newWarden, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newWarden.email}
              onChange={(e) => {
                setNewWarden({ ...newWarden, email: e.target.value });
                setEmailError("");
              }}
            />
            {emailError && <p className="sa-war-error-message">{emailError}</p>}
            <input
              type="password"
              placeholder="Password"
              value={newWarden.password}
              onChange={(e) => setNewWarden({ ...newWarden, password: e.target.value })}
            />
            <input
              type="text"
              placeholder="Reg No"
              value={newWarden.regno}
              onChange={(e) => setNewWarden({ ...newWarden, regno: e.target.value })}
            />
            <input
              type="text"
              placeholder="Hostel"
              value={newWarden.hostel}
              onChange={(e) => setNewWarden({ ...newWarden, hostel: e.target.value })}
            />
            <input
              type="text"
              placeholder="Campus"
              value={newWarden.campus}
              onChange={(e) => setNewWarden({ ...newWarden, campus: e.target.value })}
            />
            <button className="sa-war-modal-save" onClick={handleAdd}>Save</button>
            <button className="sa-war-modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* View Warden Details Modal */}
      {showViewModal && selectedWar && (
        <div className="view-sa-war-modal">
          <div className="view-sa-war-modal-content">
            <h3>Resident Tutor Details</h3>
            <p><strong>Name:</strong> {selectedWar.name}</p>
            <p><strong>Email:</strong> {selectedWar.email}</p>
            <p><strong>Registration No:</strong> {selectedWar.regno}</p>
            <p><strong>Hostel:</strong> {selectedWar.hostel}</p>
            <p><strong>Password:</strong> <i>*********</i></p>
            <p><strong>Campus:</strong> {selectedWar.campus}</p>
            <button className="sa-war-close-button" onClick={() => setShowViewModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SA_DashboardWarden;
