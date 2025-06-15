import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import "./RT_Graph.css";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const RT_Graph_Dashboard = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [selectedMonth, setSelectedMonth] = useState("February");
  const [graphData, setGraphData] = useState({
    resolved: [],
    pending: [],
    rejected: [],
  });

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const graphLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
  const hostel = localStorage.getItem("hostel");
  // Fetch complaint data from the backend
  useEffect(() => {
    fetchGraphData(selectedMonth);
  }, [selectedMonth]);

  const fetchGraphData = async (month) => {
    try {
      const response = await axios.get(`${backendUrl}/api/users/complaint-stats?month=${month}&hostel=${hostel}`);
      setGraphData(response.data);
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <section className="RT_Graph">
      {/* Top Section: Cards */}
      <div className="RT_Graph-top">
        {/* Resolved Complaints */}
        <div className="RT_card">
          <h3>Resolved</h3>
          <Line
            data={{
              labels: graphLabels,
              datasets: [
                {
                  label: "Resolved Complaints",
                  data: graphData.resolved,
                  borderColor: "#4caf50",
                  backgroundColor: "rgba(76, 175, 80, 0.2)",
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: true }}
          />
        </div>

        {/* Pending Complaints */}
        <div className="RT_card">
          <h3>Pending</h3>
          <Line
            data={{
              labels: graphLabels,
              datasets: [
                {
                  label: "Pending Complaints",
                  data: graphData.pending,
                  borderColor: "#fbc02d",
                  backgroundColor: "rgba(255, 193, 7, 0.2)",
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: true }}
          />
        </div>

        {/* Rejected Complaints */}
        <div className="RT_card">
          <h3>Rejected</h3>
          <Line
            data={{
              labels: graphLabels,
              datasets: [
                {
                  label: "Rejected Complaints",
                  data: graphData.rejected,
                  borderColor: "#f44336",
                  backgroundColor: "rgba(244, 67, 54, 0.2)",
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: true }}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="monthly-analysis">
        <h3>Monthly Analysis</h3>
        <div className="filter">
          <label htmlFor="month">Select Month:</label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="chart">
          <Bar
            data={{
              labels: graphLabels,
              datasets: [
                {
                  label: "Resolved",
                  data: graphData.resolved,
                  backgroundColor: "#4caf50",
                },
                {
                  label: "Pending",
                  data: graphData.pending,
                  backgroundColor: "#fbc02d",
                },
                {
                  label: "Rejected",
                  data: graphData.rejected,
                  backgroundColor: "#f44336",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default RT_Graph_Dashboard;
