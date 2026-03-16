import { useState, useEffect } from "react";
import { CardContainer, Card } from "../UI/Card.jsx";
import "../UI/scss/PatientBooking.scss";

function PatientBookings({ onReschedule }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = () => {
      const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const activeBookings = allBookings.filter(
        (b) => b.status !== "dismissed"
      );
      setBookings(activeBookings);
    };

    loadBookings();
    const interval = setInterval(loadBookings, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = (bookingId) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updatedBookings = allBookings.map((b) =>
      b.id === bookingId ? { ...b, status: "dismissed" } : b
    );
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(bookings.filter((b) => b.id !== bookingId));
  };

  const handleCancel = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId);

    const confirmMessage =
      booking.status === "approved"
        ? "Are you sure you want to cancel this appointment? This cannot be undone."
        : "Are you sure you want to cancel this booking request?";

    if (!window.confirm(confirmMessage)) {
      return;
    }

    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updatedBookings = allBookings.map((b) =>
      b.id === bookingId ? { ...b, status: "cancelled" } : b
    );
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    setBookings(
      bookings.map((b) =>
        b.id === bookingId ? { ...b, status: "cancelled" } : b
      )
    );

    alert("Appointment cancelled successfully.");
  };

  const handleReschedule = (booking) => {
    if (onReschedule) {
      onReschedule(booking);
    }
  };

  return (
    <div className="patient-bookings">
      <h2>My Appointment Requests</h2>

      {bookings.length === 0 ? (
        <p className="no-bookings">
          No appointment requests yet. Click "Book Appointment" to get started!
        </p>
      ) : (
        <CardContainer>
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <div className="booking-card">
                <button
                  className="dismiss-btn"
                  onClick={() => handleDismiss(booking.id)}
                  title="Dismiss"
                >
                  ×
                </button>

                <div className="status-badge">
                  <span className={booking.status}>
                    {booking.status === "pending" && "PENDING"}
                    {booking.status === "approved" && "APPROVED"}
                    {booking.status === "rejected" && "REJECTED"}
                  </span>
                </div>
                <div className="action-buttons">
                  {booking.status === "pending" && (
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel(booking.id)}
                    >
                      Cancel Request
                    </button>
                  )}

                  {booking.status === "approved" && (
                    <>
                      <button
                        className="reschedule-btn"
                        onClick={() => handleReschedule(booking)}
                      >
                        Reschedule
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancel(booking.id)}
                      >
                        Cancel Appointment
                      </button>
                    </>
                  )}

                  {booking.status === "cancelled" && (
                    <div className="status-message cancelled">
                      <strong>Appointment Cancelled</strong>
                      <p>
                        This appointment has been cancelled. You can book a new
                        appointment anytime.
                      </p>
                    </div>
                  )}
                </div>

                <h3>
                  {booking.firstName} {booking.lastName}
                </h3>

                <div className="booking-details">
                  <p>
                    <strong>Clinic:</strong> {booking.clinicName}
                  </p>
                  <p>
                    <strong>Vaccine:</strong> {booking.vaccineName}
                  </p>
                  <p>
                    <strong>Cost:</strong> £{booking.vaccineCost}
                  </p>
                  <p>
                    <strong>Date:</strong> {booking.appointmentDate}
                  </p>
                  <p>
                    <strong>Time:</strong> {booking.appointmentTime}
                  </p>
                  <p className="submitted-date">
                    Submitted: {new Date(booking.submittedAt).toLocaleString()}
                  </p>
                </div>

                {booking.status === "pending" && (
                  <div className="status-message pending">
                    <strong>Waiting for clinician approval</strong>
                    <p>
                      Your appointment request has been submitted and is pending
                      review.
                    </p>
                  </div>
                )}

                {booking.status === "approved" && (
                  <div className="status-message approved">
                    <strong>Appointment Approved!</strong>
                    <p>
                      Your appointment has been confirmed. See you on{" "}
                      {booking.appointmentDate} at {booking.appointmentTime}!
                    </p>
                  </div>
                )}

                {booking.status === "rejected" && (
                  <div className="status-message rejected">
                    <strong>Appointment Rejected</strong>
                    <p>
                      Unfortunately, this appointment could not be confirmed.
                      Please try booking a different time slot.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </CardContainer>
      )}
    </div>
  );
}

export default PatientBookings;
