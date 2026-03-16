import { useState } from "react";
import ClinicianBooking from "../UI/ClinicianBooking.jsx";
import ClinicianSchedule from "../UI/ClinicianSchedule.jsx";

function Clinician() {
  const clinicianId = 1;
  const clinicianName = "Dr. Smith";
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "20px",
          borderBottom: "2px solid #ddd",
        }}
      >
        <button
          onClick={() => setActiveTab("schedule")}
          style={{
            padding: "10px 20px",
            background: activeTab === "schedule" ? "lightslategrey" : "#f0f0f0",
            color: activeTab === "schedule" ? "white" : "#333",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "16px",
          }}
        >
          My Schedule
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          style={{
            padding: "10px 20px",
            background: activeTab === "pending" ? "lightslategrey" : "#f0f0f0",
            color: activeTab === "pending" ? "white" : "#333",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "16px",
          }}
        >
          Pending Requests
        </button>
      </div>

      {activeTab === "schedule" && (
        <ClinicianSchedule
          clinicianId={clinicianId}
          clinicianName={clinicianName}
        />
      )}

      {activeTab === "pending" && (
        <ClinicianBooking
          clinicianId={clinicianId}
          clinicianName={clinicianName}
        />
      )}
    </div>
  );
}

export default Clinician;
