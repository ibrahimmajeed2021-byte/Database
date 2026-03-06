import { useState } from "react";
import "./scss/Form.scss";

const Form = ({ onClose }) => {
  // Initialisation

  const patients = [
    {
      PatientID: 0,
      PatientFirstname: "",
      PatientLastname: "",
      PatientAddress: "",
      PatientPostcode: "",
      Patientage: 0,
    },
  ];

  // State
  const [patient, setPatient] = useState(patients);

  // Handlers

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = () => {
    patients.push(patient);
    console.log(patients);
    alert("Form Submitted");
    onClose();
  };

  // View

  return (
    <div className="form">
      <label>
        Patient ID
        <input type="text" name="PatientID" value={patients.PatientID} />
      </label>
      <label>
        Patient First Name
        <input
          type="text"
          name="PatientFirstName"
          value={patients.PatientFirstname}
          onChange={handleChange}
        />
      </label>
      <label>
        Patient Last Name
        <input
          type="text"
          name="PatientLastName"
          value={patients.PatientLastname}
          onChange={handleChange}
        />
      </label>
      <label>
        Patient Address
        <input
          type="text"
          name="PatientAddress"
          value={patients.PatientAddress}
          onChange={handleChange}
        />
      </label>
      <label>
        Patient Postcode
        <input
          type="text"
          name="PatientPostcode"
          value={patients.PatientPostcode}
          onChange={handleChange}
        />
      </label>
      <label>
        Patient Age
        <input
          name="PatientAge"
          value={patients.Patientage}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Form;
