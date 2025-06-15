import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SA_Student.css";

const SA_DashboardStd = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: "", email: "", password: "", role: "Student", Status: "", regno: "", hostel: ""
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // Fetch students from backend
  useEffect(() => {
    axios.get(`${backendUrl}/api/users/students`)
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching students:", error));
  }, []);

  // Add new student
  const handleAddNewStudent = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/users/students`, newStudent);
      
      setStudents([...students, response.data]);
      setShowAddModal(false);
      setNewStudent({ name: "", email: "", password: "", role: "Student", Status: "", regno: "", hostel: "", campus: "" });
      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.data?.message) {
        if (error.response.data.message === "Email or Reg No already exists") {
          setErrorMessage("Email or Registration Number already exists.");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } else {
        console.error("Error adding student:", error);
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };
  

  // Delete student
  const handleRemove = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/users/students/${id}`);
      setStudents(students.filter(student => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // View student details
  const handleView = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  // Enable editing mode
  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  // Save edited student details
  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`${backendUrl}/api/users/students/${id}`, editingStudent);
      setStudents(students.map(student => (student._id === id ? editingStudent : student)));
      setEditingStudent(null);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="cc-std-dashboard-container">
      <div className="cc-std-main-content">
        <table>
          <thead className="cc-std_Table">
            <tr>
              <th>Students List</th>
              <th>Reg No.</th>
              <th>Hostel</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>
                  {editingStudent?._id === student._id ? (
                    <input type="text" value={editingStudent.name} onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })} />
                  ) : (
                    student.name
                  )}
                </td>
                <td>
                  {editingStudent?._id === student._id ? (
                    <input type="text" value={editingStudent.regno} onChange={(e) => setEditingStudent({ ...editingStudent, regno: e.target.value })} />
                  ) : (
                    student.regno
                  )}
                </td>
                <td>
                  {editingStudent?._id === student._id ? (
                    <input type="text" value={editingStudent.hostel} onChange={(e) => setEditingStudent({ ...editingStudent, hostel: e.target.value })} />
                  ) : (
                    student.hostel
                  )}
                </td>
                <td>
                  {editingStudent?._id === student._id ? (
                    <button className="cc-std_save-button" onClick={() => handleSaveEdit(student._id)}>Save</button>
                  ) : (
                    <>
                      <button className="cc-std_edit-button" onClick={() => handleEdit(student)}>Edit</button>
                      <button className="cc-std_remove-button" onClick={() => handleRemove(student._id)}>Delete</button>
                      <button className="cc-std_view-button" onClick={() => handleView(student)}>View</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add New Student Button */}
        <button className="cc-std_add-new-button" onClick={() => setShowAddModal(true)}>Add New Student</button>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Student</h3>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <input type="text" placeholder="Name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
            <input type="email" placeholder="Email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} />
            <input type="password" placeholder="Password" value={newStudent.password} onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })} />
            <input type="text" placeholder="Reg No" value={newStudent.regno} onChange={(e) => setNewStudent({ ...newStudent, regno: e.target.value })} />
            <input type="text" placeholder="Hostel" value={newStudent.hostel} onChange={(e) => setNewStudent({ ...newStudent, hostel: e.target.value })} />
            <input type="text" placeholder="Campus" value={newStudent.campus} onChange={(e) => setNewStudent({ ...newStudent, campus: e.target.value })} />
            <button className="cc-std-submit-button" onClick={handleAddNewStudent}>Submit</button>
            <button className="cc-std-close-button" onClick={() => setShowAddModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* View Student Modal */}
      {showViewModal && selectedStudent && (
        <div className="modal">
          <div className="modal-content">
            <h3>Student Details</h3>
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Email:</strong> {selectedStudent.email}</p>
            <p><strong>Reg No:</strong> {selectedStudent.regno}</p>
            <p><strong>Hostel:</strong> {selectedStudent.hostel}</p>
            <p><strong>Password:</strong> <i>*********</i> </p>
            <p><strong>Campus:</strong>{selectedStudent.campus}</p>
            <button className="cc-std-close-button" onClick={() => setShowViewModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SA_DashboardStd;
