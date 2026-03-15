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

  API.get(patientsEndpoint);

  //handlers
  const handleSubmit = async (patient) => {
    const result = await API.post(postPatientsEndpoint, patient);
    if (result.isSuccess) {
      setShowForm(false);
      loadPatients(patientsEndpoint);
      alert("Submission successful");
    } else alert(`Submission unsuccessful: ${result.message}`);
  };

  const handleBookingSubmit = (bookingData) => {
    console.log("Booking submitted:", bookingData);
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
          onClose={() => setShowBookingForm(false)}
          onSubmit={handleBookingSubmit}
        />
      )}

      {userRole === "patient" && <PatientBooking />}

      {(userRole === "manager" || userRole === "clinician") && (
        <>
          {!patients ? (
            <p>{loadingMessage}</p>
          ) : (
            <CardContainer>
              {patients.map((patient) => (
                <Card key={patient.PatientID} patient={patient}>
                  <p>{`${patient.PatientFirstname} ${patient.PatientLastname}`}</p>
                </Card>
              ))}
            </CardContainer>
          )}
        </>
      )}
    </>
  );
}

export default Patients;
