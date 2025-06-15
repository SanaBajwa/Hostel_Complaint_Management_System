import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./StatusBar.css";

const StatusBar = () => {
  const { complaintId } = useParams(); // Extract complaintId from URL
  const [status, setStatus] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchComplaintStatus = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/users/complaint/${complaintId}`
        );
        const complaintData = response.data.complaint;
        console.log("Fetched Complaint Details:", complaintData);

        if (complaintData) {
          setStatus(complaintData.status);
          mapStatusToStep(complaintData.status);
        }
      } catch (error) {
        console.error("Error fetching complaint details:", error.message);
      }
    };

    fetchComplaintStatus();
  }, [complaintId]);

  // Define unified status flow
  const getSteps = () => [
    { id: 1, label: "Student" },
    { id: 2, label: "RT" },
    { id: 3, label: "Warden/Munshi" },
    { id: 4, label: "End User" },
    { id: 5, label: status === "Rejected" ? "Rejected" : "Done" },
  ];
  // Map the current status to the corresponding step number
  const mapStatusToStep = (status) => {
    const steps = getSteps();
    const stepIndex = steps.findIndex((step) => step.label === status);
    if (status === "Rejected") {
      setCurrentStep(5);
      return;
    }
    if (status === "Warden" || status === "Munshi") {
      setCurrentStep(3);
      return;
    }
    setCurrentStep(stepIndex !== -1 ? stepIndex + 1 : 1);
  };
  return (
    <div className="wrapper-status">
      <div className="status-bar-container">
        <h2>Complaint Status</h2>
        <div className="status-bar">
          {getSteps().map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="status-step">
                <div
                  className={`status-circle ${
                    currentStep >= step.id ? "completed" : ""
                  }`}
                >
                  {step.id}
                </div>

                {/* Line Between Steps */}
                {index < getSteps().length - 1 && (
                  <div
                    className={`status-line ${
                      currentStep > step.id ? "completed" : ""
                    }`}
                  ></div>
                )}

                {/* Step Label */}
                <div className="status-label">{step.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
