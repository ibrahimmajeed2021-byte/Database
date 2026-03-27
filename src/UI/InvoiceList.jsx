import { useState } from "react";
import { Modal, useModal } from "./Modal.jsx";
import apiURL from "../api/apiURL.js";
import useLoad from "../api/useLoad.js";
import "./InvoiceList.scss";

const InvoiceList = () => {
  const [isOpen, open, close] = useModal(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [vaccines, loadingMessage] = useLoad(apiURL + "/vaccines");

  const invoices = [
    { id: "INV-001", appt: "101", name: "Abubakar", vaccineID: 2 },
    { id: "INV-002", appt: "102", name: "Ibrahim", vaccineID: 5 },
    { id: "INV-003", appt: "103", name: "Calvin", vaccineID: 6 } 
  ];

  const getVaccineData = (vID) => {
    if (!vaccines) return "Loading...";
    const match = vaccines.find(v => v.VaccineID === vID)
    return match ? match.VaccineCost : "0.00";
  }

  const handleView = (inv) => {
    setSelectedInvoice(inv);
    open();
  };


  return (
    <div className="InvoiceList">
      <p>
        <strong> Current Invoices </strong>   
        </p>

        {!vaccines && <p>{loadingMessage}</p>}
      
      <div className="list-container">
        {invoices.map((inv) => (
          <div key={inv.id} className="invoice-row">
            <span><strong>{inv.id}</strong></span>
            <span>{inv.name}</span>
            <span>£{getVaccineData(inv.vaccineID)}</span>
            <button onClick={() => handleView(inv)}>View Details</button>
          </div>
        ))}
      </div>

      {isOpen && selectedInvoice && (
        <Modal title="Detailed Statement">
          <div className="invoice-details">
            <p><strong>Invoice ID:</strong> {selectedInvoice.id}</p>
            <p><strong>Patient Name:</strong> {selectedInvoice.name}</p>
            <p><strong>Amount Due:</strong> £{getVaccineData(selectedInvoice.vaccineID)}</p>
            <button className="close-btn" onClick={close}>Back to List</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default InvoiceList;