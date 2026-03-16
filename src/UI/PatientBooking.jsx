import { useState, useEffect } from "react";
import { CardContainer, Card } from "../UI/Card.jsx";
import "../Views/Patients.scss";

function PatientBookings() {
  // State
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

  // Handler to dismiss booking
  const handleDismiss = (bookingId) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    const updatedBookings = allBookings.map((b) =>
      b.id === bookingId ? { ...b, status: "dismissed" } : b
    );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // Remove from view
    setBookings(bookings.filter((b) => b.id !== bookingId));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return {
          background: "#ff9800",
          color: "white",
          padding: "5px 15px",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: "500",
          display: "inline-block",
        };
      case "approved":
        return {
          background: "#4caf50",
          color: "white",
          padding: "5px 15px",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: "500",
          display: "inline-block",
        };
      case "rejected":
        return {
          background: "#f44336",
          color: "white",
          padding: "5px 15px",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: "500",
          display: "inline-block",
        };
      default:
        return {};
    }
  };

  // View
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>My Appointment Requests</h2>

      {bookings.length === 0 ? (
        <p style={{ textAlign: "center", padding: "40px", color: "#666" }}>
          No appointment requests yet. Click "Book Appointment" to get started!
        </p>
      ) : (
        <CardContainer>
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <div style={{ padding: "15px", position: "relative" }}>
                <button
                  onClick={() => handleDismiss(booking.id)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "#e0e0e0",
                    border: "none",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    cursor: "pointer",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#666",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#d32f2f";
                    e.target.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#e0e0e0";
                    e.target.style.color = "#666";
                  }}
                  title="Dismiss"
                >
                  ×
                </button>

                <div style={{ marginBottom: "15px" }}>
                  <span style={getStatusStyle(booking.status)}>
                    {booking.status === "pending" && "PENDING"}
                    {booking.status === "approved" && "APPROVED"}
                    {booking.status === "rejected" && "REJECTED"}
                  </span>
                </div>

                <h3
                  style={{
                    margin: "0 0 5px 0",
                    color: "#333",
                    fontSize: "18px",
                  }}
                >
                  {booking.firstName} {booking.lastName}
                </h3>

                <div style={{ marginBottom: "10px", paddingRight: "30px" }}>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                    <strong>Clinic:</strong> {booking.clinicName}
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                    <strong>Vaccine:</strong> {booking.vaccineName}
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                    <strong>Cost:</strong> £{booking.vaccineCost}
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                    <strong>Date:</strong> {booking.appointmentDate}
                  </p>
                  <p style={{ margin: "5px 0", fontSize: "14px" }}>
                    <strong>Time:</strong> {booking.appointmentTime}
                  </p>
                  <p
                    style={{ margin: "5px 0", fontSize: "12px", color: "#999" }}
                  >
                    Submitted: {new Date(booking.submittedAt).toLocaleString()}
                  </p>
                </div>

                {booking.status === "pending" && (
                  <div
                    style={{
                      marginTop: "15px",
                      padding: "12px",
                      background: "#fff3cd",
                      borderRadius: "5px",
                      fontSize: "14px",
                      color: "#856404",
                      borderLeft: "4px solid #ff9800",
                    }}
                  >
                    <strong>Waiting for clinician approval</strong>
                    <p style={{ margin: "5px 0 0 0", fontSize: "13px" }}>
                      Your appointment request has been submitted and is pending
                      review.
                    </p>
                  </div>
                )}

                {booking.status === "approved" && (
                  <div
                    style={{
                      marginTop: "15px",
                      padding: "12px",
                      background: "#d4edda",
                      borderRadius: "5px",
                      fontSize: "14px",
                      color: "#155724",
                      borderLeft: "4px solid #4caf50",
                    }}
                  >
                    <strong>Appointment Approved!</strong>
                    <p style={{ margin: "5px 0 0 0", fontSize: "13px" }}>
                      Your appointment has been confirmed. See you on{" "}
                      {booking.appointmentDate} at {booking.appointmentTime}!
                    </p>
                  </div>
                )}

                {booking.status === "rejected" && (
                  <div
                    style={{
                      marginTop: "15px",
                      padding: "12px",
                      background: "#f8d7da",
                      borderRadius: "5px",
                      fontSize: "14px",
                      color: "#721c24",
                      borderLeft: "4px solid #f44336",
                    }}
                  >
                    <strong>Appointment Rejected</strong>
                    <p style={{ margin: "5px 0 0 0", fontSize: "13px" }}>
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
