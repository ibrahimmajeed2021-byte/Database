import apiURL from "../api/apiURL.js";
import API from "../api/API.js";
import useLoad from "../api/useLoad.js";
import { useState } from "react";
import { CardContainer, Card } from "../UI/Card.jsx";
import Form from "../UI/Form.jsx";
import AppointmentBookingForm from "../UI/AppointmentBookingForm.jsx";
import PatientBooking from "../UI/PatientBooking.jsx";
import "./Patients.scss";

const NoteForm = ({ patientId, onSave, onCancel }) => {
  const [noteText, setNoteText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(patientId, noteText);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h4>Add Note</h4>
      <textarea
        placeholder="Enter note here..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        rows="4"
        autoFocus
      />
      <div className="note-form-actions">
        <button type="submit" className="save-note-btn">
          Save Note
        </button>
        <button type="button" onClick={onCancel} className="cancel-note-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

const NotesDisplay = ({ notes, patientId, onDelete, userRole }) => {
  if (!notes || notes.length === 0) {
    return <p className="no-notes">No notes yet</p>;
  }

  return (
    <div className="notes-list">
      <h4>Notes ({notes.length})</h4>
      {notes.map((note, index) => (
        <div key={index} className="note-item">
          <div className="note-header">
            <div className="note-info">
              <span className="note-author">{note.CreatedBy || "Unknown"}</span>
              <span className="note-date">
                {new Date(note.CreatedDate).toLocaleDateString()}{" "}
                {new Date(note.CreatedDate).toLocaleTimeString()}
              </span>
            </div>

            {userRole === "manager" && (
              <button
                className="delete-note-btn"
                onClick={() => onDelete(patientId, index)}
                title="Delete note"
              >
                🗑️
              </button>
            )}
          </div>
          <p className="note-text">{note.NoteText}</p>
        </div>
      ))}
    </div>
  );
};

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
  const [showNoteForm, setShowNoteForm] = useState(null);

  API.get(patientsEndpoint);

  //handlers
  const handleSubmit = async (patient, patientId) => {
    const submissionData = {
      PatientFirstname: patient.PatientFirstname,
      PatientLastname: patient.PatientLastname,
      PatientAddress: patient.PatientAddress,
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

  const handleAddNote = (patientId) => {
    setShowNoteForm(patientId);
  };

  const handleSaveNote = async (patientId, noteText) => {
    if (!noteText.trim()) {
      alert("Please enter a note");
      return;
    }

    const storageKey = `patient_notes_${patientId}`;
    const existingNotes = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const newNote = {
      NoteText: noteText,
      CreatedBy: userRole,
      CreatedDate: new Date().toISOString(),
    };

    existingNotes.push(newNote);
    localStorage.setItem(storageKey, JSON.stringify(existingNotes));

    alert("Note added successfully!");
    setShowNoteForm(null);
    loadPatients(patientsEndpoint);
  };

  const handleDeleteNote = (patientId, noteIndex) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?\n\nThis action cannot be undone."
    );

    if (!confirmDelete) return;

    const storageKey = `patient_notes_${patientId}`;
    const existingNotes = JSON.parse(localStorage.getItem(storageKey) || "[]");

    existingNotes.splice(noteIndex, 1);

    localStorage.setItem(storageKey, JSON.stringify(existingNotes));

    alert("Note deleted successfully!");
    loadPatients(patientsEndpoint);
  };

  const getPatientNotes = (patientId) => {
    const storageKey = `patient_notes_${patientId}`;
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
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

                                <div className="notes-section">
                                  <NotesDisplay
                                    notes={getPatientNotes(patient.PatientID)}
                                    patientId={patient.PatientID}
                                    onDelete={handleDeleteNote}
                                    userRole={userRole}
                                  />

                                  {(userRole === "manager" ||
                                    userRole === "clinician") && (
                                    <>
                                      {showNoteForm === patient.PatientID ? (
                                        <NoteForm
                                          patientId={patient.PatientID}
                                          onSave={handleSaveNote}
                                          onCancel={() => setShowNoteForm(null)}
                                        />
                                      ) : (
                                        <button
                                          className="add-note-btn"
                                          onClick={() =>
                                            handleAddNote(patient.PatientID)
                                          }
                                        >
                                          Add Note
                                        </button>
                                      )}
                                    </>
                                  )}
                                </div>

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
