import apiURL from "../api/apiURL";
import API from "../api/API";
import useLoad from "../api/useLoad";
import { useState } from "react";
import { CardContainer, Card } from "../UI/Card";
import Form from "../UI/Form";

function Patients({ userRole }) {
  //initialisation
  const patientsEndpoint = `${apiURL}/patients`;
  const postPatientsEndpoint = `${apiURL}/patients`;
  //states
  const [patients, loadingMessage, loadPatients] = useLoad(patientsEndpoint);
  const [showForm, setShowForm] = useState(false);

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
  //view
  return (
    <>
      <h1>Patients</h1>
      {userRole === "manager" && (
        <button onClick={() => setShowForm(true)}>Add Patient</button>
      )}
      {showForm && <Form onClose={() => setShowForm(false)} />}
      {!patients ? (
        <p>{loadingMessage}</p>
      ) : (
        <>
          <CardContainer>
            {patients.map((patient) => (
              <Card key={patient.PatientID} patient={patient}>
                <p>{`${patient.PatientFirstname} ${patient.PatientLastname}`}</p>
              </Card>
            ))}
          </CardContainer>
        </>
      )}
    </>
  );
}

export default Patients;
