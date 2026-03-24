import apiURL from "../api/apiURL.js";
import API from "../api/API.js";
import useLoad from "../api/useLoad.js";
import { CardContainer, Card } from "../UI/Card.jsx";
import CliniciansForm from "../UI/CliniciansForm.jsx";
import { useState } from "react";
import "./Clinicians.scss";

function Clinicians({ userRole }) {
  // Initialisation
  const staffEndpoint = `${apiURL}/staff`;
  const postStaffEndpoint = `${apiURL}/staff`;

  // States
  const [staff, loadingMessage, loadStaff] = useLoad(staffEndpoint);
  const [showForm, setShowForm] = useState(false);
  const [editingClinician, setEditingClinician] = useState(null);

  API.get(staffEndpoint);

  // Filter to show clinicians
  const clinicians = staff
    ? staff.filter((s) => s.StaffRoleName?.toLowerCase().includes("clinician"))
    : null;

  // Handlers
  const handleSubmit = async (clinician) => {
    let result;

    if (editingClinician) {
      const updateEndpoint = `${apiURL}/staff/${editingClinician.StaffID}`;
      result = await API.put(updateEndpoint, clinician);
    } else {
      result = await API.post(postStaffEndpoint, clinician);
    }

    if (result.isSuccess) {
      setShowForm(false);
      setEditingClinician(null);
      loadStaff(staffEndpoint);
      alert(
        editingClinician
          ? "Clinician updated successfully!"
          : "Clinician added successfully!"
      );
    } else {
      alert(
        `Failed to ${editingClinician ? "update" : "add"} clinician: ${
          result.message
        }`
      );
    }
  };

  const handleEdit = (clinician) => {
    console.log("Clinician being edited:", clinician);
    setEditingClinician(clinician);
    setShowForm(true);
  };

  const handleDelete = async (staffId, staffName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete clinician: ${staffName}?\n\nThis action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      const deleteEndpoint = `${apiURL}/staff/${staffId}`;
      const result = await API.delete(deleteEndpoint);

      if (result.isSuccess) {
        alert("Clinician deleted successfully!");
        loadStaff(staffEndpoint);
      } else {
        alert(`Failed to delete clinician: ${result.message}`);
      }
    } catch (error) {
      alert(`Error deleting clinician: ${error.message}`);
    }
  };

  // View
  return (
    <>
      <h1>Manage Clinicians</h1>

      {userRole === "manager" && (
        <button onClick={() => setShowForm(true)}>Add Clinician</button>
      )}

      {/* Add form - only show when NOT editing */}
      {showForm && !editingClinician && (
        <div className="form-container">
          <CliniciansForm
            onSubmit={handleSubmit}
            onClose={() => {
              setShowForm(false);
              setEditingClinician(null);
            }}
            existingClinician={null}
          />
        </div>
      )}

      {!clinicians ? (
        <p>{loadingMessage}</p>
      ) : clinicians.length === 0 ? (
        <p>No clinicians found</p>
      ) : (
        <CardContainer>
          {clinicians.map((clinician) => (
            <Card key={clinician.StaffID}>
              <div className="clinician-card">
                <h3>
                  {clinician.StaffFirstname} {clinician.StaffLastname}
                </h3>
                <p>
                  <strong>Role:</strong> {clinician.StaffRoleName}
                </p>
                <p>
                  <strong>Clinic:</strong> {clinician.StaffClinicName}
                </p>

                {/* Edit form appears INSIDE the card */}
                {editingClinician?.StaffID === clinician.StaffID ? (
                  <div className="inline-edit-section">
                    <CliniciansForm
                      onSubmit={handleSubmit}
                      onClose={() => {
                        setShowForm(false);
                        setEditingClinician(null);
                      }}
                      existingClinician={editingClinician}
                    />
                  </div>
                ) : (
                  userRole === "manager" && (
                    <div className="clinician-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(clinician)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            clinician.StaffID,
                            `${clinician.StaffFirstname} ${clinician.StaffLastname}`
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  )
                )}
              </div>
            </Card>
          ))}
        </CardContainer>
      )}
    </>
  );
}

export default Clinicians;
