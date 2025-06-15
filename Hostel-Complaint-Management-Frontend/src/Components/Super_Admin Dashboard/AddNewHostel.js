import React, { useState } from "react";
import "./AddNewHostel.css";
import { toast } from "react-toastify";

const AddNewHostel = () => {
  const [formData, setFormData] = useState({
    hostelName: "",
    RT: "",
    campus: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.hostelName || !formData.warden || !formData.campus) {
      toast("Please fill in all fields!", { type: "error" });
      return;
    }

    try {
      // Simulate backend API request (Replace with real API call)
      console.log("Submitting New Hostel:", formData);

      // Clear form after submission
      setFormData({
        hostelName: "",
        RT: "",
        campus: "",
      });

      toast("Hostel Added Successfully!", { type: "success" });
    } catch (error) {
      console.error("Error adding hostel:", error);
      toast("Failed to add hostel. Try again.", { type: "error" });
    }
  };

  return (
    <div className="add-hostel-container">
      <h2>Add New Hostel</h2>
      <form onSubmit={handleSubmit} className="hostel-form">
        <div className="Hostel-form-group">
          <label>Hostel Name</label>
          <input
            type="text"
            name="hostelName"
            placeholder="Enter hostel name"
            value={formData.hostelName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="Hostel-form-group">
          <label>RT Name</label>
          <input
            type="text"
            name="RT"
            placeholder="Enter RT name"
            value={formData.RT}
            onChange={handleChange}
            required
          />
        </div>

        <div className="Hostel-form-group">
          <label>Select Campus</label>
          <select name="campus" value={formData.campus} onChange={handleChange} required>
            <option value="">Select Campus</option>
            <option value="Campus A">ksk</option>
            <option value="Campus B">Narowal</option>
            <option value="Campus C">Texla</option>
          </select>
        </div>

        <button className="add-hostel" type="submit">Add Hostel</button>
      </form>
    </div>
  );
};

export default AddNewHostel;
