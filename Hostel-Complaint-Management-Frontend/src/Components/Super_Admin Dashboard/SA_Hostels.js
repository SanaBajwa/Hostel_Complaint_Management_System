import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SA_Hostels.css";

const SA_Hostels = () => {
  const [hostels, setHostels] = useState([]);
  const [selectedStats, setSelectedStats] = useState(null);
  const [editingHostel, setEditingHostel] = useState(null);
  const [newHostel, setNewHostel] = useState({ name: "", rooms: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/users/hostels`);
      setHostels(response.data);
    } catch (error) {
      console.error("Error fetching hostels:", error.message);
    }
  };

  const handleView = async (hostelName) => {
    try {
      const response = await axios.get(`${backendUrl}/api/users/hostel-stats/${hostelName}`);
      setSelectedStats(response.data);
    } catch (error) {
      console.error("Error fetching hostel stats:", error.message);
    }
  };

  const handleAddHostel = async () => {
    if (!newHostel.name || !newHostel.rooms) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      await axios.post(`${backendUrl}/api/users/hostels`, {
        name: newHostel.name.trim(),
        rooms: Number(newHostel.rooms),
      });
      setShowAddForm(false);
      setNewHostel({ name: "", rooms: "" });
      fetchHostels();
    } catch (error) {
      console.error("Error adding hostel:", error.message);
    }
  };

  const handleDeleteHostel = async (hostelName) => {
    try {
      await axios.delete(`${backendUrl}/api/users/hostels/${hostelName}`);
      setHostels(hostels.filter((h) => h.name !== hostelName));
    } catch (error) {
      console.error("Error deleting hostel:", error.message);
    }
  };

  const handleEditHostel = (hostel) => {
    setEditingHostel({ ...hostel });
  };

  const handleUpdateHostel = async () => {
    if (!editingHostel?.rooms) {
      alert("Please enter number of rooms.");
      return;
    }

    try {
      await axios.put(
        `${backendUrl}/api/users/hostels/${editingHostel.name}`,
        { rooms: Number(editingHostel.rooms) }
      );
      setEditingHostel(null);
      fetchHostels();
    } catch (error) {
      console.error("Error updating hostel:", error.message);
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
                  <button className="SA-edit-btn" onClick={() => handleEditHostel(hostel)}>Edit</button>
                  <button className="SA-delete-btn" onClick={() => handleDeleteHostel(hostel.name)}>Delete</button>
                  <button className="SA-view-btn" onClick={() => handleView(hostel.name)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="SA_add-hostel-button" onClick={() => setShowAddForm(true)}>
          Add New Hostel
        </button>

        {/* View Stats Modal */}
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

        {/* Add Hostel Modal */}
        {showAddForm && (
          <>
            <div className="cc-modal-overlay" onClick={() => setShowAddForm(false)}></div>
            <div className="cc-hostel-stats">
              <h3>Add New Hostel</h3>
              <input
                type="text"
                placeholder="Hostel Name"
                value={newHostel.name}
                onChange={(e) => setNewHostel({ ...newHostel, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Number of Rooms"
                value={newHostel.rooms}
                onChange={(e) => setNewHostel({ ...newHostel, rooms: e.target.value })}
              />
              <button onClick={handleAddHostel}>Add Hostel</button>
              <button onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </>
        )}

        {/* Edit Hostel Modal */}
        {editingHostel && (
          <>
            <div className="cc-modal-overlay" onClick={() => setEditingHostel(null)}></div>
            <div className="cc-hostel-stats">
              <h3>Edit Hostel: {editingHostel.name}</h3>
              <input type="text" value={editingHostel.name} disabled />
              <input
                type="number"
                placeholder="Number of Rooms"
                value={editingHostel.rooms}
                onChange={(e) => setEditingHostel({ ...editingHostel, rooms: e.target.value })}
              />
              <button onClick={handleUpdateHostel}>Save</button>
              <button onClick={() => setEditingHostel(null)}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SA_Hostels;
