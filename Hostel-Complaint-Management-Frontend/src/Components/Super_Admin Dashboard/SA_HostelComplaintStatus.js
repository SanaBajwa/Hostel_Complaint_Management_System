import React, { useState } from "react";
import "./SA_HostelComplaintStatus.css";

const SA_HostelDashboard = () => {
  const [hostels, setHostels] = useState([
    { id: 1, name: "Hostel1", status: "Furnished" },
    { id: 2, name: "Hostel2", status: "Unfurnished" },
    { id: 3, name: "Hostel3", status: "Furnished" },
    { id: 4, name: "Hostel4", status: "Furnished" },
    { id: 5, name: "Hostel5", status: "Furnished" },
    { id: 6, name: "Hostel6", status: "Unfurnished" },
    { id: 7, name: "Hostel7", status: "Furnished" },
  ]);

  // Event Handlers
  const handleAdd = (id) => {
    console.log(`Add button clicked for Hostel ${id}`);
  };

  const handleRemove = (id) => {
    console.log(`Remove button clicked for Hostel ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Edit button clicked for Hostel ${id}`);
  };
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  return (
    <div className="sa-hostel-container">
      
      <div className="sa_hostel_main-content">
       

        {/* Hostel Table */}
        <table className="sa_hostel_table">
          <thead>
            <tr>
              <th>Hostel List</th>
              <th>Status</th>
              <th>Actions</th> {/* New column for buttons */}
            </tr>
          </thead>
          <tbody>
            {hostels.map((hostel, index) => (
              <tr key={hostel.id}>
                <td>
                  {index + 1}. {hostel.name}
                </td>
                <td>{hostel.status}</td>
                <td>
                  {/* Action Buttons */}
                  <button
                    className="sa-action-btn sa-add-btn"
                    onClick={() => handleAdd(hostel.id)}
                  >
                    Add
                  </button>
                  <button
                    className="sa-action-btn sa-remove-btn"
                    onClick={() => handleRemove(hostel.id)}
                  >
                    Remove
                  </button>
                  <button
                    className="sa-action-btn sa-edit-btn"
                    onClick={() => handleEdit(hostel.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SA_HostelDashboard;
