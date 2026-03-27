import apiURL from "../api/apiURL.js";
import API from "../api/API.js";
import useLoad from "../api/useLoad.js";
import { CardContainer, Card } from "../UI/Card.jsx";
import VaccinesForm from "../UI/VaccinesForm.jsx";
import { useState } from "react";

function Vaccines({ userRole }) {
  //initialisation
  const vaccinesEndpoint = `${apiURL}/vaccines`;
  const postVaccinesEndpoint = `${apiURL}/vaccines`;

  //states
  const [vaccines, loadingMessage, loadVaccines] = useLoad(vaccinesEndpoint);
  const [showForm, setShowForm] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState(null);
  API.get(vaccinesEndpoint);

  //handlers
  const handleSubmit = async (vaccine) => {
    let result;

    if (editingVaccine) {
      const updateEndpoint = `${apiURL}/vaccines/${editingVaccine.VaccineID}`;
      result = await API.put(updateEndpoint, vaccine);
    } else {
      result = await API.post(postVaccinesEndpoint, vaccine);
    }

    if (result.isSuccess) {
      setShowForm(false);
      setEditingVaccine(null);
      loadVaccines(vaccinesEndpoint);
      alert(
        editingVaccine
          ? "Vaccine updated successfully!"
          : "Vaccine added successfully!"
      );
    } else {
      alert(
        `Failed to ${editingVaccine ? "update" : "add"} vaccine: ${
          result.message
        }`
      );
    }
  };

  const handleEdit = (vaccine) => {
    console.log("Vaccine being edited:", vaccine);
    setEditingVaccine(vaccine);
    setShowForm(true);
  };

  const handleDelete = async (vaccineId, vaccineName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete vaccine: ${vaccineName}?\n\nThis action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      const deleteEndpoint = `${apiURL}/vaccines/${vaccineId}`;
      const result = await API.delete(deleteEndpoint);

      if (result.isSuccess) {
        alert("Vaccine deleted successfully!");
        loadVaccines(vaccinesEndpoint);
      } else {
        alert(`Failed to delete vaccine: ${result.message}`);
      }
    } catch (error) {
      alert(`Error deleting vaccine: ${error.message}`);
    }
  };

  //view
  return (
    <>
      <h1>Vaccines</h1>
      {userRole === "manager" && (
        <button onClick={() => setShowForm(true)}>Add Vaccine</button>
      )}

      {showForm && (
        <VaccinesForm
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingVaccine(null);
          }}
          existingVaccine={editingVaccine}
        />
      )}

      {!vaccines ? (
        <p>{loadingMessage}</p>
      ) : (
        <CardContainer>
          {vaccines.map((vaccine) => (
            <Card key={vaccine.VaccineID} vaccine={vaccine}>
              <p>
                <strong>{vaccine.VaccineName}</strong>
              </p>
              <p>£{vaccine.VaccineCost}</p>

              {userRole === "manager" && (
                <div className="vaccine-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(vaccine)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(vaccine.VaccineID, vaccine.VaccineName)
                    }
                  >
                    Delete
                  </button>
                </div>
              )}
            </Card>
          ))}
        </CardContainer>
      )}
    </>
  );
}

export default Vaccines;
