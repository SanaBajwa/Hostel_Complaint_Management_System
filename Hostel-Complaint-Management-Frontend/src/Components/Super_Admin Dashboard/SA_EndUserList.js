import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SA_EndUserList.css";
import { toast } from "react-toastify";

const SA_EndUserList = () => {
  const [endUsers, setEndUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUser, setNewUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // For viewing user details
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchEndUsers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/users/end-users`);
        setEndUsers(response.data.endUsers || []);
        setLoading(false);
      } catch (error) {
        setError("Failed to load End Users.");
        setLoading(false);
      }
    };

    fetchEndUsers();
  }, []);

  const viewUserDetails = (user) => {
    setSelectedUser(user);
  };

  const addNewUserRow = () => {
    setNewUser({
      name: "",
      role: "",
      type: "",
      email: "",
      password: "",
      regno: "",
      hostel: "",
    });
    setShowModal(true);
  };

  const handleInputChange = (e, userId) => {
    const { name, value } = e.target;

    if (userId === "new") {
      setNewUser((prev) => ({ ...prev, [name]: value }));
    } else {
      setEndUsers(
        endUsers.map((user) =>
          user._id === userId ? { ...user, [name]: value } : user
        )
      );
    }
  };

  const saveNewUser = async () => {
    const { name, role, type, email, password, regno, hostel } = newUser;

    if (!name || !role || !type || !email || !password || !regno || !hostel) {
      toast("All fields are required.", { type: "error" });
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/users/end-users`,
        newUser
      );

      if (response.data) {
        setEndUsers((prevUsers) => [...prevUsers, response.data]);
        setShowModal(false);
        setNewUser(null);
      }
    } catch (error) {
      console.error("Error adding user:", error.response?.data || error.message);
    }
  };

  const startEditing = (userId) => {
    setEditingUserId(userId);
  };

  const saveEdit = async (userId) => {
    const userToUpdate = endUsers.find((user) => user._id === userId);

    if (!userToUpdate) {
      console.error("User not found!");
      return;
    }

    try {
      const { _id, ...updatedData } = userToUpdate;
      const response = await axios.put(
        `${backendUrl}/api/users/end-users/${userId}`,
        updatedData
      );

      if (response.data) {
        setEndUsers(
          endUsers.map((user) => (user._id === userId ? response.data : user))
        );
        setEditingUserId(null);
      }
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
    }
  };

  const deleteUser = async (id) => {
    console.log("Deleting user with ID:", id);

    try {
      const response = await axios.delete(
        `${backendUrl}/api/users/end-users/${id}`
      );

      console.log("Delete Response:", response.data);
      setEndUsers(endUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
    }
  };

  if (loading) return <p>Loading End Users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="EndUserList_dashboard">
      <table className="EndUserList_table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {endUsers.map((user) => (
            <tr key={user._id}>
              <td>
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={(e) => handleInputChange(e, user._id)}
                  />
                ) : (
                  user.name
                )}
              </td>
              {/* <td>
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    name="role"
                    value={user.role}
                    onChange={(e) => handleInputChange(e, user._id)}
                  />
                ) : (
                  user.role
                )}
              </td> */}
              <td>
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    name="type"
                    value={user.type}
                    onChange={(e) => handleInputChange(e, user._id)}
                  />
                ) : (
                  user.type
                )}
              </td>
              <td>
                {editingUserId === user._id ? (
                  <button
                    className="SA_EndUserList_save-btn"
                    onClick={() => saveEdit(user._id)}
                  >
                    Save Changes
                  </button>
                ) : (
                  <>
                    <button
                      className="SA_EndUserList_edit-btn"
                      onClick={() => startEditing(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="SA_EndUserList_delete-btn"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="SA_EndUserList_view-btn"
                      onClick={() => viewUserDetails(user)}
                    >
                      View
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="SA_EndUserList_add-btn" onClick={addNewUserRow}>
        Add New User
      </button>

      {/* Modal for adding new user */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New User</h2>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={newUser.name}
              onChange={(e) => handleInputChange(e, "new")}
            />
            <input
              type="text"
              name="role"
              placeholder="Enter Role"
              value={newUser.role}
              onChange={(e) => handleInputChange(e, "new")}
            />
            <input
              type="text"
              name="type"
              placeholder="Enter Type"
              value={newUser.type}
              onChange={(e) => handleInputChange(e, "new")}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={newUser.email}
              onChange={(e) => handleInputChange(e, "new")}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={newUser.password}
              onChange={(e) => handleInputChange(e, "new")}
            />
            <input
              type="text"
              name="regno"
              placeholder="Enter Reg No"
              value={newUser.regno}
              onChange={(e) => handleInputChange(e, "new")}
            />
            <input
              type="text"
              name="hostel"
              placeholder="Enter Hostel"
              value={newUser.hostel}
              onChange={(e) => handleInputChange(e, "new")}
            />
            <button className="EndUserList_save-btn" onClick={saveNewUser}>
              Save
            </button>
            <button
              className="EndUserList_cancel-btn"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modal for viewing user details */}
      {selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>User Details</h2>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p>
              <strong>Type:</strong> {selectedUser.type}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Reg No:</strong> {selectedUser.regno}
            </p>
            <p>
              <strong>Hostel:</strong> {selectedUser.hostel}
            </p>

            <button
              className="EndUserList_close-btn"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SA_EndUserList;
