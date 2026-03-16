import { useState, useEffect } from "react";
import { CardContainer, Card } from "../UI/Card.jsx";
import "../UI/scss/ClinicianBooking.scss";

function ClinicianBookings({ clinicianId, clinicianName }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = () => {
      const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const pendingBookings = allBookings.filter((b) => b.status === "pending");
      setBookings(pendingBookings);
    };

    loadBookings();
    const interval = setInterval(loadBookings, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleApprove = (bookingId) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    const updatedBookings = allBookings.map((b) =>
      b.id === bookingId
        ? {
            ...b,
            status: "approved",
            clinicianId: clinicianId,
            clinicianName: clinicianName,
          }
        : b
    );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(bookings.filter((b) => b.id !== bookingId));
    alert(`Appointment approved and assigned to ${clinicianName}!`);
  };

  const handleReject = (bookingId) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updatedBookings = allBookings.map((b) =>
      b.id === bookingId ? { ...b, status: "rejected" } : b
    );
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(bookings.filter((b) => b.id !== bookingId));
    alert("Appointment rejected.");
  };

  return (
    <div className="clinician-bookings">
      <h1>Pending Appointment Requests</h1>

      {bookings.length === 0 ? (
        <p className="no-bookings">No pending appointment requests</p>
      ) : (
        <CardContainer>
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <div className="booking-card">
                <h3>
                  {booking.firstName} {booking.lastName}
                </h3>

                <div className="booking-details">
                  <p>
                    <strong>Email:</strong> {booking.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {booking.phone}
                  </p>
                  <p>
                    <strong>DOB:</strong> {booking.dateOfBirth}
                  </p>
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

                <div className="action-buttons">
                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(booking.id)}
                  >
                    Approve & Assign to Me
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleReject(booking.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </CardContainer>
      )}
    </div>
  );
}

export default ClinicianBookings;
