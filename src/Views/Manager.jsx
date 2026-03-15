import { Link } from "react-router-dom";
import ClinicianBookings from "../UI/ClinicianBooking.jsx";
import "./Manager.scss";

function Manager() {
  return (
    <div className="manager-dashboard">
      <h1>Manager Dashboard</h1>

      <div className="action-buttons">
        <Link to="/manager/add-clinician">
          <button className="action-button">Add Clinician</button>
        </Link>
      </div>

      <ClinicianBookings userRole="manager" />
    </div>
  );
}

export default Manager;
