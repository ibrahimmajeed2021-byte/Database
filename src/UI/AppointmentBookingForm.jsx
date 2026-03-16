import { useState, useEffect } from "react";
import "../UI/scss/AppointmentBookingForm.scss";

const AppointmentBookingForm = ({ onClose, onSubmit, existingBooking }) => {
  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];

  const initialAppointment = existingBooking || {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    clinicID: "",
    vaccineID: "",
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
  };

  // State
  const [appointment, setAppointment] = useState(initialAppointment);
  const [clinics, setClinics] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const clinicsResponse = await fetch(
          "https://softwarehub.uk/unibase/traveljabs/v1/api/clinics"
        );
        const clinicsData = await clinicsResponse.json();
        setClinics(clinicsData);

        const vaccinesResponse = await fetch(
          "https://softwarehub.uk/unibase/traveljabs/v1/api/vaccines"
        );
        const vaccinesData = await vaccinesResponse.json();
        setVaccines(vaccinesData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load clinics and vaccines");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handlers
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = () => {
    if (!appointment.firstName || !appointment.lastName) {
      alert("Please enter first and last name");
      return;
    }
    if (!appointment.email || !appointment.phone) {
      alert("Please enter email and phone number");
      return;
    }
    if (!appointment.clinicID || !appointment.vaccineID) {
      alert("Please select clinic and vaccine");
      return;
    }
    if (!appointment.appointmentDate || !appointment.appointmentTime) {
      alert("Please select appointment date and time");
      return;
    }

    const selectedClinic = clinics.find(
      (c) => c.ClinicID === parseInt(appointment.clinicID)
    );
    const selectedVaccine = vaccines.find(
      (v) => v.VaccineID === parseInt(appointment.vaccineID)
    );

    // Create booking object
    const booking = {
      id: existingBooking?.id || Date.now(),
      firstName: appointment.firstName,
      lastName: appointment.lastName,
      dateOfBirth: appointment.dateOfBirth,
      email: appointment.email,
      phone: appointment.phone,
      clinicID: appointment.clinicID,
      clinicName: selectedClinic?.ClinicName || "Unknown",
      vaccineID: appointment.vaccineID,
      vaccineName: selectedVaccine?.VaccineName || "Unknown",
      vaccineCost: selectedVaccine?.VaccineCost || "0",
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      notes: appointment.notes,
      status: existingBooking ? "approved" : "pending",
      submittedAt: existingBooking?.submittedAt || new Date().toISOString(),
      clinicianID: existingBooking?.clinicianID,
      clinicianName: existingBooking?.clinicianName,
    };

    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    let updatedBookings;
    if (existingBooking) {
      updatedBookings = storedBookings.map((b) =>
        b.id === existingBooking.id ? booking : b
      );
    } else {
      updatedBookings = [...storedBookings, booking];
    }

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    const message = existingBooking
      ? `Appointment Rescheduled!\n\nNew Date: ${appointment.appointmentDate}\nNew Time: ${appointment.appointmentTime}`
      : `Appointment Request Submitted!\n\n` +
        `Name: ${appointment.firstName} ${appointment.lastName}\n` +
        `Clinic: ${selectedClinic?.ClinicName}\n` +
        `Vaccine: ${selectedVaccine?.VaccineName}\n` +
        `Cost: £${selectedVaccine?.VaccineCost}\n` +
        `Date: ${appointment.appointmentDate}\n` +
        `Time: ${appointment.appointmentTime}\n\n` +
        `Waiting for clinician approval...`;

    alert(message);

    if (onSubmit) {
      onSubmit(booking);
    }
    onClose();
  };

  // View
  const today = new Date().toISOString().split("T")[0];
  const selectedVaccine = vaccines.find(
    (v) => v.VaccineID === parseInt(appointment.vaccineID)
  );

  if (loading) {
    return (
      <div className="form">
        <h2>
          {existingBooking ? "Reschedule Appointment" : "Book an Appointment"}
        </h2>
        <p>Fetching clinics and vaccines...</p>
      </div>
    );
  }

  return (
    <div className="AppointmentForm">
      <h2>
        {existingBooking ? "Reschedule Appointment" : "Book an Appointment"}
      </h2>

      <label>
        First Name
        <input
          type="text"
          name="firstName"
          value={appointment.firstName}
          onChange={handleChange}
        />
      </label>

      <label>
        Last Name
        <input
          type="text"
          name="lastName"
          value={appointment.lastName}
          onChange={handleChange}
        />
      </label>

      <label>
        Date of Birth
        <input
          type="date"
          name="dateOfBirth"
          value={appointment.dateOfBirth}
          onChange={handleChange}
          max={today}
        />
      </label>

      <label>
        Email
        <input
          type="email"
          name="email"
          value={appointment.email}
          onChange={handleChange}
        />
      </label>

      <label>
        Phone Number
        <input
          type="tel"
          name="phone"
          value={appointment.phone}
          onChange={handleChange}
        />
      </label>

      <label>
        Select Clinic
        <select
          name="clinicID"
          value={appointment.clinicID}
          onChange={handleChange}
        >
          <option value="">-- Choose a clinic --</option>
          {clinics.map((clinic) => (
            <option key={clinic.ClinicID} value={clinic.ClinicID}>
              {clinic.ClinicName}
            </option>
          ))}
        </select>
      </label>

      <label>
        Select Vaccine
        <select
          name="vaccineID"
          value={appointment.vaccineID}
          onChange={handleChange}
        >
          <option value="">-- Choose a vaccine --</option>
          {vaccines.map((vaccine) => (
            <option key={vaccine.VaccineID} value={vaccine.VaccineID}>
              {vaccine.VaccineName} - £{vaccine.VaccineCost}
            </option>
          ))}
        </select>
      </label>

      {selectedVaccine && (
        <div className="cost-display">
          <strong>Cost: £{selectedVaccine.VaccineCost}</strong>
        </div>
      )}

      <label>
        Appointment Date
        <input
          type="date"
          name="appointmentDate"
          value={appointment.appointmentDate}
          onChange={handleChange}
          min={today}
        />
      </label>

      <label>
        Appointment Time
        <select
          name="appointmentTime"
          value={appointment.appointmentTime}
          onChange={handleChange}
        >
          <option value="">-- Choose a time --</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </label>

      <label>
        Booking Notes (Optional)
        <textarea
          name="notes"
          value={appointment.notes}
          onChange={handleChange}
          placeholder="Any special requirements or information for the clinician..."
          rows="4"
        />
      </label>

      <button onClick={handleSubmit}>
        {existingBooking ? "Update Appointment" : "Submit"}
      </button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AppointmentBookingForm;
