import { useState, useEffect } from "react";
import "./scss/CliniciansForm.scss";

const CliniciansForm = ({ onClose, onSubmit, existingClinician }) => {
  // State
  const [clinician, setClinician] = useState(
    existingClinician || {
      StaffFirstname: "",
      StaffLastname: "",
      StaffRoleID: "",
      StaffClinicID: "",
    }
  );

  const [clinics, setClinics] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch clinics and roles from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch clinics
        const clinicsResponse = await fetch(
          "https://softwarehub.uk/unibase/traveljabs/v1/api/clinics"
        );
        const clinicsData = await clinicsResponse.json();
        setClinics(clinicsData);

        // Fetch roles
        const rolesResponse = await fetch(
          "https://softwarehub.uk/unibase/traveljabs/v1/api/roles"
        );
        const rolesData = await rolesResponse.json();
        setRoles(rolesData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load clinics and roles");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handlers
  const handleChange = (event) => {
    const { name, value } = event.target;
    setClinician({ ...clinician, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!clinician.StaffFirstname || !clinician.StaffLastname) {
      alert("Please enter first and last name");
      return;
    }

    if (!clinician.StaffRoleID) {
      alert("Please select a role");
      return;
    }

    if (!clinician.StaffClinicID) {
      alert("Please select a clinic");
      return;
    }

    const submissionData = {
      StaffFirstname:
        clinician.StaffFirstname.length >= 8
          ? clinician.StaffFirstname
          : clinician.StaffFirstname.padEnd(8, " "),
      StaffLastname:
        clinician.StaffLastname.length >= 8
          ? clinician.StaffLastname
          : clinician.StaffLastname.padEnd(8, " "),
      StaffRoleID: parseInt(clinician.StaffRoleID),
      StaffClinicID: parseInt(clinician.StaffClinicID),
    };

    onSubmit(submissionData);
  };

  // View
  return (
    <div className="clinicians-form">
      <h2>{existingClinician ? "Edit Clinician" : "Add New Clinician"}</h2>

      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            name="StaffFirstname"
            value={clinician.StaffFirstname}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Last Name
          <input
            type="text"
            name="StaffLastname"
            value={clinician.StaffLastname}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Role
          {loading ? (
            <p>Loading roles...</p>
          ) : (
            <select
              name="StaffRoleID"
              value={clinician.StaffRoleID}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a role --</option>
              {roles.map((role) => (
                <option key={role.RoleID} value={role.RoleID}>
                  {role.RoleName}
                </option>
              ))}
            </select>
          )}
        </label>

        <label>
          Clinic
          {loading ? (
            <p>Loading clinics...</p>
          ) : (
            <select
              name="StaffClinicID"
              value={clinician.StaffClinicID}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a clinic --</option>
              {clinics.map((clinic) => (
                <option key={clinic.ClinicID} value={clinic.ClinicID}>
                  {clinic.ClinicName}
                </option>
              ))}
            </select>
          )}
        </label>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {existingClinician ? "Update Clinician" : "Add Clinician"}
          </button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CliniciansForm;
