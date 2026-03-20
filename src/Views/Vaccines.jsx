import apiURL from "../api/apiURL.js";
import API from "../api/API.js";
import useLoad from "../api/useLoad.js";
import { CardContainer, Card } from "../UI/Card.jsx";
import VaccinesForm from "../UI/VaccinesForm.jsx";
import { useState } from "react";

function Vaccines() {
	//initialisation
	const vaccinesEndpoint = `${apiURL}/vaccines`;
	const postVaccinesEndpoint = `${apiURL}/vaccines`;

	//states
	const [vaccines, loadingMessage, loadVaccines] = useLoad(vaccinesEndpoint);
	const [showForm, setShowForm] = useState(false);

	API.get(vaccinesEndpoint);

	//handlers
	const handleSubmit = async (vaccines) => {
		const result = await API.post(postVaccinesEndpoint, vaccine);
		if (result.isSuccess) {
			setShowForm(false);
			loadVaccines(vaccinesEndpoint);
			alert("Submission successful");
		} else alert(`Submission unsuccessful: ${result.message}`);
	};

	//view
	return (
		<>
			<h1>Vaccines</h1>
			<button onClick={() => setShowForm(true)}>Add Vaccine</button>
			{showForm && (
				<VaccinesForm
					onSubmit={handleSubmit}
					onClose={() => setShowForm(false)}
				/>
			)}
			{!vaccines ? (
				<p>{loadingMessage}</p>
			) : (
				<CardContainer>
					{vaccines.map((vaccine) => (
						<Card key={vaccine.StaffID} vaccine={vaccine}>
							<p>{vaccine.VaccineName}</p>
							<p>£{vaccine.VaccineCost}</p>
						</Card>
					))}
				</CardContainer>
			)}
		</>
	);
}
export default Vaccines;
