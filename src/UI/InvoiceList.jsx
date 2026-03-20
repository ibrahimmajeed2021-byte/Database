import { useState } from "react";
import { Modal, useModal } from "./Modal.jsx";
import "./InvoiceList.scss";

const InvoiceList = () => {
  const [isOpen, open, close] = useModal(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const invoices = [
    { id: "INV-001", appt: "101", cost: "50.00", name: "Abubakar" },
    { id: "INV-002", appt: "102", cost: "75.00", name: "Ibrahim" },
    { id: "INV-003", appt: "103", cost: "120.00", name: "Calvin" }
  ];

  const handleView = (inv) => {
    setSelectedInvoice(inv);
    open();
  };

  return (
    <div className="InvoiceList">
      <p>
        <strong> Current Invoices </strong>   
        </p>
      
      <div className="list-container">
        {invoices.map((inv) => (
          <div key={inv.id} className="invoice-row">
            <span><strong>{inv.id}</strong></span>
            <span>£{inv.cost}</span>
            <button onClick={() => handleView(inv)}>View Details</button>
          </div>
        ))}
      </div>

      {isOpen && selectedInvoice && (
        <Modal title="Detailed Statement">
          <div className="invoice-details">
            <p><strong>Invoice ID:</strong> {selectedInvoice.id}</p>
            <p><strong>Patient Name:</strong> {selectedInvoice.name}</p>
            <p><strong>Amount Due:</strong> £{selectedInvoice.cost}</p>
            <button className="close-btn" onClick={close}>Back to List</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default InvoiceList;