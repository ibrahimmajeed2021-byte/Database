import "./scss/AppointmentList.scss";
import { useState } from "react";

const AppointmentList = ({ onClose }) => {
    return (
        <div className="form">
            <h2>Current Appointments</h2>

            <div className="cardContainer">
                <div className="appointmentCard">
                    <p><strong>Date:</strong> 12/03/2026</p>
                    <p><strong>Vaccine:</strong> Yellow Fever</p>
                </div>
            </div>

            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default AppointmentList;