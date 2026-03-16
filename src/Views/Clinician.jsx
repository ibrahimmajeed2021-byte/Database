import { useState } from "react";
import ClinicianBooking from "../UI/ClinicianBooking.jsx";
import ClinicianSchedule from "../UI/ClinicianSchedule.jsx";
import "./Clinician.scss";

function Clinician() {
  const clinicianId = 1;
  const clinicianName = "Dr. Smith";
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <div className="clinician-view">
      <div className="tab-navigation">
        <button
          onClick={() => setActiveTab("schedule")}
          className={`tab-button ${
            activeTab === "schedule" ? "active" : "inactive"
          }`}
        >
          My Schedule
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`tab-button ${
            activeTab === "pending" ? "active" : "inactive"
          }`}
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
