import apiURL from "../api/apiURL.js";
import API from "../api/API.js";
import useLoad from "../api/useLoad.js";
import { useState } from "react";
import { CardContainer, Card } from "../UI/Card.jsx";
import Form from "../UI/Form.jsx";
import AppointmentBookingForm from "../UI/AppointmentBookingForm.jsx";
import PatientBooking from "../UI/PatientBooking.jsx";
import "./Patients.scss";

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

  API.get(patientsEndpoint);

  //handlers
  const handleSubmit = async (patient) => {
    const result = await API.post(postPatientsEndpoint, patient);
    if (result.isSuccess) {
      setShowBookingForm(false);
      loadPatients(patientsEndpoint);
      alert("Submission successful");
    } else alert(`Submission unsuccessful: ${result.message}`);
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

      {showForm && <Form onClose={() => setShowForm(false)} />}

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
                            <p>
                              <strong>Patient ID:</strong> {patient.PatientID}
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
