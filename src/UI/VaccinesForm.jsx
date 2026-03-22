import { useState } from "react";
import "./scss/Form.scss";

const VaccinesForm = ({ onSubmit, onClose, existingVaccine }) => {
  // State
  const [vaccine, setVaccine] = useState({
    VaccineID: existingVaccine?.VaccineID || "",
    VaccineName: existingVaccine?.VaccineName || "",
    VaccineCost: existingVaccine?.VaccineCost || "",
  });

  // Handlers
  const handleChange = (event) => {
    const { name, value } = event.target;
    setVaccine({ ...vaccine, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(vaccine);
  };

  // View
  return (
    <div className="form">
      <h3>{existingVaccine ? "Edit Vaccine" : "Add Vaccine"}</h3>

      <label>
        Vaccine ID
        <input
          name="VaccineID"
          value={vaccine.VaccineID}
          onChange={handleChange}
          disabled={existingVaccine !== null}
        />
      </label>

      <label>
        Vaccine Name
        <input
          type="text"
          name="VaccineName"
          value={vaccine.VaccineName}
          onChange={handleChange}
        />
      </label>

      <label>
        Vaccine Cost
        <input
          type="number"
          step="0.01"
          name="VaccineCost"
          value={vaccine.VaccineCost}
          onChange={handleChange}
        />
      </label>

      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default VaccinesForm;
