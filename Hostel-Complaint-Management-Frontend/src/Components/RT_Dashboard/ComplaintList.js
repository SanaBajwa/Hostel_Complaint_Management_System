import React, { useState, useEffect } from "react";
import axios from "axios";
// Import StatusBar component
import "./ComplaintList.css";
import filterIcon from "../assets/images/filter.png";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ComplaintList = ({ searchQuery = "" }) => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [priority, setPriority] = useState(""); // Store selected priority
  const [expandedComplaintId, setExpandedComplaintId] = useState(null); // Track the expanded complaint ID
  const [showPriorityModal, setShowPriorityModal] = useState(null); // Track which complaint's priority modal is open
  const [assignedHostel, setAssignedHostel] = useState(""); // Store RT's hostel
  const [showRejectModal, setShowRejectModal] = useState(null); // Track rejection modal state
  const [rejectReason, setRejectReason] = useState(""); // Store rejection reason
  const location = useLocation();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (location.state && location.state.complaintId) {
      setExpandedComplaintId(location.state.complaintId);
      window.history.replaceState({}, document.title); // Clear the state to avoid re-rendering
    }
  }, [location.state]);

  useEffect(() => {
    const fetchRTDetails = async () => {
      try {
        const rtEmail = localStorage.getItem("userEmail"); // Assuming email is stored after login
        if (!rtEmail) {
          console.error("No RT email found");
          return;
        }

        // Fetch RT details from the backend using email
        const rtResponse = await axios.get(
          `${backendUrl}/api/users/get-rt/${rtEmail}`
        );
        const rtData = rtResponse.data;

        if (rtData && rtData.hostel) {
          setAssignedHostel(rtData.hostel); // Set RT's assigned hostel
        }
      } catch (error) {
        console.error("Error fetching RT details:", error.message);
      }
    };

    fetchRTDetails();
  }, []);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/users/complaints`
        );
        const complaintsData = response.data.complaints;
  
        // Iterate over complaints and update their status if they are still in the "Student" role
        for (const complaint of complaintsData) {
          if (complaint.status === "Student") {
            // Update status to "RT"
            await axios.put(
              `${backendUrl}/api/users/update-status-to-rt/${complaint._id}`
            );
          }
        }
  
        // Fetch updated complaints after status change
        const updatedResponse = await axios.get(
          `${backendUrl}/api/users/complaints`
        );
        const updatedComplaints = updatedResponse.data.complaints;
  
        // Filter complaints where the role is "RT" and match the assigned hostel
        const complaintsFilteredByHostelAndRole = updatedComplaints.filter(
          (complaint) =>
            complaint.hostel === assignedHostel && complaint.status === "RT"
        );
  
        setComplaints(complaintsFilteredByHostelAndRole);
        setFilteredComplaints(complaintsFilteredByHostelAndRole);
      } catch (error) {
        console.error("Error fetching and updating complaints:", error.message);
      }
    };
  
    if (assignedHostel) {
      fetchComplaints();
    }
  }, [assignedHostel]); // Fetch complaints only when assignedHostel is set
  
  const handleSort = (order) => {
    let sortedComplaints = [...complaints];
    if (order === "asc") {
      sortedComplaints.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === "desc") {
      sortedComplaints.sort((a, b) => b.title.localeCompare(a.title));
    } else if (order === "time") {
      sortedComplaints.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setFilteredComplaints(sortedComplaints);
    setShowFilterMenu(false);
  };

  const handleView = (id) => {
    setExpandedComplaintId(id); // Set expanded complaint ID
  };
  const handleAccept = (id) => {
    setShowPriorityModal(id); // Show the modal for the selected complaint
  };

  const handleSendPriority = async () => {
    const selectedComplaint = complaints.find(
      (c) => c._id === showPriorityModal
    );
    if (!selectedComplaint) return;

    // Determine the target role based on complaint title
    const targetRole =
      selectedComplaint.title.toLowerCase() === "mess" ? "Munshi" : "Warden";

    try {
      await axios.put(
        `${backendUrl}/api/users/update-status/${selectedComplaint._id}`,
        {
          status: targetRole, // Update status to Warden or Munshi
          priority: priority,
        }
      );

      console.log(
        `Complaint ${selectedComplaint._id} sent to ${targetRole} with priority ${priority}`
      );
      toast(`Complaint sent to ${targetRole} with priority ${priority}.`, { type: "success"});

      // Update UI by refreshing complaints list
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === selectedComplaint._id
            ? { ...complaint, status: targetRole } // Update status in state
            : complaint
        )
      );

      setShowPriorityModal(null); // Close the modal
    } catch (error) {
      console.error("Error sending complaint:", error.message);
      toast("Failed to send complaint. Please try again.", { type: "error" });
    }
  };

  const handleCloseModal = () => {
    setExpandedComplaintId(null);
    setShowPriorityModal(null);
  };

  useEffect(() => {
    console.log("Search Query:", searchQuery);
    if (!searchQuery.trim()) {
      setFilteredComplaints(complaints);
    } else {
      const filtered = complaints.filter((complaint) =>
        complaint.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredComplaints(filtered);
    }
  }, [searchQuery, complaints]); // ✅ Run when searchQuery changes

  const handleReject = (id) => {
    setShowRejectModal(id); // Show the reject modal for the selected complaint
  };

  const handleSendRejection = async () => {
    if (!rejectReason.trim()) {
      toast("Please provide a rejection reason.", { type: "error" });
      return;
    }

    try {
      await axios.put(
        `${backendUrl}/api/users/reject-complaint/${showRejectModal}`,
        {
          status: "Rejected",
          reason: rejectReason,
        }
      );

      toast("Complaint rejected successfully." , { type: "success" });

      // Update UI to remove rejected complaint or update status
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === showRejectModal
            ? { ...complaint, status: "Rejected", rejectReason }
            : complaint
        )
      );

      setShowRejectModal(null);
      setRejectReason("");
    } catch (error) {
      console.error("Error rejecting complaint:", error.message);
      toast("Failed to reject complaint. Please try again." , { type: "error" });
    }
  };

  return (
    <section className="rt-dashboard-container">
      <div className="RT-filter-section">
        <button
          className="RT-filter-btn"
          onClick={() => setShowFilterMenu(!showFilterMenu)}
        >
          Filter
          <img src={filterIcon} alt="Filter Complaints" />
        </button>
        {showFilterMenu && (
          <div className="RT-filter-dropdown">
            <ul>
              <li onClick={() => handleSort("asc")}>Ascending Order</li>
              <li onClick={() => handleSort("desc")}>Descending Order</li>
              <li onClick={() => handleSort("time")}>By Time</li>
            </ul>
          </div>
        )}
      </div>

      {/* Table for Complaints */}
      <div className="RT-complaint-table">
        <table className="RT-complaint-list-table">
          <thead>
            <tr>
              <th>Complaint List</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.title}</td>
                <td>{new Date(complaint.date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="RT-accept-btn"
                    onClick={() => handleAccept(complaint._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="RT-reject-btn"
                    onClick={() => handleReject(complaint._id)}
                  >
                    Reject
                  </button>

                  <button
                    className="RT-view-btn"
                    onClick={() => handleView(complaint._id)} // Show the modal
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Priority Complaint */}
      {showPriorityModal && (
        <div className="RT-priority-modal">
          <div className="RT-priority-modal-content">
            <button
              className="RT-priority-close-btn"
              onClick={handleCloseModal}
            >
              X
            </button>

            <h3>Select Priority</h3>
            <div className="RT-priority-options">
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="Urgent"
                  onClick={() => setPriority("Urgent")}
                />
                Urgent
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="Normal"
                  onClick={() => setPriority("Normal")}
                />
                Normal
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="Slow"
                  onClick={() => setPriority("Slow")}
                />
                Slow
              </label>
            </div>

            <button
              className="RT-priority-send-btn"
              onClick={handleSendPriority} // Pass priority dynamically
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Modal for Complaint Details */}
      {expandedComplaintId && (
        <div className="RT-modal">
          <div className="RT-modal-content">
            <button className="RT-close-btn" onClick={handleCloseModal}>
              X
            </button>
            <div className="RT-complaint-detail">
              {complaints
                .filter((complaint) => complaint._id === expandedComplaintId)
                .map((complaint) => {
                  console.log("Complaint Object:", complaint); // Debugging
                  console.log(
                    "Registration No being passed:",
                    complaint.registrationNo
                  );

                  return (
                    <div key={complaint._id}>
                      <h2>{complaint.title}</h2>
                      <p>
                        <strong>Registration No:</strong>{" "}
                        {complaint.registrationNo}
                      </p>
                      <p>
                        <strong>Room No:</strong> {complaint.roomNo}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(complaint.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Description:</strong> {complaint.description}
                      </p>
                      <p>
                        <strong>Hostel:</strong> {complaint.hostel}
                      </p>

                      {/* Pass registrationNo to StatusBar */}
                      {/* <StatusBar registrationNo={complaint.registrationNo} /> */}

                      <button
                        className="RT-back-btn"
                        onClick={handleCloseModal}
                      >
                        Back to List
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Reject Complaint Modal */}
      {showRejectModal && (
        <div className="RT-reject-modal">
          <div className="RT-reject-modal-content">
            <button
              className="RT-reject-close-btn"
              onClick={() => setShowRejectModal(null)}
            >
              X
            </button>
            <h3>Provide Rejection Reason</h3>
            <textarea
              className="RT-reject-textarea"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter reason for rejection"
            />
            <button
              className="RT-reject-send-btn"
              onClick={handleSendRejection}
            >
              Reject Complaint
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
export default ComplaintList;
