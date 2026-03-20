import apiURL from "../api/apiURL.js";
import API from "../api/API.js";
import useLoad from "../api/useLoad.js";
import { CardContainer, Card } from "../UI/Card.jsx";

function Staff() {
	//initialisation
	const staffEndpoint = `${apiURL}/staff`;
	const postStaffEndpoint = `${apiURL}/staff`;

	//states
	const [staff, loadingMessage, loadStaff] = useLoad(staffEndpoint);

	API.get(staffEndpoint);

	//handlers
	const handleSubmit = async (staff) => {
		const result = await API.post(postStaffEndpoint, staff);
		if (result.isSuccess) {
			setShowForm(false);
			loadStaff(staffEndpoint);
			alert("Submission successful");
		} else alert(`Submission unsuccessful: ${result.message}`);
	};

	const editStaff = () => {
		null;
	};

	//view
	return (
		<>
			<h1>Staff</h1>
			{!staff ? (
				<p>{loadingMessage}</p>
			) : (
				<CardContainer>
					{staff.map((staff) => (
						<Card key={staff.StaffID} staff={staff}>
							<p>{`${staff.StaffFirstname} ${staff.StaffLastname}`}</p>
							<p>{staff.StaffRoleName}</p>
							<p>{staff.StaffClinicName}</p>
							<button onClick={editStaff}>Edit Staff</button>
						</Card>
					))}
				</CardContainer>
			)}
		</>
	);
}
export default Staff;
