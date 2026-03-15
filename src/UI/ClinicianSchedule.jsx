import { useState, useEffect } from "react";
import { CardContainer, Card } from "../UI/Card";
import "../UI/scss/ClinicianSchedule.scss";

function MySchedule({ clinicianId, clinicianName }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = () => {
      const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

      // Get approved appointments assigned to this clinician
      const myAppointments = allBookings.filter(
        (b) => b.status === "approved" && b.clinicianId === clinicianId
      );

      // Sort by date and time
      myAppointments.sort((a, b) => {
        const dateA = new Date(`${a.appointmentDate} ${a.appointmentTime}`);
        const dateB = new Date(`${b.appointmentDate} ${b.appointmentTime}`);
        return dateA - dateB;
      });

      setAppointments(myAppointments);
    };

    loadAppointments();
    const interval = setInterval(loadAppointments, 2000);
    return () => clearInterval(interval);
  }, [clinicianId]);

  const handleComplete = (bookingId) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updatedBookings = allBookings.map((b) =>
      b.id === bookingId ? { ...b, status: "completed" } : b
    );
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setAppointments(appointments.filter((b) => b.id !== bookingId));
    alert("Appointment marked as completed!");
  };

  const handleCancel = (bookingId) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updatedBookings = allBookings.map((b) =>
      b.id === bookingId ? { ...b, status: "cancelled" } : b
    );
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setAppointments(appointments.filter((b) => b.id !== bookingId));
    alert("Appointment cancelled.");
  };

  // Group appointments by date
  const groupedAppointments = appointments.reduce((groups, apt) => {
    const date = apt.appointmentDate;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(apt);
    return groups;
  }, {});

  return (
    <div className="my-schedule">
      <h1>My Schedule</h1>
      <p className="clinician-name">Clinician: {clinicianName}</p>

      {appointments.length === 0 ? (
        <p className="no-appointments">No upcoming appointments scheduled</p>
      ) : (
        <div className="schedule-container">
          {Object.keys(groupedAppointments).map((date) => (
            <div key={date} className="date-group">
              <h2 className="date-header">
                {new Date(date).toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>

              <CardContainer>
                {groupedAppointments[date].map((appointment) => (
                  <Card key={appointment.id}>
                    <div className="appointment-card">
                      <div className="appointment-header">
                        <div className="time-badge">
                          {appointment.appointmentTime}
                        </div>
                        <h3>
                          {appointment.firstName} {appointment.lastName}
                        </h3>
                      </div>

                      <div className="appointment-details">
                        <p>
                          <strong>Email:</strong> {appointment.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {appointment.phone}
                        </p>
                        <p>
                          <strong>DOB:</strong> {appointment.dateOfBirth}
                        </p>
                        <p>
                          <strong>Clinic:</strong> {appointment.clinicName}
                        </p>
                        <p>
                          <strong>Vaccine:</strong> {appointment.vaccineName}
                        </p>
                        <p>
                          <strong>Cost:</strong> £{appointment.vaccineCost}
                        </p>
                      </div>

                      <div className="action-buttons">
                        <button
                          className="complete-btn"
                          onClick={() => handleComplete(appointment.id)}
                        >
                          Mark as Completed
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => handleCancel(appointment.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContainer>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MySchedule;
