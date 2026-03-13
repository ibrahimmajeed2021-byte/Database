import "./Manager.scss";
import Form from "../UI/Form.jsx";
import { useState } from "react";

function Manager() {
	const [showForm, setShowForm] = useState(false);
	return (
		<div>
			<p>Logged in as Manager</p>
			<button onClick={() => setShowForm(true)}>Add Patient</button>
			{showForm && <Form onClose={() => setShowForm(false)} />}
		</div>
	);
}

export default Manager;
