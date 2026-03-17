import { useState, useEffect } from "react";
import { CardContainer, Card } from "../UI/Card";
import "../UI/scss/ClinicianSchedule.scss";

function MySchedule({ clinicianId, clinicianName }) {
  const [appointments, setAppointments] = useState([]);
  const [completionData, setCompletionData] = useState({});

  useEffect(() => {
    const loadAppointments = () => {
      const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

      const myAppointments = allBookings.filter(
        (b) => b.status === "approved" && b.clinicianId === clinicianId
      );

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

  const handleComplete = (appointmentId) => {
    const data = completionData[appointmentId] || {};

    if (!window.confirm("Mark this appointment as completed?")) {
      return;
    }

    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updatedBookings = allBookings.map((booking) =>
      booking.id === appointmentId
        ? {
            ...booking,
            completed: true,
            completedAt: new Date().toISOString(),
            vaccinationDelivered: data.vaccinationDelivered || false,
            outcomeNotes: data.outcomeNotes || "",
          }
        : booking
    );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === appointmentId
          ? {
              ...appointment,
              completed: true,
              completedAt: new Date().toISOString(),
              vaccinationDelivered: data.vaccinationDelivered || false,
              outcomeNotes: data.outcomeNotes || "",
            }
          : appointment
      )
    );

    const newCompletionData = { ...completionData };
    delete newCompletionData[appointmentId];
    setCompletionData(newCompletionData);

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

  const groupedAppointments = appointments.reduce((groups, apt) => {
    const date = apt.appointmentDate;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(apt);
    return groups;
  }, {});

  const handleVaccinationChange = (appointmentId, delivered) => {
    setCompletionData({
      ...completionData,
      [appointmentId]: {
        ...completionData[appointmentId],
        vaccinationDelivered: delivered,
      },
    });
  };

  const handleOutcomeNotesChange = (appointmentId, notes) => {
    setCompletionData({
      ...completionData,
      [appointmentId]: {
        ...completionData[appointmentId],
        outcomeNotes: notes,
      },
    });
  };

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
                        {appointment.notes && (
                          <div className="booking-notes">
                            <strong>Booking Notes:</strong>
                            <p>{appointment.notes}</p>
                          </div>
                        )}
                      </div>

                      <div className="action-buttons">
                        {!appointment.completed && (
                          <div className="completion-section">
                            <h4>Complete Appointment</h4>

                            <div className="vaccination-status">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={
                                    completionData[appointment.id]
                                      ?.vaccinationDelivered || false
                                  }
                                  onChange={(e) =>
                                    handleVaccinationChange(
                                      appointment.id,
                                      e.target.checked
                                    )
                                  }
                                />
                                <strong>Vaccination Delivered</strong>
                              </label>
                            </div>

                            <div className="outcome-notes">
                              <label>
                                <strong>Outcome Notes:</strong>
                                <textarea
                                  placeholder="Enter outcome notes, observations, or follow-up instructions..."
                                  value={
                                    completionData[appointment.id]
                                      ?.outcomeNotes || ""
                                  }
                                  onChange={(e) =>
                                    handleOutcomeNotesChange(
                                      appointment.id,
                                      e.target.value
                                    )
                                  }
                                  rows="4"
                                />
                              </label>
                            </div>

                            <button
                              className="complete-btn"
                              onClick={() => handleComplete(appointment.id)}
                            >
                              Mark as Completed
                            </button>
                          </div>
                        )}

                        {appointment.completed && (
                          <div className="completed-info">
                            <p className="completed-badge">✓ Completed</p>
                            <div className="outcome-summary">
                              <p>
                                <strong>Vaccination Delivered:</strong>{" "}
                                {appointment.vaccinationDelivered
                                  ? "Yes ✓"
                                  : "No ✗"}
                              </p>
                              {appointment.outcomeNotes && (
                                <div className="outcome-notes-display">
                                  <strong>Outcome Notes:</strong>
                                  <p>{appointment.outcomeNotes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

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
