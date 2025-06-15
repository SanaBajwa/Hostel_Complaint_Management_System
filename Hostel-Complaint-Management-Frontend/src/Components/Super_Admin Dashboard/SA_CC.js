import React, { useState, useEffect } from "react";
import axios from "axios";

import "./SA_CC.css";

const SA_DashboardCC = () => {
  const [CCs, setCCs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedCC, setEditedCC] = useState({ name: "", campus: "" });
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newCC, setNewCC] = useState({ name: "", campus: "", email: "" });
  const [errorMessage, setErrorMessage] = useState("");
    const [selectedCC, setSelectedCC] = useState(null); // State for viewing RT details
  // const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false); // State for view modal
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Fetch CC users
  useEffect(() => {
    fetch(`${backendUrl}/api/users/cc`)
      .then((res) => res.json())
      .then((data) => setCCs(data))
      .catch((err) => console.error("Error fetching CCs:", err));
  }, []);

  // Handle Edit
  const handleEdit = (id, currentCC) => {
    setEditingId(id);
    setEditedCC({ name: currentCC.name, campus: currentCC.campus });
  };

  // Save Edited CC
  const handleSave = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/api/users/cc/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedCC),
      });
      if (res.ok) {
        setCCs(CCs.map((cc) => (cc._id === id ? { ...cc, ...editedCC } : cc)));
        setEditingId(null);
      }
    } catch (error) {
      console.error("Error updating CC:", error);
    }
  };

  // Handle Delete
  const handleRemove = async (id) => {
          try {
        await fetch(`${backendUrl}/api/users/cc/${id}`, { method: "DELETE" });
        setCCs(CCs.filter((cc) => cc._id !== id));
      } catch (error) {
        console.error("Error deleting CC:", error);
      }

  };

  const handleAddNew = async () => {
    try {
      const ccData = { ...newCC, role: "CC", hostel: "none" }; // Merging both properties
  
      const response = await axios.post(`${backendUrl}/api/users/cc`, ccData);
  
      setCCs([...CCs, response.data]); 
      setShowAddPopup(false);
      setNewCC({ name: "", email: "", password: "", regno: "", hostel: "", campus: "" }); // Reset form
      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.data?.message) {
        if (error.response.data.message === "Email already exists") {
          setErrorMessage("Email already exists.");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } else {
        console.error("Error adding new CC:", error);
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };
  
  const handleView = (cc) => {
    console.log("Viewing CC:", cc); // Debugging log
    setSelectedCC({
      name: cc.name || "N/A",
      email: cc.email || "N/A",
      regno: cc.regno || "N/A",
      hostel: cc.hostel || "N/A",
      password: cc.password || "N/A",
    });
    setShowViewModal(true);
  };   



  return (
    <div className="sa-cc-dashboard-container">
      <div className="sa-cc-main-content">
        <h2 className="sa-cc-h2">CC Dashboard</h2>
        <table>
          <thead>
            <tr>
              <th>CC Name</th>
              <th>Campus</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {CCs.map((cc) => (
              <tr key={cc._id}>
                <td>
                  {editingId === cc._id ? (
                    <input
                      type="text"
                      value={editedCC.name}
                      onChange={(e) => setEditedCC({ ...editedCC, name: e.target.value })}
                      // onBlur={() => handleSave(cc._id)}
                      onKeyDown={(e) => e.key === "Enter" && handleSave(cc._id)}
                      autoFocus
                    />
                  ) : (
                    <span>{cc.name}</span>
                  )}
                </td>
                <td>
                  {editingId === cc._id ? (
                    <input
                      type="text"
                      value={editedCC.campus}
                      onChange={(e) => setEditedCC({ ...editedCC, campus: e.target.value })}
                      onBlur={() => handleSave(cc._id)}
                      onKeyDown={(e) => e.key === "Enter" && handleSave(cc._id)}
                    />
                  ) : (
                    <span>{cc.campus}</span>
                  )}
                </td>
                <td>
                  {editingId === cc._id ? (
                    <button className="sa-cc_save-button" onClick={() => handleSave(cc._id)}>
                      Save
                    </button>
                  ) : (
                    <>
                      <button className="sa-cc_edit-button" onClick={() => handleEdit(cc._id, cc)}>
                        Edit
                      </button>
                      <button className="sa-cc_remove-button" onClick={() => handleRemove(cc._id)}>
                        Remove
                      </button>
                      <button className="sa-cc_view-button" onClick={()=> handleView(cc)}>View</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ADD Button Below Table */}
        <div className="sa-cc_action-buttons">
          <button className="sa-cc_add-button" onClick={() => setShowAddPopup(true)}>
            Add New CC
          </button>
        </div>

        {/* Add New CC Popup */}
        {showAddPopup && (
          <div className="sa-cc-popup">
            <div className="sa-cc-popup-content">
              <h3>Add New CC</h3>
              {errorMessage && <p className="sa-cc-error">{errorMessage}</p>}
              <input type="text" placeholder="Name" value={newCC.name} onChange={(e) => setNewCC({ ...newCC, name: e.target.value })} />
            <input type="email" placeholder="Email" value={newCC.email} onChange={(e) => setNewCC({ ...newCC, email: e.target.value })} />
            <input type="password" placeholder="Password" value={newCC.password} onChange={(e) => setNewCC({ ...newCC, password: e.target.value })} />
            <input type="text" placeholder="Reg No" value={newCC.regno} onChange={(e) => setNewCC({ ...newCC, regno: e.target.value })} />
            <input type="text" placeholder="Campus" value={newCC.campus} onChange={(e) => setNewCC({ ...newCC, campus: e.target.value })} />
            

              <div className="sa-cc-popup-actions">
                <button className="sa-cc-add-button" onClick={handleAddNew}>Add</button>
                <button className="sa-cc-cancel-button" onClick={() => setShowAddPopup(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {/* View RT Details Modal */}
{showViewModal && selectedCC && (
  <div className="view-cc-rt-modal">
    <div className="view-cc-rt-modal-content">
      <h3>Resident Tutor Details</h3>
      <p><strong>Name:</strong> {selectedCC.name}</p>
      <p><strong>Email:</strong> {selectedCC.email}</p>
      <p><strong>Registration No:</strong> {selectedCC.regno}</p>
      <p><strong>Hostel:</strong> {selectedCC.hostel}</p>
      <p><strong>Password:</strong> <i>*********</i> </p>
      <button className="cc-rt-close-button"onClick={() => setShowViewModal(false)}>Close</button>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default SA_DashboardCC;
