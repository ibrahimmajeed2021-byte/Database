import apiURL from "../api/apiURL";
import API from "../api/API";
import useLoad from "../api/useLoad";
import { useState } from "react";
import { CardContainer, Card } from "../UI/Card";
import Form from "../UI/Form";
import AppointmentBookingForm from "../UI/AppointmentBookingForm";
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

      {/* Manager: Add Patient button */}
      {userRole === "manager" && (
        <button onClick={() => setShowForm(true)}>Add Patient</button>
      )}

      {/* Patient: Book Appointment button */}
      {userRole === "patient" && (
        <button onClick={() => setShowBookingForm(true)}>
          Book Appointment
        </button>
      )}

      {/* Manager Add Patient Form */}
      {showForm && <Form onClose={() => setShowForm(false)} />}

      {/* ✅ Patient Booking Form - ONLY THIS, NOT ClinicianBookings */}
      {showBookingForm && (
        <AppointmentBookingForm
          onClose={() => setShowBookingForm(false)}
          onSubmit={handleBookingSubmit}
        />
      )}

      {/* ✅ DO NOT include ClinicianBookings here */}

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
  );
}

export default Patients;
