import { useState } from "react";
import "./scss/Form.scss";

const Form = ({ onClose, onSubmit }) => {
  // Initialisation

  // State
  const [patient, setPatient] = useState({
    PatientFirstname: "",
    PatientLastname: "",
    PatientAddress: "",
    PatientPostcode: "SW1A 1AA",
    PatientAge: 0,
  });

  // Handlers

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = () => {
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

      PatientPostcode: patient.PatientPostcode || "SW1A 1AA",

      PatientAge: patient.PatientAge || 0,
    };

    console.log("Original data:", patient);
    console.log("Sending to API:", submissionData);

    onSubmit(submissionData);
    alert("Form Submitted");
    onClose();
  };

  // View
  return (
    <div className="form">
      <label>
        Patient First Name
        <input
          type="text"
          name="PatientFirstname"
          value={patient.PatientFirstname}
          onChange={handleChange}
          minLength="8"
          placeholder="e.g., Jonathan"
        />
      </label>

      <label>
        Patient Last Name
        <input
          type="text"
          name="PatientLastname"
          value={patient.PatientLastname}
          onChange={handleChange}
          minLength="8"
          placeholder="e.g., Anderson"
        />
      </label>

      <label>
        Patient Address
        <input
          type="text"
          name="PatientAddress"
          value={patient.PatientAddress}
          onChange={handleChange}
          minLength="8"
          placeholder="e.g., 123 Main Street"
        />
      </label>

      <label>
        Patient Postcode
        <input
          type="text"
          name="PatientPostcode"
          value={patient.PatientPostcode}
          onChange={handleChange}
          placeholder="e.g., SW1A 1AA"
          pattern="^(GIR\s?0AA|(?:(?:[A-PR-UWYZ][0-9]{1,2})|(?:[A-PR-UWYZ][A-HK-Y][0-9]{1,2})|(?:[A-PR-UWYZ][0-9][A-HJKPSTUW])|(?:[A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?[0-9][ABD-HJLNP-UW-Z]{2})$"
        />
      </label>

      <label>
        Patient Age
        <input
          type="number"
          name="PatientAge"
          value={patient.PatientAge}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Form;
