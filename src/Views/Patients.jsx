import apiURL from "../api/apiURL.js";
import API from "../api/API.js";
import useLoad from "../api/useLoad.js";
import { useState } from "react";
import { CardContainer, Card } from "../UI/Card.jsx";
import Form from "../UI/Form.jsx";
import AppointmentBookingForm from "../UI/AppointmentBookingForm.jsx";
import PatientBooking from "../UI/PatientBooking.jsx";
import "./Patients.scss";

const InlineEditForm = ({ patient, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    PatientFirstname: patient.PatientFirstname,
    PatientLastname: patient.PatientLastname,
    PatientAddress: patient.PatientAddress,
    PatientAge: patient.PatientAge,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.PatientFirstname || !formData.PatientLastname) {
      alert("Please enter first and last name");
      return;
    }

    if (!formData.PatientAge || formData.PatientAge < 0) {
      alert("Please enter a valid age");
      return;
    }

    onSave(formData, patient.PatientID);
  };

  return (
    <form className="inline-edit-form" onSubmit={handleSubmit}>
      <h4>Edit Patient</h4>

      <label>
        First Name
        <input
          type="text"
          name="PatientFirstname"
          value={formData.PatientFirstname}
          onChange={handleChange}
        />
      </label>

      <label>
        Last Name
        <input
          type="text"
          name="PatientLastname"
          value={formData.PatientLastname}
          onChange={handleChange}
        />
      </label>

      <label>
        Address
        <input
          type="text"
          name="PatientAddress"
          value={formData.PatientAddress}
          onChange={handleChange}
        />
      </label>

      <label>
        Age
        <input
          type="number"
          name="PatientAge"
          value={formData.PatientAge}
          onChange={handleChange}
        />
      </label>

      <div className="inline-form-actions">
        <button type="submit" className="save-btn">
          Save Changes
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

function Patients({ userRole }) {
  //initialisation
  const patientsEndpoint = `${apiURL}/patients`;
  const postPatientsEndpoint = `${apiURL}/patients`;

  //states
  const [patients, loadingMessage, loadPatients] = useLoad(patientsEndpoint);
  const [showForm, setShowForm] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [rescheduleBooking, setRescheduleBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCards, setExpandedCards] = useState({});
  const [editingPatient, setEditingPatient] = useState(null);

  API.get(patientsEndpoint);

  //handlers
  const handleSubmit = async (patient, patientId) => {
    const submissionData = {
      PatientFirstname:
        patient.PatientFirstname.length >= 8
          ? patient.PatientFirstname
          : patient.PatientFirstname.padEnd(8, " "),

      PatientLastname:
        patient.PatientLastname.length >= 8
          ? patient.PatientLastname
          : patient.PatientLastname.padEnd(8, " "),

      PatientAddress:
        patient.PatientAddress.length >= 8
          ? patient.PatientAddress
          : patient.PatientAddress.padEnd(8, " "),

      PatientPostcode: "SW1A 1AA",
      PatientAge: patient.PatientAge,
    };

    let result;

    if (patientId) {
      const updateEndpoint = `${apiURL}/patients/${patientId}`;
      result = await API.put(updateEndpoint, submissionData);
    } else {
      result = await API.post(postPatientsEndpoint, submissionData);
    }

    if (result.isSuccess) {
      setShowForm(false);
      setEditingPatient(null);
      loadPatients(patientsEndpoint);
      alert(
        patientId
          ? "Patient updated successfully!"
          : "Patient added successfully!"
      );
    } else {
      alert(
        `Failed to ${patientId ? "update" : "add"} patient: ${result.message}`
      );
    }
  };

  const handleBookingSubmit = (bookingData) => {
    console.log("Booking submitted:", bookingData);
  };

  const handleReschedule = (booking) => {
    setRescheduleBooking(booking);
    setShowBookingForm(true);
  };

  const handleCloseForm = () => {
    setShowBookingForm(false);
    setRescheduleBooking(null);
  };

  const toggleCard = (patientId) => {
    setExpandedCards({
      ...expandedCards,
      [patientId]: !expandedCards[patientId],
    });
  };

  const handleDelete = async (patientId, patientName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete patient: ${patientName}?\n\nThis action cannot be undone`
    );

    if (!confirmDelete) return;

    try {
      const deleteEndpoint = `${apiURL}/patients/${patientId}`;
      const result = await API.delete(deleteEndpoint);

      if (result.isSuccess) {
        alert("Patient Deleted Successfully!");
        loadPatients(patientsEndpoint);
      } else {
        alert(`Failed to Delete Patient: ${result.message}`);
      }
    } catch (error) {
      alert(`Error Deleting Patient: ${error.message}`);
    }
  };

  const handleEdit = (patientId) => {
    setEditingPatient(patientId);
  };

  //view
  return (
    <>
      <h1>Patients</h1>

      {userRole === "manager" && (
        <button onClick={() => setShowForm(true)}>Add Patient</button>
      )}

      {userRole === "patient" && (
        <button onClick={() => setShowBookingForm(true)}>
          Book Appointment
        </button>
      )}

      {showForm && !editingPatient && (
        <Form onClose={() => setShowForm(false)} onSubmit={handleSubmit} />
      )}

      {showBookingForm && (
        <AppointmentBookingForm
          onClose={handleCloseForm}
          onSubmit={handleBookingSubmit}
          existingBooking={rescheduleBooking}
        />
      )}

      {userRole === "patient" && (
        <PatientBooking onReschedule={handleReschedule} />
      )}

      {(userRole === "manager" || userRole === "clinician") && (
        <>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search patients by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="patient-search"
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm("")}
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>
          {!patients ? (
            <p>{loadingMessage}</p>
          ) : (
            <>
              <CardContainer>
                {patients
                  .filter((patient) => {
                    const fullName =
                      `${patient.PatientFirstname} ${patient.PatientLastname}`.toLowerCase();
                    return fullName.includes(searchTerm.toLowerCase());
                  })
                  .map((patient) => (
                    <Card key={patient.PatientID} patient={patient}>
                      <div className="patient-card">
                        <button
                          className="patient-name-toggle"
                          onClick={() => toggleCard(patient.PatientID)}
                        >
                          <span className="toggle-icon">
                            {expandedCards[patient.PatientID] ? "▼" : "▶"}
                          </span>
                          <h3>{`${patient.PatientFirstname} ${patient.PatientLastname}`}</h3>
                        </button>

                        {expandedCards[patient.PatientID] && (
                          <div className="patient-details">
                            {editingPatient === patient.PatientID ? (
                              <InlineEditForm
                                patient={patient}
                                onSave={handleSubmit}
                                onCancel={() => setEditingPatient(null)}
                              />
                            ) : (
                              <>
                                <p>
                                  <strong>Patient ID:</strong>{" "}
                                  {patient.PatientID}
                                </p>
                                <p>
                                  <strong>Email:</strong> {patient.PatientEmail}
                                </p>
                                <p>
                                  <strong>Phone:</strong> {patient.PatientPhone}
                                </p>
                                <p>
                                  <strong>DOB:</strong> {patient.PatientDOB}
                                </p>

                                {userRole === "manager" && (
                                  <div className="patient-actions">
                                    <button
                                      className="edit-patient-btn"
                                      onClick={() =>
                                        handleEdit(patient.PatientID)
                                      }
                                    >
                                      Edit Patient
                                    </button>

                                    <button
                                      className="delete-patient-btn"
                                      onClick={() =>
                                        handleDelete(
                                          patient.PatientID,
                                          `${patient.PatientFirstname} ${patient.PatientLastname}`
                                        )
                                      }
                                    >
                                      Delete Patient
                                    </button>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
              </CardContainer>

              {patients.filter((patient) => {
                const fullName =
                  `${patient.PatientFirstname} ${patient.PatientLastname}`.toLowerCase();
                return fullName.includes(searchTerm.toLowerCase());
              }).length === 0 &&
                searchTerm && (
                  <p className="no-results">
                    No patients found matching "{searchTerm}"
                  </p>
                )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Patients;
