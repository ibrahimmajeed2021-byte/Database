import { useState } from "react";
import ClinicianBooking from "../UI/ClinicianBooking.jsx";
import ClinicianSchedule from "../UI/ClinicianSchedule.jsx";

function Manager() {
  const managerId = 999;
  const managerName = "Manager Admin";

  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div>
      <h1 style={{ padding: "20px 20px 0 20px" }}>Manager Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "20px",
          borderBottom: "2px solid #ddd",
        }}
      >
        <button
          onClick={() => setActiveTab("pending")}
          style={{
            padding: "10px 20px",
            background: activeTab === "pending" ? "#4caf50" : "#f0f0f0",
            color: activeTab === "pending" ? "white" : "#333",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          All Pending Requests
        </button>
        <button
          onClick={() => setActiveTab("approved")}
          style={{
            padding: "10px 20px",
            background: activeTab === "approved" ? "#4caf50" : "#f0f0f0",
            color: activeTab === "approved" ? "white" : "#333",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          All Approved Appointments
        </button>
      </div>

      {activeTab === "pending" && (
        <ClinicianBooking clinicianId={managerId} clinicianName={managerName} />
      )}

      {activeTab === "approved" && (
        <ClinicianSchedule
          clinicianId={managerId}
          clinicianName="All Clinicians"
        />
      )}
    </div>
  );
}

export default Manager;
