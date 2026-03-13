import { useState } from "react";
import AppointmentList from "../UI/AppointmentList.jsx";

function Patient() {
  const [showAppointments, setShowAppointments] = useState(false);

  return (
    <div>
      <p>Logged in as Patient</p>

      <button onClick={() => setShowAppointments(true)}>
        View Appointments
      </button>

      {showAppointments && (
        <AppointmentList onClose={() => setShowAppointments(false)} />
      )}
    </div>
  );
}

export default Patient;
