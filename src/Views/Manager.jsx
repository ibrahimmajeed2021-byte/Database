import { useState } from "react";
import ClinicianBooking from "../UI/ClinicianBooking.jsx";
import ClinicianSchedule from "../UI/ClinicianSchedule.jsx";
import "./Manager.scss";

function Manager() {
  const managerId = 999;
  const managerName = "Manager Admin";
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="manager-view">
      <h1>Manager Dashboard</h1>

      <div className="tab-navigation">
        <button
          onClick={() => setActiveTab("pending")}
          className={`tab-button ${
            activeTab === "pending" ? "active" : "inactive"
          }`}
        >
          All Pending Requests
        </button>
        <button
          onClick={() => setActiveTab("approved")}
          className={`tab-button ${
            activeTab === "approved" ? "active" : "inactive"
          }`}
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
