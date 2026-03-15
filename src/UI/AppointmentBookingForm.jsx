import { useState, useEffect } from "react";
import "../UI/scss/AppointmentBookingForm.scss";

const AppointmentBookingForm = ({ onClose, onSubmit }) => {
  // Initialisation
  const initialAppointment = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    clinicID: "",
    vaccineID: "",
    appointmentDate: "",
    appointmentTime: "",
  };

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
  ];

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
    // Basic validation
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

    // Get clinic and vaccine details
    const selectedClinic = clinics.find(
      (c) => c.ClinicID === parseInt(appointment.clinicID)
    );
    const selectedVaccine = vaccines.find(
      (v) => v.VaccineID === parseInt(appointment.vaccineID)
    );

    // Create booking object
    const booking = {
      id: Date.now(), // Simple unique ID
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
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existingBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );
    existingBookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    console.log("Booking saved:", booking);

    alert(
      `Appointment Request Submitted!\n\n` +
        `Name: ${appointment.firstName} ${appointment.lastName}\n` +
        `Clinic: ${selectedClinic?.ClinicName}\n` +
        `Vaccine: ${selectedVaccine?.VaccineName}\n` +
        `Cost: £${selectedVaccine?.VaccineCost}\n` +
        `Date: ${appointment.appointmentDate}\n` +
        `Time: ${appointment.appointmentTime}\n\n` +
        `Waiting for clinician approval...`
    );

    if (onSubmit) {
      onSubmit(appointment);
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
        <h2>Loading...</h2>
        <p>Fetching clinics and vaccines...</p>
      </div>
    );
  }

  return (
    <div className="AppointmentForm">
      <h2>Book an Appointment</h2>

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
        <div
          style={{
            padding: "10px",
            background: "#f0f0f0",
            borderRadius: "5px",
            marginBottom: "15px",
          }}
        >
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

      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AppointmentBookingForm;
