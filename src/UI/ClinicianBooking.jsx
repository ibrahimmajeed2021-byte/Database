import { useState, useEffect } from "react";
import { CardContainer, Card } from "../UI/Card.jsx";
import "../Views/Patients.scss";

function ClinicianBookings() {
  // State
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage
  useEffect(() => {
    const loadBookings = () => {
      const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      // Show only pending bookings
      const pendingBookings = allBookings.filter((b) => b.status === "pending");
      setBookings(pendingBookings);
    };

    loadBookings();

    // Refresh every 2 seconds to check for new bookings
    const interval = setInterval(loadBookings, 2000);
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleApprove = (bookingId) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    // Update status to approved
    const updatedBookings = allBookings.map((b) =>
      b.id === bookingId ? { ...b, status: "approved" } : b
    );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // Remove from pending list
    setBookings(bookings.filter((b) => b.id !== bookingId));

    alert("Appointment approved!");
  };

  const handleReject = (bookingId) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    // Update status to rejected
    const updatedBookings = allBookings.map((b) =>
      b.id === bookingId ? { ...b, status: "rejected" } : b
    );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // Remove from pending list
    setBookings(bookings.filter((b) => b.id !== bookingId));

    alert("Appointment rejected.");
  };

  // View
  return (
    <div style={{ padding: "20px" }}>
      <h1>Pending Appointment Requests</h1>

      {bookings.length === 0 ? (
        <p style={{ textAlign: "center", padding: "40px", color: "#666" }}>
          No pending appointment requests
        </p>
      ) : (
        <CardContainer>
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <div style={{ padding: "15px" }}>
                <h3
                  style={{
                    margin: "0 0 15px 0",
                    color: "#333",
                    fontSize: "20px",
                  }}
                >
                  {booking.firstName} {booking.lastName}
                </h3>

                <div style={{ marginBottom: "15px" }}>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Email:</strong> {booking.email}
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Phone:</strong> {booking.phone}
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Date of Birth:</strong> {booking.dateOfBirth}
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Clinic:</strong> {booking.clinicName}
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Vaccine:</strong> {booking.vaccineName}
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Cost:</strong> £{booking.vaccineCost}
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Appointment Date:</strong> {booking.appointmentDate}
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Appointment Time:</strong> {booking.appointmentTime}
                  </p>
                  <p
                    style={{ margin: "5px 0", fontSize: "12px", color: "#666" }}
                  >
                    <strong>Submitted:</strong>{" "}
                    {new Date(booking.submittedAt).toLocaleString()}
                  </p>
                </div>

                <div
                  style={{ display: "flex", gap: "10px", marginTop: "20px" }}
                >
                  <button
                    onClick={() => handleApprove(booking.id)}
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: "#4caf50",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(booking.id)}
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
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
