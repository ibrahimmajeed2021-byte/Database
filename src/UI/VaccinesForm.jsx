import { useState } from "react";
import "./scss/Form.scss";

const VaccinesForm = ({ onSubmit, onClose }) => {
	// Initialisation

	const initialVaccines = [
		{
			VaccineID: 0,
			VaccineName: "",
			VaccineCost: 0.0,
		},
	];

	// State
	const [vaccine, setVaccine] = useState(initialVaccines);

	// Handlers

	const handleChange = (event) => {
		const { name, value } = event.target;
		setVaccine({ ...vaccine, [name]: value });
	};

	const handleSubmit = () => onSubmit(vaccine);

	// View

	return (
		<div className="form">
			<label>
				Vaccine ID
				<input name="VaccineID" onChange={handleChange} />
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
					name="VaccineCost"
					value={vaccine.VaccineCost}
					onChange={handleChange}
				/>
			</label>
			<button onClick={handleSubmit}>Submit</button>
			<button onClick={onClose}>Close</button>
		</div>
	);
};

export default VaccinesForm;
