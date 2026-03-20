import { useState } from "react";
import ClinicianBooking from "../UI/ClinicianBooking.jsx";
import ClinicianSchedule from "../UI/ClinicianSchedule.jsx";
import { Modal, useModal } from "../UI/Modal.jsx";
import InvoiceList from "../UI/InvoiceList.jsx";
import "./Manager.scss";

function Manager() {
  const managerId = 999;
  const managerName = "Manager Admin";
  const [activeTab, setActiveTab] = useState("pending");

  const [showInvoices, openInvoices, closeInvoices] = useModal(false);

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

        <button onClick={openInvoices} className="tab-button inactive">
          View All Invoices
        </button>
      
      </div>

      {showInvoices && (
        <Modal title="Clinic Financial Records">
          <InvoiceList />
          <button className="close-btn" onClick={closeInvoices}>Return to Dashboard</button>
        </Modal>
      )}

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
