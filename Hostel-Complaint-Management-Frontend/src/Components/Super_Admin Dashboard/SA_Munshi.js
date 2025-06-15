import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SA_Munshi.css";

const SA_DashboardMunshi = () => {
  const [munshis, setMunshis] = useState([]);
  const [editingMunshi, setEditingMunshi] = useState(null);
  const [selectedMunshi, setSelectedMunshi] = useState(null); // View Munshi details
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [emailError, setEmailError] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [newMunshi, setNewMunshi] = useState({
    name: "",
    role: "Munshi",
    email: "",
    hostel: "",
    campus: "",
  });

  useEffect(() => {
    fetchMunshis();
  }, []);

  const fetchMunshis = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/users/munshi`);
      setMunshis(response.data);
    } catch (error) {
      console.error("Error fetching Munshis:", error);
    }
  };

  const handleEdit = (munshi) => {
    setEditingMunshi({ ...munshi });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`${backendUrl}/api/users/munshi/${id}`, editingMunshi);
      setMunshis(munshis.map((munshi) => (munshi._id === id ? editingMunshi : munshi)));
      setEditingMunshi(null);
    } catch (error) {
      console.error("Error updating Munshi:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/users/munshi/${id}`);
      setMunshis(munshis.filter((munshi) => munshi._id !== id));
    } catch (error) {
      console.error("Error deleting Munshi:", error);
    }
  };

  const handleAddNewUser = async () => {
    try {
      console.log("Adding new Munshi:", newMunshi);
      const response = await axios.post(`${backendUrl}/api/users/munshi`, newMunshi);

      setMunshis([...munshis, response.data]);
      setShowModal(false);
      setNewMunshi({ name: "", role: "Munshi", email: "", hostel: "", campus: "" });
      setEmailError("");
    } catch (error) {
      console.error("Error adding new Munshi:", error.response?.data || error.message);
      if (error.response?.data?.message === "Email already taken") {
        setEmailError("This email is already taken");
      } else {
        setEmailError("An error occurred. Please try again.");
      }
    }
  };

  const handleView = (munshi) => {
    console.log("Viewing Munshi:", munshi);
    setSelectedMunshi({
      name: munshi.name || "N/A",
      email: munshi.email || "N/A",
      hostel: munshi.hostel || "N/A",
      campus: munshi.campus || "N/A",
    });
    setShowViewModal(true);
  };

  return (
    <div className="sa-munshi-dashboard-container">
      <div className="sa-munshi-main-content">
        <table>
          <thead className="sa-munshi-table">
            <tr>
              <th>Munshi Name</th>
              <th>Hostel</th>
              <th>Campus</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {munshis.map((munshi) => (
              <tr key={munshi._id}>
                <td>
                  {editingMunshi && editingMunshi._id === munshi._id ? (
                    <input
                      type="text"
                      value={editingMunshi.name}
                      onChange={(e) => setEditingMunshi({ ...editingMunshi, name: e.target.value })}
                    />
                  ) : (
                    munshi.name
                  )}
                </td>
                <td>
                  {editingMunshi && editingMunshi._id === munshi._id ? (
                    <input
                      type="text"
                      value={editingMunshi.hostel}
                      onChange={(e) => setEditingMunshi({ ...editingMunshi, hostel: e.target.value })}
                    />
                  ) : (
                    munshi.hostel
                  )}
                </td>
                <td>{munshi.campus}</td>
                <td>
                  {editingMunshi && editingMunshi._id === munshi._id ? (
                    <button className="sa-munshi-save-button" onClick={() => handleSave(munshi._id)}>
                      Save
                    </button>
                  ) : (
                    <button className="sa-munshi-edit-button" onClick={() => handleEdit(munshi)}>
                      Edit
                    </button>
                  )}
                  <button className="sa-munshi-delete-button" onClick={() => handleRemove(munshi._id)}>
                    Delete
                  </button>
                  <button className="sa-munshi-view-button" onClick={() => handleView(munshi)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="sa-munshi-add-user-button" onClick={() => setShowModal(true)}>
          Add New Munshi
        </button>
      </div>

      {/* Add New Munshi Modal */}
      {showModal && (
        <div className="sa-mun-show-modal">
          <div className="sa-mun-show-modal-content">
            <h2>Add New Munshi</h2>
            <input type="text" placeholder="Name" value={newMunshi.name} onChange={(e) => setNewMunshi({ ...newMunshi, name: e.target.value })} />
            <input type="text" placeholder="Hostel" value={newMunshi.hostel} onChange={(e) => setNewMunshi({ ...newMunshi, hostel: e.target.value })} />
            <input type="text" placeholder="Campus" value={newMunshi.campus} onChange={(e) => setNewMunshi({ ...newMunshi, campus: e.target.value })} />
            <input type="email" placeholder="Email" value={newMunshi.email} onChange={(e) => setNewMunshi({ ...newMunshi, email: e.target.value })} />
            <input type="text" placeholder="Reg No" value={newMunshi.regno} onChange={(e) => setNewMunshi({ ...newMunshi, regno: e.target.value })} />
            {emailError && <p className="error">{emailError}</p>}
            <input type="password" placeholder="Password" value={newMunshi.password} onChange={(e) => setNewMunshi({ ...newMunshi, password: e.target.value })} />
            <button className="sa-mun-show-modal-save" onClick={handleAddNewUser}>Add</button>
            <button className="sa-mun-show-modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* View Munshi Modal */}
      {showViewModal && selectedMunshi && (
        <div className="sa-mun-view-modal">
          <div className="sa-mun-view-modal-content">
            <h2>Munshi Details</h2>
            <p><strong>Name:</strong> {selectedMunshi.name}</p>
            <p><strong>Email:</strong> {selectedMunshi.email}</p>
            <p><strong>Hostel:</strong> {selectedMunshi.hostel}</p>
            <p><strong>Campus:</strong> {selectedMunshi.campus}</p>
            <button className="sa-mun-show-modal-cancel" onClick={() => setShowViewModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SA_DashboardMunshi;
