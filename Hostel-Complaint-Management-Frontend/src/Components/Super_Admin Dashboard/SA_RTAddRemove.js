import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SA_RTAddRemove.css";

const SA_DashboardRT = () => {
  const [rts, setRTs] = useState([]);
  const [editingRT, setEditingRT] = useState(null);
  const [selectedRT, setSelectedRT] = useState(null); // State for viewing RT details
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [newRT, setNewRT] = useState({
    name: "",
    role: "RT",
    email: "",
    password: "",
    regno: "",
    hostel: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false); // State for view modal
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    fetchRTs();
  }, []);

  const fetchRTs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/users/rts`);
      setRTs(response.data);
    } catch (error) {
      console.error("Error fetching RTs:", error);
    }
  };

  const handleEdit = (rt) => {
    setEditingRT({ ...rt });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`${backendUrl}/api/users/rts/${id}`, editingRT);
      setRTs(rts.map((rt) => (rt._id === id ? editingRT : rt)));
      setEditingRT(null);
    } catch (error) {
      console.error("Error updating RT:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/users/rts/${id}`);
      setRTs(rts.filter((rt) => rt._id !== id));
    } catch (error) {
      console.error("Error deleting RT:", error);
    }
  };

  const handleAddNewUser = async () => {
    try {
      console.log("Adding new RT:", newRT); // Debugging log
      const response = await axios.post(`${backendUrl}/api/users/rts`, newRT);

      setRTs([...rts, response.data]);
      setShowModal(false);
      setNewRT({ name: "", role: "RT", email: "", password: "", regno: "", hostel: "", campus: "" });
      setEmailError("");
    } catch (error) {
      console.error("Error adding new RT:", error.response?.data || error.message);
      if (error.response && error.response.data && error.response.data.message === "Email already taken") {
        setEmailError("This email is already taken");
      } else {
        setEmailError("An error occurred. Please try again.");
      }
    }
  };

  // Function to handle viewing RT details
  const handleView = (rt) => {
    console.log("Viewing RT:", rt); // Debugging log
    setSelectedRT({
      name: rt.name || "N/A",
      email: rt.email || "N/A",
      regno: rt.regno || "N/A",
      hostel: rt.hostel || "N/A",
      password: rt.password || "N/A",
    });
    setShowViewModal(true);
  };
  

  return (
    <div className="sa-rt-dashboard-container">
      <div className="sa-rt-main-content">
        <h2 className="sa-rt-h2">Resident Tutors (RTs)</h2>
        <table>
          <thead className="sa-rt_Table">
            <tr>
              <th>RT Name</th>
              {/* <th>Role</th> */}
              <th>Hostel</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rts.map((rt) => (
              <tr key={rt._id}>
                <td>{editingRT && editingRT._id === rt._id ? <input type="text" value={editingRT.name} onChange={(e) => setEditingRT({ ...editingRT, name: e.target.value })} /> : rt.name}</td>
                {/* <td>{rt.role}</td> */}
                <td>{editingRT && editingRT._id === rt._id ? <input type="text" value={editingRT.hostel} onChange={(e) => setEditingRT({ ...editingRT, hostel: e.target.value })} /> : rt.hostel}</td>
                <td>
                  {editingRT && editingRT._id === rt._id ? (
                    <button className="SA-RT_edit-button" onClick={() => handleSave(rt._id)}>Save</button>
                  ) : (
                    <button className="SA-RT_edit-button" onClick={() => handleEdit(rt)}>Edit</button>
                  )}
                  <button className="SA-RT_delete-button" onClick={() => handleRemove(rt._id)}>Delete</button>
                  <button className="SA-RT_view-button" onClick={() => handleView(rt)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="SA-RT_add-user-button" onClick={() => setShowModal(true)}>Add New User</button>
      </div>

      {/* Add New RT Modal */}
      {showModal && (
        <div className="SA-RT-modal">
          <div className="SA-RT-modal-content">
            <h3>Add New RT</h3>
            <input type="text" placeholder="Name" value={newRT.name} onChange={(e) => setNewRT({ ...newRT, name: e.target.value })} />
            <input
              type="email"
              placeholder="Email"
              value={newRT.email}
              onChange={(e) => {
                setNewRT({ ...newRT, email: e.target.value });
                setEmailError("");
              }}
            />
            {emailError && <p className="cc-rt-error-message">{emailError}</p>}
            <input type="password" placeholder="Password" value={newRT.password} onChange={(e) => setNewRT({ ...newRT, password: e.target.value })} />
            <input type="text" placeholder="Reg No" value={newRT.regno} onChange={(e) => setNewRT({ ...newRT, regno: e.target.value })} />
            <input type="text" placeholder="Hostel" value={newRT.hostel} onChange={(e) => setNewRT({ ...newRT, hostel: e.target.value })} />
            <button className="sa-rt-modal-save" onClick={handleAddNewUser}>Save</button>
            <button className="sa-rt-modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}


  
{/* View RT Details Modal */}
{showViewModal && selectedRT && (
  <div className="view-sa-rt-modal">
    <div className="view-sa-rt-modal-content">
      <h3>Resident Tutor Details</h3>
      <p><strong>Name:</strong> {selectedRT.name}</p>
      <p><strong>Email:</strong> {selectedRT.email}</p>
      <p><strong>Registration No:</strong> {selectedRT.regno}</p>
      <p><strong>Hostel:</strong> {selectedRT.hostel}</p>
      <p><strong>Password:</strong> <i>*********</i> </p>
      <button className="sa-rt-close-button"onClick={() => setShowViewModal(false)}>Close</button>
    </div>
  </div>
)}

    </div>
  );
};

export default SA_DashboardRT;





